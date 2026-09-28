import { Link } from "@tanstack/react-router";
import { Phone, Star, Shield, Truck } from "lucide-react";
import logoFinal from "@/assets/logo_final.png";
import { AREAS } from "@/data/areas";
import { SERVICES } from "@/data/services";

export const SITE = "https://gomovers.com.au";
export const BUSINESS_ID = `${SITE}/#business`;

/** Shared header + footer for the local SEO pages (areas and services). */
export function SeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src={logoFinal} alt="GoMovers" className="h-12 w-auto sm:h-14" />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:0452261274"
              className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex"
            >
              <Phone className="h-4 w-4" /> 0452 261 274
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>

      <SeoFooter />
    </div>
  );
}

export function TrustStrip() {
  const items = [
    { icon: Star, text: "4.9★ from 1,500+ reviews" },
    { icon: Truck, text: "4,200+ moves" },
    { icon: Shield, text: "Insured to $50,000" },
  ];
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-primary">
      {items.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-brand" /> {text}
        </li>
      ))}
    </ul>
  );
}

export function QuoteCta({ heading = "Get a written quote in 2 minutes" }: { heading?: string }) {
  return (
    <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-extrabold text-primary">{heading}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Tell us the move date, both suburbs and the size of the home. You'll get a written
        hourly rate and estimated hours by email — no phone call needed.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Get my quote
        </Link>
        <a
          href="tel:0452261274"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-primary shadow-sm"
        >
          Call 0452 261 274
        </a>
      </div>
    </section>
  );
}

export function FaqList({ faq }: { faq: readonly { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faq.map(({ q, a }) => (
        <details key={q} className="group rounded-2xl border border-border bg-card shadow-sm">
          <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-primary">
            {q}
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  );
}

export function SeoFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 text-sm sm:grid-cols-3">
        <div>
          <h2 className="mb-3 font-bold">Areas</h2>
          <ul className="flex flex-col gap-1.5">
            {AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/removalists/$area"
                  params={{ area: a.slug }}
                  className="text-primary-foreground/80 hover:text-brand"
                >
                  Removalists {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold">Services</h2>
          <ul className="flex flex-col gap-1.5">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$service"
                  params={{ service: s.slug }}
                  className="text-primary-foreground/80 hover:text-brand"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/pricing" className="text-primary-foreground/80 hover:text-brand">
                Prices &amp; rate card
              </Link>
            </li>
            <li>
              <Link to="/removalists" className="text-primary-foreground/80 hover:text-brand">
                All areas we serve
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-bold">GoMovers</h2>
          <p className="leading-relaxed text-primary-foreground/80">
            Unit 3/26 William St, Mermaid Beach QLD 4218
            <br />
            <a href="tel:0452261274" className="hover:text-brand">0452 261 274</a>
            <br />
            <a href="mailto:contact@gomovers.com.au" className="hover:text-brand">
              contact@gomovers.com.au
            </a>
            <br />
            Mon–Sat 7am–5pm · Sunday closed
          </p>
        </div>
      </div>
    </footer>
  );
}

/** JSON-LD helpers */
export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

export const faqSchema = (url: string, faq: readonly { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
