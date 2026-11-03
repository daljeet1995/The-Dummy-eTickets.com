import PageLayout from "@/app/components/PageLayout";
import Link from "next/link";

export const metadata = { title: "Sitemap | The Dummy-Tickets.com" };

export default function SitemapPage() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Flight Reservation", href: "/flight-reservation" },
    { name: "Onward Ticket", href: "/onward-ticket" },
    { name: "Flight Itinerary", href: "/flight-itinerary" },
    { name: "Dummy Ticket Sample", href: "/dummy-ticket-sample" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <PageLayout title="Sitemap" subtitle="Find your way around our website.">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-brandPink-500 hover:underline text-lg font-bold flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-right text-xs" /> {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
