import PageLayout from "@/app/components/PageLayout";

export const metadata = { title: "Privacy Policy | The Dummy-Tickets.com" };

export default function PrivacyPage() {
  return (
    <PageLayout title="Privacy Policy" subtitle="How we collect, use, and protect your data.">
      <h3>Information We Collect</h3>
      <p>
        When you use our search form, we collect your Name, Email, IP Address, and Country. We also collect the flight/hotel details you search for.
      </p>
      
      <h3>How We Use It</h3>
      <p>
        We use this information solely to contact you with a quotation, process your order, and deliver the digital documents to your email.
      </p>

      <h3>Data Sharing</h3>
      <p>
        We do not sell your personal information to third parties. We only share your name with airlines/hotels for reservation purposes if you place an order.
      </p>

      <h3>Cookies & Analytics</h3>
      <p>
        We may use cookies and Google Analytics to improve our website experience. You can disable cookies in your browser settings.
      </p>
    </PageLayout>
  );
}