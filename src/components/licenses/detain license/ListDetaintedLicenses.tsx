import React, { useCallback, useContext } from "react";
import { IDetainedLicenses } from "../../../data/listDetainedLicenses";
import { EnType, IColumn, IDataResponse, ISearchOptions } from "../../../interfaces/constant";
import { AppContext } from "../../../context/AppContext";
import GenericList from "../../list/GenericList";

export default function ListDetaintedLicenses() {
  const { api } = useContext(AppContext);
    
    const fetchDataFn = useCallback(async ():Promise<IDataResponse> => {
        try {
          const result = await api.detaintedLicenses.fetchAll();
          console.log("API Response:", result);
          return { success: result.success, data: result.detainedLicenses || [] };
        } catch (error) {
          console.error("Error fetching users:", error);
          return { success: false, data: [] };
        }
      }, [api.users]);
      
      const columns: IColumn[] = [
        { header: "D.ID", accessor: "d.id" },
        { header: "L.ID", accessor: "l.id" }, // Assuming the correct field name is `l.id`
        { header: "D.Date", accessor: "d.date" }, // Assuming the correct field name is `d.date`
        { header: "Is Released", accessor: "isreleased", className:"whitespace-nowrap" },
        { header: "Fine Fees", accessor: "finefees",className:"whitespace-nowrap" }, // Assuming the correct field name is `finefees`
        { header: "Release Date", accessor: "releasedate" }, // Assuming the correct field name is `releasedate`
        { header: "N.No.", accessor: "nno" }, // Assuming the correct field name is `nno`
        { header: "Full Name", accessor: "fullname" },
        { header: "Release App ID", accessor: "releaseappid",className:"whitespace-nowrap" }, // Assuming the correct field name is `releaseappid`
        // { header: "Actions", accessor: "actions" },
      ];
      
  
      const searchOptions:ISearchOptions[] = [
        { header: "DetainID", accessor: "DetainID" },
        { header: "IsReleased", accessor: "IsReleased" },
        { header: "NationalNo", accessor: "NationalNo" },
        { header: "FullName", accessor: "FullName" },
        { header: "Release Application ID", accessor: "ReleaseApplicationID" },
      ];
  
      
    //--------Start Logic Of Row ---------------
    const handleDeleteRow=()=>{
      return false;
    }
    //------------------------------------------
       const renderRow = (row:IDetainedLicenses) => {
          if (!row) return null;
          return (
            <tr
              key={row.DetainID}
              className=" even:bg-slate-400 odd:bg-slate-100 text-1xl hover:bg-slate-500 transition"
            >
              <td className="py-2 px-6 bg-white">{row.DetainID}</td>
              <td className="py-2 px-6 bg-white">{row.LicenseID}</td>
              <td className="py-2 px-6 bg-white  whitespace-nowrap">{row.DetainDate}</td>           
              <td className="py-2 px-6 bg-white ">{row.IsReleased}</td>
              <td className="py-2 px-6 bg-white whitespace-nowrap">{row.FineFees}</td>            
              <td className="py-2 px-6 bg-white whitespace-nowrap">{row.ReleaseDate}</td>            
              <td className="py-2 px-6 bg-white">{row.NationalNo}</td>            
              <td className="py-2 px-6 bg-white whitespace-nowrap">{row.FullName}</td>            
              <td className="py-2 px-6 bg-white">{row.ReleaseApplicationID}</td>            
            
            </tr>
          );
        };
  
    return <>
    <GenericList<IDetainedLicenses>
            title="Users List"
            createModalType={EnType.Create}
            columns={columns}
            searchOptions={searchOptions}
            renderRow={renderRow}
            fetchDataFn={fetchDataFn}
          />
    </>;
}
