"use client";

export default function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 px-6 pt-5 pb-0 mb-5">
      <div className="w-9 h-9 rounded-xl bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-base flex-shrink-0">
        {icon}
      </div>
      <div>
        <div
          className="text-sm font-bold text-[#f0f4f8]"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          {title}
        </div>
        <div className="text-xs text-[#6b7fa0] font-light mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}
