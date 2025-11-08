// "use client";

// import React from "react";
// import { Button, Input, Form } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { useSession } from "next-auth/react";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import { updatePassword } from "@/actions/auth.actions";
// import toast from "react-hot-toast";

// export default function UpdatePassword() {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

//   const session = useSession();

//   const toggleVisibility = () => setIsVisible(!isVisible);
//   const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const bodyData = {
//       newPassword: data.newPassword,
//       confirmPassword: data.confirmPassword,
//       userEmail: session?.data?.user?.email || "",
//     };

//     const res = await updatePassword(bodyData);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.updated) {
//       toast.success("Password updated successfully");
//     }
//   });

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
//         <div className="flex flex-col gap-1">
//           <h1 className="text-large font-medium">Update Password</h1>
//           <p className="text-small text-default-500">
//             Enter new passwords to update
//           </p>
//         </div>

//         <Form
//           className="flex flex-col gap-3"
//           validationBehavior="native"
//           onSubmit={handleSubmit}
//         >
//           <Input
//             isRequired
//             endContent={
//               <button type="button" onClick={toggleVisibility}>
//                 {isVisible ? (
//                   <Icon
//                     className="pointer-events-none text-2xl text-default-400"
//                     icon="solar:eye-closed-linear"
//                   />
//                 ) : (
//                   <Icon
//                     className="pointer-events-none text-2xl text-default-400"
//                     icon="solar:eye-bold"
//                   />
//                 )}
//               </button>
//             }
//             label="New Password"
//             name="newPassword"
//             placeholder="Enter your new password"
//             type={isVisible ? "text" : "password"}
//             variant="bordered"
//           />

//           <Input
//             isRequired
//             endContent={
//               <button type="button" onClick={toggleConfirmVisibility}>
//                 {isConfirmVisible ? (
//                   <Icon
//                     className="pointer-events-none text-2xl text-default-400"
//                     icon="solar:eye-closed-linear"
//                   />
//                 ) : (
//                   <Icon
//                     className="pointer-events-none text-2xl text-default-400"
//                     icon="solar:eye-bold"
//                   />
//                 )}
//               </button>
//             }
//             label="Confirm Password"
//             name="confirmPassword"
//             placeholder="Confirm your password"
//             type={isConfirmVisible ? "text" : "password"}
//             variant="bordered"
//           />

//           <Button
//             className="w-full"
//             color="primary"
//             type="submit"
//             endContent={<Icon icon="akar-icons:arrow-right" />}
//             isDisabled={loading}
//             isLoading={loading}
//           >
//             Update
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import { updatePassword } from "@/actions/auth.actions";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { data: session } = useSession();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const bodyData = {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      userEmail: session?.user?.email || "",
    };

    const res = await updatePassword(bodyData);

    if (res?.error) return toast.error(res?.error?.message);
    if (res?.updated) toast.success("Password updated successfully");
  });

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center pb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Update Password
          </h1>
          <p className="text-sm text-gray-500">
            Enter new passwords to update
          </p>
        </div>

        {/* Update Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              required
              name="newPassword"
              type={isVisible ? "text" : "password"}
              placeholder="Enter your new password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition-all duration-200"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-9 text-gray-500"
            >
              <Icon
                icon={isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"}
                className="text-xl"
              />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              required
              name="confirmPassword"
              type={isConfirmVisible ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition-all duration-200"
            />
            <button
              type="button"
              onClick={toggleConfirmVisibility}
              className="absolute right-3 top-9 text-gray-500"
            >
              <Icon
                icon={
                  isConfirmVisible
                    ? "solar:eye-closed-linear"
                    : "solar:eye-bold"
                }
                className="text-xl"
              />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-2 text-sm font-medium text-white transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
