// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Divider,
//   Link,
//   Button,
// } from "@heroui/react";
// import { Icon } from "@iconify/react";

// const Pricing = () => {
//   const features = [
//     "Comprehensive questions",
//     "Feedback reports or results",
//     "You choose time and field",
//     "Industry-specific interviews",,
//     "Technical question practice",
//     "Behavioral question practice",
//     "Answer Evaluation",
//   ];

//   return (
//     <div id="pricing">
//       <div className="text-center my-10">
//         <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
//           What You Will Get ?
//         </span>
//       </div>

//       <Card className="max-w-[400px] p-2 border-solid border-4 border-blue-400">
//         <CardBody>

//           <ul className="mt-8 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
//             {features.map((feature, index) => (
//               <li key={index} className="flex items-center">
//                 <Icon icon="hugeicons-tick-02" fontSize={26} color="green" />{" "}
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </CardBody>
//         <Divider />
//         <CardFooter>
//           <Button
//             color="primary"
//             className="w-full my-3"
//             endContent={<Icon icon="akar-icons:arrow-right" />}
//             as={Link}
//             href="/subscribe"
//           >
//             Get Started
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default Pricing;
"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Pricing = () => {
  const features = [
    "Comprehensive questions",
    "Feedback reports or results",
    "You choose time and field",
    "Industry-specific interviews",
    "Technical question practice",
    "Behavioral question practice",
    "Answer Evaluation",
  ];

  return (
    <div id="pricing" className="flex flex-col items-center justify-center py-16 px-4">
      {/* Section Title */}
      <h2 className="text-center tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl mb-10">
        What You Will Get ?
      </h2>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 border-4 border-blue-400 rounded-2xl shadow-lg p-6 w-full max-w-md text-gray-800 dark:text-gray-200">
        <ul className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Icon icon="hugeicons:tick-02" className="text-green-500 text-xl" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 my-6"></div>

        {/* Button */}
        <Link
          href="/login"
          className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Get Started <Icon icon="akar-icons:arrow-right" className="inline ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
