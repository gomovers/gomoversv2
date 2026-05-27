import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroMover from "@/assets/hero-mover.jpg";
import { Truck, Home, Building2, Package, Piano, Sofa, Shield, Star, Phone, ArrowLeft, Calendar, MapPin, User, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Book a Move — GoMovers | Gold Coast · Brisbane · Byron Bay" },
      { name: "description", content: "Honest hourly rates from $150/hr. 2 movers + truck. Door-to-door billing. Fully insured. 1,461+ five-star reviews." },
    ],
  }),
  component: Index,
});

const services = [
  {
    id: "local",
    icon: Home,
    title: "Local Move (4.5t Truck)",
    desc: "Studio, 1-bed and 2-bed homes — 2 movers, fuel, blankets and trolleys included.",
    price: "from $150/hr",
  },
  {
    id: "large",
    icon: Truck,
    title: "Larger Homes (6.5t Truck)",
    desc: "3-bed, 4-bed and family homes. More space, fewer trips, one fixed hourly rate.",
    price: "from $215/hr",
  },
  {
    id: "office",
    icon: Building2,
    title: "Office & Commercial",
    desc: "After-hours and weekend moves so your team is back to work Monday morning.",
    price: "custom quote",
  },
  {
    id: "packing",
    icon: Package,
    title: "Packing Service",
    desc: "Full or partial packing with eco-friendly materials. We pack so you don't have to.",
    price: "add-on",
  },
  {
    id: "piano",
    icon: Piano,
    title: "Piano & Antiques",
    desc: "Specialist crews trained for pianos, marble, vintage furniture and fragile pieces.",
    price: "specialist",
  },
  {
    id: "single",
    icon: Sofa,
    title: "Single-Item Delivery",
    desc: "Sold a couch on Marketplace? We'll move it across town for less than brunch.",
    price: "from $99",
  },
];

const excluded = [
  "Asbestos", "Batteries", "Chemicals", "Explosives",
  "Flammables", "Paint", "Toxic Waste", "Weapons", "Tyres", "Marble Slabs",
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-brand">
            <Truck className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-primary">
            Go<span className="text-brand">Movers</span>
          </span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <a href="tel:0452261274" className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Phone className="h-4 w-4" /> 0452 261 274
          </a>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: Hero image with review badge */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
            <img
              src={heroMover}
              alt="GoMovers truck and mover ready for a Gold Coast removalist job"
              className="h-full max-h-[640px] w-full object-cover"
              width={1280}
              height={1280}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-background/95 px-5 py-3 shadow-lg backdrop-blur">
              <div className="flex items-center gap-1 text-brand">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-primary">
                4.9 · 1,461 reviews
              </span>
            </div>
          </div>

          {/* RIGHT: Service selector */}
          <div className="flex flex-col">
            <BookingPanel />

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary p-4 sm:grid-cols-4">
              {[
                { label: "1,461 5-star reviews", icon: Star },
                { label: "4,200+ moves served", icon: Truck },
                { label: "Fully insured $50k", icon: Shield },
                { label: "Door-to-door billing", icon: Home },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-brand" />
                  <span className="text-xs font-semibold text-primary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Excluded items */}
        <section className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
              Items we can't move
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {excluded.map((item) => (
              <div
                key={item}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-primary">{item}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Australian transport regulations prevent us from moving these. Contact a specialist service.
          </p>
        </section>
      </main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <span>© 2026 GoMovers Australia · Unit 3/26 William St, Mermaid Beach QLD 4218</span>
            <span>📞 0452 261 274 · Open 24 hours</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

