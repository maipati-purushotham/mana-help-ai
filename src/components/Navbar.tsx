
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-emerald-100/50 border-b border-emerald-100"
          : "bg-white/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-22 h-14">
                <img src="/Website-Logo.png" alt="Mana Help AI" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-white" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-bold text-emerald-900 tracking-tight">
                Mana Help
                <span className="text-emerald-600">AI</span>
              </p>
              <p className="text-[10px] text-emerald-700/70 font-semibold uppercase tracking-[0.15em]">
                Voice · Telugu · Simple
              </p>
            </div>
          </Link>

          {}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${
                    active
                      ? "text-emerald-700"
                      : "text-slate-600 hover:text-emerald-700"
                  }`}
                >
                  {link.label}
                  {}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300 origin-left ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            <Link
              href="/app"
              className="ml-4 group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold rounded-full hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-200/60 hover:shadow-emerald-300/60 transition-all hover:-translate-y-0.5"
            >
              <span>Launch App</span>
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>

          {}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
          >
            <span className="text-2xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-emerald-100">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`relative px-4 py-3 rounded-xl text-base font-semibold transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-700 hover:bg-emerald-50/50"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-base font-bold rounded-xl text-center shadow-lg shadow-emerald-200/60"
            >
              Launch App →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}