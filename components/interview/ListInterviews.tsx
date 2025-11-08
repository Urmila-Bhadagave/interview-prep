// "use client";

// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Chip,
//   Tooltip,
//   Button,
//   Select,
//   SelectItem,
// } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { IInterview } from "@/backend/models/interview.model";
// import { Key } from "@react-types/shared";
// import { usePathname, useRouter } from "next/navigation";
// import { deleteInterview } from "@/actions/interview.action";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import { calculateAverageScore } from "@/helpers/interview";
// import CustomPagination from "../layout/pagination/CustomPagination";
// import { isAdminPath } from "@/helpers/auth";

// export const columns = [
//   { name: "INTERVIEW", uid: "interview" },
//   { name: "RESULT", uid: "result" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type ListInterviewProps = {
//   data: {
//     interviews: IInterview[];
//     resPerPage: number;
//     filteredCount: number;
//   };
// };

// export default function ListInterviews({ data }: ListInterviewProps) {
//   const { interviews, resPerPage, filteredCount } = data;

//   const router = useRouter();
//   const pathname = usePathname();

//   const deleteInterviewHandler = async (interviewId: string) => {
//     const res = await deleteInterview(interviewId);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.deleted) {
//       toast.success("Interview deleted successfully");

//       if (isAdminPath(pathname)) {
//         router.push("/admin/interviews");
//       } else {
//         router.push("/app/interviews");
//       }
//     }
//   };

//   const renderCell = React.useCallback(
//     (interview: IInterview, columnKey: Key) => {
//       const cellValue = interview[columnKey as keyof IInterview];

//       switch (columnKey) {
//         case "interview":
//           return (
//             <div className="flex flex-col">
//               <p className="text-bold text-sm capitalize">{interview?.topic}</p>
//               <p className="text-bold text-sm capitalize text-default-400">
//                 {interview?.type}
//               </p>
//             </div>
//           );
//         case "result":
//           return (
//             <div className="flex flex-col">
//               <p className="text-bold text-sm capitalize">
//                 {calculateAverageScore(interview?.questions)} / 10
//               </p>
//               <p className="text-bold text-sm capitalize text-default-400">
//                 {interview?.numOfQuestions} questions
//               </p>
//             </div>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={interview?.status === "completed" ? "success" : "danger"}
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <>
//               {interview?.answered === 0 &&
//               interview?.status !== "completed" &&
//               !isAdminPath(pathname) ? (
//                 <Button
//                   className="bg-foreground font-medium text-background"
//                   color="secondary"
//                   endContent={
//                     <Icon icon="solar:arrow-right-linear" fontSize={20} />
//                   }
//                   variant="flat"
//                   as={Link}
//                   href={`/app/interviews/conduct/${interview._id}`}
//                 >
//                   Start
//                 </Button>
//               ) : (
//                 <div className="relative flex items-center justify-center gap-2">
//                   {interview?.status !== "completed" &&
//                     !isAdminPath(pathname) && (
//                       <Tooltip color="danger" content="Continue Interview">
//                         <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                           <Icon
//                             icon="solar:round-double-alt-arrow-right-bold"
//                             fontSize={22}
//                             onClick={() =>
//                               router.push(
//                                 `/app/interviews/conduct/${interview._id}`
//                               )
//                             }
//                           />
//                         </span>
//                       </Tooltip>
//                     )}

//                   {interview?.status === "completed" && (
//                     <Tooltip content="View Result">
//                       <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                         <Icon
//                           icon="solar:eye-broken"
//                           fontSize={22}
//                           onClick={() =>
//                             router.push(`/app/results/${interview._id}`)
//                           }
//                         />
//                       </span>
//                     </Tooltip>
//                   )}

//                   <Tooltip color="danger" content="Delete Interview">
//                     <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                       <Icon
//                         icon="solar:trash-bin-trash-outline"
//                         fontSize={21}
//                         onClick={() => deleteInterviewHandler(interview._id)}
//                       />
//                     </span>
//                   </Tooltip>
//                 </div>
//               )}
//             </>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     []
//   );

//   let queryParams;

//   const handleStatusChange = (status: string) => {
//     queryParams = new URLSearchParams(window.location.search);

//     if (queryParams.has("status") && status === "all") {
//       queryParams.delete("status");
//     } else if (queryParams.has("status")) {
//       queryParams.set("status", status);
//     } else {
//       queryParams.append("status", status);
//     }

//     const path = `${window.location.pathname}?${queryParams.toString()}`;
//     router.push(path);
//   };

//   return (
//     <div className="my-4">
//       <div className="flex justify-end items-center mb-4 space-x-2">
//   <label
//     htmlFor="status"
//     className="text-sm font-medium text-gray-700"
//   >
//     Select Status:
//   </label>

//   <select
//     id="status"
//     className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 max-w-xs"
//     onChange={(event) => handleStatusChange(event.target.value)}
//   >
//     <option value="all">All</option>
//     <option value="pending">Pending</option>
//     <option value="completed">Completed</option>
//   </select>
// </div>

//       <Table aria-label="Interivews table">
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === "actions" ? "center" : "start"}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={interviews}>
//           {(item) => (
//             <TableRow key={item._id}>
//               {(columnKey) => (
//                 <TableCell>{renderCell(item, columnKey)}</TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>

//       <div className="flex justify-center items-center mt-10">
//         <CustomPagination
//           resPerPage={resPerPage}
//           filteredCount={filteredCount}
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { IInterview } from "@/backend/models/interview.model";
import { useRouter, usePathname } from "next/navigation";
import { deleteInterview } from "@/actions/interview.action";
import toast from "react-hot-toast";
import Link from "next/link";
import { calculateAverageScore } from "@/helpers/interview";
import CustomPagination from "../layout/pagination/CustomPagination";
import { isAdminPath } from "@/helpers/auth";

type ListInterviewProps = {
  data: {
    interviews: IInterview[];
    resPerPage: number;
    filteredCount: number;
  };
};

export default function ListInterviews({ data }: ListInterviewProps) {
  const { interviews, resPerPage, filteredCount } = data;
  const router = useRouter();
  const pathname = usePathname();

  const deleteInterviewHandler = async (interviewId: string) => {
    const res = await deleteInterview(interviewId);
    if (res?.deleted) {
      toast.success("Interview deleted successfully");
      router.refresh();
    } else {
      toast.error(res?.error?.message);
    }
  };

  const handleStatusChange = (status: string) => {
    const queryParams = new URLSearchParams(window.location.search);
    if (status === "all") queryParams.delete("status");
    else queryParams.set("status", status);
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="my-4 w-full">
      {/* Filter Dropdown */}
      <div className="flex justify-end items-center mb-4 space-x-2">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Select Status:
        </label>
        <select
          id="status"
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 max-w-xs"
          onChange={(event) => handleStatusChange(event.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Interview
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Result
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {interviews.map((interview) => (
              <tr
                key={interview._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Interview */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 capitalize">
                      {interview.topic}
                    </span>
                    <span className="text-gray-500 text-sm capitalize">
                      {interview.type}
                    </span>
                  </div>
                </td>

                {/* Result */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {calculateAverageScore(interview.questions)} / 10
                    </span>
                    <span className="text-gray-500 text-sm">
                      {interview.numOfQuestions} questions
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {interview.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex justify-center gap-4">
                  {interview.answered === 0 &&
                  interview.status !== "completed" &&
                  !isAdminPath(pathname) ? (
                    <Link
                      href={`/app/interviews/conduct/${interview._id}`}
                      className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-700 transition"
                    >
                      Start
                      <Icon icon="solar:arrow-right-linear" width={16} />
                    </Link>
                  ) : (
                    <>
                      {interview.status !== "completed" &&
                        !isAdminPath(pathname) && (
                          <button
                            onClick={() =>
                              router.push(
                                `/app/interviews/conduct/${interview._id}`
                              )
                            }
                            title="Continue Interview"
                            className="text-yellow-600 hover:text-yellow-800 transition"
                          >
                            <Icon
                              icon="solar:round-double-alt-arrow-right-bold"
                              width={20}
                            />
                          </button>
                        )}

                      {interview.status === "completed" && (
                        <button
                          onClick={() =>
                            router.push(`/app/results/${interview._id}`)
                          }
                          title="View Result"
                          className="text-gray-500 hover:text-gray-700 transition"
                        >
                          <Icon icon="solar:eye-broken" width={20} />
                        </button>
                      )}

                      <button
                        onClick={() => deleteInterviewHandler(interview._id)}
                        title="Delete Interview"
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Icon
                          icon="solar:trash-bin-trash-outline"
                          width={20}
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        <CustomPagination
          resPerPage={resPerPage}
          filteredCount={filteredCount}
        />
      </div>
    </div>
  );
}
