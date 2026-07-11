import Link from "next/link";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="text-base font-black text-teal-400 mb-2"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Vision Library
            </div>
            <p className="text-[13px] text-white/20 leading-relaxed font-light max-w-[180px] mb-4">
              Study room management, simplified.
            </p>
            <div className="flex gap-2">
              {["𝕏", "in", "gh"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[11px] text-white/30 hover:text-teal-400 hover:border-teal-400/20 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([cat, items]) => (
            <div key={cat}>
              <h4 className="text-[10px] font-bold text-white/25 tracking-widest uppercase mb-3">
                {cat}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[13px] text-white/25 hover:text-white/60 transition-colors font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/15 font-light">
            © 2026 Vision Library · Built by Vahid Ansar Momin · Kolhapur
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[11px] text-white/20">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
