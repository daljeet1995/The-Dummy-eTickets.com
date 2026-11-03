// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-pink-orange-gradient text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/20 pb-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white text-brandPink-500 flex items-center justify-center text-xl font-bold shadow-md">
              <i className="fa-solid fa-plane-departure" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white">
                The Dummy-Tickets.com
              </div>
              <span className="text-[10px] font-semibold text-white/80 tracking-wider uppercase block">
                Book. Travel. Go Global.
              </span>
            </div>
          </a>

          <nav className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-white/90">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/#search-widget" className="hover:underline">
              Book Flight
            </a>
            <a href="/#services" className="hover:underline">
              Pricing
            </a>
            <a href="/blog" className="hover:underline">
              Blog
            </a>
            <a href="/#why-us" className="hover:underline">
              About Us
            </a>
            <a href="/#testimonials" className="hover:underline">
              FAQ
            </a>
            <a href="/#footer" className="hover:underline">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {["facebook-f", "youtube", "instagram", "linkedin-in"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white hover:text-brandPink-500 flex items-center justify-center text-sm transition"
              >
                <i className={`fa-brands fa-${s}`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-orange-gradient text-white/90 py-4 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>&copy; 2026 TheDummy-Tickets.com. All Rights Reserved.</div>
          <div className="flex gap-4 font-medium">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Terms &amp; Conditions
            </a>
            <span>|</span>
            <a href="#" className="hover:underline">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
