// "use client";

// import React from "react";
// import { Card, CardBody, CardHeader } from "@heroui/react";

// export type FeatureCardProps = {
//   title: string;
//   descriptions: string[];
//   icon: React.ReactNode;
// };

// const FeatureCard = ({ title, descriptions = [], icon }: FeatureCardProps) => {
//   return (
//     <Card className="bg-blue-50 border-solid border-2 border-blue-300" shadow="none">
//       <CardHeader className="flex flex-col gap-2 px-4 pb-4 pt-6">
//         {icon}
//         <p className="text-medium text-content2-foreground">{title}</p>
//       </CardHeader>
//       <CardBody className="flex flex-col gap-2">
//         {descriptions.map((description, index) => (
//           <div
//             key={index}
//             className="flex min-h-[50px] rounded-medium bg-white px-3 py-2 text-content3-foreground"
//           >
//             <p className="text-small">{description}</p>
//           </div>
//         ))}
//       </CardBody>
//     </Card>
//   );
// };

// export default FeatureCard;

"use client";

import React from "react";

export type FeatureCardProps = {
  title: string;
  descriptions: string[];
  icon: React.ReactNode;
};

const FeatureCard = ({ title, descriptions = [], icon }: FeatureCardProps) => {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-300 shadow-sm 
                 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                 flex flex-col items-start gap-4 w-full max-w-sm"
    >
      {/* Icon */}
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">{icon}</div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      {/* Description List */}
      <ul className="space-y-2">
        {descriptions.map((desc, index) => (
          <li
            key={index}
            className="text-sm text-gray-600 leading-relaxed border-l-2 border-blue-200 pl-3"
          >
            {desc}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default FeatureCard;
