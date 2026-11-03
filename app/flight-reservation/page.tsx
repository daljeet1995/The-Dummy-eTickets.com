import PageLayout from "../components/PageLayout";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flight Reservation for Visa - Verifiable Itinerary",
  description:
    "Get a verifiable flight reservation for your visa application. Valid PNR, instant delivery, and 100% embassy compliant.",
};

export default function FlightReservationPage() {
  return (
    <PageLayout
      title="Flight Reservation"
      subtitle="Verifiable flight reservations for visa applications."
    >
      <div className="flex items-center gap-3 mb-4">
        <i className="fa-solid fa-plane-departure text-2xl text-brandPink-500" />
        <h2 className="m-0">How it works</h2>
      </div>
      <ol>
        <li>
          <strong>Search:</strong> Fill in your origin, destination, and dates.
        </li>
        <li>
          <strong>Submit:</strong> Provide your name and email.
        </li>
        <li>
          <strong>Receive:</strong> Get your PNR and PDF within 15 minutes.
        </li>
      </ol>

      <div className="mt-8 p-6 bg-pink-50 rounded-2xl border border-pink-100 text-center">
        <i className="fa-solid fa-ticket text-4xl text-brandPink-500 mb-3" />
        <h3 className="font-bold text-slate-900 mb-2">
          Get your Flight Reservation now
        </h3>
        <Link
          href="/contact"
          className="inline-flex mt-3 bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-sm px-8 py-3 rounded-full transition"
        >
          Book Flight Reservation
        </Link>
      </div>
    </PageLayout>
  );
}
