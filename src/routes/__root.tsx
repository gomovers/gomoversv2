import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

const SITE = "https://gomovers.com.au";

/**
 * Canonical machine-readable description of the business.
 *
 * This is the single source of truth that AI assistants, answer engines and
 * agents read. Keep every figure identical to public/llms.txt and to the
 * visible copy on the page — assistants cross-check, and a contradiction costs
 * more trust than a missing field.
 *
 * All prices are ex-GST (valueAddedTaxIncluded: false).
 */
const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": `${SITE}/#business`,
  name: "GoMovers",
  alternateName: "GoMovers Removals",
  description:
    "Gold Coast removalist serving the Gold Coast, Brisbane and Byron Bay. Honest hourly rates from $160/hr + GST with two movers, the truck, fuel, blankets and trolleys included. Door-to-door billing, fully insured, written quote in about 2 minutes.",
  url: SITE,
  image: `${SITE}/assets/logo_final-0gIALZtD.png`,
  logo: `${SITE}/icon-512.png`,
  telephone: "+61452261274",
  email: "contact@gomovers.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 3/26 William St",
    addressLocality: "Mermaid Beach",
    addressRegion: "QLD",
    postalCode: "4218",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -28.0447,
    longitude: 153.4356,
  },
  hasMap: "https://maps.app.goo.gl/FZpwTAAiWAGw77gd8",
  priceRange: "$160-$215 per hour + GST",
  currenciesAccepted: "AUD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2 },
  areaServed: [
    { "@type": "City", name: "Gold Coast", containedInPlace: { "@type": "State", name: "Queensland" } },
    { "@type": "City", name: "Brisbane", containedInPlace: { "@type": "State", name: "Queensland" } },
    { "@type": "City", name: "Byron Bay", containedInPlace: { "@type": "State", name: "New South Wales" } },
    { "@type": "Place", name: "Northern Rivers, New South Wales" },
    { "@type": "Place", name: "Mermaid Beach, Queensland" },
    { "@type": "Place", name: "Burleigh Heads, Queensland" },
    { "@type": "Place", name: "Broadbeach, Queensland" },
    { "@type": "Place", name: "Surfers Paradise, Queensland" },
    { "@type": "Place", name: "Robina, Queensland" },
    { "@type": "Place", name: "Southport, Queensland" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "00:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "1463",
    reviewCount: "1463",
  },
  // Rate card, machine-readable. This is what lets an assistant compare
  // GoMovers on price instead of skipping it for lack of data.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "GoMovers removal services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Local Move (4.5t truck)",
        description:
          "Studio, 1-bedroom and 2-bedroom homes. Includes 2 experienced movers, the truck, fuel, moving blankets and trolleys. Billed door-to-door.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 160,
          minPrice: 160,
          priceCurrency: "AUD",
          unitCode: "HUR",
          unitText: "per hour",
          valueAddedTaxIncluded: false,
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "HUR" },
        },
        itemOffered: {
          "@type": "Service",
          name: "Local furniture removal",
          serviceType: "Residential furniture removal",
          provider: { "@id": `${SITE}/#business` },
        },
      },
      {
        "@type": "Offer",
        name: "Larger Homes (6.5t truck)",
        description:
          "3-bedroom, 4-bedroom and family homes. More space means fewer trips. Includes 2 movers, the truck, fuel, blankets and trolleys.",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 215,
          minPrice: 215,
          priceCurrency: "AUD",
          unitCode: "HUR",
          unitText: "per hour",
          valueAddedTaxIncluded: false,
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "HUR" },
        },
        itemOffered: {
          "@type": "Service",
          name: "Large home furniture removal",
          serviceType: "Residential furniture removal",
          provider: { "@id": `${SITE}/#business` },
        },
      },
      {
        "@type": "Offer",
        name: "Single-Item Delivery",
        description:
          "One large item moved across town — for example a couch bought on Marketplace.",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 99,
          priceCurrency: "AUD",
          valueAddedTaxIncluded: false,
        },
        itemOffered: {
          "@type": "Service",
          name: "Single-item furniture delivery",
          serviceType: "Furniture delivery",
          provider: { "@id": `${SITE}/#business` },
        },
      },
      {
        "@type": "Offer",
        name: "Office & Commercial Removals",
        description:
          "Office and commercial relocations, including after-hours and weekend moves so the team is back at work Monday morning. Quoted per job.",
        itemOffered: {
          "@type": "Service",
          name: "Office and commercial relocation",
          serviceType: "Commercial relocation",
          provider: { "@id": `${SITE}/#business` },
        },
      },
      {
        "@type": "Offer",
        name: "Packing Service",
        description:
          "Full or partial packing with eco-friendly materials. Added to an hourly booking.",
        itemOffered: {
          "@type": "Service",
          name: "Packing and unpacking",
          serviceType: "Packing service",
          provider: { "@id": `${SITE}/#business` },
        },
      },
      {
        "@type": "Offer",
        name: "Piano & Antiques",
        description:
          "Specialist crews for pianos, marble, vintage furniture and fragile pieces. Quoted per job.",
        itemOffered: {
          "@type": "Service",
          name: "Piano and antique removal",
          serviceType: "Specialty item removal",
          provider: { "@id": `${SITE}/#business` },
        },
      },
    ],
  },
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Transit insurance",
      value: "Fully insured up to AUD $50,000 on every move",
    },
    {
      "@type": "PropertyValue",
      name: "Included in the hourly rate",
      value: "2 experienced movers, truck, fuel, moving blankets and trolleys",
    },
    {
      "@type": "PropertyValue",
      name: "Hidden fees",
      value: "None. No call-out fee, no fuel levy, no equipment charge, no weekend surcharge on standard hourly bookings.",
    },
    {
      "@type": "PropertyValue",
      name: "Billing method",
      value: "Hourly, door-to-door. Final figure confirmed before the crew starts.",
    },
    {
      "@type": "PropertyValue",
      name: "Moves completed",
      value: "4200+",
    },
    {
      "@type": "PropertyValue",
      name: "Cannot be moved",
      value: "Asbestos, batteries, chemicals, explosives, flammables, paint, toxic waste, weapons, tyres, marble slabs (Australian transport regulations).",
    },
  ],
  potentialAction: {
    "@type": "ReserveAction",
    name: "Get a written quote",
    description: "Online quote form, about 2 minutes, written hourly rate by email.",
    target: {
      "@type": "EntryPoint",
      urlTemplate: SITE,
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: { "@type": "Reservation", name: "Removal booking" },
  },
  sameAs: [
    "https://www.airtasker.com/users/cristobal-c-6158778/",
    "https://maps.app.goo.gl/FZpwTAAiWAGw77gd8",
    "https://www.instagram.com/gomoversremoval/",
    "https://www.facebook.com/gomoversremovalservices",
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "GoMovers",
  inLanguage: "en-AU",
  publisher: { "@id": `${SITE}/#business` },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GoMovers — Gold Coast & Brisbane Removalists | from $160/hr" },
      { name: "description", content: "Honest hourly rates from $160/hr + GST. 2 movers + truck. Door-to-door billing. Fully insured. Rated 4.9 from 1,463 reviews across Airtasker and Google. Serving Gold Coast, Brisbane & Byron Bay." },
      { name: "author", content: "GoMovers" },
      { property: "og:title", content: "GoMovers — Gold Coast & Brisbane Removalists | from $160/hr" },
      { property: "og:description", content: "Honest hourly rates from $160/hr + GST. 2 movers + truck, fuel & blankets included. 4.9 stars from 1,463 reviews. Book online in 2 minutes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gomovers.com.au" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@GoMoversAU" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://gomovers.com.au/" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(BUSINESS_SCHEMA) },
      { type: "application/ld+json", children: JSON.stringify(WEBSITE_SCHEMA) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
              {/* Meta Pixel Code - GoMovers */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','27379141638344500');fbq('track','PageView');",
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=27379141638344500&ev=PageView&noscript=1" />',
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
