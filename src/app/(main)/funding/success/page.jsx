import { saveFunding } from "@/lib/api/funding";
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaHashtag,
  FaMoneyBillWave,
  FaReceipt,
} from "react-icons/fa";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing Stripe Session ID.");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  const paymentData = {
    checkoutStatus: session.status,
    paymentStatus: session.payment_status,
    stripeSessionId: session.id,
    paymentIntentId: session.payment_intent.id,
    amount: session.amount_total / 100,
    currency: session.currency.toUpperCase(),
    customerEmail: session.customer_details?.email,
    createdAt: new Date(session.created * 1000),
  };

  // Save funding
  try {
    await saveFunding(paymentData);
  } catch (error) {}

  return (
    <main className="min-h-screen bg-black/70 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-3xl rounded-3xl bg-black/70 border shadow-xl">
        <div className="border-b p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">Payment Successful</h1>

          <p className="mt-3 text-slate-500">
            Thank you for supporting Blood Donation.
          </p>
        </div>

        <div className="p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <FaReceipt />
            Transaction Details
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span>Amount</span>

              <span className="flex items-center gap-2 font-semibold">
                <FaMoneyBillWave className="text-green-600" />
                {paymentData.currency} {paymentData.amount}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Status</span>

              <span className="rounded-full bg-black/70 px-3 py-1 text-green-700">
                {paymentData.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Email</span>

              <span className="flex items-center gap-2">
                <FaEnvelope />
                {paymentData.customerEmail}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Transaction ID</span>

              <span className="flex items-center gap-2 break-all font-mono text-sm">
                <FaHashtag />
                {paymentData.paymentIntentId}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>

              <span>{paymentData.createdAt.toLocaleString()}</span>
            </div>
          </div>

          <Link
            href="/funding"
            className="mt-8 flex h-14 items-center justify-center rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            View Funding History
          </Link>

          <Link
            href="/"
            className="mt-4 flex items-center justify-center gap-2 text-slate-600 hover:text-red-600"
          >
            <FaArrowLeft />
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
