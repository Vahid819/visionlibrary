"use client";

export default function SelectInput({
  id,
  value,
  onChange,
  options = [],
  placeholder,
  error,
  className = "",
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`
        w-full h-11 bg-[#0c1525] border rounded-xl text-sm font-light
        px-3 outline-none appearance-none cursor-pointer transition-all duration-200
        focus:border-teal-400 focus:shadow-[0_0_0_3px_rgba(45,212,191,0.08)]
        ${value ? "text-[#f0f4f8]" : "text-[#6b7fa0]/50"}
        ${error ? "border-red-400/60" : "border-white/7"}
        ${className}
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>{opt}</option>
        ) : (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )
      )}
    </select>
  );
}
