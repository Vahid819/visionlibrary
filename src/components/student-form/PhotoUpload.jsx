"use client";

import { useRef } from "react";

export default function PhotoUpload({ preview, onPreview }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="flex items-center gap-4 p-4 bg-[#0c1525] border border-dashed border-teal-400/20 rounded-xl cursor-pointer hover:border-teal-400/50 hover:bg-teal-400/5 transition-all duration-200 mb-5"
    >
      <div
        className="w-14 h-14 rounded-full bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
        style={preview ? { backgroundImage: `url(${preview})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
      >
        {!preview && "📷"}
      </div>
      <div>
        <div className="text-sm font-medium text-[#f0f4f8] mb-1">
          {preview ? "Change photo" : "Upload student photo"}
        </div>
        <div className="text-xs text-[#6b7fa0] font-light">
          JPG, PNG up to 2MB · Optional
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
