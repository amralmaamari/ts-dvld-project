import { JSX } from "react";
import { arrowIcons } from "../assets/assets";

interface IPaginationProps{
  currentPage:number,
  recordsPerPage:number,
  totalRecords:number,
  onPageChange:(id:number)=> void

}
function Pagination({
  currentPage,
  recordsPerPage,
  totalRecords,
  onPageChange,
}:IPaginationProps):JSX.Element {
  //hypothetical totalRecords as in url
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const maxPagesToShow = 5; // Show 5 page numbers at most

  const getPageNumbers = () => {
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are few
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        // Case 1: Show first 5 pages
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        // Case 2: Show last 5 pages
        pages = [
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        // Case 3: Show current page in the middle
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return pages;
  };

  return (
    <div className="p-2 text-[20px] font-black text-center flex  justify-between items-center">
      <button
        disabled={currentPage < 2}
        className="disabled:cursor-not-allowed bg-white p-3 border border-sky-200 rounded-full"
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img src={arrowIcons.Previous} width={22} height={22} alt="" />
      </button>
      <ul className="flex gap-2">
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            onClick={() => page !== "..." && onPageChange(Number(page))}
            className={`py-[9px] px-[25px] rounded-full cursor-pointer  ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            } ${page === "..." ? "cursor-default" : ""}`}
          >
            {page}
          </li>
        ))}
      </ul>
      <button
        disabled={currentPage >= totalPages}
        className="disabled:cursor-not-allowed bg-white p-3 border border-sky-200 rounded-full"
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img src={arrowIcons.Next} width={22} height={22} alt="" />
      </button>
    </div>
  );
}

export default Pagination;
