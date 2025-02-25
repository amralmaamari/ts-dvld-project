import { JSX, useCallback, useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import GenericList from "../../List/GenericList";
import ViewModel from "../../../models/ViewModel";
// import EditTestType from "./EditTestType";
import { EnType, IColumn, IContextMenu } from "../../../interfaces/constant";
import { ITestTypeRow } from "../../../data/testTypes";

const MENU_ID:string = "table_row_menu";


const dataContextMenu:IContextMenu[] = [
  {
    key: "editTestType",
    name: "Edit Test Type",
  },
];

export default function ListTestTypes():JSX.Element {
  const { show } = useContextMenu({ id: MENU_ID });
  const { api } = useContext(AppContext);
  const [modalComponent, setModalComponent] = useState<JSX.Element | null>(null);

  const fetchDataFn = useCallback(async () => {
    const result = await api.testTypes.fetchAll();

    return {
      success: result.success,
      data: result.testTypes || [],
    };
  }, [api.testTypes]);

  const handleItemClick = ({ event, props, data }:{event: React.MouseEvent<HTMLElement>;    props: { row: ITestTypeRow };    data:string}) => {
    switch (data) {
      case "editTestType":
        setModalComponent(
          <ViewModel
          enableShowBtn={false}
          type={EnType.View}
          modelEnabledClick={false}
          form={<h2>dsa</h2>}
          onClose={() => setModalComponent(null)}
          />
        );
        break;
        default:
          console.log("Unhandled context menu option");
    }
  };

  const renderMenuItems = (items:IContextMenu[]) => {
    return items.map((item:IContextMenu) => {
      return (
        <Item key={item.key} onClick={handleItemClick} data={item.key}>
          {item.name}
        </Item>
      );
    });
  };
  const renderRow = (row:ITestTypeRow) => {
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
        key={row.TestTypeID}
        onContextMenu={handleContextMenu}
        className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
      >
        <td className="py-2 px-6">{row.TestTypeID}</td>
        <td className="py-2 px-6">{row.TestTypeTitle}</td>
        <td className="py-2 px-6">{row.TestTypeDescription}</td>
        <td className="py-2 px-6">{row.TestTypeFees}</td>
      </tr>
    );
  };

  const TableContextMenu = () => {
    return <Menu id={MENU_ID}>{renderMenuItems(dataContextMenu)}</Menu>;
  };
  return (
    <>
      <GenericList<ITestTypeRow>
        title="Manage Test Type"
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

const columns:IColumn[] = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "Description", accessor: "description" },
  { header: "Fees", accessor: "fess" },
];
