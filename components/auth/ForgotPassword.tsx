// "use client";

// import React from "react";
// import { Button, Input, Form } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { Logo } from "@/config/Logo";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import { forgotPassword } from "@/actions/auth.actions";
// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const email = data.email;
//     const res = await forgotPassword(email);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.emailSent) {
//       return toast.success("Password reset link sent to your email");
//     }
//   });

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center pb-6">
//           <Logo />
//           <p className="text-xl font-medium">Forgot Password</p>
//           <p className="text-small text-default-500">
//             Enter your email to reset your password
//           </p>
//         </div>

//         <Form
//           className="flex flex-col gap-3"
//           validationBehavior="native"
//           onSubmit={handleSubmit}
//         >
//           <Input
//             isRequired
//             classNames={{
//               base: "-mb-[2px]",
//               inputWrapper:
//                 "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
//             }}
//             label="Email Address"
//             name="email"
//             placeholder="Enter your email"
//             type="email"
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
//             Send
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import { forgotPassword } from "@/actions/auth.actions";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { loading } = useGenericSubmitHandler(async () => {}); // we’ll manage manually below

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email address");
    }

    try {
      const res = await forgotPassword(email);

      if (res?.error) {
        return toast.error(res.error.message);
      }

      if (res?.emailSent) {
        return toast.success("Password reset link sent to your email");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center pb-2">
          <Logo />
          <p className="text-xl font-semibold mt-2">Forgot Password</p>
          <p className="text-sm text-gray-500 text-center">
            Enter your email to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                Send
                <Icon icon="akar-icons:arrow-right" className="text-lg" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
