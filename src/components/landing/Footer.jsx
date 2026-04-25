import Link from "next/link";

const LINKS = {
  Product: ["Features", "How it Works", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Contact", "Privacy"],
  Legal: ["Terms", "Privacy Policy", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#020917] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              className="text-xl font-black text-teal-400 mb-3"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Vision Library
            </div>
            <p className="text-sm text-white/30 leading-relaxed font-light max-w-xs">
              The study room management system built for modern administrators.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {["𝕏", "in", "gh"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-xs text-white/40 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/30 hover:text-teal-400 transition-colors font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-light">
            © 2026 Vision Library. Built by Vahid Ansar Momin.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}