import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Check, Route as RouteIcon } from "lucide-react";
import { AREAS, getArea } from "@/data/areas";
import { SERVICES } from "@/data/services";
import {
  SeoLayout,
  TrustStrip,
  QuoteCta,
  FaqList,
  SITE,
  BUSINESS_ID,
  breadcrumbSchema,
  faqSchema,
} from "@/components/SeoLayout";

export const Route = createFileRoute("/removalists/$area")({
  loader: ({ params }) => {
    const area = getArea(params.area);
    if (!area) throw notFound();
    return area;
  },
  head: ({ loaderData: area }) => {
    if (!area) return {};
    const url = `${SITE}/removalists/${area.slug}`;
    return {
      meta: [
        { title: area.title },
        { name: "description", content: area.description },
        { property: "og:title", content: area.title },
        { property: "og:description", content: area.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: `Removalists in ${area.name}`,
            serviceType: "Furniture removal",
            description: area.description,
            url,
            provider: { "@id": BUSINESS_ID },
            areaServed: area.suburbs.map((s) => ({
              "@type": "Place",
              name: `${s}, ${area.state === "QLD" ? "Queensland" : "New South Wales"}`,
            })),
            offers: {
              "@type": "Offer",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 160,
                minPrice: 160,
                priceCurrency: "AUD",
                unitCode: "HUR",
                unitText: "per hour",
                valueAddedTaxIncluded: false,
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE },
              { name: "Areas", url: `${SITE}/removalists` },
              { name: area.name, url },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(url, area.faq)) },
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const area = Route.useLoaderData();
  const nearby = AREAS.filter((a) => a.slug !== area.slug).slice(0, 6);

  return (
    <SeoLayout>
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> ·{" "}
        <Link to="/removalists" className="hover:text-primary">Areas</Link> · {area.name}
      </nav>

      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand">
        <MapPin className="h-4 w-4" /> {area.region}
      </p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        {area.h1}
      </h1>
      <p className="mt-3 text-lg font-semibold text-primary">
        From $160/hr + GST · 2 movers + truck · fuel and blankets included
      </p>

      <div className="mt-5 flex max-w-3xl flex-col gap-4 leading-relaxed text-muted-foreground">
        {area.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <TrustStrip />

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Get a {area.name} quote
        </Link>
        <Link
          to="/pricing"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-primary shadow-sm"
        >
          See the full rate card
        </Link>
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-xl font-extrabold text-primary">
          Moving in {area.name}: what to know
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {area.localNotes.map((n) => (
            <div key={n.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <h3 className="font-bold text-primary">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-primary">What's included in the hourly rate</h2>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            {[
              "Two experienced movers",
              "4.5t truck from $160/hr + GST, or 6.5t from $215/hr + GST",
              "Fuel — no fuel levy",
              "Moving blankets, trolleys and straps",
              "$50,000 transit insurance",
              "Door-to-door billing, no call-out fee",
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-bold text-primary">Suburbs we cover near {area.name}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {area.suburbs.join(" · ")}
          </p>
          <h3 className="mb-2 mt-5 flex items-center gap-2 font-bold text-primary">
            <RouteIcon className="h-4 w-4 text-brand" /> Common moves
          </h3>
          <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
            {area.commonMoves.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-xl font-extrabold text-primary">
          {area.name} removalist questions
        </h2>
        <FaqList faq={area.faq} />
      </section>

      <QuoteCta heading={`Moving in or out of ${area.name}?`} />

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
          Other areas and services
        </h2>
        <div className="flex flex-wrap gap-2">
          {nearby.map((a) => (
            <Link
              key={a.slug}
              to="/removalists/$area"
              params={{ area: a.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:border-brand"
            >
              Removalists {a.name}
            </Link>
          ))}
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$service"
              params={{ service: s.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:border-brand"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>
    </SeoLayout>
  );
}
