// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import TrustBadges from "./components/TrustBadges";

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

// GLOBAL SEO CONFIGURATION
export const metadata: Metadata = {
  metadataBase: new URL("https://dummy-tickets-nextjs.vercel.app"), // APNA DOMAIN YAHAN DAALEIN
  title: {
    default:
      "The Dummy-Tickets.com - Book Flight & Hotel Reservations for Visa",
    template: "%s | The Dummy-Tickets.com",
  },
  description:
    "Book flight reservations, onward tickets, hotel bookings, and dummy itineraries for visa purposes with trusted service worldwide.",
  keywords: [
    "dummy ticket",
    "flight reservation for visa",
    "onward ticket",
    "flight itinerary",
    "hotel booking for visa",
    "travel documents",
  ],
  authors: [{ name: "The Dummy-Tickets.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dummy-tickets-nextjs.vercel.app",
    title: "The Dummy-Tickets.com - Book Flight & Hotel Reservations for Visa",
    description:
      "Book flight reservations, onward tickets and more with trusted service worldwide.",
    siteName: "The Dummy-Tickets.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dummy-Tickets.com - Book Flight & Hotel Reservations for Visa",
    description:
      "Book flight reservations, onward tickets and more with trusted service worldwide.",
  },
  icons: {
    icon: "/favicon.ico", // Make sure to place favicon.ico in your public folder
  },
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
        {/* <TrustBadges /> */}
        <Footer />
      </body>
    </html>
  );
}
