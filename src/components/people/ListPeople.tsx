import { JSX, useCallback, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {  IPerson } from "../../data/listPeople";
import { EnType, IColumn,IDataResponse,ISearchOptions } from "../../interfaces/constant";
import GenericList from "../list/GenericList";
import DeleteModal from "../../models/DeleteModal";
import AddUpdateModal from "../../models/AddUpdateModal";
import AddUpdatePeople from "./AddUpdatePeople";
import { useNavigate } from "react-router-dom";



function ListPeople():JSX.Element {
  const { api } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchDataFn = useCallback(async ():Promise<IDataResponse> => {
    try {
      const result = await api.people.fetchAll();
      console.log("API Response:", result);
      return { success: result.success, data: result.people || [] };
    } catch (error) {
      console.error("Error fetching people:", error);
      return { success: false, data: [] };
    }
  }, [api.people]);

  const columns:IColumn[] = [
    { header: "PersonID", accessor: "personid" },
    { header: "NationalNo", accessor: "nationalno" },
    { header: "FullName", accessor: "fullname" },
    { header: "Gendor", accessor: "gendor" },
    { header: "DateOfBirth", accessor: "dateofbirth" },
    { header: "Nationality", accessor: "nationality" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email", className: "hidden md:table-cell" },
    { header: "Action", accessor: "action" },
  ];

  const genderOptions:IColumn[] = [
    { header: "Male", accessor: "Male" },
    { header: "Female", accessor: "Female" },
  ];

  const searchOptions:ISearchOptions[] = [
    { header: "Person ID", accessor: "PersonID" },
    { header: "Nationa lNo", accessor: "NationalNo" },
    { header: "Full Name", accessor: "FullName" },
    { header: "Nationality", accessor: "Nationality" },
    {
      header: "Gendor",
      accessor: "Gendor",
      dataType: "genderOptions",
      options: genderOptions,
    },
    { header: "Phone", accessor: "Phone" },
    { header: "Email", accessor: "Email", className: "hidden md:block" },
  ];

  //--------Start Logic Of Row ---------------
  const handleDeleteRow=()=>{
    return false;
  }
  //------------------------------------------

  const renderRow = (row:IPerson) => {
    if (!row) return null;
    return (
      <tr
        key={row.PersonID}
        className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
      >
        <td className="py-2 px-6 bg-white">{row.PersonID}</td>
        <td className="py-2 px-6 bg-white">{row.NationalNo}</td>
        <td className="py-2 px-6 bg-white whitespace-nowrap">{[
            row.FirstName,
            row.SecondName,
            row.ThirdName,
            row.LastName,
      ].filter(Boolean).join(" ")}</td>
        <td className="py-2 px-6 bg-white">{row.Gendor}</td>
        <td className="py-2 px-6 bg-white">{row.DateOfBirth}</td>
        <td className="py-2 px-6 bg-white">{row.Nationality}</td>
        <td className="py-2 px-6 bg-white">{row.Phone}</td>
        <td className="hidden md:table-cell py-2 px-6 bg-white">{row.Email}</td>
        <td className="flex w-[200px] align-middle gap-2 h-full bg-white">
          <AddUpdateModal type={EnType.Update}  children={<AddUpdatePeople personId={row.PersonID} />} />
         
          <button className="bg-green-400 rounded-md text-white  px-3 w-[20] h-[20]" onClick={()=>    navigate(`/people/show/${row.PersonID}`)}>View</button>
          
          <DeleteModal id={row.PersonID} onConfirmDelete ={handleDeleteRow}/>
          
        </td>
      </tr>
    );
  };



  return (
    <>
      <GenericList<IPerson>
        title="People List"
        addComponent={<AddUpdatePeople />}
        createModalType={EnType.Create}
        columns={columns}
        searchOptions={searchOptions}
        renderRow={renderRow}
        fetchDataFn={fetchDataFn}
      />
    </>
  );
}

export default ListPeople;
