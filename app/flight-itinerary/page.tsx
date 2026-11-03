import PageLayout from "@/app/components/PageLayout";
import Link from "next/link";

export const metadata = { title: "Flight Itinerary | The Dummy-Tickets.com" };

export default function FlightItineraryPage() {
  return (
    <PageLayout title="Flight Itinerary" subtitle="Complete day-by-day flight documents.">
      <p>
        A flight itinerary is a detailed document showing your entire travel schedule. Unlike a simple reservation, an itinerary often covers multi-city or round-trip journeys and is required for visas like the Schengen Visa.
      </p>
      
      <h2>What does it include?</h2>
      <ul>
        <li>All flight numbers and airlines</li>
        <li>Exact departure and arrival times</li>
        <li>Layover details (if any)</li>
        <li>Valid PNR</li>
      </ul>

      <p>
        We generate itineraries that perfectly match embassy requirements. If the embassy asks for a "day-to-day itinerary," this document provides exactly that.
      </p>

      <div className="mt-8 p-6 bg-slate-100 rounded-2xl border border-slate-200 text-center">
        <h3 className="font-bold text-slate-900 mb-2">Need a Flight Itinerary?</h3>
        <Link href="/contact" className="inline-flex bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-sm px-8 py-3 rounded-full transition">
          Get Flight Itinerary
        </Link>
      </div>
    </PageLayout>
  );
}