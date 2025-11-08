// "use client";

// import React from "react";
// import { Button, Input, Link, Form, Divider } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { Logo } from "@/config/Logo";
// import { signIn } from "next-auth/react";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const [isVisible, setIsVisible] = React.useState(false);
//   const router = useRouter();

//   const toggleVisibility = () => setIsVisible(!isVisible);

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const res = await signIn("credentials", {
//       redirect: false,
//       email: data.email,
//       password: data.password,
//       callbackUrl: "/app/dashboard",
//     });

//     if (res?.error) {
//       return toast.error(res?.error);
//     }

//     if (res?.ok) {
//       router.push("/app/dashboard");
//     }
//   });

//   const handleGithubLogin = async () => {
//     await signIn("github", {
//       callbackUrl: "/app/dashboard",
//     });
//   };

//   const handleGoogleLogin = async () => {
//     await signIn("google", {
//       callbackUrl: "/app/dashboard",
//     });
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center pb-6">
//           <Logo />
//           <p className="text-xl font-medium">Welcome Back</p>
//           <p className="text-small text-default-500">
//             Log in to your account to continue
//           </p>
//         </div>
//         <Form
//           className="flex flex-col gap-3"
//           onSubmit={handleSubmit}
//           validationBehavior="native"
//         >
//           <Input
//             isRequired
//             label="Email Address"
//             name="email"
//             placeholder="Enter your email"
//             type="email"
//             variant="bordered"
            
//           />
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
//             label="Password"
//             name="password"
//             placeholder="Enter your password"
//             type={isVisible ? "text" : "password"}
//             variant="bordered"
//           />
//           <div className="flex w-full items-center justify-between px-1 py-2">
//             <Link
//               className="text-default-500"
//               href="/password/forgot"
//               size="sm"
//             >
//               Forgot password?
//             </Link>
//           </div>
//           <Button
//             className="w-full"
//             color="primary"
//             type="submit"
//             isDisabled={loading}
//             isLoading={loading}
//           >
//             Sign In
//           </Button>
//         </Form>
//         <div className="flex items-center gap-4 py-2">
//           <Divider className="flex-1" />
//           <p className="shrink-0 text-tiny text-default-500">OR</p>
//           <Divider className="flex-1" />
//         </div>
//         <div className="flex flex-col gap-2">
//           <Button
//             startContent={<Icon icon="flat-color-icons:google" width={24} />}
//             variant="bordered"
//             onPress={handleGoogleLogin}
//           >
//             Continue with Google
//           </Button>
//           <Button
//             startContent={
//               <Icon className="text-default-500" icon="fe:github" width={24} />
//             }
//             variant="bordered"
//             onPress={handleGithubLogin}
//           >
//             Continue with Github
//           </Button>
//         </div>
//         <p className="text-center text-small">
//           Need to create an account?&nbsp;
//           <Link href="/register" size="sm">
//             Register Now
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
import { signIn } from "next-auth/react";
import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/app/dashboard",
    });

    if (res?.error) return toast.error(res?.error);
    if (res?.ok) router.push("/app/dashboard");
  });

  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/app/dashboard" });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/app/dashboard" });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-5 rounded-xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur-sm dark:bg-gray-900/60 dark:border-gray-700">
        {/* Header */}
        <div className="flex flex-col items-center pb-3">
          <Logo />
          <p className="text-xl font-semibold mt-2">Welcome Back</p>
          <p className="text-sm text-gray-500">
            Log in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                required
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 pr-10"
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
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <Link href="/password/forgot" className="hover:text-purple-500">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2 text-white font-medium transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 py-2">
          <hr className="flex-1 border-gray-300" />
          <p className="text-xs text-gray-400">OR</p>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Icon icon="flat-color-icons:google" width={20} />
            Continue with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Icon icon="fe:github" width={20} />
            Continue with GitHub
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Need to create an account?{" "}
          <Link href="/register" className="text-purple-500 hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
