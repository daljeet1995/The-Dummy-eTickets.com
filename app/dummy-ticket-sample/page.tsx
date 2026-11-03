import PageLayout from "@/app/components/PageLayout";

export const metadata = {
  title: "Dummy Ticket Sample | The Dummy-Tickets.com",
};

export default function SamplePage() {
  return (
    <PageLayout
      title="Dummy Ticket Sample"
      subtitle="Here is an example of what our flight itineraries look like."
    >
      <div className="bg-slate-100 rounded-2xl p-4 sm:p-8 flex items-center justify-center border-2 border-dashed border-slate-300 my-6">
        <div className="text-center">
          <i className="fa-solid fa-file-pdf text-6xl text-brandPink-500 mb-4 opacity-50" />
          <h3 className="font-bold text-slate-800">Sample Itinerary PDF</h3>
          <p className="text-sm text-slate-500 mt-2">
            This is a placeholder. In production, you would embed a real PDF
            viewer or image here.
          </p>
          <button className="mt-4 bg-brandPink-500 text-white font-bold text-xs px-6 py-2 rounded-full opacity-50 cursor-not-allowed">
            View PDF
          </button>
        </div>
      </div>
      <h2>What's included?</h2>
      <ul>
        <li>Valid PNR (Passenger Name Record)</li>
        <li>Full flight itinerary (Departure & Arrival)</li>
        <li>Passenger names exactly as requested</li>
        <li>Airline logo and formatting</li>
      </ul>
      <p>
        Ready to get yours? <a href="/contact">Click here to request a quote</a>
        .
      </p>
    </PageLayout>
  );
}
