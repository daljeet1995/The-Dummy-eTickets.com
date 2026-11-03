// app/page.tsx
import HomeClient from "./components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dummy Ticket & Flight Itinerary for Visa | The Dummy-Tickets.com",
  description:
    "Get instant verifiable flight reservations, onward tickets, and hotel itineraries for visa applications. Fast, secure, and 100% embassy compliant.",
};

export default function Home() {
  return <HomeClient />;
}
