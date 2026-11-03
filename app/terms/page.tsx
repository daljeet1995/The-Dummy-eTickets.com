// app/terms/page.tsx
import PageLayout from "../components/PageLayout";

export const metadata = {
  title: "Terms & Conditions | The Dummy-Tickets.com",
  description:
    "Read the terms and conditions for using The Dummy-Tickets.com services.",
};

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms & Conditions"
      subtitle="Last updated: November 2026. Please read these terms carefully before using our services."
    >
      <p>
        Welcome to <strong>The Dummy-Tickets.com</strong>. By accessing our
        website and purchasing our services, you agree to be bound by the
        following Terms and Conditions. If you do not agree with any part of
        these terms, please do not use our services.
      </p>

      <h3>1. Nature of Service (Important)</h3>
      <p>
        We provide flight and hotel reservation documents strictly for{" "}
        <strong>visa application and travel planning purposes</strong>. We do
        not sell actual, confirmed airline tickets. The PNR (Passenger Name
        Record) generated for you is a temporary reservation and will
        automatically expire and be canceled by the airline (usually within 24
        to 72 hours).
      </p>

      <h3>2. No Guarantee of Visa Approval</h3>
      <p>
        Purchasing a dummy ticket or itinerary from us does not, in any way,
        guarantee that your visa will be approved. Visa issuance is solely at
        the discretion of the respective embassy or consulate. We are not liable
        for any visa rejections, financial losses, or travel disruptions.
      </p>

      <h3>3. Validity and Expiration</h3>
      <p>
        You must ensure that you present your dummy ticket to the embassy or
        airline before it expires. We are not responsible if the reservation is
        canceled by the airline before your visa appointment. If the embassy
        requires a longer validity, please inform us at the time of booking.
      </p>

      <h3>4. Accuracy of Information</h3>
      <p>
        You are solely responsible for providing accurate passenger names,
        passport details, and travel dates. We will generate the documents
        exactly as you provide them. We will not issue refunds or replacements
        if errors occur due to incorrect information provided by the customer.
      </p>

      <h3>5. Acceptable Use</h3>
      <p>
        You agree to use our documents for legitimate purposes only. Using our
        dummy tickets for illegal immigration, fraud, or any activity that
        violates airline or government regulations is strictly prohibited. We
        reserve the right to refuse service to anyone at our discretion.
      </p>

      <h3>6. Intellectual Property</h3>
      <p>
        All content on this website, including text, graphics, logos, and the
        design of the generated itineraries, is the property of The
        Dummy-Tickets.com and is protected by copyright laws.
      </p>

      <h3>7. Changes to Terms</h3>
      <p>
        We reserve the right to modify these terms at any time without prior
        notice. Your continued use of the website after any changes indicates
        your acceptance of the new terms.
      </p>

      <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2">
          Questions about our Terms?
        </h4>
        <p className="text-sm text-slate-600 mb-0">
          If you have any questions regarding these Terms & Conditions, please
          contact us at{" "}
          <a
            href="mailto:i2techagency@gmail.com"
            className="text-brandPink-500 font-bold hover:underline"
          >
            i2techagency@gmail.com
          </a>
          .
        </p>
      </div>
    </PageLayout>
  );
}
