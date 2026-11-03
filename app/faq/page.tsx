// app/faq/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  // State to handle which FAQ is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What exactly is a dummy ticket?",
      answer:
        "A dummy ticket is a flight reservation that is not paid for, meaning it will automatically cancel after a certain period (usually 24-48 hours). However, it gives you a valid PNR (Passenger Name Record) and itinerary, which is exactly what embassies need to see to prove your intent to leave the country.",
    },
    {
      question: "Is it valid for visa applications?",
      answer:
        "Yes. Embassies generally require an onward or return ticket to ensure you don't overstay. Our dummy tickets show a valid reservation that they can verify. However, we always recommend checking specific requirements for your visa type.",
    },
    {
      question: "How long does it take to receive my ticket?",
      answer:
        "We provide instant delivery. Once your payment is confirmed (or our team confirms the booking), you will receive the itinerary PDF and PNR via email within 10-15 minutes.",
    },
    {
      question: "Do I need to pay for the actual flight?",
      answer:
        "No, you only pay our service fee for generating the reservation. You do not pay the airline's full ticket price. If your visa is approved, you can book your actual flights separately.",
    },
    {
      question: "Can the airline cancel my PNR?",
      answer:
        "Yes, since the ticket isn't paid for, the airline will auto-cancel it in their system after 24-72 hours. This is completely normal. By that time, embassies usually only need the printed PDF to process your application.",
    },
    {
      question: "What if the embassy tries to verify the ticket?",
      answer:
        "They might check the PNR on the airline's website. Because we generate real reservations, the PNR will show as valid during the reservation window (usually 24-48 hours).",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-100 pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Frequently Asked{" "}
            <span className="text-brandPink-500">Questions</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
            Got questions about our dummy tickets? We've got answers. If you
            can't find what you're looking for, feel free to contact us.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-brandPink-300 shadow-md shadow-brandPink-500/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-brandPink-500 text-white rotate-180"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <i className="fa-solid fa-chevron-down text-xs" />
                  </span>
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl p-8 text-center border border-pink-100">
          <div className="w-12 h-12 bg-white text-brandPink-500 rounded-full flex items-center justify-center text-xl mx-auto mb-3 shadow-sm">
            <i className="fa-solid fa-headset" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-xs text-slate-500 mb-5 max-w-sm mx-auto">
            Can't find the answer you're looking for? Our support team is
            available 24/7 to help you out.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition transform hover:-translate-y-0.5"
          >
            Contact Support{" "}
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
      </section>
    </main>
  );
}
