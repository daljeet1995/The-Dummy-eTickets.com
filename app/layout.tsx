// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TrustBadges from "./components/TrustBadges";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Dummy-Tickets.com - Book Flight & Hotel Reservations for Visa",
  description:
    "Book flight reservations, onward tickets and more with trusted service worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${caveat.variable} font-sans antialiased bg-slate-50 text-slate-800 selection:bg-pink-500 selection:text-white`}
      >
        <Header />
        {children}
        <TrustBadges /> {/* ADD THIS */}
        <Footer />
      </body>
    </html>
  );
}