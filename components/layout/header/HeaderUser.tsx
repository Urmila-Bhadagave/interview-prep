// import React from "react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
// } from "@heroui/react";
// import { User } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { IUser } from "@/backend/models/user.model";
// import { signOut } from "next-auth/react";
// import { isUserAdmin, isUserSubscribed } from "@/helpers/auth";

// const HeaderUser = ({ user }: { user: IUser }) => {
//   return (
//     <div className="flex items-center gap-4">
//       <Dropdown placement="bottom-start">
//         <DropdownTrigger>
//           <User
//             as="button"
//             avatarProps={{
//               isBordered: true,
//               src: user?.profilePicture?.url
//                 ? user?.profilePicture?.url
//                 : "/images/default_user.png",
//             }}
//             className="transition-transform"
//             description={user?.email}
//             name={user?.name}
//           />
//         </DropdownTrigger>
//         <DropdownMenu aria-label="User Actions" variant="flat">
//           <DropdownItem key="profile" className="h-14 gap-2">
//             <p className="font-bold">Signed in as</p>
//             <p className="font-bold">{user?.email}</p>
//           </DropdownItem>
//           {isUserAdmin(user) ? (
//             <DropdownItem
//               key="admin_dashboard"
//               href="/admin/dashboard"
//               startContent={<Icon icon="tabler:user-cog" />}
//             >
//               Admin Dashboard
//             </DropdownItem>
//           ) : null}

//           {isUserAdmin(user) || isUserSubscribed(user) ? (
//             <DropdownItem
//               key="app_dashboard"
//               href="/app/dashboard"
//               startContent={<Icon icon="hugeicons:ai-brain-04" />}
//             >
//               App Dashboard
//             </DropdownItem>
//           ) : null}
//           <DropdownItem
//             key="logout"
//             color="danger"
//             startContent={<Icon icon="tabler:logout-2" />}
//             onPress={() => signOut()}
//           >
//             Logout
//           </DropdownItem>
//         </DropdownMenu>
//       </Dropdown>
//     </div>
//   );
// };

// export default HeaderUser;
"use client";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import { IUser } from "@/backend/models/user.model";
import { isUserAdmin, isUserSubscribed } from "@/helpers/auth";

const HeaderUser = ({ user }: { user: IUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <Image
          src={
            user?.profilePicture?.url
              ? user?.profilePicture?.url
              : "/images/default_user.png"
          }
          alt="User"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-300 hover:border-blue-500 transition-all"
        />
        <span className="hidden sm:inline text-sm font-medium text-gray-800">
          {user?.name}
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl p-3 border border-gray-100 animate-fadeIn z-50">
          <div className="p-3 border-b border-gray-100">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="text-sm font-medium text-gray-800 truncate">
              {user?.email}
            </p>
          </div>

          <div className="flex flex-col mt-2">
            {isUserAdmin(user) && (
              <a
                href="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm transition"
              >
                <Icon icon="tabler:user-cog" width={18} />
                Admin Dashboard
              </a>
            )}

            {(isUserAdmin(user) || isUserSubscribed(user)) && (
              <a
                href="/app/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm transition"
              >
                <Icon icon="hugeicons:ai-brain-04" width={18} />
                App Dashboard
              </a>
            )}

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm transition mt-2"
            >
              <Icon icon="tabler:logout-2" width={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
