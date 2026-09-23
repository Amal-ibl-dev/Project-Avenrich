"use client";

import React, { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";

interface AddContactPersonModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (contact: { name: string; email: string; phone: string; countryCode: string }) => void;
}

const PILL_INPUT =
  "w-full rounded-full bg-white py-3 px-5 text-sm text-gray-800 outline-none placeholder:text-gray-400";

/** "Add Contact Person" form (Add_Contact_Person.png), reached from the Customer List's "+ Add Customer" button. */
export function AddContactPersonModal({ open, onClose, onSave }: AddContactPersonModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const countryCode = "+094";

  const resetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    onClose();
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave?.({ name: name.trim(), email: email.trim(), phone: phone.trim(), countryCode });
    resetAndClose();
  };

  return (
    <Modal open={open} onClose={resetAndClose} maxWidthClassName="max-w-sm">
      <div className="space-y-5 pt-1">
        <div>
          <label className="mb-2 block text-sm text-gray-700">Contact Person Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Contact Name"
            className={PILL_INPUT}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Contact Person E-Mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Contact Email"
            className={PILL_INPUT}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-700">Contact Person Tel-Number:</label>
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1">
            <span className="rounded-full px-2 py-2 text-sm text-gray-600">{countryCode}</span>
            <span className="h-5 w-px bg-gray-200" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="xx xxx xxxx"
              className="w-full py-2 pl-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full rounded-full bg-gradient-to-b from-[#1E5631] to-[#123A20] py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}
