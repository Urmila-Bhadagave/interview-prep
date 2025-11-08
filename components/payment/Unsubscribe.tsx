// "use client";

// import React from "react";

// import { Button, Input, Radio, RadioGroup } from "@heroui/react";
// import { Logo } from "@/config/Logo";
// import { Icon } from "@iconify/react";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { IUser } from "@/backend/models/user.model";
// import toast from "react-hot-toast";
// import { cancelUserSubscription } from "@/actions/payment.action";

// const Unsubscribe = () => {
//   const [loading, setLoading] = React.useState(false);
//   const router = useRouter();

//   const { data, update } = useSession();
//   const user = data?.user as IUser;

//   const handleUnsubscribe = async () => {
//     setLoading(true);

//     const res = await cancelUserSubscription(user.email);

//     setLoading(false);

//     if (res?.error) {
//       return toast.error(res.error?.message);
//     }

//     if (res?.status) {
//       const updateSession = await update({
//         subscription: {
//           status: res.status,
//         },
//       });

//       if (updateSession) {
//         toast.success("Subscription cancelled successfully");
//         router.push("/");
//       }
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center pb-6">
//           <Logo />
//           <p className="text-xl font-medium">Unsubscribe</p>
//           <p className="text-small text-default-500">
//             Unsubscribe from your current plan
//           </p>
//         </div>

//         <div className="flex flex-col gap-5">
//           <RadioGroup isDisabled label="Your Plan" defaultValue={"9.99"}>
//             <Radio value="9.99">$9.99 per month</Radio>
//           </RadioGroup>

//           <Input
//             type="email"
//             label="Email Address"
//             placeholder="Email"
//             variant="bordered"
//             value={user?.email}
//             isDisabled
//           />

//           <Button
//             className="w-full"
//             color="danger"
//             type="submit"
//             startContent={<Icon icon="solar:card-recive-bold" fontSize={19} />}
//             onPress={handleUnsubscribe}
//             isLoading={loading}
//             isDisabled={loading}
//           >
//             UnSubscribe
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Unsubscribe;

"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { IUser } from "@/backend/models/user.model";
import toast from "react-hot-toast";
import { cancelUserSubscription } from "@/actions/payment.action";
import { Logo } from "@/config/Logo";

const Unsubscribe = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data, update } = useSession();
  const user = data?.user as IUser;

  const handleUnsubscribe = async () => {
    setLoading(true);
    const res = await cancelUserSubscription(user.email);
    setLoading(false);

    if (res?.error) {
      return toast.error(res.error?.message);
    }

    if (res?.status) {
      const updateSession = await update({
        subscription: { status: res.status },
      });

      if (updateSession) {
        toast.success("Subscription cancelled successfully");
        router.push("/");
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-semibold mt-2">Unsubscribe</p>
          <p className="text-sm text-gray-500 text-center">
            Unsubscribe from your current plan
          </p>
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-5">
          {/* Plan Section */}
          <fieldset className="border border-gray-300 rounded-xl p-4">
            <legend className="text-sm text-gray-600 px-2">Your Plan</legend>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="plan"
                value="9.99"
                defaultChecked
                disabled
                className="accent-red-600"
              />
              $9.99 per month
            </label>
          </fieldset>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Unsubscribe Button */}
          <button
            type="button"
            onClick={handleUnsubscribe}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-white transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <Icon icon="solar:card-recive-bold" fontSize={19} />
            {loading ? "Processing..." : "Unsubscribe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
