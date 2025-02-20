import { JSX, useCallback, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import FormModal from "../Models/FormModal";
import ViewModel from "../Models/ViewModel";
import CtrlPersonCard from "./Controls/CtrlPersonCard";
import GenericList from "../List/GenericList";
import { IPerson } from "../../data/people";
import { IColumn,ISearchOptions } from "../../interfaces/constant";


interface  IFetchDataResult {
  success: boolean;
  data: IPerson[];
}
function PeopleList():JSX.Element {
  const { api } = useContext(AppContext);

  const fetchDataFn = useCallback(async ():Promise<IFetchDataResult> => {
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
    { header: "FirstName", accessor: "firstname" },
    { header: "SecondName", accessor: "secondname" },
    { header: "ThirdName", accessor: "thirdname" },
    { header: "LastName", accessor: "lastname" },
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
    { header: "PersonID", accessor: "PersonID" },
    { header: "NationalNo", accessor: "NationalNo" },
    { header: "FirstName", accessor: "FirstName" },
    { header: "SecondName", accessor: "SecondName" },
    { header: "ThirdName", accessor: "ThirdName" },
    { header: "LastName", accessor: "LastName" },
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

  const renderRow = (row:IPerson) => {
    if (!row) return null;
    return (
      <tr
        key={row.PersonID}
        className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
      >
        <td className="py-2 px-6">{row.PersonID}</td>
        <td className="py-2 px-6">{row.NationalNo}</td>
        <td className="py-2 px-6">{row.FirstName}</td>
        <td className="py-2 px-6">{row.SecondName}</td>
        <td className="py-2 px-6">{row.ThirdName}</td>
        <td className="py-2 px-6">{row.LastName}</td>
        <td className="py-2 px-6">{row.Gendor}</td>
        <td className="py-2 px-6">{row.DateOfBirth}</td>
        <td className="py-2 px-6">{row.Nationality}</td>
        <td className="py-2 px-6">{row.Phone}</td>
        <td className="hidden md:table-cell py-2 px-6">{row.Email}</td>
        <td className="flex w-[200px] align-middle gap-2 h-full">
          <FormModal Tablename="People" Type="Update" Id={row.PersonID} />
          <FormModal Tablename="People" Type="Delete" Id={row.PersonID} />
          <ViewModel
            viewModelEnabled={true}
            type="View"
            Form={<CtrlPersonCard personId={row.PersonID} />}
          />
          
        </td>
      </tr>
    );
  };

  return (
    <>
      <GenericList
        title="People List"
        tableName="People"
        createModalType="Create"
        columns={columns}
        searchOptions={searchOptions}
        renderRow={renderRow}
        fetchDataFn={fetchDataFn}
      />
    </>
  );
}

export default PeopleList;
