import PageLayout from "@/app/components/PageLayout";

export const metadata = { title: "Refund Policy | The Dummy-Tickets.com" };

export default function RefundPage() {
  return (
    <PageLayout title="Refund Policy" subtitle="Please read carefully before purchasing.">
      <h3>Digital Goods Policy</h3>
      <p>
        Because our products are digital documents (PDF itineraries) that are delivered instantly, <strong>all sales are generally final</strong>. Once you have received the document via email, it cannot be "returned."
      </p>
      
      <h3>Eligible for Refund</h3>
      <ul>
        <li>You requested a cancellation within 2 hours of purchase AND we have not yet processed the booking.</li>
        <li>We failed to deliver the document within 24 hours due to a technical error on our side.</li>
      </ul>

      <h3>Not Eligible for Refund</h3>
      <ul>
        <li>Visa rejection (this is outside our control).</li>
        <li>You entered the wrong name or dates.</li>
        <li>The reservation expired before your embassy appointment.</li>
      </ul>

      <p>To request a refund, contact us at i2techagency@gmail.com with your order details.</p>
    </PageLayout>
  );
}