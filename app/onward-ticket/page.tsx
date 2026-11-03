import PageLayout from "../components/PageLayout";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onward Ticket for Visa & Immigration - Instant Proof",
  description:
    "Get instant onward tickets to prove your intent to leave the country. Required for many visa applications and airport check-ins.",
};

export default function OnwardTicketPage() {
  return (
    <PageLayout
      title="Onward Ticket"
      subtitle="Proof of onward travel for immigration and visa purposes."
    >
      <div className="flex items-center gap-3 mb-4">
        <i className="fa-solid fa-passport text-2xl text-brandOrange-500" />
        <h2 className="m-0">Why do you need it?</h2>
      </div>
      <p>
        Airlines are heavily fined if they fly you to a country you are not
        allowed to enter. An onward ticket proves you intend to leave before
        your visa expires.
      </p>

      <div className="mt-8 p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
        <i className="fa-solid fa-globe text-4xl text-brandOrange-500 mb-3" />
        <h3 className="font-bold text-slate-900 mb-2">
          Get your Onward Ticket
        </h3>
        <Link
          href="/contact"
          style={{ color: "#fff", textDecoration: "none" }}
          className="inline-flex mt-3 bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold text-sm px-8 py-3 rounded-full transition"
        >
          Request Onward Ticket
        </Link>
      </div>
    </PageLayout>
  );
}
