// app/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
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
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          <Link href="/" className="hover:text-brandPink-500 transition-colors">
            Home
          </Link>
          <Link
            href="/flight-reservation"
            className="hover:text-brandPink-500 transition-colors"
          >
            Flight Reservation
          </Link>
          <Link
            href="/onward-ticket"
            className="hover:text-brandPink-500 transition-colors"
          >
            Onward Ticket
          </Link>
          <Link
            href="/faq"
            className="hover:text-brandPink-500 transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="hover:text-brandPink-500 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            className="hover:text-brandPink-500 transition-colors"
          >
            Blog
          </Link>
        </nav>

        <Link
          href="/how-it-works"
          className="hover:text-brandPink-500 transition-colors"
        >
          How It Works
        </Link>

        {/* Get Quotation Dropdown (Desktop) */}
        <div
          className="hidden lg:flex relative"
          onMouseEnter={() => setQuoteOpen(true)}
          onMouseLeave={() => setQuoteOpen(false)}
        >
          <button className="bg-pink-orange-gradient hover:opacity-95 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-pink-glow flex items-center gap-2 transition transform hover:-translate-y-0.5">
            <i className="fa-solid fa-file-invoice-dollar text-sm" /> Get
            Quotation{" "}
            <i className="fa-solid fa-chevron-down text-[10px] ml-1" />
          </button>

          {/* Dropdown Menu */}
          {quoteOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              {/* WhatsApp Option */}
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20quotation%20for%20my%20visa%20documents."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition group"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                  <i className="fa-brands fa-whatsapp" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Get Quote via WhatsApp
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Instant reply
                  </div>
                </div>
              </a>

              {/* Email Option */}
              <a
                href="mailto:i2techagency@gmail.com?subject=Quotation%20Request"
                className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 transition group border-t border-slate-50"
              >
                <div className="w-8 h-8 rounded-full bg-pink-100 text-brandPink-500 flex items-center justify-center text-sm group-hover:scale-110 transition">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Email for Quotation
                  </div>
                  <div className="text-[10px] text-slate-500">
                    i2techagency@gmail.com
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden text-slate-700 hover:text-brandPink-500 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block font-bold text-brandPink-500 py-1"
          >
            Home
          </Link>
          <Link
            href="/flight-reservation"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Flight Reservation
          </Link>
          <Link
            href="/onward-ticket"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Onward Ticket
          </Link>
          <Link
            href="/faq"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
          >
            Contact Us
          </Link>

          {/* Mobile Quotation Buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20quotation%20for%20my%20visa%20documents."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center bg-green-500 text-white font-bold py-2.5 rounded-xl gap-2 text-sm"
            >
              <i className="fa-brands fa-whatsapp text-lg" /> Get Quote on
              WhatsApp
            </a>
            <a
              href="mailto:i2techagency@gmail.com?subject=Quotation%20Request"
              className="inline-flex w-full items-center justify-center bg-pink-orange-gradient text-white font-bold py-2.5 rounded-xl gap-2 text-sm"
            >
              <i className="fa-solid fa-envelope" /> Email for Quotation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
