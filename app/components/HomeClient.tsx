"use client";

import { useEffect, useState } from "react";
import { getPosts, type WPPost } from "@/lib/wordpress";
import SearchWidget from "./SearchWidget";
import TrustBadges from "./TrustBadges"; // ✅ IMPORT ADD KAREIN

type Tab = "flight" | "hotel" | "combo";
type PopoverId = "flight" | "hotel" | "combo" | null;

interface FlightPax {
  adults: number;
  children: number;
  infants: number;
}
interface HotelPax {
  adults: number;
  children: number;
  rooms: number;
}
interface ComboPax {
  guests: number;
  rooms: number;
}

export default function HomeClient() {
  // ---------- UI State ----------
  const [activeTab, setActiveTab] = useState<Tab>("flight");
  const [openPopover, setOpenPopover] = useState<PopoverId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Flight Reservation Request");
  const [modalRoute, setModalRoute] = useState("LHR to CDG");

  // ---------- Form State ----------
  const [tripType, setTripType] = useState<"round" | "oneway" | "multicity">(
    "round",
  );

  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [flightPax, setFlightPax] = useState<FlightPax>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState("Economy");

  const [hotelDest, setHotelDest] = useState("");
  const [hotelPax, setHotelPax] = useState<HotelPax>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [comboFrom, setComboFrom] = useState("");
  const [comboTo, setComboTo] = useState("");
  const [comboHotelCity, setComboHotelCity] = useState("");
  const [comboPax, setComboPax] = useState<ComboPax>({ guests: 2, rooms: 1 });
  const [latestBlogs, setLatestBlogs] = useState<WPPost[]>([]);

  useEffect(() => {
    let active = true;
    getPosts({ page: 1, perPage: 3 }).then(({ posts }) => {
      if (active) setLatestBlogs(posts);
    });
    return () => {
      active = false;
    };
  }, []);
  // ---------- Close popover on outside click ----------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#flight-pax-popover") &&
        !target.closest("#hotel-pax-popover") &&
        !target.closest("#combo-pax-popover") &&
        !target.closest('button[data-popover-trigger="true"]')
      ) {
        setOpenPopover(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ---------- Helpers ----------
  const flightPaxSummary = () => {
    const parts = [
      `${flightPax.adults} Adult${flightPax.adults > 1 ? "s" : ""}`,
    ];
    if (flightPax.children > 0)
      parts.push(
        `${flightPax.children} Child${flightPax.children > 1 ? "ren" : ""}`,
      );
    if (flightPax.infants > 0)
      parts.push(
        `${flightPax.infants} Infant${flightPax.infants > 1 ? "s" : ""}`,
      );
    return `${parts.join(", ")} • ${cabin}`;
  };

  const hotelPaxSummary = () => {
    const total = hotelPax.adults + hotelPax.children;
    return `${total} Guest${total > 1 ? "s" : ""}, ${hotelPax.rooms} Room${
      hotelPax.rooms > 1 ? "s" : ""
    }`;
  };

  const comboPaxSummary = () => {
    return `${comboPax.guests} Guest${comboPax.guests > 1 ? "s" : ""}, ${
      comboPax.rooms
    } Room${comboPax.rooms > 1 ? "s" : ""}`;
  };

  const updateFlightPax = (
    key: keyof FlightPax,
    delta: number,
    min: number,
  ) => {
    setFlightPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });
  };

  const updateHotelPax = (key: keyof HotelPax, delta: number, min: number) => {
    setHotelPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });
  };

  const updateComboPax = (key: keyof ComboPax, delta: number, min: number) => {
    setComboPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });
  };

  const openModal = (title: string, route: string) => {
    setModalTitle(title);
    setModalRoute(route);
    setModalOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent, serviceTitle: string) => {
    e.preventDefault();
    let route = "Selected Destination";

    if (serviceTitle === "Flight Reservation") {
      const from = flightFrom || "Delhi";
      const to = flightTo || "Paris";
      route = `${from} ➔ ${to} (${flightPaxSummary()})`;
    } else if (serviceTitle === "Hotel Booking") {
      const dest = hotelDest || "Dubai";
      route = `Hotel Stay in ${dest} (${hotelPaxSummary()})`;
    } else if (serviceTitle === "Flight + Hotel Combo") {
      const from = comboFrom || "London";
      const to = comboTo || "Tokyo";
      route = `${from} ➔ ${to} + Hotel (${comboPaxSummary()})`;
    }

    openModal(serviceTitle, route);
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setOpenPopover(null);
  };

  const tabClass = (tab: Tab) => {
    const base =
      "search-tab-btn inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition";
    return activeTab === tab
      ? `${base} bg-brandPink-500 text-white shadow-sm`
      : `${base} bg-slate-100 text-slate-700 hover:bg-slate-200`;
  };

  // ---------- Render ----------
  return (
    <>
      {/* ================= HEADER ================= */}
      {/* <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
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
            <a
              href="#hero"
              className="bg-brandPink-500 text-white px-4 py-1.5 rounded-full shadow-sm"
            >
              Home
            </a>
            <a
              href="#search-widget"
              className="hover:text-brandPink-500 transition-colors"
            >
              Book Flight{" "}
              <i className="fa-solid fa-chevron-down text-[10px] ml-1" />
            </a>
            <a
              href="#services"
              className="hover:text-brandPink-500 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#blog"
              className="hover:text-brandPink-500 transition-colors"
            >
              Blog
            </a>
            <a
              href="#why-us"
              className="hover:text-brandPink-500 transition-colors"
            >
              About Us
            </a>
            <a
              href="#testimonials"
              className="hover:text-brandPink-500 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#footer"
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
              href="#hero"
              onClick={() => setMobileOpen(false)}
              className="block font-bold text-brandPink-500 py-1"
            >
              Home
            </a>
            <a
              href="#search-widget"
              onClick={() => setMobileOpen(false)}
              className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
            >
              Book Flight
            </a>
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
            >
              Pricing
            </a>
            <a href="/blog" onClick={() => setMobileOpen(false)} className="block font-medium text-slate-700 hover:text-brandPink-500 py-1">
  Blog
</a>
            <a
              href="#why-us"
              onClick={() => setMobileOpen(false)}
              className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
            >
              About Us
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileOpen(false)}
              className="block font-medium text-slate-700 hover:text-brandPink-500 py-1"
            >
              FAQ
            </a>
            <a
              href="#footer"
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
      </header> */}

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="hero-bg-gradient pt-10 pb-28 relative overflow-hidden"
      >
        <div className="absolute right-6 top-16 hidden lg:block transform rotate-6 z-10 pointer-events-none">
          <span className="font-handwriting text-4xl font-bold text-brandPink-600 drop-shadow-sm">
            Travel Beyond
            <br />
            Borders
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-slate-700 mb-6 border border-pink-100">
              <span className="w-5 h-5 rounded-full bg-brandPink-100 text-brandPink-500 flex items-center justify-center text-[10px]">
                <i className="fa-solid fa-paper-plane" />
              </span>
              Your Travel Plans, Made Easier
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Get Your <span className="text-brandPink-500">Dummy Ticket</span>
              <br />
              for Visa &amp; Travel Purposes
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
              Book flight reservations, onward tickets and more with trusted
              service worldwide.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brandOrange-500 text-white flex items-center justify-center text-[10px]">
                  <i className="fa-solid fa-check" />
                </span>{" "}
                Fast Booking
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brandOrange-500 text-white flex items-center justify-center text-[10px]">
                  <i className="fa-solid fa-check" />
                </span>{" "}
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brandOrange-500 text-white flex items-center justify-center text-[10px]">
                  <i className="fa-solid fa-check" />
                </span>{" "}
                Instant Delivery
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#search-widget"
                className="inline-flex items-center gap-2 bg-pink-orange-gradient hover:opacity-95 text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-pink-glow transition transform hover:-translate-y-0.5"
              >
                Search Flights <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 relative max-w-7xl mx-auto px-4 pointer-events-none">
          <div className="relative w-full h-48 sm:h-64 flex items-end justify-between opacity-85">
            <svg
              className="h-40 sm:h-56 text-pink-300 fill-current opacity-30"
              viewBox="0 0 100 200"
            >
              <path d="M45,0 L55,0 L55,40 L65,120 L80,200 L60,200 L50,150 L40,200 L20,200 L35,120 L45,40 Z" />
            </svg>
            <svg
              className="h-36 sm:h-52 text-orange-300 fill-current opacity-30"
              viewBox="0 0 80 200"
            >
              <rect x="25" y="40" width="30" height="160" />
              <polygon points="40,0 20,40 60,40" />
            </svg>
            <div className="absolute -top-12 right-12 sm:right-32 text-brandPink-500 text-5xl sm:text-7xl animate-pulse">
              <i className="fa-solid fa-plane-up transform -rotate-12" />
            </div>
            <svg
              className="h-40 sm:h-56 text-pink-400 fill-current opacity-30"
              viewBox="0 0 100 200"
            >
              <path d="M40,20 L60,20 L55,70 L70,200 L30,200 L45,70 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ================= SEARCH WIDGET ================= */}
      <SearchWidget />

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-bolt",
                title: "Instant Confirmation",
                desc: "Get your ticket quickly",
                color: "pink",
              },
              {
                icon: "fa-shield-halved",
                title: "100% Secure Payments",
                desc: "Your data is safe with us",
                color: "orange",
              },
              {
                icon: "fa-headset",
                title: "24/7 Customer Support",
                desc: "We're here to help you",
                color: "pink",
              },
              {
                icon: "fa-globe",
                title: "Worldwide Coverage",
                desc: "Fly anywhere, anytime",
                color: "orange",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  item.color === "pink"
                    ? "bg-pink-50/50 border-pink-100/60"
                    : "bg-orange-50/50 border-orange-100/60"
                } border`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${
                    item.color === "pink"
                      ? "bg-brandPink-500"
                      : "bg-brandOrange-500"
                  } text-white flex items-center justify-center text-xl shrink-0 shadow-sm`}
                >
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Travel Solutions for{" "}
              <span className="text-brandPink-500">Everyone</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Choose from our flexible travel services and enjoy a smooth
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Flight Reservation",
                desc: "Book domestic & international flights at best prices.",
                img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
                color: "pink",
              },
              {
                title: "Hotel Reservation",
                desc: "Find the best hotels worldwide with great deals.",
                img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
                color: "orange",
              },
              {
                title: "Flight + Hotel Packages",
                desc: "Save more with our exclusive travel packages.",
                img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
                color: "pink",
              },
              {
                title: "Onward Ticket",
                desc: "Get onward tickets for visa & immigration purposes.",
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
                color: "orange",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm hover:shadow-xl transition group flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 rounded-2xl overflow-hidden bg-slate-100 mb-4 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    openModal(s.title, "Global Reservation Request")
                  }
                  className={`w-full ${
                    s.color === "pink"
                      ? "bg-brandPink-500 hover:bg-brandPink-600"
                      : "bg-brandOrange-500 hover:bg-brandOrange-600"
                  } text-white font-bold text-xs py-2.5 rounded-full transition flex items-center justify-center gap-1`}
                >
                  Book Now <i className="fa-solid fa-arrow-right text-[10px]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section id="why-us" className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-brandPink-500 to-brandOrange-400 absolute -top-4 -left-4 -z-10 blur-xl opacity-30" />
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-pink-100 relative max-w-md mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
                  alt="Happy Traveler holding passport"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
                Why Choose Us?
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                Your <span className="text-brandPink-500">Trusted</span> Travel{" "}
                <span className="text-brandPink-500">Partner</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                At TheDummy-Tickets.com, we make travel simple, secure and
                affordable. Whether you need a dummy ticket for visa or real
                travel booking, we&apos;ve got you covered!
              </p>

              <div className="space-y-3.5 mb-8">
                {[
                  "Trusted by Thousands",
                  "Easy & Fast Process",
                  "Best Prices",
                  "Dedicated Support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-brandPink-500 text-white flex items-center justify-center text-xs shrink-0">
                      <i className="fa-solid fa-check" />
                    </span>
                    <span className="font-extrabold text-slate-800 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-handwriting text-3xl font-bold text-slate-800">
                  Let&apos;s Plan Your Next Trip!
                </span>
                <i className="fa-solid fa-plane text-brandPink-500 text-2xl animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section
        id="testimonials"
        className="py-20 bg-pink-50/40 border-t border-b border-pink-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
              What Our Customers Say
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Happy Travelers{" "}
              <span className="text-brandPink-500">Around the World</span>
            </h2>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Rahul Sharma",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                  text: "Excellent service! Got my dummy ticket within minutes. Highly recommended!",
                },
                {
                  name: "Priya Mehta",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                  text: "Super fast and professional. Perfect for my visa application.",
                },
                {
                  name: "Amit Kumar",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                  text: "Very easy process and great support. Will use again!",
                },
              ].map((r) => (
                <div
                  key={r.name}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.img}
                      alt={r.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {r.name}
                      </h4>
                      <div className="text-amber-400 text-xs flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &quot;{r.text}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLOG ================= */}
      {/* ================= BLOG ================= */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
                Our Blog
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Travel Tips &amp;{" "}
                <span className="text-brandPink-500">Guides</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Get expert tips, travel guides and the latest updates.
              </p>
            </div>
            <a
              href="/blog"
              className="bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm transition inline-flex items-center gap-1 self-start sm:self-auto"
            >
              View All Blogs{" "}
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </a>
          </div>

          {/* Live posts from WordPress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((post) => {
              const img =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80";

              return (
                <div
                  key={post.id}
                  className="bg-slate-50 rounded-3xl p-4 border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <a href={`/blog/${post.slug}`}>
                      <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    </a>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-2 hover:text-brandPink-500 transition">
                      <a
                        href={`/blog/${post.slug}`}
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-200/80 mt-4">
                    <span>
                      <i className="fa-regular fa-calendar text-brandPink-500 mr-1" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="font-bold text-brandPink-500 hover:underline flex items-center gap-1"
                    >
                      Read More{" "}
                      <i className="fa-solid fa-arrow-right text-[9px]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <TrustBadges /> 
      {/* ================= FOOTER ================= */}
      {/* <footer id="footer" className="bg-pink-orange-gradient text-white pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/20 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white text-brandPink-500 flex items-center justify-center text-xl font-bold shadow-md">
                <i className="fa-solid fa-plane-departure" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white">
                  The Dummy-Tickets.com
                </div>
                <span className="text-[10px] font-semibold text-white/80 tracking-wider uppercase block">
                  Book. Travel. Go Global.
                </span>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-white/90">
              <a href="#hero" className="hover:underline">
                Home
              </a>
              <a href="#search-widget" className="hover:underline">
                Book Flight
              </a>
              <a href="#services" className="hover:underline">
                Pricing
              </a>
              <a href="/blog" className="hover:text-brandPink-500 transition-colors">
  Blog
</a>
              <a href="#why-us" className="hover:underline">
                About Us
              </a>
              <a href="#testimonials" className="hover:underline">
                FAQ
              </a>
              <a href="#footer" className="hover:underline">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {["facebook-f", "youtube", "instagram", "linkedin-in"].map(
                (s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-brandPink-500 flex items-center justify-center text-sm transition"
                  >
                    <i className={`fa-brands fa-${s}`} />
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="bg-orange-gradient text-white/90 py-4 text-[11px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>&copy; 2026 TheDummy-Tickets.com. All Rights Reserved.</div>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Terms &amp; Conditions
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer> */}

      {/* ================= BOOKING MODAL ================= */}
      {modalOpen && (
        <div
          id="bookingModal"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="w-14 h-14 bg-pink-orange-gradient text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4 shadow-md">
              <i className="fa-solid fa-circle-check" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              {modalTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your search query has been generated! Submit details to proceed
              with reservation.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl text-left space-y-2 text-xs mb-5 border border-slate-100">
              <div className="flex justify-between gap-2">
                <span className="text-slate-400 shrink-0">Route:</span>
                <span className="font-bold text-slate-800 text-right">
                  {modalRoute}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Speed:</span>
                <span className="font-bold text-brandPink-500">
                  Instant (Within 10 mins)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Validation Code:</span>
                <span className="font-mono font-bold text-slate-800">
                  LIVE-PNR-OK
                </span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full bg-pink-orange-gradient text-white font-extrabold text-xs py-3 rounded-full shadow-pink-glow"
            >
              Continue to Secure Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
