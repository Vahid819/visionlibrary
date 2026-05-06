"use client";

export default function FormField({
  label,
  required = false,
  error,
  icon,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[11px] font-semibold text-[#6b7fa0] tracking-widest uppercase flex items-center gap-1">
          {label}
          {required && <span className="text-teal-400 text-[10px]">*</span>}
        </label>
      )}
      <div className="relative">{children}</div>
      {error && (
        <span className="text-[11px] text-red-400 flex items-center gap-1">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}
