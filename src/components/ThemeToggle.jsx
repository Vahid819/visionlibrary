"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Laptop, label: "System" },
  ];

  return (
    <div className="relative flex items-center bg-muted p-1 rounded-lg">
      {options.map(({ value, icon: Icon, label }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              relative z-10 flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md
              transition-all duration-200
              ${
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            <Icon size={14} />
            {label}
          </button>
        );
      })}

      {/* 🔥 Sliding background */}
      <div
        className={`
          absolute top-1 bottom-1 rounded-md bg-background shadow-sm
          transition-all duration-200
          ${
            theme === "light"
              ? "left-1 w-[33%]"
              : theme === "dark"
              ? "left-[34%] w-[33%]"
              : "left-[67%] w-[32%]"
          }
        `}
      />
    </div>
  );
}