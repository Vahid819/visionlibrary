"use client";

import SectionHeader from "./SectionHeader";

const PLAN_PRICES = {
  Weekly: "₹149 / week",
  Monthly: "₹499 / month",
  Yearly: "₹3,999 / year",
};

function ReviewRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
      <span className="text-xs text-[#6b7fa0] font-light">{label}</span>
      <span
        className={`text-xs font-medium ${
          highlight ? "text-teal-400" : "text-[#f0f4f8]"
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

function ReviewSection({ title, children }) {
  return (
    <div className="mb-4">
      <div className="text-[10px] font-bold text-[#6b7fa0] tracking-widest uppercase mb-2">
        {title}
      </div>
      <div className="bg-[#0c1525] border border-white/7 rounded-xl px-4 py-1">
        {children}
      </div>
    </div>
  );
}

export default function Step3Review({ form }) {
  return (
    <div>
      <SectionHeader
        icon="✅"
        title="Review & Confirm"
        subtitle="Check all details before registering the student"
      />

      <div className="px-6 pb-6">

        {/* Personal Info */}
        <ReviewSection title="Personal Information">
          <ReviewRow
            label="Full Name"
            value={`${form.firstName} ${form.lastName}`}
          />
          <ReviewRow label="Phone" value={form.phone} />
          <ReviewRow label="Email" value={form.email} />
          <ReviewRow label="Gender" value={form.gender} />
          <ReviewRow label="Date of Birth" value={form.dob} />
          <ReviewRow label="Address" value={form.address} />
          <ReviewRow
            label="Emergency Contact"
            value={
              form.emergencyName
                ? `${form.emergencyName} · ${form.emergencyPhone}`
                : null
            }
          />
        </ReviewSection>

        {/* Seat & Plan */}
        <ReviewSection title="Seat & Membership">
          <ReviewRow
            label="Seat Number"
            value={form.seat ? `Seat ${form.seat}` : null}
            highlight
          />
          <ReviewRow
            label="Membership Plan"
            value={
              form.plan
                ? `${form.plan} — ${PLAN_PRICES[form.plan]}`
                : null
            }
            highlight
          />
          <ReviewRow label="Join Date" value={form.joinDate} />
          <ReviewRow label="Payment Status" value={form.paymentStatus} />
          <ReviewRow label="Shift" value={form.shift} />
          <ReviewRow
            label="ID Proof"
            value={
              form.idType
                ? `${form.idType}${form.idNumber ? ` · ${form.idNumber}` : ""}`
                : null
            }
          />
          <ReviewRow label="Notes" value={form.notes} />
        </ReviewSection>

        {/* Confirm notice */}
        <div className="flex items-start gap-3 p-3.5 bg-teal-400/5 border border-teal-400/15 rounded-xl">
          <span className="text-teal-400 text-base flex-shrink-0">ℹ</span>
          <p className="text-xs text-[#6b7fa0] font-light leading-relaxed">
            By clicking <strong className="text-[#f0f4f8] font-medium">Register Student</strong>, this student will be added to Vision Library and their seat will be marked as occupied.
          </p>
        </div>
      </div>
    </div>
  );
}
