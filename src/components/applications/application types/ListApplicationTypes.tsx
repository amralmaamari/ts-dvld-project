import { JSX, useCallback, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import GenericList from "../../list/GenericList";
// import ViewModel from "../../../models/ViewModel";
// import EditApplicationType from "./EditApplicationType";
import { EnType, IContextMenu } from "../../../interfaces/constant";
import { IApplicationType } from "../../../data/applicationTypes.ts";
import ViewModel from "../../../models/ViewModel";
import EditApplicationType from "./EditApplicationType";

const MENU_ID = "table_row_menu";

const dataContextMenu:IContextMenu[] = [
  {
    key: "editApplictionType",
    name: "Edit Appliction Type",
  },
];

export default function ListTestTypes():JSX.Element {
  const { show } = useContextMenu({ id: MENU_ID });
  const { api } = useContext(AppContext);
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);

  const fetchDataFn = useCallback(async () => {
    const result = await api.applicationTypes.fetchAll();

    return {
      success: result.success,
      data: result.applicationTypes || [],
    };
  }, [api.applicationTypes]);

  const handleItemClick = ({ event, props, data }:{event: React.MouseEvent<HTMLElement>;    props: { row: IApplicationType };    data:string}) => {
    switch (data) {
      case "editApplictionType":
        setModalComponent(
          <ViewModel
          enableShowBtn={false}
          type={EnType.View}
          modelEnabledClick={true}
          form={
              <EditApplicationType
              applicationTypeID ={props.row.ApplicationTypeID}
              />
            }
            onClose={() => setModalComponent(null)}
          />
        );
        break;
      default:
        console.log("Unhandled context menu option");
      }
  };

  const renderMenuItems = (items:IContextMenu[]) => {
    return items.map((item) => {
      return (
        <Item key={item.key} onClick={handleItemClick} data={item.key}>
          {item.name}
        </Item>
      );
    });
  };
  const renderRow = (row:IApplicationType) => {
    // On right-click, prevent the default menu and show our custom menu
    const handleContextMenu = (e: React.MouseEvent<HTMLTableRowElement>) => {
      // Make sure event is defined
      e.preventDefault();
      show({
        event: e,
        props: { row },
      });
    };

    return (
      <tr
        key={row.ApplicationTypeID}
        onContextMenu={handleContextMenu}
        className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
      >
        <td className="py-2 px-6">{row.ApplicationTypeID}</td>
        <td className="py-2 px-6">{row.ApplicationTypeTitle}</td>
        <td className="py-2 px-6">{row.ApplicationFees}</td>
      </tr>
    );
  };

  const TableContextMenu = () => {
    return <Menu id={MENU_ID}>{renderMenuItems(dataContextMenu)}</Menu>;
  };
  return (
    <>
      <GenericList<IApplicationType>
        title="Manage Appliction Types"
        showAddButton={false}
        createModalType={EnType.View}        
        tableName="testType"
        columns={columns}
        renderRow={renderRow}
        fetchDataFn={fetchDataFn}
      />
      <TableContextMenu />
      {modalComponent}
    </>
  );
}

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "Fees", accessor: "fess" },
];
