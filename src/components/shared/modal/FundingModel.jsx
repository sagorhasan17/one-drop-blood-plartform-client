"use client";

import { Button, Input, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { FaDollarSign, FaHandHoldingHeart } from "react-icons/fa";
import { FaShieldHeart } from "react-icons/fa6";

export function FundingModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(0);
  // const buttonText =
  //   status === "pending"
  //     ? "Donate Now"
  //     : status === "inprogress"
  //       ? "Already Accepted"
  //       : status === "done"
  //         ? "Donation Completed"
  //         : "Request Cancelled";

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="danger"
        className={`w-full h-14 rounded-full font-semibold flex items-center justify-center gap-3 shadow-lg `}
      >
        <FaHandHoldingHeart className="text-lg" />
        Give Funding
      </Button>

      <Modal.Backdrop className="bg-black/50 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-black/70 shadow-[0_25px_80px_rgba(239,68,68,0.12)]">
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

                  <h2 className="text-3xl font-bold text-gray-200">
                    Confirm Donation
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
                    enter the amount you want to donate
                  </p>
                </div>

                {/* Donor Info */}
                <div className="mt-8 space-y-5">
                  <TextField>
                    <div className="flex items-center h-14 rounded-2xl border border-slate-400 bg-gray-800 px-4">
                      <FaDollarSign className="text-gray-100 text-lg mr-3" />

                      <Input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        name="price"
                        placeholder="0.00"
                        className="flex-1 bg-transparent outline-none border-none py-4"
                      />
                    </div>
                  </TextField>
                </div>

                {/* Action */}
                <div className="mt-10 flex flex-col items-center">
                  <form action="/api/payment" method="POST">
                    <section>
                      {/* <button type="submit" role="link">
                        Checkout
                      </button> */}
                      <input type="hidden" name="price" value={price} />
                      <Button
                        slot="close"
                        type="submit"
                        isDisabled={price <= 0}
                        role="link"
                        variant="danger"
                        className="h-14 w-full rounded-2xl text-base font-bold text-white shadow-xl"
                      >
                        {isLoading ? "Processing..." : "Confirm and Pay"}
                      </Button>
                    </section>
                  </form>

                  <Button
                    slot="close"
                    variant="light"
                    isDisabled={isLoading}
                    className="mt-5 h-auto bg-transparent p-0 text-sm font-medium text-slate-400 hover:text-slate-700"
                  >
                    maybe later
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
