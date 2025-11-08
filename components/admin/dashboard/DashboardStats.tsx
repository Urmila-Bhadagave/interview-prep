// "use client";

// import React from "react";
// import { Button, Card, cn } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// type Props = {
//   data: {
//     totalUsers: number;
//     activeSubscriptions: number;
//     subscriptionWorth: number;
//     totalInterviews: number;
//     interviewCompletionRate: number;
//     averageInterviewsPerUser: number;
//   };
// };
// export default function DashboardStats({ data }: Props) {
//   const stats = [
//     {
//       title: "Total Users",
//       value: data?.totalUsers,
//       bgColor: "bg-primary-50",
//       iconColor: "text-primary",
//       iconName: "solar:users-group-rounded-linear",
//       link: "/admin/users",
//     },
//     // {
//     //   title: "Active Subs",
//     //   value: data?.activeSubscriptions,
//     //   bgColor: "bg-warning-50",
//     //   iconColor: "text-warning",
//     //   iconName: "solar:users-group-two-rounded-bold",
//     //   link: "/admin/users?subscription.status=active",
//     // },
//     // {
//     //   title: "Active Subs ($)",
//     //   value: `$${data?.subscriptionWorth}`,
//     //   bgColor: "bg-success-50",
//     //   iconColor: "text-success",
//     //   iconName: "solar:dollar-minimalistic-broken",
//     //   link: "/admin/users",
//     // },
//     {
//       title: "Total Interviews",
//       value: data?.totalInterviews,
//       bgColor: "bg-danger-50",
//       iconColor: "text-danger",
//       iconName: "solar:user-speak-bold",
//       link: "/admin/interviews",
//     },
//     {
//       title: "Completion Rate",
//       value: `${data?.interviewCompletionRate}%`,
//       bgColor: "bg-secondary-50",
//       iconColor: "text-secondary",
//       iconName: "tabler:percentage",
//       link: "/admin/interviews",
//     },
//     {
//       title: "Interviews / user",
//       value: data?.averageInterviewsPerUser,
//       bgColor: "bg-default-50",
//       iconColor: "text-default",
//       iconName: "tabler:user-hexagon",
//       link: "/admin/interviews",
//     },
//   ];

//   return (
//     <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
//       {stats.map(
//         ({ title, value, bgColor, iconColor, iconName, link }, index) => (
//           <Card
//             key={index}
//             className="border border-transparent dark:border-default-100"
//           >
//             <div className="flex p-4">
//               <div
//                 className={cn(
//                   "mt-1 flex h-8 w-8 items-center justify-center rounded-md",
//                   bgColor
//                 )}
//               >
//                 <Icon className={iconColor} icon={iconName} width={20} />
//               </div>

//               <div className="flex flex-col gap-y-2">
//                 <dt className="mx-4 text-small font-medium text-default-500">
//                   {title}
//                 </dt>
//                 <dd className="px-4 text-2xl font-semibold text-default-700">
//                   {value}
//                 </dd>
//               </div>
//             </div>

//             <div className="bg-default-100">
//               <Button
//                 fullWidth
//                 className="flex justify-start text-xs text-default-500 data-[pressed]:scale-100"
//                 radius="none"
//                 variant="light"
//                 as={Link}
//                 href={link}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card>
//         )
//       )}
//     </div>
//   );
// }

"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type Props = {
  data: {
    totalUsers: number;
    activeSubscriptions: number;
    subscriptionWorth: number;
    totalInterviews: number;
    interviewCompletionRate: number;
    averageInterviewsPerUser: number;
  };
};

export default function DashboardStats({ data }: Props) {
  const stats = [
    {
      title: "Total Users",
      value: data?.totalUsers,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      iconName: "solar:users-group-rounded-linear",
      link: "/admin/users",
    },
    {
      title: "Total Interviews",
      value: data?.totalInterviews,
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      iconName: "solar:user-speak-bold",
      link: "/admin/interviews",
    },
    {
      title: "Completion Rate",
      value: `${data?.interviewCompletionRate}%`,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      iconName: "tabler:percentage",
      link: "/admin/interviews",
    },
    {
      title: "Interviews / User",
      value: data?.averageInterviewsPerUser,
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
      iconName: "tabler:user-hexagon",
      link: "/admin/interviews",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(({ title, value, bgColor, iconColor, iconName, link }) => (
        <div
          key={title}
          className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
        >
          <div className="flex items-center p-5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-md ${bgColor}`}
            >
              <Icon icon={iconName} className={`${iconColor}`} width={22} />
            </div>
            <div className="ml-4">
              <dt className="text-sm text-gray-500">{title}</dt>
              <dd className="text-2xl font-semibold text-gray-800">{value}</dd>
            </div>
          </div>
          <Link
            href={link}
            className="block w-full rounded-b-2xl bg-gray-50 py-2 text-center text-sm text-gray-600 hover:bg-gray-100 transition"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
