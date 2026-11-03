// app/components/Header.tsx
"use client";

import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-pink-orange-gradient flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <i className="fa-solid fa-plane-departure text-xl" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight text-slate-900 leading-none">
              The <span className="text-brandPink-500">Dummy-Tickets</span>
              <span className="text-brandOrange-500">.com</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block mt-0.5">
              Book. Travel. Go Global.
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <a href="/" className="hover:text-brandPink-500 transition-colors">
            Home
          </a>
          <a
            href="/#search-widget"
            className="hover:text-brandPink-500 transition-colors"
          >
            Book Flight{" "}
            <i className="fa-solid fa-chevron-down text-[10px] ml-1" />
          </a>
          <a
            href="/#services"
            className="hover:text-brandPink-500 transition-colors"
          >
            Pricing
          </a>
          <a
            href="/blog"
            className="hover:text-brandPink-500 transition-colors"
          >
            Blog
          </a>
          <a
            href="/#why-us"
            className="hover:text-brandPink-500 transition-colors"
          >
            About Us
          </a>
          <a
            href="/#testimonials"
            className="hover:text-brandPink-500 transition-colors"
          >
            FAQ
          </a>
          <a
            href="/#footer"
            className="hover:text-brandPink-500 transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="hidden lg:flex items-center">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-brandPink-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-headset text-sm" /> Support
          </a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden text-slate-700 hover:text-brandPink-500 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <a
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block font-bold text-brandPink-500 py-1"
          >
            Home
          </a>
          <a
            href="/#search-widget"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Book Flight
          </a>
          <a
            href="/#services"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Pricing
          </a>
          <a
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Blog
          </a>
          <a
            href="/#why-us"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            About Us
          </a>
          <a
            href="/#testimonials"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            FAQ
          </a>
          <a
            href="/#footer"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Contact
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center bg-brandPink-500 text-white font-bold py-2.5 rounded-full gap-2"
          >
            <i className="fa-solid fa-headset" /> Support
          </a>
        </div>
      )}
    </header>
  );
}
