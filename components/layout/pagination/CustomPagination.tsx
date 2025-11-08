// import { getTotalPages, updateSearchParams } from "@/helpers/helpers";
// import { Pagination } from "@heroui/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React from "react";

// interface Props {
//   resPerPage: number;
//   filteredCount: number;
// }

// const CustomPagination = ({ resPerPage, filteredCount }: Props) => {
//   const router = useRouter();

//   const totalPages = getTotalPages(filteredCount, resPerPage);

//   const searchParams = useSearchParams();

//   let page = searchParams.get("page") || 1;
//   page = Number(page);

//   const handlePageChange = (page: number) => {
//     let queryParams = new URLSearchParams(window.location.search);
//     queryParams = updateSearchParams(queryParams, "page", page.toString());

//     const path = `${window.location.pathname}?${queryParams.toString()}`;
//     router.push(path);
//   };

//   return (
//     <div className="flex justify-center items-center mt-10">
//       <Pagination
//         isCompact
//         showControls
//         showShadow
//         initialPage={1}
//         total={totalPages}
//         page={page}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default CustomPagination;

"use client";

import { getTotalPages, updateSearchParams } from "@/helpers/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  resPerPage: number;
  filteredCount: number;
}

const CustomPagination = ({ resPerPage, filteredCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = getTotalPages(filteredCount, resPerPage);

  let page = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams = updateSearchParams(queryParams, "page", newPage.toString());

    const path = `${window.location.pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;

/* -------------------------------------------------------------------------- */
/*                             Pagination Component                           */
/* -------------------------------------------------------------------------- */

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {/* Prev Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium transition ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
