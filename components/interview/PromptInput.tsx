// "use client";

// import type { TextAreaProps } from "@heroui/react";

// import React from "react";
// import { Textarea } from "@heroui/react";
// import { cn } from "@heroui/react";

// const PromptInput: React.FC<TextAreaProps> = ({
//   classNames = {},
//   ...props
// }) => {
//   return (
//     <Textarea
//       aria-label="Prompt"
//       className="min-h-[40px]"
//       classNames={{
//         ...classNames,
//         label: cn("hidden", classNames?.label),
//         input: cn("py-0", classNames?.input),
//       }}
//       minRows={1}
//       placeholder="Enter your answer here"
//       radius="lg"
//       variant="bordered"
//       {...props}
//     />
//   );
// };

// export default PromptInput;

"use client";

import React from "react";

interface PromptInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <textarea
      aria-label="Prompt"
      className={`min-h-[40px] w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition ${className}`}
      placeholder="Enter your answer here"
      {...props}
    />
  );
};

export default PromptInput;
