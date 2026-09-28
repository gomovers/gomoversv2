import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Star } from "lucide-react";
import { AREAS } from "@/data/areas";
import { SERVICES, getService } from "@/data/services";
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

export const Route = createFileRoute("/services/$service")({
  loader: ({ params }) => {
    const service = getService(params.service);
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData: s }) => {
    if (!s) return {};
    const url = `${SITE}/services/${s.slug}`;
    return {
      meta: [
        { title: s.title },
        { name: "description", content: s.description },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.description },
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
            name: s.h1,
            description: s.description,
            url,
            provider: { "@id": BUSINESS_ID },
            areaServed: [
              { "@type": "City", name: "Gold Coast" },
              { "@type": "City", name: "Brisbane" },
              { "@type": "Place", name: "Northern Rivers, New South Wales" },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: SITE },
              { name: s.name, url },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(url, s.faq)) },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const s = Route.useLoaderData();

  return (
    <SeoLayout>
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> · {s.name}
      </nav>

      <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{s.h1}</h1>
      <p className="mt-3 text-lg font-semibold text-primary">{s.priceLine}</p>

      <div className="mt-5 flex max-w-3xl flex-col gap-4 leading-relaxed text-muted-foreground">
        {s.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <TrustStrip />

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          Get a quote
        </Link>
        <Link
          to="/pricing"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold text-primary shadow-sm"
        >
          See the full rate card
        </Link>
      </div>

      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        {s.points.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-bold text-primary">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-xl font-extrabold text-primary">How it works</h2>
        <ol className="flex max-w-2xl flex-col gap-3">
          {s.howItWorks.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-muted-foreground">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {s.review && (
        <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex gap-1 text-brand">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-3 leading-relaxed text-primary">“{s.review.text}”</blockquote>
          <p className="mt-3 text-sm text-muted-foreground">
            — {s.review.name}, via {s.review.source}
          </p>
        </section>
      )}

      <section className="mt-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-bold text-primary">Always included</h2>
        <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            "Moving blankets, trolleys and straps",
            "$50,000 transit insurance",
            "No call-out fee or fuel levy",
            "Written quote before you book",
          ].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {i}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="mb-6 text-xl font-extrabold text-primary">Questions</h2>
        <FaqList faq={s.faq} />
      </section>

      <QuoteCta />

      <section className="mt-14">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
          Areas we cover
        </h2>
        <div className="flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <Link
              key={a.slug}
              to="/removalists/$area"
              params={{ area: a.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:border-brand"
            >
              {a.name}
            </Link>
          ))}
          {SERVICES.filter((o) => o.slug !== s.slug).map((o) => (
            <Link
              key={o.slug}
              to="/services/$service"
              params={{ service: o.slug }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:border-brand"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </section>
    </SeoLayout>
  );
}
