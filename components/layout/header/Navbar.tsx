// "use client";

// import {
//   Navbar as HeroUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@heroui/react";
// import NextLink from "next/link";

// import { Logo } from "@/config/Logo";
// import HeaderUser from "./HeaderUser";
// import { Button, Link, Skeleton, User } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { siteConfig } from "@/config/site";
// import { signOut, useSession } from "next-auth/react";
// import { IUser } from "@/backend/models/user.model";
// import { useState } from "react";
// import { isUserAdmin, isUserSubscribed } from "@/helpers/auth";
// import { ThemeSwitcher } from "./ThemeSwitcher";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const { data } = useSession();
//   const user = data?.user as IUser;

//   return (
//     <HeroUINavbar
//       maxWidth="xl"
//       position="sticky"
//       isMenuOpen={isMenuOpen}
//       onMenuOpenChange={setIsMenuOpen}
//     >
//       <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//         <NavbarBrand as="li" className="gap-3 max-w-fit">
//           <NextLink className="flex justify-start items-center gap-1" href="/">
//             <Logo />
//             <p className="font-bold text-inherit">{siteConfig?.name}</p>
//           </NextLink>
//         </NavbarBrand>
//       </NavbarContent>

//       <NavbarContent
//         className="hidden sm:flex basis-1/5 sm:basis-full"
//         justify="end"
//       >
//         <NavbarItem className="hidden sm:flex gap-2">
//           <ThemeSwitcher />
//         </NavbarItem>

//         {data?.user ? (
//           <>
//             <NavbarItem className="hidden sm:flex">
//               {!isUserSubscribed(user) && (
//                 <Button
//                   className="bg-foreground font-medium text-background px-5"
//                   color="secondary"
//                   radius="full"
//                   variant="flat"
//                   as={Link}
//                   href="/subscribe"
//                 >
//                   Subscribe for $9.99
//                 </Button>
//               )}
//             </NavbarItem>
//             <NavbarItem className="hidden sm:flex">
//               <HeaderUser user={user} />
//             </NavbarItem>
//           </>
//         ) : (
//           <>
//             {data === undefined && (
//               <div className="max-w-[150px] w-full flex items-center gap-3">
//                 <div>
//                   <Skeleton className="flex rounded-full w-12 h-12" />
//                 </div>
//                 <div className="w-full flex flex-col gap-2">
//                   <Skeleton className="h-3 w-3/5 rounded-lg" />
//                   <Skeleton className="h-3 w-4/5 rounded-lg" />
//                 </div>
//               </div>
//             )}

//             {data === null && (
//               <Button
//                 className="bg-foreground font-medium text-background px-5"
//                 color="secondary"
//                 endContent={<Icon icon="solar:alt-arrow-right-linear" />}
//                 radius="full"
//                 variant="flat"
//                 as={Link}
//                 href="/login"
//               >
//                 Login
//               </Button>
//             )}
//           </>
//         )}
//       </NavbarContent>

//       <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//         <ThemeSwitcher />
//         {data?.user ? (
//           <NavbarMenuToggle aria-label="Open menu" />
//         ) : (
//           data === null && (
//             <NavbarItem>
//               <Button
//                 className="bg-foreground font-medium text-background px-5"
//                 color="secondary"
//                 endContent={<Icon icon="solar:alt-arrow-right-linear" />}
//                 radius="full"
//                 variant="flat"
//                 as={Link}
//                 href="/login"
//               >
//                 Login
//               </Button>
//             </NavbarItem>
//           )
//         )}
//       </NavbarContent>

//       <NavbarMenu className="pt-16">
//         <User
//           as="button"
//           avatarProps={{
//             isBordered: true,
//             src: user?.profilePicture?.url
//               ? user?.profilePicture?.url
//               : "/images/default_user.png",
//           }}
//           className="transition-transform"
//           description={user?.email}
//           name={user?.name}
//         />
//         {isUserAdmin(user) ? (
//           <NavbarMenuItem>
//             <Link
//               color={"foreground"}
//               href="/admin/dashboard"
//               size="lg"
//               className="flex gap-1"
//               onPress={() => setIsMenuOpen(false)}
//             >
//               <Icon icon="tabler:user-cog" /> Admin Dashboard
//             </Link>
//           </NavbarMenuItem>
//         ) : null}

//         {isUserAdmin(user) || isUserSubscribed(user) ? (
//           <NavbarMenuItem>
//             <Link
//               color={"foreground"}
//               href="/app/dashboard"
//               size="lg"
//               className="flex gap-1"
//               onPress={() => setIsMenuOpen(false)}
//             >
//               <Icon icon="hugeicons:ai-brain-04" /> App Dashboard
//             </Link>
//           </NavbarMenuItem>
//         ) : null}
//         <NavbarMenuItem>
//           <Link
//             color={"danger"}
//             as={Link}
//             size="lg"
//             className="flex gap-1"
//             onPress={() => signOut()}
//           >
//             <Icon icon="tabler:logout-2" /> Logout
//           </Link>
//         </NavbarMenuItem>
//       </NavbarMenu>
//     </HeroUINavbar>
//   );
// };

// export default Navbar;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useSession, signOut } from "next-auth/react";
// import { Menu, X, LogOut, Sun, Moon, User, Cog, Brain } from "lucide-react";
// import { IUser } from "@/backend/models/user.model";
// import { isUserAdmin, isUserSubscribed } from "@/helpers/auth";
// import { ThemeSwitcher } from "./ThemeSwitcher";
// import { Logo } from "@/config/Logo";
// import { siteConfig } from "@/config/site";
// import HeaderUser from "./HeaderUser";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { data } = useSession();
//   const user = data?.user as IUser;

//   return (
//     <nav className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Left - Logo */}
//         <Link href="/" className="flex items-center gap-2 text-blue-500">
//           <Logo />
//           <span className="font-bold text-lg text-shadow-pink-700 dark:text-gray-100">
//             {siteConfig?.name}
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-4">
//           <ThemeSwitcher />

//           {data?.user ? (
//             <>
//               {/* {!isUserSubscribed(user) && (
//                 <Link
//                   href="/subscribe"
//                   className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
//                 >
//                   Subscribe for $9.99
//                 </Link>
//               )} */}
//               <HeaderUser user={user} />
//             </>
//           ) : data === undefined ? (
//             <div className="flex items-center gap-3 animate-pulse">
//               <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
//               <div className="space-y-2">
//                 <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                 <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
//               </div>
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden flex items-center gap-3">
//           <ThemeSwitcher />
//           {data?.user ? (
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-gray-800 dark:text-gray-100"
//             >
//               {menuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           ) : (
//             data === null && (
//               <Link
//                 href="/login"
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition"
//               >
//                 Login
//               </Link>
//             )
//           )}
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && data?.user && (
//         <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-3">
//           <div className="flex items-center gap-3">
//             <Image
//               src={
//                 user?.profilePicture?.url
//                   ? user.profilePicture.url
//                   : "/images/default_user.png"
//               }
//               alt="User"
//               width={40}
//               height={40}
//               className="rounded-full border"
//             />
//             <div>
//               <p className="text-gray-900 dark:text-gray-100 font-medium">
//                 {user?.name}
//               </p>
//               <p className="text-sm text-gray-500">{user?.email}</p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 pt-3">
//             {isUserAdmin(user) && (
//               <Link
//                 href="/admin/dashboard"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600"
//               >
//                 <Cog size={18} /> Admin Dashboard
//               </Link>
//             )}

//             {(isUserAdmin(user) || !isUserSubscribed(user)) && (
//               <Link
//                 href="/app/dashboard"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600"
//               >
//                 <Brain size={18} /> 
//                 App Dashboard
//               </Link>
//             )}

//             <button
//               onClick={() => signOut()}
//               className="flex items-center gap-2 text-red-500 hover:text-red-600 pt-2"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, Cog, Brain } from "lucide-react";
import { IUser } from "@/backend/models/user.model";
import { isUserAdmin, isUserSubscribed } from "@/helpers/auth";
import { Logo } from "@/config/Logo";
import { siteConfig } from "@/config/site";
import HeaderUser from "./HeaderUser";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useSession();
  const user = data?.user as IUser;

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-500">
          <Logo />
          <span className="font-bold text-lg text-gray-900">
            {siteConfig?.name}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {data?.user ? (
            <>
              {/* {!isUserSubscribed(user) && (
                <Link
                  href="/subscribe"
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                >
                  Subscribe for $9.99
                </Link>
              )} */}
              <HeaderUser user={user} />
            </>
          ) : data === undefined ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-10 w-10 bg-gray-300 rounded-full" />
              <div className="space-y-2">
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {data?.user ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-800"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            data === null && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && data?.user && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src={
                user?.profilePicture?.url
                  ? user.profilePicture.url
                  : "/images/default_user.png"
              }
              alt="User"
              width={40}
              height={40}
              className="rounded-full border"
            />
            <div>
              <p className="text-gray-900 font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-3">
            {isUserAdmin(user) && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
              >
                <Cog size={18} /> Admin Dashboard
              </Link>
            )}

            {(isUserAdmin(user) || !isUserSubscribed(user)) && (
              <Link
                href="/app/dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
              >
                <Brain size={18} /> App Dashboard
              </Link>
            )}

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 pt-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
