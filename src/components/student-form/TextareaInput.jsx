"use client";

export default function TextareaInput({
  id,
  placeholder,
  value,
  onChange,
  icon,
  rows = 3,
  error,
  className = "",
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-3 text-sm text-[#6b7fa0] pointer-events-none z-10">
          {icon}
        </span>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`
          w-full bg-[#0c1525] border rounded-xl text-[#f0f4f8] text-sm font-light
          placeholder:text-[#6b7fa0]/50 outline-none transition-all duration-200 resize-none
          focus:border-teal-400 focus:shadow-[0_0_0_3px_rgba(45,212,191,0.08)]
          ${icon ? "pl-9 pr-3 pt-3 pb-3" : "p-3"}
          ${error ? "border-red-400/60" : "border-white/7"}
          ${className}
        `}
      />
    </div>
  );
}
