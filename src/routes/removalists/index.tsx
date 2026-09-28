import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { AREAS } from "@/data/areas";
import { SeoLayout, TrustStrip, QuoteCta, SITE, breadcrumbSchema } from "@/components/SeoLayout";

const URL = `${SITE}/removalists`;
const TITLE = "Areas We Serve — Gold Coast, Brisbane & Northern NSW Removalists | GoMovers";
const DESCRIPTION =
  "GoMovers covers the Gold Coast, Brisbane, Logan, the Redlands, Tweed Heads and Byron Bay. Honest hourly rates from $160/hr + GST, fuel and blankets included.";

export const Route = createFileRoute("/removalists/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", url: SITE },
            { name: "Areas", url: URL },
          ]),
        ),
      },
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <SeoLayout>
      <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
        Areas we serve
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
        GoMovers works the whole corridor from Redcliffe and Brisbane down through Logan,
        the Redlands and the Gold Coast, across the border to Tweed Heads and on to Byron Bay
        and the Northern Rivers. Same honest rate everywhere: from $160/hr + GST for two
        movers and a truck, billed door-to-door.
      </p>
      <TrustStrip />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((a) => (
          <Link
            key={a.slug}
            to="/removalists/$area"
            params={{ area: a.slug }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-brand"
          >
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
              <MapPin className="h-3.5 w-3.5" /> {a.region}
            </p>
            <h2 className="mt-2 font-bold text-primary">Removalists {a.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {a.suburbs.slice(0, 5).join(", ")}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        We don't currently service the Sunshine Coast.
      </p>

      <QuoteCta />
    </SeoLayout>
  );
}
