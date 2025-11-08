// "use client";

// import React from "react";
// import { Button, Input, Link, Form } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { Logo } from "@/config/Logo";
// import { registerUser } from "@/actions/auth.actions";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const router = useRouter();

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const res = await registerUser(data.name, data.email, data.password);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.created) {
//       toast.success("Account created successfully");
//       router.push("/login");
//     }
//   });

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center pb-6">
//           <Logo />
//           <p className="text-xl font-medium">Welcome</p>
//           <p className="text-small text-default-500">
//             Create an account to get started
//           </p>
//         </div>
//         <div className="flex flex-col gap-3">
//           <Form validationBehavior="native" onSubmit={handleSubmit}>
//             <div className="flex flex-col w-full">
//               <Input
//                 isRequired
//                 classNames={{
//                   base: "-mb-[2px]",
//                   inputWrapper:
//                     "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
//                 }}
//                 label="Full Name"
//                 name="name"
//                 placeholder="Enter your username"
//                 type="text"
//                 variant="bordered"
//               />
//               <Input
//                 isRequired
//                 classNames={{
//                   base: "-mb-[2px]",
//                   inputWrapper:
//                     "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
//                 }}
//                 label="Email Address"
//                 name="email"
//                 placeholder="Enter your email"
//                 type="email"
//                 variant="bordered"
//               />
//               <Input
//                 isRequired
//                 minLength={8}
//                 classNames={{
//                   base: "-mb-[2px]",
//                   inputWrapper:
//                     "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
//                 }}
//                 endContent={
//                   <button type="button" onClick={toggleVisibility}>
//                     {isVisible ? (
//                       <Icon
//                         className="pointer-events-none text-2xl text-default-400"
//                         icon="solar:eye-closed-linear"
//                       />
//                     ) : (
//                       <Icon
//                         className="pointer-events-none text-2xl text-default-400"
//                         icon="solar:eye-bold"
//                       />
//                     )}
//                   </button>
//                 }
//                 label="Password"
//                 name="password"
//                 placeholder="Enter your password"
//                 type={isVisible ? "text" : "password"}
//                 variant="bordered"
//               />
//             </div>

//             <Button
//               className="w-full mt-2"
//               color="primary"
//               type="submit"
//               isDisabled={loading}
//               isLoading={loading}
//             >
//               Register
//             </Button>
//           </Form>
//         </div>
//         <p className="text-center text-small">
//           Already have an account?&nbsp;
//           <Link href="/login" size="sm">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import { Logo } from "@/config/Logo";
// import { registerUser } from "@/actions/auth.actions";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [isVisible, setIsVisible] = useState(false);
//   const router = useRouter();

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const res = await registerUser(data.name, data.email, data.password);

//     if (res?.error) return toast.error(res?.error?.message);
//     if (res?.created) {
//       toast.success("Account created successfully!");
//       router.push("/login");
//     }
//   });

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="w-full max-w-sm flex flex-col gap-5 rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm dark:bg-gray-900/60 dark:border-gray-700">
//         {/* Header */}
//         <div className="flex flex-col items-center pb-3">
//           <Logo />
//           <p className="text-xl font-semibold mt-2">Create Account</p>
//           <p className="text-sm text-gray-500">Join us to start your journey</p>
//         </div>

//         {/* Register Form */}
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Full Name</label>
//             <input
//               required
//               name="name"
//               type="text"
//               placeholder="Enter your full name"
//               className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Email Address
//             </label>
//             <input
//               required
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <div className="relative">
//               <input
//                 required
//                 minLength={8}
//                 name="password"
//                 type={isVisible ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={toggleVisibility}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <Icon
//                   icon={
//                     isVisible
//                       ? "solar:eye-closed-linear"
//                       : "solar:eye-bold"
//                   }
//                   width={20}
//                 />
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-white font-medium transition ${
//               loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
//             }`}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link href="/login" className="text-purple-500 hover:underline">
//             Log In
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { registerUser } from "@/actions/auth.actions";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validate = (email: string, password: string) => {
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    if (!validate(data.email, data.password)) return;

    const res = await registerUser(data.name, data.email, data.password);

    if (res?.error) return toast.error(res?.error?.message);
    if (res?.created) {
      toast.success("Account created successfully!");
      router.push("/login");
    }
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-5 rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm dark:bg-gray-900/60 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col items-center pb-3">
          <Logo />
          <p className="text-xl font-semibold mt-2">Create Account</p>
          <p className="text-sm text-gray-500">Join us to start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              name="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                required
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10`}
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon
                  icon={
                    isVisible
                      ? "solar:eye-closed-linear"
                      : "solar:eye-bold"
                  }
                  width={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-white font-medium transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
