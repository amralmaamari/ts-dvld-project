import { JSX, useCallback, useContext } from "react";
import { EnType, IColumn, IDataResponse, ISearchOptions } from "../../interfaces/constant";
import { IUsers } from "../../data/listUsers";
import GenericList from "../list/GenericList";
import { AppContext } from "../../context/AppContext";
import DeleteModal from "../../models/DeleteModal";
import ViewModel from "../../models/ViewModel";
import ShowUserInfo from "./ShowUserInfo";
import AddUpdateUsers from "./AddUpdateUsers";
import ChangePassword from "./ChangePassword";

export default function ListUsers():JSX.Element {
    const { api } = useContext(AppContext);
  
  const fetchDataFn = useCallback(async ():Promise<IDataResponse> => {
      try {
        const result = await api.users.fetchAll();
        console.log("API Response:", result);
        return { success: result.success, data: result.users || [] };
      } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, data: [] };
      }
    }, [api.users]);
    
     const columns:IColumn[] = [
        { header: "UserID", accessor: "userid" },
        { header: "PersonID", accessor: "personid" },
        { header: "FullName", accessor: "fullname" },
        { header: "UserName", accessor: "username" },
        { header: "IsActive", accessor: "isactive" },
        { header: "Actions", accessor: "actions" },
      ];

    const searchOptions:ISearchOptions[] = [
      { header: "UserID", accessor: "UserID" },
      { header: "UserName", accessor: "UserName" },
      { header: "PersonID", accessor: "PersonID" },
      { header: "FullName", accessor: "FullName" },
      { header: "IsActive", accessor: "IsActive"},
    ];

    
  //--------Start Logic Of Row ---------------
  const handleDeleteRow=()=>{
    return false;
  }
  //------------------------------------------
     const renderRow = (row:IUsers) => {
        if (!row) return null;
        return (
          <tr
            key={row.UserID}
            className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
          >
            <td className="py-2 px-6 bg-white">{row.UserID}</td>
            <td className="py-2 px-6 bg-white">{row.PersonID}</td>
            <td className="py-2 px-6 bg-white  whitespace-nowrap">{row.FullName}</td>           
            <td className="py-2 px-6 bg-white">{row.UserName}</td>
            <td className="py-2 px-6 bg-white">{row.IsActive}</td>            
            <td className="flex w-[200px] align-middle gap-2 h-full bg-white">

            <ViewModel enableShowBtn={true} type={EnType.Update} modelEnabledClick={true}  form={<AddUpdateUsers userId={row.UserID}  />} onClose={(()=>console.log("Delete"))} />
            <ViewModel enableShowBtn={true} type={EnType.View} modelEnabledClick={true}  form={<ShowUserInfo userID={row.UserID} />} onClose={(()=>console.log("Delete"))} />
            <DeleteModal id={row.UserID} onConfirmDelete ={handleDeleteRow}/>
            {/* the below should be see icon of change password */}
            <ViewModel enableShowBtn={true} type={EnType.View} modelEnabledClick={true}  form={<ChangePassword userID={row.UserID} />} onClose={(()=>console.log("Delete"))} />
            </td>
          </tr>
        );
      };


  return (
    <>
      <GenericList<IUsers>
        title="Users List"
        addComponent={<AddUpdateUsers />}
        createModalType={EnType.Create}
        columns={columns}
        searchOptions={searchOptions}
        renderRow={renderRow}
        fetchDataFn={fetchDataFn}
      />
    </>
  )
}
