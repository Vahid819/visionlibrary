"use client";

import SectionHeader from "./SectionHeader";
import FormField from "./FormField";
import SeatSelector from "./SeatSelector";
import PlanSelector from "./PlanSelector";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextareaInput from "./TextareaInput";

export default function Step2SeatAndPlan({ form, errors, onChange }) {
  return (
    <div>
      <SectionHeader
        icon="🪑"
        title="Seat & Membership"
        subtitle="Assign a seat and select the membership plan"
      />

      <div className="px-6 pb-6 space-y-5">

        {/* Seat Selector */}
        <div>
          <label className="text-[11px] font-semibold text-[#6b7fa0] tracking-widest uppercase flex items-center gap-1 mb-2">
            Select Seat <span className="text-teal-400 text-[10px]">*</span>
          </label>
          <SeatSelector
            selectedSeat={form.seat}
            onSelect={(num) => onChange("seat", num)}
            error={errors.seat}
          />
        </div>

        <div className="h-px bg-white/5" />

        {/* Plan Selector */}
        <div>
          <label className="text-[11px] font-semibold text-[#6b7fa0] tracking-widest uppercase flex items-center gap-1 mb-2">
            Membership Plan <span className="text-teal-400 text-[10px]">*</span>
          </label>
          <PlanSelector
            selectedPlan={form.plan}
            onSelect={(plan) => onChange("plan", plan)}
            error={errors.plan}
          />
        </div>

        <div className="h-px bg-white/5" />

        <div className="grid grid-cols-2 gap-3.5">

          {/* Join Date */}
          <FormField label="Join Date" required error={errors.joinDate}>
            <TextInput
              id="joinDate"
              type="date"
              value={form.joinDate}
              onChange={(e) => onChange("joinDate", e.target.value)}
              icon="📅"
              error={errors.joinDate}
            />
          </FormField>

          {/* Payment Status */}
          <FormField label="Payment Status">
            <SelectInput
              id="paymentStatus"
              value={form.paymentStatus}
              onChange={(e) => onChange("paymentStatus", e.target.value)}
              options={[
                { value: "Pending", label: "⏳ Pending" },
                { value: "Paid", label: "✅ Paid" },
                { value: "Failed", label: "❌ Failed" },
              ]}
            />
          </FormField>

          {/* Shift */}
          <FormField label="Shift / Timing">
            <SelectInput
              id="shift"
              value={form.shift}
              onChange={(e) => onChange("shift", e.target.value)}
              placeholder="Select shift"
              options={[
                "Morning (6AM–12PM)",
                "Afternoon (12PM–6PM)",
                "Evening (6PM–10PM)",
                "Full Day",
              ]}
            />
          </FormField>

          {/* ID Type */}
          <FormField label="ID Proof Type">
            <SelectInput
              id="idType"
              value={form.idType}
              onChange={(e) => onChange("idType", e.target.value)}
              placeholder="Select ID type"
              options={[
                "Aadhar Card",
                "PAN Card",
                "College ID",
                "Driving Licence",
                "Passport",
              ]}
            />
          </FormField>

          {/* ID Number - full width */}
          <FormField label="ID Number" className="col-span-2">
            <TextInput
              id="idNumber"
              placeholder="Enter ID number"
              value={form.idNumber}
              onChange={(e) => onChange("idNumber", e.target.value)}
              icon="🪪"
            />
          </FormField>

          {/* Notes - full width */}
          <FormField label="Notes" className="col-span-2">
            <TextareaInput
              id="notes"
              placeholder="Any additional notes about this student..."
              value={form.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              icon="📝"
              rows={3}
            />
          </FormField>

        </div>
      </div>
    </div>
  );
}
