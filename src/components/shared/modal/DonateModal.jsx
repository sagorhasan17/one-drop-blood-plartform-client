"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaHandHoldingHeart } from "react-icons/fa";
import { FaShieldHeart } from "react-icons/fa6";
import { toast } from "react-toastify";

export function DonateModal({ user, requestId, status = "pending" }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/donate-request/${requestId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            donorId: user?.id,
            donorName: user?.name,
            donorEmail: user?.email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to accept donation request");
      }
      toast.success("Donation Request Accepted Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      router.refresh();
    } catch (error) {
      console.error("Donate Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = status !== "pending";

  const buttonText =
    status === "pending"
      ? "Donate Now"
      : status === "inprogress"
        ? "Already Accepted"
        : status === "done"
          ? "Donation Completed"
          : "Request Cancelled";

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="danger"
        isDisabled={isDisabled}
        className={`w-full h-14 rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg ${
          isDisabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <FaHandHoldingHeart className="text-lg" />

        {buttonText}

        {!isDisabled && <FaArrowRight />}
      </Button>

      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white shadow-[0_25px_80px_rgba(239,68,68,0.12)]">
            <Modal.CloseTrigger />

            <Modal.Body className="px-8 py-10">
              <Surface
                variant="default"
                className="border-none bg-transparent shadow-none"
              >
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                    <FaShieldHeart className="text-2xl text-red-500" />
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900">
                    Confirm Donation
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
                    Please confirm that you are available and willing to donate
                    blood for this patient.
                  </p>
                </div>

                {/* Donor Info */}
                <div className="mt-8 space-y-5">
                  <TextField name="name" variant="secondary" className="w-full">
                    <Label className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                      Donor Name
                    </Label>

                    <Input
                      readOnly
                      value={user?.name || ""}
                      className="h-14 rounded-2xl border border-slate-200 bg-slate-50"
                    />
                  </TextField>

                  <TextField
                    name="email"
                    variant="secondary"
                    className="w-full"
                  >
                    <Label className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                      Donor Email
                    </Label>

                    <Input
                      readOnly
                      value={user?.email || ""}
                      className="h-14 rounded-2xl border border-slate-200 bg-slate-50"
                    />
                  </TextField>
                </div>

                {/* Action */}
                <div className="mt-10 flex flex-col items-center">
                  <Button
                    slot="close"
                    onClick={handleDonate}
                    isDisabled={isLoading}
                    variant="danger"
                    className="h-14 w-full rounded-2xl text-base font-bold text-white shadow-xl"
                  >
                    {isLoading ? "Processing..." : "Confirm Donation"}
                  </Button>

                  <Button
                    slot="close"
                    variant="light"
                    isDisabled={isLoading}
                    className="mt-5 h-auto bg-transparent p-0 text-sm font-medium text-slate-400 hover:text-slate-700"
                  >
                    I changed my mind
                  </Button>
                </div>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
