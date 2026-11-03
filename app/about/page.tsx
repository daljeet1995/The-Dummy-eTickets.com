import PageLayout from "../components/PageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Our Story & Mission",
  description:
    "Learn how The Dummy-Tickets.com helps travelers worldwide with verifiable dummy tickets and itineraries for visa applications.",
};

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Your trusted partner for dummy tickets, flight itineraries, and onward travel documents."
    >
      <div className="flex items-center gap-3 mb-4">
        <i className="fa-solid fa-earth-americas text-2xl text-brandPink-500" />
        <h2 className="m-0">Who We Are</h2>
      </div>
      <p>
        At The Dummy-Tickets.com, we simplify the visa application process for
        travelers worldwide. Embassies frequently require proof of onward travel
        or flight itineraries before granting a visa.
      </p>

      <div className="flex items-center gap-3 mt-8 mb-4">
        <i className="fa-solid fa-medal text-2xl text-brandOrange-500" />
        <h2 className="m-0">Why Choose Us?</h2>
      </div>
      <ul>
        <li>
          <i className="fa-solid fa-bolt text-brandPink-500 mr-2"></i>{" "}
          <strong>Instant Delivery:</strong> Receive your PNR and itinerary
          within minutes.
        </li>
        <li>
          <i className="fa-solid fa-shield-check text-brandPink-500 mr-2"></i>{" "}
          <strong>100% Embassy Compliant:</strong> Our tickets are verifiable.
        </li>
        <li>
          <i className="fa-solid fa-lock text-brandPink-500 mr-2"></i>{" "}
          <strong>Secure Payments:</strong> Industry-standard encryption.
        </li>
        <li>
          <i className="fa-solid fa-headset text-brandPink-500 mr-2"></i>{" "}
          <strong>24/7 Support:</strong> Always available via WhatsApp.
        </li>
      </ul>
    </PageLayout>
  );
}
