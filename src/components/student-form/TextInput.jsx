"use client";

export default function TextInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6b7fa0] pointer-events-none z-10">
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full h-11 bg-[#0c1525] border rounded-xl text-[#f0f4f8] text-sm font-light
          placeholder:text-[#6b7fa0]/50 outline-none transition-all duration-200
          focus:border-teal-400 focus:shadow-[0_0_0_3px_rgba(45,212,191,0.08)]
          ${icon ? "pl-9 pr-3" : "px-3"}
          ${error ? "border-red-400/60 shadow-[0_0_0_3px_rgba(248,113,113,0.08)]" : "border-white/7"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
