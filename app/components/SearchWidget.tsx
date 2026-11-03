// app/components/SearchWidget.tsx
"use client";

import { useEffect, useState } from "react";

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

export default function SearchWidget() {
  const [activeTab, setActiveTab] = useState<Tab>("flight");
  const [openPopover, setOpenPopover] = useState<PopoverId>(null);

  // ---------- FLIGHT STATE ----------
  const [tripType, setTripType] = useState<"round" | "oneway" | "multicity">(
    "round",
  );
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightPax, setFlightPax] = useState<FlightPax>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState("Economy");

  // ---------- HOTEL STATE ----------
  const [hotelDest, setHotelDest] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState("");
  const [hotelCheckOut, setHotelCheckOut] = useState("");
  const [hotelPax, setHotelPax] = useState<HotelPax>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  // ---------- COMBO STATE ----------
  const [comboFrom, setComboFrom] = useState("");
  const [comboTo, setComboTo] = useState("");
  const [comboDep, setComboDep] = useState("");
  const [comboRet, setComboRet] = useState("");
  const [comboHotelCity, setComboHotelCity] = useState("");
  const [comboCheckIn, setComboCheckIn] = useState("");
  const [comboCheckOut, setComboCheckOut] = useState("");
  const [comboPax, setComboPax] = useState<ComboPax>({ guests: 2, rooms: 1 });

  // ---------- LEAD STATE ----------
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [summaryText, setSummaryText] = useState("");

  // ---------- HELPERS ----------
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
    return `${total} Guest${total > 1 ? "s" : ""}, ${hotelPax.rooms} Room${hotelPax.rooms > 1 ? "s" : ""}`;
  };

  const comboPaxSummary = () =>
    `${comboPax.guests} Guest${comboPax.guests > 1 ? "s" : ""}, ${comboPax.rooms} Room${comboPax.rooms > 1 ? "s" : ""}`;

  const updateFlightPax = (key: keyof FlightPax, delta: number, min: number) =>
    setFlightPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });

  const updateHotelPax = (key: keyof HotelPax, delta: number, min: number) =>
    setHotelPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });

  const updateComboPax = (key: keyof ComboPax, delta: number, min: number) =>
    setComboPax((prev) => {
      const next = prev[key] + delta;
      return { ...prev, [key]: next < min ? min : next };
    });

  // ---------- TAB CLASS ----------
  const tabClass = (tab: Tab) => {
    const base =
      "search-tab-btn inline-flex items-center gap-2 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full transition";
    return activeTab === tab
      ? `${base} bg-brandPink-500 text-white shadow-sm`
      : `${base} bg-slate-100 text-slate-700 hover:bg-slate-200`;
  };

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setOpenPopover(null);
  };

  // ---------- SEARCH SUBMIT (show lead form) ----------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let summary = "";

    if (activeTab === "flight") {
      summary = `${flightFrom} → ${flightTo} • ${departure}${
        returnDate && tripType !== "oneway" ? ` – ${returnDate}` : " (One-way)"
      } • ${flightPaxSummary()}`;
    } else if (activeTab === "hotel") {
      summary = `Hotel in ${hotelDest} • ${hotelCheckIn} – ${hotelCheckOut} • ${hotelPaxSummary()}`;
    } else {
      summary = `${comboFrom} → ${comboTo} + Hotel in ${comboHotelCity} • ${comboDep} – ${comboRet} • ${comboPaxSummary()}`;
    }

    setSummaryText(summary);
    setShowLeadForm(true);
  };

  // ---------- LEAD SUBMIT ----------
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload =
        activeTab === "flight"
          ? {
              type: "Flight",
              name: leadName,
              email: leadEmail,
              phone: leadPhone,
              from: flightFrom,
              to: flightTo,
              departure,
              returnDate: tripType === "oneway" ? "" : returnDate,
              passengers: flightPaxSummary(),
              cabin,
            }
          : activeTab === "hotel"
            ? {
                type: "Hotel",
                name: leadName,
                email: leadEmail,
                phone: leadPhone,
                from: hotelDest,
                to: "Hotel Stay",
                departure: hotelCheckIn,
                returnDate: hotelCheckOut,
                passengers: hotelPaxSummary(),
                cabin: "",
              }
            : {
                type: "Combo",
                name: leadName,
                email: leadEmail,
                phone: leadPhone,
                from: comboFrom,
                to: comboTo,
                departure: comboDep,
                returnDate: comboRet,
                passengers: comboPaxSummary(),
                cabin: `Hotel: ${comboHotelCity}`,
              };

      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- RESET ALL FIELDS ----------
  const resetAll = () => {
    setSubmitted(false);
    setShowLeadForm(false);
    setSummaryText("");

    // Lead Form reset
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");

    // Flight Form reset
    setTripType("round");
    setFlightFrom("");
    setFlightTo("");
    setDeparture("");
    setReturnDate("");
    setFlightPax({ adults: 1, children: 0, infants: 0 });
    setCabin("Economy");

    // Hotel Form reset
    setHotelDest("");
    setHotelCheckIn("");
    setHotelCheckOut("");
    setHotelPax({ adults: 2, children: 0, rooms: 1 });

    // Combo Form reset
    setComboFrom("");
    setComboTo("");
    setComboDep("");
    setComboRet("");
    setComboHotelCity("");
    setComboCheckIn("");
    setComboCheckOut("");
    setComboPax({ guests: 2, rooms: 1 });
  };

  // ---------- RENDER ----------
  return (
    <section
      id="search-widget"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 sm:-mt-28 relative z-30"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => switchTab("flight")}
            className={tabClass("flight")}
          >
            <i className="fa-solid fa-plane text-xs" /> Flight
          </button>
          <button
            type="button"
            onClick={() => switchTab("hotel")}
            className={tabClass("hotel")}
          >
            <i className="fa-solid fa-hotel text-xs" /> Hotel
          </button>
          <button
            type="button"
            onClick={() => switchTab("combo")}
            className={tabClass("combo")}
          >
            <i className="fa-solid fa-suitcase text-xs" /> Flight + Hotel{" "}
            <span className="bg-amber-400 text-slate-900 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              Save 20%
            </span>
          </button>
        </div>

        {/* ---------- FLIGHT FORM ---------- */}
        {activeTab === "flight" && !showLeadForm && !submitted && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex items-center gap-6 mb-2 text-xs font-bold text-slate-700">
              {(["round", "oneway", "multicity"] as const).map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="tripType"
                    value={t}
                    checked={tripType === t}
                    onChange={() => setTripType(t)}
                    className="accent-brandPink-500"
                  />
                  <span>
                    {t === "round"
                      ? "Round Trip"
                      : t === "oneway"
                        ? "One Way"
                        : "Multi-City"}
                  </span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  From
                </label>
                <div className="relative">
                  <i className="fa-solid fa-plane-departure absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    placeholder="Departure City"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  To
                </label>
                <div className="relative">
                  <i className="fa-solid fa-location-dot absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    placeholder="Arrival City"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Departure
                </label>
                <div className="relative">
                  <i className="fa-solid fa-calendar-days absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="date"
                    required
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Return
                </label>
                <div className="relative">
                  <i className="fa-solid fa-calendar-check absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="date"
                    disabled={tripType === "oneway"}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500 ${
                      tripType === "oneway"
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div className="lg:col-span-1 relative">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Passengers &amp; Class
                </label>
                <button
                  type="button"
                  data-popover-trigger="true"
                  onClick={() =>
                    setOpenPopover(openPopover === "flight" ? null : "flight")
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500 flex items-center justify-between text-left"
                >
                  <span className="truncate">{flightPaxSummary()}</span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-1" />
                </button>
                <i className="fa-solid fa-user-group absolute left-3.5 bottom-3.5 text-slate-400 text-xs pointer-events-none" />

                {openPopover === "flight" && (
                  <div
                    id="flight-pax-popover"
                    className="absolute right-0 sm:left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                  >
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Adults
                        </div>
                        <div className="text-[10px] text-slate-400">
                          12+ years
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateFlightPax("adults", -1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {flightPax.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateFlightPax("adults", 1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Children
                        </div>
                        <div className="text-[10px] text-slate-400">
                          2-11 years
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateFlightPax("children", -1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {flightPax.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateFlightPax("children", 1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Infants
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Under 2 years
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateFlightPax("infants", -1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {flightPax.infants}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateFlightPax("infants", 1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandPink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="pt-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Cabin Class
                      </label>
                      <select
                        value={cabin}
                        onChange={(e) => setCabin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
                      >
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenPopover(null)}
                      className="w-full mt-3 bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-xs py-2 rounded-xl transition"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-pink-orange-gradient hover:opacity-95 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-pink-glow transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-magnifying-glass" /> Search Flights
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ---------- HOTEL FORM ---------- */}
        {activeTab === "hotel" && !showLeadForm && !submitted && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Destination / Hotel
                </label>
                <div className="relative">
                  <i className="fa-solid fa-hotel absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="text"
                    required
                    value={hotelDest}
                    onChange={(e) => setHotelDest(e.target.value)}
                    placeholder="City or Hotel Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <i className="fa-solid fa-calendar-check absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="date"
                    required
                    value={hotelCheckIn}
                    onChange={(e) => setHotelCheckIn(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Check-out Date
                </label>
                <div className="relative">
                  <i className="fa-solid fa-calendar-xmark absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="date"
                    required
                    value={hotelCheckOut}
                    onChange={(e) => setHotelCheckOut(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                  />
                </div>
              </div>

              <div className="lg:col-span-1 relative">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Guests &amp; Rooms
                </label>
                <button
                  type="button"
                  data-popover-trigger="true"
                  onClick={() =>
                    setOpenPopover(openPopover === "hotel" ? null : "hotel")
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500 flex items-center justify-between text-left"
                >
                  <span className="truncate">{hotelPaxSummary()}</span>
                  <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 ml-1" />
                </button>
                <i className="fa-solid fa-bed absolute left-3.5 bottom-3.5 text-slate-400 text-xs pointer-events-none" />

                {openPopover === "hotel" && (
                  <div
                    id="hotel-pax-popover"
                    className="absolute right-0 sm:left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                  >
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-800">
                        Adults
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateHotelPax("adults", -1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {hotelPax.adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateHotelPax("adults", 1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-800">
                        Children
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateHotelPax("children", -1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {hotelPax.children}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateHotelPax("children", 1, 0)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="text-xs font-bold text-slate-800">
                        Rooms
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateHotelPax("rooms", -1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {hotelPax.rooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateHotelPax("rooms", 1, 1)}
                          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-brandOrange-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpenPopover(null)}
                      className="w-full mt-3 bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold text-xs py-2 rounded-xl transition"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-orange-gradient hover:opacity-95 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-orange-glow transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-magnifying-glass" /> Search Hotels
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ---------- COMBO FORM ---------- */}
        {activeTab === "combo" && !showLeadForm && !submitted && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-extrabold text-slate-800">
                <span className="w-6 h-6 rounded-full bg-brandPink-500 text-white flex items-center justify-center text-xs">
                  <i className="fa-solid fa-tags" />
                </span>
                Combo Deal: Save up to 20% on Embassy-Compliant Flight &amp;
                Hotel Bookings!
              </div>
              <span className="text-[11px] font-bold text-brandOrange-600 bg-white px-3 py-1 rounded-full shadow-sm">
                Instant Embassy Voucher
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-extrabold text-brandPink-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-plane" /> 1. Flight Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      From
                    </label>
                    <input
                      type="text"
                      required
                      value={comboFrom}
                      onChange={(e) => setComboFrom(e.target.value)}
                      placeholder="Departure City"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      To
                    </label>
                    <input
                      type="text"
                      required
                      value={comboTo}
                      onChange={(e) => setComboTo(e.target.value)}
                      placeholder="Destination City"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Departure
                    </label>
                    <input
                      type="date"
                      required
                      value={comboDep}
                      onChange={(e) => setComboDep(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Return
                    </label>
                    <input
                      type="date"
                      required
                      value={comboRet}
                      onChange={(e) => setComboRet(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-extrabold text-brandOrange-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-hotel" /> 2. Hotel Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Hotel Area/City
                    </label>
                    <input
                      type="text"
                      required
                      value={comboHotelCity}
                      onChange={(e) => setComboHotelCity(e.target.value)}
                      placeholder="Destination Area"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Guests &amp; Rooms
                    </label>
                    <button
                      type="button"
                      data-popover-trigger="true"
                      onClick={() =>
                        setOpenPopover(openPopover === "combo" ? null : "combo")
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none flex items-center justify-between"
                    >
                      <span className="truncate">{comboPaxSummary()}</span>
                      <i className="fa-solid fa-chevron-down text-[10px] text-slate-400" />
                    </button>

                    {openPopover === "combo" && (
                      <div
                        id="combo-pax-popover"
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50"
                      >
                        <div className="flex items-center justify-between py-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-800">
                            Guests
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateComboPax("guests", -1, 1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {comboPax.guests}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateComboPax("guests", 1, 1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-xs font-bold text-slate-800">
                            Rooms
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateComboPax("rooms", -1, 1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {comboPax.rooms}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateComboPax("rooms", 1, 1)}
                              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenPopover(null)}
                          className="w-full mt-3 bg-pink-orange-gradient text-white font-bold text-xs py-2 rounded-xl transition"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      required
                      value={comboCheckIn}
                      onChange={(e) => setComboCheckIn(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      required
                      value={comboCheckOut}
                      onChange={(e) => setComboCheckOut(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto bg-pink-orange-gradient hover:opacity-95 text-white font-extrabold text-xs px-10 py-3.5 rounded-xl shadow-pink-glow transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-paper-plane" /> Search Combo Flight +
                Hotel
              </button>
            </div>
          </form>
        )}

        {/* ---------- LEAD FORM ---------- */}
        {showLeadForm && !submitted && (
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 flex items-start gap-3">
              <i className="fa-solid fa-paper-plane text-brandPink-500 mt-0.5" />
              <div className="text-xs font-bold text-slate-800 leading-relaxed">
                {summaryText}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                required
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brandPink-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowLeadForm(false)}
                className="px-6 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-pink-orange-gradient text-white font-extrabold text-xs py-3 rounded-xl shadow-pink-glow disabled:opacity-50 transition"
              >
                {submitting ? "Submitting..." : "Get My Quotation"}
              </button>
            </div>
          </form>
        )}

        {/* ---------- SUCCESS ---------- */}
        {submitted && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <i className="fa-solid fa-check" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              Request Received!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, {leadName}. We will send you a quotation shortly at{" "}
              <strong>{leadEmail}</strong>.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-6 text-xs font-bold text-brandPink-500 hover:underline"
            >
              Submit another request
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
