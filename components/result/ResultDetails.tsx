// "use client";

// import React, { useRef, useState } from "react";

// import ResultStats from "./ResultStats";
// import { Chip, Pagination } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { IInterview } from "@/backend/models/interview.model";
// import QuestionCard from "./QuestionCard";
// import { getTotalPages, paginate } from "@/helpers/helpers";

// export default function ResultDetails({
//   interview,
// }: {
//   interview: IInterview;
// }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const questionsPerPage = 2;

//   const totalPages = getTotalPages(
//     interview?.questions?.length,
//     questionsPerPage
//   );

//   const currentQuestions = paginate(
//     interview?.questions,
//     currentPage,
//     questionsPerPage
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <div className="px-5">
//         <ResultStats interview={interview} />

//         <div className="w-full flex flex-col gap-3">
//           <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-4">
//             <div className="flex flex-wrap gap-4">
//               <Chip
//                 color="primary"
//                 startContent={
//                   <Icon icon="tabler:circle-check-filled" width={20} />
//                 }
//                 variant="faded"
//               >
//                 {interview?.industry}
//               </Chip>

//               <Chip
//                 color="warning"
//                 startContent={
//                   <Icon icon="tabler:circle-check-filled" width={20} />
//                 }
//                 variant="faded"
//               >
//                 {interview?.type}
//               </Chip>

//               <Chip
//                 color="secondary"
//                 startContent={
//                   <Icon icon="tabler:circle-check-filled" width={20} />
//                 }
//                 variant="faded"
//               >
//                 {interview?.topic}
//               </Chip>
//             </div>
//           </div>

//           {currentQuestions.map((question, index) => (
//             <QuestionCard
//               key={index}
//               index={(currentPage - 1) * questionsPerPage + index + 1}
//               question={question}
//             />
//           ))}

//           <div className="flex justify-center items-center mt-10">
//             <Pagination
//               isCompact
//               showControls
//               showShadow
//               initialPage={1}
//               total={totalPages}
//               page={currentPage}
//               onChange={handlePageChange}
//             />
//           </div>

//           <div className="flex justify-center items-center mt-10"></div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import ResultStats from "./ResultStats";
import { IInterview } from "@/backend/models/interview.model";
import QuestionCard from "./QuestionCard";
import { getTotalPages, paginate } from "@/helpers/helpers";

export default function ResultDetails({
  interview,
}: {
  interview: IInterview;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;

  const totalPages = getTotalPages(
    interview?.questions?.length,
    questionsPerPage
  );

  const currentQuestions = paginate(
    interview?.questions,
    currentPage,
    questionsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-5">
      <ResultStats interview={interview} />

      {/* Info Chips Section */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-4">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full shadow-sm">
              {interview?.industry}
            </span>
            <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-semibold rounded-full shadow-sm">
              {interview?.type}
            </span>
            <span className="px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full shadow-sm">
              {interview?.topic}
            </span>
          </div>
        </div>

        {/* Question Cards */}
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={index}
            index={(currentPage - 1) * questionsPerPage + index + 1}
            question={question}
          />
        ))}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            className={`px-4 py-2 rounded-md border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm font-semibold ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : prev
              )
            }
            className={`px-4 py-2 rounded-md border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
