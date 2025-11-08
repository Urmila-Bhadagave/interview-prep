// "use client";

// import React from "react";
// import { DateRangePicker, RangeValue } from "@heroui/react";
// import {
//   parseDate,
//   getLocalTimeZone,
//   CalendarDate,
// } from "@internationalized/date";
// import { useDateFormatter } from "@react-aria/i18n";
// import {
//   getFirstDayOfMonth,
//   getToday,
//   updateSearchParams,
// } from "@/helpers/helpers";
// import { useRouter } from "next/navigation";

// export default function StatsDatePicker() {
//   const [value, setValue] = React.useState({
//     start: parseDate(getFirstDayOfMonth()),
//     end: parseDate(getToday()),
//   });

//   let formatter = useDateFormatter();
//   const router = useRouter();

//   const dateChangeHandler = (dates: RangeValue<CalendarDate> | null) => {
//     if (dates) {
//       setValue({
//         start: dates.start,
//         end: dates.end,
//       });

//       const start = formatter.format(dates?.start?.toDate(getLocalTimeZone()));
//       const end = formatter.format(dates?.end?.toDate(getLocalTimeZone()));

//       if (start && end) {
//         let queryParams = new URLSearchParams(window.location.search);
//         queryParams = updateSearchParams(queryParams, "start", start);
//         queryParams = updateSearchParams(queryParams, "end", end);

//         const path = `${window.location.pathname}?${queryParams.toString()}`;
//         router.push(path);
//       }
//     }
//   };

//   return (
//     <DateRangePicker
//       className="max-w-xs"
//       size="sm"
//       label="Pick Dates"
//       value={value}
//       onChange={dateChangeHandler}
//     />
//   );
// }
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getFirstDayOfMonth,
  getToday,
  updateSearchParams,
} from "@/helpers/helpers";

export default function StatsDatePicker() {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getToday());
  const router = useRouter();

  const handleChange = (type: "start" | "end", value: string) => {
    if (type === "start") setStartDate(value);
    else setEndDate(value);

    if (startDate && endDate) {
      let queryParams = new URLSearchParams(window.location.search);
      queryParams = updateSearchParams(queryParams, "start", startDate);
      queryParams = updateSearchParams(queryParams, "end", endDate);
      const path = `${window.location.pathname}?${queryParams.toString()}`;
      router.push(path);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 max-w-xs shadow-sm">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleChange("start", e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 dark:text-gray-300 mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleChange("end", e.target.value)}
          className="rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );
}
