// app/contact/page.tsx
import SearchWidget from "@/app/components/SearchWidget";

export const metadata = { title: "Contact Us | The Dummy-Tickets.com" };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-100 pt-16 pb-12 relative">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Contact Us
          </h1>
          <p className="text-slate-500 mt-3 text-sm max-w-2xl mx-auto">
            Need a dummy ticket, itinerary, or a quick quote? Fill the form
            below and we'll get back to you shortly.
          </p>
        </div>
      </section>

      {/* The SearchWidget is designed to overlap the hero, so we give it space here */}
      <div className="pt-24 pb-20">
        <SearchWidget />
      </div>

      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-pink-100 text-brandPink-500 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
              <i className="fa-solid fa-envelope" />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1">Email Us</h3>
            <a
              href="mailto:i2techagency@gmail.com"
              className="text-sm text-brandPink-500 hover:underline"
            >
              i2techagency@gmail.com
            </a>
          </div>
          <div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
              <i className="fa-brands fa-whatsapp" />
            </div>
            <h3 className="font-extrabold text-slate-900 mb-1">WhatsApp</h3>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-600 hover:underline"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
