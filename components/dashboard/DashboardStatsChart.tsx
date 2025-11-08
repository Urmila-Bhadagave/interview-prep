// import React from "react";
// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type StatsProps = {
//   date: string;
//   totalInterviews: number;
//   completedQuestion: number;
//   unasweredQuestion: number;
//   completionRate: number;
// };

// const DashboardStatsChart = ({ stats }: { stats: StatsProps[] }) => {
//   const sortedStats = stats.sort(
//     (a, b) => new Date(a.date)?.getTime() - new Date(b.date)?.getTime()
//   );
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={sortedStats}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="date"
//           label={{ value: "Date", position: "insideBottom", offset: -5 }}
//         />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar
//           dataKey="totalInterviews"
//           fill="#8884d8"
//           name={"Total Interviews"}
//         />
//         <Bar
//           dataKey="completedQuestion"
//           fill="#ffc658"
//           name={"Completed Questions"}
//         />
//         <Bar
//           dataKey="unasweredQuestion"
//           fill="#82ca9d"
//           name={"Unaswered Questions"}
//         />
//         <Bar
//           dataKey="completionRate"
//           fill="#ff7300"
//           name={"Completion Rate %"}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default DashboardStatsChart;

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatsProps = {
  date: string;
  totalInterviews: number;
  completedQuestion: number;
  unasweredQuestion: number;
  completionRate: number;
};

const DashboardStatsChart = ({ stats }: { stats: StatsProps[] }) => {
  const sortedStats = [...stats].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Performance Overview
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={sortedStats}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280" }}
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -5,
              fill: "#6b7280",
            }}
          />
          <YAxis tick={{ fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend />
          <Bar dataKey="totalInterviews" fill="#60a5fa" name="Total Interviews" />
          <Bar dataKey="completedQuestion" fill="#fbbf24" name="Completed Questions" />
          <Bar dataKey="unasweredQuestion" fill="#34d399" name="Unanswered Questions" />
          <Bar dataKey="completionRate" fill="#f97316" name="Completion Rate (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardStatsChart;
