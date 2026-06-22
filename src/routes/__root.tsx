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
      { name: "description", content: "Honest hourly rates from $160/hr + GST. 2 movers + truck. Door-to-door billing. Fully insured. 1,447+ five-star reviews. Serving Gold Coast, Brisbane & Byron Bay." },
      { name: "author", content: "GoMovers" },
      { property: "og:title", content: "GoMovers — Gold Coast & Brisbane Removalists | from $160/hr" },
      { property: "og:description", content: "Honest hourly rates from $160/hr + GST. 2 movers + truck, fuel & blankets included. 4.9 stars, 1,400+ reviews. Book online in 2 minutes." },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MovingCompany",
          "name": "GoMovers",
          "image": "https://gomovers.com.au/assets/logo_final-0gIALZtD.png",
          "url": "https://gomovers.com.au",
          "telephone": "+61452261274",
          "email": "contact@gomovers.com.au",
          "priceRange": "$$",
          "areaServed": [
            { "@type": "City", "name": "Gold Coast" },
            { "@type": "City", "name": "Brisbane" },
            { "@type": "City", "name": "Byron Bay" },
          ],
          "address": { "@type": "PostalAddress", "addressRegion": "QLD", "addressCountry": "AU" },
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
            "opens": "07:00",
            "closes": "17:00",
          }],
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1463" },
          "sameAs": [
            "https://www.airtasker.com/users/cristobal-c-6158778/",
            "https://maps.app.goo.gl/FZpwTAAiWAGw77gd8",
            "https://www.instagram.com/gomoversremoval/",
            "https://www.facebook.com/gomoversremovalservices",
          ],
        }),
      },
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
