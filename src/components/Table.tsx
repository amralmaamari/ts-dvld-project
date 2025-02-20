import React, { JSX, ReactNode } from "react";
import "./Table.css";
import { IColumn } from "../interfaces/constant";


interface ITableProps<T>{
  columns:IColumn[];
  data:T[];
  renderRow:(row:T)=>ReactNode;

}
export default function Table<T>({ columns, renderRow, data }:ITableProps<T>):JSX.Element {
  return (
    <div className="h-[400px] border-collapse text-left table-container  overflow-auto rounded-lg">
      <table className="w-full bg-slate-200 ">
        <thead className="sticky top-0 bg-primary text-white py-3">
          <tr className="py-3 px-6">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`py-3 px-6 text-left text-lg font-semibold ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {data.map((row, index) => (
              <React.Fragment key={index}>{renderRow(row)}</React.Fragment>
            ))}      
        </tbody>
      </table>
    </div>
  );
}
