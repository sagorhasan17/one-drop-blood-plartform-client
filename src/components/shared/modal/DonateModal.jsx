'use client';

import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react';
import { FaArrowRight, FaHandHoldingHeart } from 'react-icons/fa';
import { FaShieldHeart } from 'react-icons/fa6';

export function DonateModal({user}) {
  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="danger"
        className="w-full h-14 rounded-full border border-red-400/20  text-white font-semibold flex items-center justify-center gap-3 cursor-pointer shadow-lg"
      >
        <FaHandHoldingHeart className="text-lg" />
        Donate Now
        <FaArrowRight />
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
                    for this patient.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="mt-8 space-y-5">
                  <TextField name="name" variant="secondary" className="w-full">
                    <Label className="mb-2 text-[11px] font-bold uppercase tracking-[2px] text-slate-400">
                      Donor Name
                    </Label>

                    <Input
                      readOnly
                      value={user.name}
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
                      value={user.email}
                      className="h-14 rounded-2xl border border-slate-200 bg-slate-50"
                    />
                  </TextField>
                </div>

                {/* Actions */}
                <div className="mt-10 flex flex-col items-center">
                  <Button
                    slot="close"
                    variant="danger"
                    className="h-14 w-full rounded-2xl text-base font-bold text-white shadow-xl"
                  >
                    Confirm & Start
                  </Button>

                  <Button
                    slot="close"
                    variant="light"
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
