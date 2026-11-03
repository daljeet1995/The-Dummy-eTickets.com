import PageLayout from "../components/PageLayout";

export const metadata = { title: "About Us | The Dummy-Tickets.com" };

export default function AboutPage() {
  return (
    <PageLayout
      title="About Us"
      subtitle="Your trusted partner for dummy tickets, flight itineraries, and onward travel documents."
    >
      <h2>Who We Are</h2>
      <p>
        At The Dummy-Tickets.com, we simplify the visa application process for travelers worldwide.
        Embassies frequently require proof of onward travel or flight itineraries before granting a visa.
        Buying a real, fully refundable ticket just for this purpose is expensive and risky.
      </p>
      <p>
        We provide <strong>verifiable dummy tickets</strong> (also known as flight itineraries) that are generated using
        real airline schedules. These tickets satisfy embassy requirements and are perfectly valid for your visa application.
      </p>
      
      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>Instant Delivery:</strong> Receive your PNR and itinerary in your inbox within minutes.</li>
        <li><strong>100% Embassy Compliant:</strong> Our tickets are verifiable on airline websites.</li>
        <li><strong>Secure Payments:</strong> We use industry-standard SSL encryption for all transactions.</li>
        <li><strong>24/7 Support:</strong> Our dedicated team is always available via WhatsApp and Email to assist you.</li>
      </ul>
      
      <p>We are proud to have helped thousands of travelers achieve their dreams of global travel.</p>
    </PageLayout>
  );
}