import { JSX, useContext, useEffect, useMemo, useState } from "react";
import Table from "../Table";
import SearchComponent from "../SearchComponent";
import FormModal from "../../models/FormModal";
import { AppContext } from "../../context/AppContext";
import { EnType, IColumn, IDataResponse, ISearchOptions } from "../../interfaces/constant";
import Pagination from "../Pagination";
interface IGenericListProps<T>{
  title:string,
  tableName:string,
  showAddButton?:boolean,
  createModalType:EnType,
  columns:IColumn[],
  searchOptions?:ISearchOptions[],
  renderRow:(row: T)=>JSX.Element|null,
  fetchDataFn:()=>Promise<IDataResponse>,
}
function GenericList<T>({
  title,
  tableName,
  showAddButton=true,
  createModalType,
  columns,
  searchOptions,
  renderRow,
  fetchDataFn,
}:IGenericListProps<T>):JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);
  const { loading, error } = useContext(AppContext);
  const [totalRecords, setTotalRecords] = useState<number>(10);
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  // Get current page data
  const startIndex = (currentPage - 1) * recordsPerPage;

  const filteredResults = useMemo(() => {
    if (!searchText.trim() || !searchColumn) {
      return data; // Return all data if no search applied
    }

    return data.filter((item) => {
      const value = item[searchColumn]; // Access property directly

      if (!value) return false;

      return value.toString().toLowerCase().includes(searchText.toLowerCase());
    });
  }, [data, searchText, searchColumn]); // Dependencies

  const paginatedData = filteredResults.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await fetchDataFn();
        if (result.success) {
          // Ensure that data is an array (or default to an empty array)
          setData(Array.isArray(result.data) ? result.data : []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [fetchDataFn]);

  useEffect(() => {
    setTotalRecords(filteredResults.length);
  }, [filteredResults]);

  return (
    <div className="p-3">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>

      {loading ? (
        <div className="text-5xl text-danger font-black flex align-middle justify-center">
          Loading...
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className="flex justify-between">
            {searchOptions && (
              <SearchComponent
                searchOptions={searchOptions}
                onSearchChange={setSearchText}
                onColumnChange={setSearchColumn}
                setCurrentPage={setCurrentPage}
              />
            )}
          {showAddButton&&
            <FormModal tablename={tableName} type={createModalType} />
          }
          </div>
          <Table columns={columns} renderRow={renderRow} data={paginatedData} />
          <Pagination
            currentPage={currentPage}
            recordsPerPage={recordsPerPage}
            totalRecords={totalRecords}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default GenericList;
