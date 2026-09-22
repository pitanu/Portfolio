import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("#top");

  const navItems = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#aboutMe" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "#top";
      for (const { href } of navItems) {
        const el = document.getElementById(href.slice(1));
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = href;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="bg-transparent px-4 sm:px-6 md:px-12 py-5 z-50">
      <div className="relative max-w-7xl mx-auto flex items-center justify-center">

        {/* Nav — frosted glass pill bar, visible at every screen size */}
        <nav className="flex items-center gap-0.5 sm:gap-1 rounded-full bg-slate-950/60 p-1 sm:p-1.5 ring-1 ring-white/10 shadow-[0_8px_30px_-12px_rgba(99,102,241,0.5)] backdrop-blur-md">
          {navItems.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              aria-current={active === href ? "true" : undefined}
              className={`rounded-full px-3.5 sm:px-5 py-1.5 text-sm sm:text-base font-medium transition duration-300 ${
                active === href
                  ? "bg-indigo-500/20 text-white ring-1 ring-indigo-400/40"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
