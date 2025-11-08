// "use client";
// import { Button } from "@heroui/react";
// import React from "react";
// import { Icon } from "@iconify/react";
// import Link from "next/link";
// //import LandingPageStats from "./layout/landing-page-stats/LandingPageStats";
// // import Testimonials from "./layout/testimonials/Testimonials";
// import Pricing from "./layout/pricing/Pricing";
// import InterviewProcessCards from "./layout/interview-process/InterviewProcessCards";

// const Home = () => {
//   return (
//     <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//       {/* <Button
//         className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500 flex items-center gap-2"
//         radius="full"
//         variant="bordered"
//       >
//         New onboarding experience
//         <Icon
//           className="flex-none outline-none [&>path]:stroke-[2]"
//           icon="solar:arrow-right-linear"
//           width={20}
//         />
//       </Button> */}
//       <div className="inline-block max-w-xl text-center justify-center">
//         <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
//           Crack Interviews
//         </span>
//         <br />
//         <span className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
//           with AI-Powered Preparation
//         </span>
//         <div className="w-full  my-2 text-lg lg:text-xl text-default-600 block mt-4">
//           Practice with AI, master every interview, and take the next step in your career with confidence
//         </div>
//       </div>
//       <div className="flex flex-col items-center justify-center gap-4">
//       <img
//         src="./ai interview.jpg" 
//         alt="Prep AI"
//         className="mb-4 w-80 h-80 object-contain" 
//         />
//         </div>

//       <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        
//         <Button
//           className="h-10 bg-blue-500 text-white px-6 py-2 rounded-full"
//           radius="full"
//           as={Link}
//           href="/subscribe"
//         >
//           Try Interview-Prep  Now
//         </Button>
//         {/* <a href="#pricing">
//           <Button
//             className="h-10  border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5 flex items-center gap-2"
//             radius="full"
//             variant="bordered"
//           >
//             See our plans{" "}
//             <Icon
//               className="text-default-500 [&>path]:stroke-[1.5]"
//               icon="solar:arrow-right-linear"
//               width={16}
//               height={16}
//             />
//           </Button>
//         </a> */}
//       </div>
//       <Pricing />
      
//       <InterviewProcessCards />
//     </section>
//   );
// };

// export default Home;

"use client";
import { Button } from "@heroui/react";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Pricing from "./layout/pricing/Pricing";
import InterviewProcessCards from "./layout/interview-process/InterviewProcessCards";

const Home = () => {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800 min-h-screen flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-6xl px-6 md:px-12 py-16 md:py-24">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-[2.3rem] md:text-[3rem] lg:text-[3.5rem] font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#e61be2] to-[#9503f7] block">
              Crack Interviews
            </span>
            <span className="text-gray-800 block">with AI-Powered Preparation</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
            Practice with AI, master every interview, and take the next step in your career with confidence.
          </p>

          <div className="pt-4">
            <Button
              className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all"
              radius="full"
              as={Link}
              href="/login"
            >
              Try Interview-Prep Now
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center mb-10 md:mb-0">
          <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
            <img
              src="./ai interview.jpg"
              alt="Prep AI"
              className="w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className=" bg-white shadow-sm rounded-3xl py-16 px-6 md:px-10 mt-10">
        <div className="w-full max-w-5xl text-center">
          
          <Pricing />
        </div>
      </section>

      {/* INTERVIEW PROCESS SECTION */}
      <section className="w-full flex justify-center py-16 px-6 md:px-10 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-6xl text-center">
          <InterviewProcessCards />
        </div>
      </section>
    </main>
  );
};

export default Home;
