
import Link from "next/link";
import { LuSprout, LuHeart } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-emerald-50 mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-amber-400 to-green-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-24 h-24 flex items-center justify-center">
               <img src="/Website-Logo.png" alt="Mana Help AI Logo"/>
              </div>
              <div>
                <p className="text-lg font-bold text-white">Mana Help AI</p>
                <p className="text-xs text-emerald-300">మన హెల్ప్ AI</p>
              </div>
            </div>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
              A voice-first AI assistant that helps people understand
              documents and everyday instructions in simple Telugu.
            </p>
            <p className="text-xs text-emerald-300/70 mt-4">
              Informational help only — not an official government service.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  href="/app"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Launch App
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-emerald-100/80 hover:text-white hover:translate-x-1 inline-block transition"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-emerald-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-emerald-300/70">
            © 2026 Mana Help AI. All rights reserved.
          </p>
          <p className="text-xs text-emerald-300/70 inline-flex items-center gap-1">
            Built with <LuHeart className="w-3.5 h-3.5 text-amber-400" /> for
            rural India
          </p>
        </div>
      </div>
    </footer>
  );
}