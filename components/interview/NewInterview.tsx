// "use client";

// import React from "react";
// import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
// import {
//   industryTopics,
//   interviewDifficulties,
//   interviewTypes,
// } from "@/constants/data";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import { InterviewBody } from "@/backend/types/interview.types";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { IUser } from "@/backend/models/user.model";
// import toast from "react-hot-toast";
// import { newInterview } from "@/actions/interview.action";

// const interviewIndustries = Object.keys(industryTopics) as string[];;

// export default function NewInterview() {
//   const [selectedIndustry, setSelectedIndustry] = React.useState("");
//   const [topics, setTopics] = React.useState<string[]>([]);

//   const { data } = useSession();
//   const user = data?.user as IUser;
//   const router = useRouter();

//   const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const industry = e.target.value as keyof typeof industryTopics;

//     setSelectedIndustry(industry);
//     setTopics(industryTopics[industry] || []);
//   };

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const interviewData: InterviewBody = {
//       industry: data.industry,
//       topic: data.topic,
//       type: data.type,
//       role: data.role,
//       difficulty: data.difficulty,
//       numOfQuestions: Number(data.numOfQuestions),
//       duration: Number(data.duration),
//       user: user?._id!,
//     };

//     const res = await newInterview(interviewData);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.created) {
//       toast.success("Interview created successfully");
//       router.push("/app/interviews");
//     }
//   });

//   return (
//     <div className="p-4">
//       <Form validationBehavior="native" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
//           <div className="col-span-1">
//             <h3 className="text-xl">Select all options below:</h3>
//           </div>

//           <div className="col-span-1">
//             <div className="flex gap-4 max-w-sm justify-end items-center">
//               <Button
//                 color="primary"
//                 type="submit"
//                 isLoading={loading}
//                 isDisabled={loading}
//               >
//                 Create Interview
//               </Button>
//               <Button type="reset" variant="bordered">
//                 Reset
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 w-full">
//           <div className="col-span-1">
//             <div className="w-full flex flex-col space-y-4">
//               <div className="flex flex-col gap-4 w-full max-w-sm">
//                 <Select
//                   isRequired
//                   label="Industry"
//                   labelPlacement="outside"
//                   name="industry"
//                   placeholder="Select Industry"
//                   onChange={handleIndustryChange}
//                 >
//                   {interviewIndustries?.map((industry) => (
//                     <SelectItem key={industry} textValue={industry}>
//                       {industry}
//                     </SelectItem>
//                   ))}
//                 </Select>

//                 <Select
//                   isRequired
//                   label="Topic"
//                   labelPlacement="outside"
//                   name="topic"
//                   placeholder="Select Topic"
//                   disabled={!selectedIndustry}
//                 >
//                   {topics?.map((topic) => (
//                     <SelectItem key={topic} textValue={topic}>
//                       {topic}
//                     </SelectItem>
//                   ))}
//                 </Select>

//                 <Select
//                   isRequired
//                   label="Interview Type"
//                   labelPlacement="outside"
//                   name="type"
//                   placeholder="Select interview type"
//                 >
//                   {interviewTypes?.map((type) => (
//                     <SelectItem key={type} textValue={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </Select>

//                 <Input
//                   isRequired
//                   type="text"
//                   label="Job Role"
//                   labelPlacement="outside"
//                   name="role"
//                   placeholder="software developer, data scientist, etc."
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="col-span-1">
//             <div className="w-full flex flex-col space-y-4">
//               <div className="flex flex-col gap-4 w-full max-w-sm">
//                 <Select
//                   isRequired
//                   label="Difficulty"
//                   labelPlacement="outside"
//                   name="difficulty"
//                   placeholder="Select difficulty"
//                 >
//                   {interviewDifficulties?.map((difficulty) => (
//                     <SelectItem key={difficulty} textValue={difficulty}>
//                       {difficulty}
//                     </SelectItem>
//                   ))}
//                 </Select>

//                 <Input
//                   isRequired
//                   type="number"
//                   label="No of Question"
//                   labelPlacement="outside"
//                   name="numOfQuestions"
//                   placeholder="Enter no of questions"
//                 />

//                 <Input
//                   isRequired
//                   type="number"
//                   label="Duration"
//                   labelPlacement="outside"
//                   name="duration"
//                   placeholder="Enter duration"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Form>
//     </div>
//   );
// }

"use client";

import React from "react";
import {
  industryTopics,
  interviewDifficulties,
  interviewTypes,
} from "@/constants/data";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import { InterviewBody } from "@/backend/types/interview.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUser } from "@/backend/models/user.model";
import toast from "react-hot-toast";
import { newInterview } from "@/actions/interview.action";

const interviewIndustries = Object.keys(industryTopics) as string[];

export default function NewInterview() {
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [topics, setTopics] = React.useState<string[]>([]);
  const { data } = useSession();
  const user = data?.user as IUser;
  const router = useRouter();

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const industry = e.target.value as keyof typeof industryTopics;
    setSelectedIndustry(industry);
    setTopics(industryTopics[industry] || []);
  };

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const interviewData: InterviewBody = {
      industry: data.industry,
      topic: data.topic,
      type: data.type,
      role: data.role,
      difficulty: data.difficulty,
      numOfQuestions: Number(data.numOfQuestions),
      duration: Number(data.duration),
      user: user?._id!,
    };

    const res = await newInterview(interviewData);

    if (res?.error) {
      return toast.error(res?.error?.message);
    }

    if (res?.created) {
      toast.success("Interview created successfully");
      router.push("/app/interviews");
    }
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            Select all options below:
          </h3>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } transition`}
            >
              {loading ? "Creating..." : "Create Interview"}
            </button>
            <button
              type="reset"
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Industry
              </label>
              <select
                required
                name="industry"
                onChange={handleIndustryChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Industry</option>
                {interviewIndustries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Topic
              </label>
              <select
                required
                name="topic"
                disabled={!selectedIndustry}
                className={`w-full p-2 border border-gray-300 rounded-md ${
                  !selectedIndustry ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">Select Topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Interview Type
              </label>
              <select
                required
                name="type"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Interview Type</option>
                {interviewTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Job Role
              </label>
              <input
                required
                type="text"
                name="role"
                placeholder="Software Developer, Data Scientist, etc."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Difficulty
              </label>
              <select
                required
                name="difficulty"
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Difficulty</option>
                {interviewDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                No. of Questions
              </label>
              <input
                required
                type="number"
                name="numOfQuestions"
                placeholder="Enter number of questions (2-40)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Duration (in minutes)
              </label>
              <input
                required
                type="number"
                name="duration"
                placeholder="Enter duration (max 180)"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
