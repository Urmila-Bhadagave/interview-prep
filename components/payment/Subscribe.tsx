// "use client";

// import React, { useEffect, useState } from "react";

// import { Button, Input, Radio, RadioGroup } from "@heroui/react";
// import { Logo } from "@/config/Logo";
// import { Icon } from "@iconify/react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { createNewSubscription } from "@/actions/payment.action";
// import toast from "react-hot-toast";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const Subscribe = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// };

// const CheckoutForm = () => {
//   const { data, update } = useSession();

//   const stripe = useStripe();
//   const elements = useElements();
//   const router = useRouter();

//   const [email, setEmail] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (data?.user) setEmail(data.user.email!);
//   }, [data]);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     setLoading(true);

//     const cardElements = elements.getElement(CardElement);

//     try {
//       const { paymentMethod, error } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElements!,
//         billing_details: {
//           email,
//         },
//       });

//       if (error) {
//         setError(error.message || "An error occurred");
//         setLoading(false);
//         return;
//       }

//       const res = await createNewSubscription(email, paymentMethod!.id);

//       if (res?.error) {
//         setError(res.error?.message);
//         setLoading(false);
//         return;
//       }

//       if (res?.subscription) {
//         setLoading(false);

//         const updateSession = await update({
//           subscription: {
//             id: res.subscription.id,
//             status: res.subscription.status,
//           },
//         });

//         if (updateSession) {
//           toast.success("Subscription successful");
//           router.push("/app/dashboard");
//         }
//       }
//     } catch (error: any) {
//       setError(error.message || "An error occurred");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
//         <div className="flex flex-col items-center pb-6">
//           <Logo />
//           <p className="text-xl font-medium">Subscribe</p>
//           <p className="text-small text-default-500">
//             Enter your email and card details to subscribe
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//           <RadioGroup isDisabled label="Your Plan" defaultValue={"9.99"}>
//             <Radio value="9.99">$9.99 per month</Radio>
//           </RadioGroup>

//           <Input
//             type="email"
//             label="Email Address"
//             placeholder="Email"
//             variant="bordered"
//             value={email}
//             isDisabled
//           />
//           <div className="my-4">
//             <CardElement options={{ hidePostalCode: true }} />
//           </div>
//           <Button
//             className="w-full"
//             color="primary"
//             type="submit"
//             startContent={<Icon icon="solar:card-send-bold" fontSize={19} />}
//             isDisabled={!stripe || loading}
//           >
//             {loading ? "Processing..." : "Subscribe"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Subscribe;

"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createNewSubscription } from "@/actions/payment.action";
import toast from "react-hot-toast";
import { Logo } from "@/config/Logo";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Subscribe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

const CheckoutForm = () => {
  const { data, update } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data?.user) setEmail(data.user.email!);
  }, [data]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: { email },
      });

      if (error) {
        setError(error.message || "An error occurred");
        setLoading(false);
        return;
      }

      const res = await createNewSubscription(email, paymentMethod!.id);
      if (res?.error) {
        setError(res.error?.message);
        setLoading(false);
        return;
      }

      if (res?.subscription) {
        setLoading(false);

        const updateSession = await update({
          subscription: {
            id: res.subscription.id,
            status: res.subscription.status,
          },
        });

        if (updateSession) {
          toast.success("Subscription successful!");
          router.push("/app/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-semibold mt-2">Subscribe</p>
          <p className="text-sm text-gray-500 text-center">
            Enter your email and card details to subscribe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Plan Selection */}
          <fieldset className="border border-gray-300 rounded-xl p-4">
            <legend className="text-sm text-gray-600 px-2">Your Plan</legend>
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="radio"
                name="plan"
                value="9.99"
                defaultChecked
                disabled
                className="accent-blue-600"
              />
              $9.99 per month
            </label>
          </fieldset>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Card Element */}
          <div className="my-2 border border-gray-300 rounded-lg p-3">
            <CardElement options={{ hidePostalCode: true }} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 font-medium text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Icon icon="solar:card-send-bold" fontSize={19} />
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
