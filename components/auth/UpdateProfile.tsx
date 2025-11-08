// "use client";

// import React, { useState } from "react";
// import { Button, Input, Form, Avatar } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { useSession } from "next-auth/react";
// import { useGenericSubmitHandler } from "../form/genericSubmitHandler";
// import { IUser } from "@/backend/models/user.model";
// import toast from "react-hot-toast";
// import { updateProfile } from "@/actions/auth.actions";
// import Loader from "../layout/loader/Loader";

// export default function UpdateProfile() {
//   const { data: userData, update } = useSession() as {
//     data: { user: IUser } | null;
//     update: () => Promise<any>;
//   };
//   const [avatar, setAvatar] = useState("");

//   const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
//     const bodyData = {
//       name: data.name,
//       email: userData?.user?.email ?? "",
//       avatar,
//       oldAvatar: userData?.user?.profilePicture?.id,
//     };

//     const res = await updateProfile(bodyData);

//     if (res?.error) {
//       return toast.error(res?.error?.message);
//     }

//     if (res?.updated) {
//       const updateSession = await update();

//       if (updateSession) {
//         toast.success("Profile updated successfully");
//       }
//     }
//   });

//   const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const files = Array.from(e.target.files || []);

//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatar(reader.result as string);
//       }
//     };

//     reader.readAsDataURL(files[0]);
//   };

//   if (userData == undefined) {
//     return <Loader />;
//   }

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
//         <div className="flex flex-col gap-1">
//           <h1 className="text-large font-medium">Update Profile</h1>
//           <p className="text-small text-default-500">
//             Enter details to update profile
//           </p>
//         </div>

//         <Form
//           className="flex flex-col gap-5"
//           validationBehavior="native"
//           onSubmit={handleSubmit}
//         >
//           <Input
//             isRequired
//             label="Name"
//             name="name"
//             placeholder="Enter your name"
//             type="text"
//             variant="bordered"
//             defaultValue={userData?.user?.name ?? ""}
//           />

//           <Input
//             isRequired
//             label="Email Address"
//             name="email"
//             placeholder="Enter your email"
//             type="email"
//             variant="bordered"
//             isDisabled
//             defaultValue={userData?.user?.email ?? ""}
//           />

//           <div className="flex gap-1 items-center">
//             {avatar && (
//               <Avatar showFallback src={avatar} size="lg" radius="sm" />
//             )}
//             <Input
//               label="Avatar"
//               name="avatar"
//               type="file"
//               variant="bordered"
//               onChange={onChange}
//             />
//           </div>

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
import { IUser } from "@/backend/models/user.model";
import toast from "react-hot-toast";
import { updateProfile } from "@/actions/auth.actions";
import Loader from "../layout/loader/Loader";

export default function UpdateProfile() {
  const { data: userData, update } = useSession() as {
    data: { user: IUser } | null;
    update: () => Promise<any>;
  };

  const [avatar, setAvatar] = useState("");

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const bodyData = {
      name: data.name,
      email: userData?.user?.email ?? "",
      avatar,
      oldAvatar: userData?.user?.profilePicture?.id,
    };

    const res = await updateProfile(bodyData);

    if (res?.error) return toast.error(res?.error?.message);

    if (res?.updated) {
      const updateSession = await update();
      if (updateSession) toast.success("Profile updated successfully");
    }
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (userData == undefined) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center pb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Update Profile
          </h1>
          <p className="text-sm text-gray-500">
            Enter details to update profile
          </p>
        </div>

        {/* Update Profile Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="Enter your name"
              defaultValue={userData?.user?.name ?? ""}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none transition-all duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              required
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={userData?.user?.email ?? ""}
              disabled
              className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
            />
          </div>

          {/* Avatar Upload */}
          <div className="flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar Preview"
                className="h-14 w-14 rounded-md object-cover border"
              />
            ) : (
              userData?.user?.profilePicture?.url && (
                <img
                  src={userData.user.profilePicture.url}
                  alt="Current Avatar"
                  className="h-14 w-14 rounded-md object-cover border"
                />
              )
            )}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar
              </label>
              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={onChange}
                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-white file:text-sm file:font-medium hover:file:bg-blue-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 rounded-md py-2 text-sm font-medium text-white transition-all duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <Icon icon="eos-icons:loading" className="animate-spin text-lg" />
                Updating...
              </>
            ) : (
              <>
                Update
                <Icon icon="akar-icons:arrow-right" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
