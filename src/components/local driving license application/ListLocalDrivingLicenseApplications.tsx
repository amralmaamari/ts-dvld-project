import { JSX, useCallback, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import GenericList from "../list/GenericList";
import CtrlDrivingLicenseApplicationInfo from "../applications/local driving license/CtrlDrivingLicenseApplicationInfo";

import {
  Menu,
  Item,
  Submenu,
  Separator,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ViewModel from "../../models/ViewModel";
import { EnType, IColumn, IContextMenu, ISearchOptions } from "../../interfaces/constant";
import { IListLocalDrivingLicenseApplications } from "../../data/listLocalDrivingLicenseApplications";
import AlertDialog from "../../models/AlertDialog";
import CtrlApplicationBasicInfo from "../applications/controls/CtrlApplicationBasicInfo";
import AddUpdateLocalDrivingLicenseApplication from "./AddUpdateLocalDrivingLicenseApplication";
import DeleteModal from "../../models/DeleteModal";

// Unique identifier for the context menu
const MENU_ID = "table_row_menu";

const getDisabledState = (row:IListLocalDrivingLicenseApplications, key:string) => {
  const  TotalPassedTests =parseInt(row.PassedTestCount); // number
  // In C#: LicenseExists = LocalDrivingLicenseApplication.IsLicenseIssued()
  // Here, we assume that if status is "New", then no license exists.
  const LicenseExists = row.Status !== "New";

  // Determine if each test has been passed.
  const PassedVisionTest = TotalPassedTests >= 1;
  const PassedWrittenTest = TotalPassedTests >= 2;
  const PassedStreetTest = TotalPassedTests >= 3;
  const PassedAllTests =
    PassedVisionTest && PassedWrittenTest && PassedStreetTest;

  switch (key) {
    case "issueDrivingLicenseFirstTime":
      // C#: Enabled = (TotalPassedTests == 3) && (!LicenseExists)
      // Disabled = inverse of enabled.
      return !(TotalPassedTests === 3 && !LicenseExists);
    case "editApplication":
      // C#: Enabled = (!LicenseExists) && (Status == New)
      return !(!LicenseExists && row.Status === "New");
    case "deleteApplication":
      // C#: Enabled only when status is New.
      return !(row.Status === "New");
    case "cancelApplication":
      // C#: Enabled only when status is New.
      return !(row.Status === "New");
    case "scheduleTests":
      // C#: ScheduleTestsToolStripMenuItem.Enabled = (!PassedVisionTest || !PassedWrittenTest || !PassedStreetTest) && (Status == New)
      // Thus, disabled = not(enabled):
      return !(
        (!PassedVisionTest || !PassedWrittenTest || !PassedStreetTest) &&
        row.Status === "New"
      );
    case "scheduleVisionTest":
      // Enabled only if the vision test has not been passed.
      return PassedVisionTest; // disable if already passed
    case "scheduleWrittenTest":
      // Enabled only if vision is passed and written is not.
      return !PassedVisionTest || PassedWrittenTest;
    case "scheduleStreetTest":
      // Enabled only if vision and written are passed and street is not.
      return !PassedWrittenTest || PassedStreetTest;
    case "showLicense":
      // C#: Enabled = LicenseExists && (Status == Completed)
      // Here, we assume that all tests passed indicates the license can be shown.
      return !(PassedAllTests && row.Status === "Completed");
    default:
      return false;
  }
};


const dataContextMenu:IContextMenu[] = [
  {
    key: "showApplicationDetails",
    name: "Show Application Details",
  },
  {
    key: "separator1",
    isSeparator: true,
  },
  {
    key: "editApplication",
    name: "Edit Application",
  },
  {
    key: "deleteApplication",
    name: "Delete Application",
  },
  {
    key: "separator2",
    isSeparator: true,
  },
  {
    key: "cancelApplication",
    name: "Cancel Application",
  },
  {
    key: "separator3",
    isSeparator: true,
  },
  {
    key: "scheduleTests",
    name: "Schedule Tests",
    children: [
      {
        key: "scheduleVisionTest",
        name: "Schedule Vision Test",
      },
      {
        key: "scheduleWrittenTest",
        name: "Schedule Written Test",
        className: "hidden",
      },
      {
        key: "scheduleStreetTest",
        name: "Schedule Street Test",
        className: "hidden",
      },
    ],
  },
  {
    key: "separator4",
    isSeparator: true,
  },
  {
    key: "issueDrivingLicenseFirstTime",
    name: "Issue Driving License (First Time)",
  },
  {
    key: "separator5",
    isSeparator: true,
  },
  {
    key: "showLicense",
    name: "Show License",
  },
  {
    key: "separator6",
    isSeparator: true,
  },
  {
    key: "showPersonLicenseHistory",
    name: "Show Person License History",
  },
];
const columns:IColumn[] = [
  { header: "L D.L AppID", accessor: "ldlappid" },
  { header: "Driving Class", accessor: "drivingclass" },
  { header: "NationalNo", accessor: "nationalno" },
  { header: "FullName", accessor: "fullname" },
  {
    header: "ApplicationDate",
    accessor: "applicationdate",
    className: "hidden md:table-cell",
  },
  { header: "PassedTestCount", accessor: "passedtestcount" },
  { header: "Status", accessor: "status" },
];

const statusOptions:IColumn[] = [
  { header: "New", accessor: "new" },
  { header: "Completed", accessor: "completed" },
  { header: "Cancelled", accessor: "cancelled" },
];
const searchOptions:ISearchOptions[] = [
  { header: "L D.L AppID", accessor: "L D.L AppID" },
  { header: "NationalNo", accessor: "NationalNo" },
  { header: "FullName", accessor: "FullName" },
  {
    header: "Status",
    accessor: "Status",
    dataType: "statusOptions",
    options: statusOptions,
  },
];

function ListLocalDrivingLicenseApplications() {
  const { api } = useContext(AppContext);
  const { show } = useContextMenu({ id: MENU_ID });
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);
  const renderMenuItems = (items:IContextMenu[]) => {
    return items.map((item) => {
      if (item.isSeparator) {
        return <Separator key={item.key} />;
      }

      if (item.children && item.children.length > 0) {
        return (
          <Submenu
            key={item.key}
            label={item.name}
            data={item.key}
            disabled={({ props }) => getDisabledState(props.row, item.key)}
          >
            {renderMenuItems(item.children)}
          </Submenu>
        );
      }
      return (
        <Item
          key={item.key}
          onClick={handleItemClick}
          data={item.key}
          disabled={({ props }) => getDisabledState(props.row, item.key)}
        >
          {item.name}
        </Item>
      );
    });
  };


  const handleItemClick = ({ event, props, data }:{event: React.MouseEvent<HTMLElement>;    props: { row: IListLocalDrivingLicenseApplications };    data:string}) => {    console.log("Menu item clicked:", data);
    // Here you can implement action based on the clicked key,
    // for example: if (data === "deleteApplication") { ... }
    switch (data) {
      case "showApplicationDetails":
        ShowMenu({
          setModalComponent,
          component:<CtrlDrivingLicenseApplicationInfo  localDrivingLicenseApplicationID={3068
          }  />
        });

        break;
      case "editApplication":
        ShowMenu({
          setModalComponent,
          component:
          <AddUpdateLocalDrivingLicenseApplication
          localDrivingLicenseApplicationID={
              props.row.LocalDrivingLicenseApplicationID
            }
          />          
        });

        break;        
        case "cancelApplication":          
          <AlertDialog message="Want u to Cancle Application" onClose={()=>alert("Cancle")} onSubmit={()=>alert("Submit")}  />
        break;
        case "deleteApplication":
          alert("Want to delete ?")  
          break;
    }
  };
  const fetchDataFn = useCallback(async () => {
    const result = await api.localDrivingLicenseApplications.fetchAll();
    console.log(result);
    
    return {
      success: result.success,
      data: result.localdrivinglicenseapplications || [],
    };
  }, [api.localDrivingLicenseApplications]);

  const renderRow = (row:IListLocalDrivingLicenseApplications):JSX.Element => {
    // On right-click, prevent the default menu and show our custom menu
    const handleContextMenu = (e:React.MouseEvent<HTMLTableRowElement>) => {
      // Make sure event is defined
      e.preventDefault();
      show({
        event: e,
        props: { row },
      });
    };

    return (
      <tr
        key={row.LocalDrivingLicenseApplicationID}
        onContextMenu={handleContextMenu}
        className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
      >
        <td className="py-2 px-6">{row.LocalDrivingLicenseApplicationID}</td>
        <td className="py-2 px-6 whitespace-nowrap">{row.ClassName}</td>
        <td className="py-2 px-6">{row.NationalNo}</td>
        <td className="py-2 px-6 whitespace-nowrap">{row.FullName}</td>
        <td className="py-2 px-6 hidden md:table-cell ">
          {row.ApplicationDate}
        </td>
        <td className="py-2 px-6">{row.PassedTestCount}</td>
        <td className="py-2 px-6">{row.Status}</td>
      </tr>
    );
  };
  const TableContextMenu = () => {
    return <Menu id={MENU_ID}>{renderMenuItems(dataContextMenu)}</Menu>;
  };

  return (
    <>
      <GenericList
        title="Local Driving License Application"
        tableName="local"
        createModalType={EnType.Create}
        columns={columns}
        searchOptions={searchOptions}
        renderRow={renderRow}
        fetchDataFn={fetchDataFn}
      />

      <TableContextMenu />

      {modalComponent}
    </>
  );
}

interface IShowMenuProps  {
  setModalComponent: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
  component:JSX.Element;
}
function ShowMenu({setModalComponent, component}:IShowMenuProps ) {
  setModalComponent(
    <ViewModel
      enableShowBtn={false}
      type={EnType.View}
      form={component}
      modelEnabledClick={true}
      onClose={() => setModalComponent(null)}
    />
  );
}
export default ListLocalDrivingLicenseApplications;
