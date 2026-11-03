// app/components/TrustBadges.tsx
export default function TrustBadges() {
  return (
    <section className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-20 mb-12">
          {/* DMCA */}
          <div className="flex flex-col items-center opacity-90 hover:opacity-100 transition">
            <div className="bg-[#73a724] text-white px-5 py-2.5 rounded-t flex items-center gap-2 border-2 border-b-0 border-[#5c8a19]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm4 9h-2v-3h2v3z" />
              </svg>
              <span className="font-black tracking-wider text-sm mt-0.5">
                DMCA
              </span>
            </div>
            <span className="bg-[#1a1a1a] text-white text-[10px] font-bold px-6 py-1 tracking-widest rounded-b w-full text-center">
              PROTECTED
            </span>
          </div>

          {/* IATA */}
          <div className="flex flex-col items-center opacity-90 hover:opacity-100 transition">
            <svg
              className="w-14 h-14 text-[#0056a8]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="font-black text-2xl tracking-tighter text-[#0056a8] italic mt-1">
              IATA
            </span>
          </div>

          {/* Secure SSL */}
          <div className="flex flex-col items-center opacity-90 hover:opacity-100 transition">
            <div className="bg-[#4caf50] text-white px-5 py-2.5 rounded flex items-center gap-3 shadow-sm border-2 border-[#388e3c]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              <div className="flex flex-col text-left justify-center">
                <span className="font-black text-sm tracking-wider leading-none">
                  SECURE
                </span>
                <span className="text-[8px] font-bold tracking-widest leading-none mt-1">
                  SSL ENCRYPTION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-slate-500 font-bold text-sm mb-5 tracking-wide">
            We accept payments
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Visa */}
            <div className="bg-[#1a1f71] text-white px-5 py-2 rounded shadow-sm hover:scale-105 transition border border-[#12154b] flex items-center justify-center h-10 w-20">
              <span className="font-black italic text-xl tracking-tighter">
                VISA
              </span>
            </div>

            {/* PayPal */}
            <div className="bg-white border border-slate-200 px-4 py-2 rounded shadow-sm hover:scale-105 transition flex items-center gap-1 h-10 w-24 justify-center">
              <svg
                className="w-5 h-5 text-[#003087]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
              </svg>
              <span className="font-bold italic text-sm tracking-tighter text-[#003087]">
                <span className="text-[#009cde]">Pay</span>Pal
              </span>
            </div>

            {/* Mastercard */}
            <div className="bg-[#111111] px-3 py-2 rounded shadow-sm hover:scale-105 transition flex items-center justify-center h-10 w-20">
              <div className="relative flex items-center justify-center w-10 h-6">
                <div className="w-6 h-6 bg-[#eb001b] rounded-full absolute left-0 mix-blend-screen" />
                <div className="w-6 h-6 bg-[#f79e1b] rounded-full absolute right-0 mix-blend-screen" />
              </div>
            </div>

            {/* Google Pay */}
            <div className="bg-[#111111] text-white px-4 py-2 rounded shadow-sm hover:scale-105 transition flex items-center gap-1.5 h-10 w-20 justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-semibold text-sm tracking-wide mt-0.5">
                Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
