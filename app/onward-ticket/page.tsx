import PageLayout from "@/app/components/PageLayout";
import Link from "next/link";

export const metadata = { title: "Onward Ticket | The Dummy-Tickets.com" };

export default function OnwardTicketPage() {
  return (
    <PageLayout title="Onward Ticket" subtitle="Proof of onward travel for immigration and visa purposes.">
      <p>
        An onward ticket is a flight reservation showing that you intend to leave the country before your visa or visa-free stay expires. Many countries (like Thailand, Indonesia, and various Latin American countries) require this at the airport check-in or immigration desk.
      </p>
      
      <h2>Why do you need it?</h2>
      <p>
        Airlines are heavily fined if they fly you to a country you are not allowed to enter. Therefore, they strictly check for onward tickets. If you don't have one, they may deny you boarding.
      </p>

      <h2>Our Solution</h2>
      <p>
        We provide instant onward dummy tickets that satisfy these checks. The tickets are active for 24-48 hours, giving you plenty of time to pass immigration.
      </p>

      <div className="mt-8 p-6 bg-orange-50 rounded-2xl border border-orange-100 text-center">
        <h3 className="font-bold text-slate-900 mb-2">Get your Onward Ticket</h3>
        <Link href="/contact" className="inline-flex bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold text-sm px-8 py-3 rounded-full transition">
          Request Onward Ticket
        </Link>
      </div>
    </PageLayout>
  );
}