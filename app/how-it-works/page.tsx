// app/how-it-works/page.tsx
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Get Your Dummy Ticket",
  description: "Learn how to get your flight itinerary or dummy ticket for visa in 4 simple steps.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      title: "1. Fill the Search Form",
      desc: "Go to our homepage and fill in your departure city, destination, and travel dates.",
      icon: "fa-magnifying-glass",
      color: "bg-pink-100 text-brandPink-500"
    },
    {
      title: "2. Get a Quotation",
      desc: "Enter your name and email. Our team will calculate the exact price and send you a quotation via WhatsApp or Email within minutes.",
      icon: "fa-file-invoice-dollar",
      color: "bg-orange-100 text-brandOrange-500"
    },
    {
      title: "3. Secure Payment",
      desc: "Once you agree to the quotation, we will send you a secure payment link (Razorpay/Stripe). Pay easily via UPI, Card, or Netbanking.",
      icon: "fa-credit-card",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "4. Instant Delivery",
      desc: "As soon as the payment is successful, your verifiable PNR and PDF itinerary will be generated and sent to your email instantly.",
      icon: "fa-envelope-circle-check",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="bg-brandPink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-3">
            Simple Process
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            How It <span className="text-brandPink-500">Works</span>
          </h1>
          <p className="text-slate-500 text-sm">
            Get your visa-ready travel documents in just 4 easy steps.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center text-2xl ${step.color}`}>
                <i className={`fa-solid ${step.icon}`} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-pink-orange-gradient p-8 rounded-3xl shadow-pink-glow text-white">
          <h3 className="text-2xl font-black mb-2">Ready to get started?</h3>
          <p className="text-sm text-white/90 mb-6">Fill out the form to get your custom quotation now.</p>
          <Link href="/#search-widget" className="inline-flex bg-white text-brandPink-500 font-bold text-sm px-8 py-3 rounded-full hover:scale-105 transition">
            Get Quotation Now
          </Link>
        </div>

      </div>
    </main>
  );
}