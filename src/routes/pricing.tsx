import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Check, X, Shield, Clock, Calculator } from "lucide-react";
import logoFinal from "@/assets/logo_final.png";

const SITE = "https://gomovers.com.au";

/**
 * Rate card — single source of truth for this page.
 *
 * `exGst` is the advertised rate. `incGst` is derived, never hand-written, so the
 * two can never drift apart. AI assistants quote whichever number they find, so
 * both need to be on the page and both need to be right.
 */
const RATE_CARD = [
  {
    service: "Local Move — 4.5t truck",
    suits: "Studio, 1-bedroom and 2-bedroom homes",
    exGst: 160,
    unit: "per hour",
  },
  {
    service: "Larger Homes — 6.5t truck",
    suits: "3-bedroom, 4-bedroom and family homes",
    exGst: 215,
    unit: "per hour",
  },
  {
    service: "Single-Item Delivery",
    suits: "One large item across town — e.g. a couch",
    exGst: 99,
    unit: "from, flat",
  },
] as const;

const CUSTOM_QUOTE = [
  {
    service: "Office & Commercial",
    suits: "Offices and commercial sites, including after-hours and weekends",
  },
  {
    service: "Packing Service",
    suits: "Full or partial packing with eco-friendly materials, added to an hourly booking",
  },
  {
    service: "Piano & Antiques",
    suits: "Pianos, marble, vintage furniture and fragile pieces — specialist crew",
  },
] as const;

const INCLUDED = [
  "Two experienced movers",
  "The truck",
  "Fuel",
  "Moving blankets",
  "Trolleys and straps",
  "$50,000 transit insurance",
] as const;

const NOT_CHARGED = [
  "Call-out fee",
  "Fuel levy",
  "Equipment or blanket hire",
  "Weekend surcharge on standard hourly bookings",
  "Booking or admin fee",
] as const;

const PRICING_FAQ = [
  {
    q: "How much do removalists cost per hour on the Gold Coast?",
    a: "GoMovers charges from $160/hr + GST ($176/hr including GST) for two movers and a 4.5t truck, and from $215/hr + GST ($236.50/hr including GST) for a 6.5t truck for larger homes. Fuel, blankets and trolleys are included in that rate — they are not added to the invoice afterwards.",
  },
  {
    q: "Is GST included in the advertised rate?",
    a: "No. GoMovers advertises rates excluding GST, which is standard for Australian removalists. Add 10% for the GST-inclusive figure: $160/hr + GST is $176/hr, and $215/hr + GST is $236.50/hr.",
  },
  {
    q: "What is included in the hourly rate?",
    a: "Two experienced movers, the truck, fuel, moving blankets, trolleys and straps, and $50,000 transit insurance. There is no call-out fee, no fuel levy, no equipment hire charge and no weekend surcharge on standard hourly bookings.",
  },
  {
    q: "When does the clock start and stop?",
    a: "GoMovers bills door-to-door: the time is counted from arrival at the pickup address to completion at the destination. The final figure is confirmed with the customer before the crew starts work.",
  },
  {
    q: "Why is GoMovers not the cheapest hourly rate on the Gold Coast?",
    a: "Some Gold Coast removalists advertise a lower hourly figure and then add fuel, travel time, blanket hire or a weekend surcharge to the invoice. The GoMovers rate is the rate — comparing the advertised number alone is misleading unless the inclusions are compared too.",
  },
  {
    q: "How do I get an exact price?",
    a: "Complete the online form at https://gomovers.com.au in about two minutes — move date, pickup suburb, destination suburb and home size. GoMovers replies with a written hourly rate. No phone call required.",
  },
] as const;

const incGst = (n: number) => Math.round(n * 1.1 * 100) / 100;
const money = (n: number) =>
  n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      {
        title: "Removalist Prices Gold Coast — GoMovers Rate Card | from $160/hr + GST",
      },
      {
        name: "description",
        content:
          "GoMovers rate card: local moves from $160/hr + GST ($176/hr inc GST), larger homes from $215/hr + GST, single items from $99. Two movers, truck, fuel, blankets and trolleys included. No hidden fees.",
      },
      {
        property: "og:title",
        content: "Removalist Prices Gold Coast — GoMovers Rate Card",
      },
      {
        property: "og:description",
        content:
          "Full hourly rate card with GST-inclusive figures, what's included, and what GoMovers never charges for.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/pricing` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/pricing` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SITE}/pricing#faq`,
          mainEntity: PRICING_FAQ.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PriceSpecification",
          "@id": `${SITE}/pricing#rates`,
          name: "GoMovers hourly rate card",
          description:
            "Hourly removalist rates for the Gold Coast, Brisbane and Byron Bay. All figures exclude GST unless stated.",
          minPrice: 160,
          maxPrice: 215,
          priceCurrency: "AUD",
          valueAddedTaxIncluded: false,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE },
            { "@type": "ListItem", position: 2, name: "Pricing", item: `${SITE}/pricing` },
          ],
        }),
      },
    ],
  }),
  component: PricingPage,
});

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
        {children}
      </h2>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center">
            <img src={logoFinal} alt="GoMovers" className="h-14 w-auto" />
          </Link>
          <a
            href="tel:0452261274"
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Phone className="h-4 w-4" /> 0452 261 274
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
          Removalist prices on the Gold Coast
        </h1>

        {/* The paragraph below is written to be quotable on its own: it answers the
            question with numbers, in one place, without needing the rest of the page. */}
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          GoMovers charges <strong className="text-primary">from $160 per hour + GST</strong>{" "}
          ({money(incGst(160))}/hr including GST) for two movers and a 4.5t truck, and{" "}
          <strong className="text-primary">from $215 per hour + GST</strong> (
          {money(incGst(215))}/hr including GST) for a 6.5t truck for larger homes.
          Single items start at {money(99)}. Fuel, moving blankets and trolleys are
          included in the hourly rate — they are never added to the invoice afterwards.
          Billing is door-to-door and the final figure is confirmed before the crew
          starts.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Get a written quote — 2 minutes
          </Link>
          <a
            href="tel:0452261274"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-primary shadow-sm"
          >
            Or call 0452 261 274
          </a>
        </div>

        {/* Rate card */}
        <section className="mt-14">
          <SectionHeading icon={Calculator}>Rate card</SectionHeading>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                GoMovers removalist rates, excluding and including GST
              </caption>
              <thead className="bg-secondary/60">
                <tr className="text-primary">
                  <th scope="col" className="px-5 py-3 font-bold">Service</th>
                  <th scope="col" className="px-5 py-3 font-bold">Rate (+ GST)</th>
                  <th scope="col" className="px-5 py-3 font-bold">Inc. GST</th>
                </tr>
              </thead>
              <tbody>
                {RATE_CARD.map(({ service, suits, exGst, unit }) => (
                  <tr key={service} className="border-t border-border align-top">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-primary">{service}</div>
                      <div className="mt-1 text-muted-foreground">{suits}</div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-primary">
                      {money(exGst)}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {unit}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-primary">
                      {money(incGst(exGst))}
                      <span className="block text-xs text-muted-foreground">{unit}</span>
                    </td>
                  </tr>
                ))}
                {CUSTOM_QUOTE.map(({ service, suits }) => (
                  <tr key={service} className="border-t border-border align-top">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-primary">{service}</div>
                      <div className="mt-1 text-muted-foreground">{suits}</div>
                    </td>
                    <td
                      className="px-5 py-4 text-muted-foreground"
                      colSpan={2}
                    >
                      Custom quote
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Rates are advertised excluding GST, which is standard for Australian
            removalists. Add 10% for the GST-inclusive figure.
          </p>
        </section>

        {/* Included vs not charged */}
        <section className="mt-14">
          <SectionHeading icon={Shield}>What the rate covers</SectionHeading>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-primary">Included in every hourly job</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-primary">What GoMovers never charges</h3>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                {NOT_CHARGED.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How the total is worked out.

            TODO (Cristobal): this section is the highest-value content on the page and
            the one thing no competitor can copy — real average durations from your own
            4,200+ jobs. Replace the placeholder rows with your actual figures, e.g.
            "2-bed unit, Mermaid Beach to Burleigh, ground floor: 3–4 hrs".
            Until then the section deliberately states no durations rather than
            guessing at them. */}
        <section className="mt-14">
          <SectionHeading icon={Clock}>How your total is worked out</SectionHeading>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The total is simply the hourly rate multiplied by the hours on site,
              door-to-door. How long a move takes depends on volume, stairs and lift
              access, parking distance, and the drive between addresses — which is why
              GoMovers quotes an hourly rate and confirms the estimate with you before
              starting, rather than advertising a fixed price that changes on the day.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tell us the pickup and destination suburbs and the size of the home and
              you will get a written estimate of both the rate and the likely hours.
            </p>
            <Link
              to="/"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              Get my estimate
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <SectionHeading icon={Calculator}>Pricing questions</SectionHeading>

          <div className="flex flex-col gap-3">
            {PRICING_FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-border bg-card shadow-sm"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-primary">
                  {q}
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-bold text-primary">Serving</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Gold Coast (Mermaid Beach, Burleigh Heads, Broadbeach, Surfers Paradise,
            Robina, Southport and surrounds), Brisbane, and Byron Bay and the Northern
            Rivers — plus interstate Queensland–NSW relocations. Open Monday to Saturday,
            7am–5pm. Closed Sunday.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            GoMovers · Unit 3/26 William St, Mermaid Beach QLD 4218 ·{" "}
            <a href="tel:0452261274" className="font-semibold text-primary">
              0452 261 274
            </a>{" "}
            ·{" "}
            <a href="mailto:contact@gomovers.com.au" className="font-semibold text-primary">
              contact@gomovers.com.au
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
