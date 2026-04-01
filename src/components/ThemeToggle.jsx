"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 bg-white/10 px-3 py-2 rounded-lg"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}