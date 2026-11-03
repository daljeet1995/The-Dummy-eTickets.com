// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pink-orange-gradient text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Main Footer Row - Grid properly defined */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-white/20 pb-10">
          {/* Column 1: Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 inline-flex">
              <div className="w-10 h-10 rounded-xl bg-white text-brandPink-500 flex items-center justify-center text-xl font-bold shadow-md">
                <i className="fa-solid fa-plane-departure" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white leading-none">
                  The Dummy-Tickets.com
                </div>
                <span className="text-[10px] font-semibold text-white/80 tracking-wider uppercase block mt-1">
                  Book. Travel. Go Global.
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/80 leading-relaxed mb-6">
              We provide dummy tickets, flight itineraries, and onward tickets
              for visa and travel purposes worldwide.
            </p>
            <div className="flex items-center gap-3">
              {["facebook-f", "youtube", "instagram", "linkedin-in"].map(
                (s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-brandPink-500 flex items-center justify-center text-sm transition"
                  >
                    <i className={`fa-brands fa-${s}`} />
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider mb-5 text-white">
              Services
            </h4>
            <ul className="space-y-3 text-xs text-white/90 font-medium">
              <li>
                <Link href="/flight-reservation" className="hover:underline">
                  Flight Reservation
                </Link>
              </li>
              <li>
                <Link href="/onward-ticket" className="hover:underline">
                  Onward Ticket
                </Link>
              </li>
              <li>
                <Link href="/flight-itinerary" className="hover:underline">
                  Flight Itinerary
                </Link>
              </li>
              <li>
                <Link href="/dummy-ticket-sample" className="hover:underline">
                  Dummy Ticket Sample
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider mb-5 text-white">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-white/90 font-medium">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap-page" className="hover:underline">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider mb-5 text-white">
              Legal
            </h4>
            <ul className="space-y-3 text-xs text-white/90 font-medium">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-orange-gradient text-white/90 py-5 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>&copy; 2026 TheDummy-Tickets.com. All Rights Reserved.</div>
          <div className="flex gap-4 font-medium">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link> 
            <span>|</span>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <span>|</span>
            <Link href="/sitemap-page" className="hover:underline">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
