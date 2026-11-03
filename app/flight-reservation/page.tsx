import PageLayout from "@/app/components/PageLayout";
import Link from "next/link";

export const metadata = { title: "Flight Reservation | The Dummy-Tickets.com" };

export default function FlightReservationPage() {
  return (
    <PageLayout title="Flight Reservation" subtitle="Verifiable flight reservations for visa applications.">
      <p>
        Need a flight reservation to prove your travel plans to an embassy? We provide fully verifiable dummy flight reservations that look exactly like real bookings.
      </p>
      
      <h2>How it works</h2>
      <ol>
        <li>Click the button below to go to our contact/booking page.</li>
        <li>Fill in your origin, destination, and travel dates.</li>
        <li>Submit your name and email.</li>
        <li>We will generate your PNR and send the PDF to your email within 15 minutes.</li>
      </ol>

      <div className="mt-8 p-6 bg-pink-50 rounded-2xl border border-pink-100 text-center">
        <h3 className="font-bold text-slate-900 mb-2">Get your Flight Reservation now</h3>
        <p className="text-xs text-slate-600 mb-4">Fill out the short form on our contact page.</p>
        <Link href="/contact" className="inline-flex bg-brandPink-500 hover:bg-brandPink-600 text-white font-bold text-sm px-8 py-3 rounded-full transition">
          Book Flight Reservation
        </Link>
      </div>
    </PageLayout>
  );
}