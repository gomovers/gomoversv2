import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import heroMover from "@/assets/hero-mover.jpg";
import logoFinal from "@/assets/logo_final.png";
import { Truck, Home, Building2, Package, Piano, Sofa, Shield, Star, Phone, ArrowLeft, Calendar, MapPin, User, Mail, ChevronLeft, ChevronRight, Instagram, Facebook } from "lucide-react";
import { createBooking } from "@/server/createBooking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Book a Move — GoMovers | Gold Coast · Brisbane · Byron Bay" },
      { name: "description", content: "Honest hourly rates from $150/hr. 2 movers + truck. Door-to-door billing. Fully insured. 1,447+ five-star reviews." },
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

type ReviewSource = "Airtasker" | "Google";

const reviews: { name: string; source: ReviewSource; text: string }[] = [
  {
    name: "Jason T.",
    source: "Airtasker",
    text: "These guys were exceptional! They went over and above, nothing was too much hassle. We moved from Manly — a house with lots of stairs, they moved our entire house, piano, white goods, all boxes etc, and drove to Tallebudgera valley. They were lovely to our baby too. Highly recommend and will use again!",
  },
  {
    name: "Marie Luise von Koeller",
    source: "Google",
    text: "I relocated from Gold Coast to Brisbane and they offered the best and most reliable service. They got in on time, were very detail-oriented with my things, clean, organized and efficient. Everything came perfect! Really recommend for anyone looking to move!",
  },
  {
    name: "Nikki V.",
    source: "Airtasker",
    text: "Thanks so much Cristobal for arriving early, working hard in the heavy rain, and being flexible to take some things to storage and donation. Great job team!",
  },
  {
    name: "Albert Averdunk",
    source: "Google",
    text: "Best movers ever, always on time, wrap sensitive furniture, and very friendly.",
  },
  {
    name: "Esther-Jeff L.",
    source: "Airtasker",
    text: "Arrived on time and able to move everything within the quoted hours. Communication was very easy. Definitely recommend!",
  },
  {
    name: "Simone Bennett-Smith",
    source: "Google",
    text: "I have complete confidence in recommending Gomovers — I have used the team several times over the past six months to move a large family home filled with heavy furniture: antique pieces, large cabinets, delicate art works and fragile items…",
  },
  {
    name: "Freddie J.",
    source: "Airtasker",
    text: "Cristobal and Vini were awesome — did a great job and would highly recommend them!!",
  },
  {
    name: "Pruthvi R.",
    source: "Airtasker",
    text: "They are really great guys. I would highly recommend.",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <img src={logoFinal} alt="GoMovers" className="h-14 w-auto" />
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

function SocialProofBadges() {
  return (
    <div className="mt-10 hidden flex-wrap items-center justify-center gap-4 lg:flex">
      <a
        href="https://www.airtasker.com/users/cristobal-c-6158778/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-2xl border border-brand bg-card px-5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <Star className="h-5 w-5 fill-current text-brand" />
        <span className="text-sm font-bold text-primary">4.9 on Airtasker</span>
        <span className="text-sm text-muted-foreground">· 1,447 reviews</span>
      </a>
      <a
        href="https://maps.app.goo.gl/FZpwTAAiWAGw77gd8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
      >
        <Star className="h-5 w-5 fill-current text-brand" />
        <span className="text-sm font-bold text-primary">4.9 on Google</span>
        <span className="text-sm text-muted-foreground">· 16 reviews</span>
      </a>
    </div>
  );
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}

function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      emblaApi?.scrollNext();
    }, 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      startAutoplay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, isPaused, startAutoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
            <Star className="h-5 w-5 fill-current text-brand" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
            What our customers say
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm transition hover:border-brand hover:text-brand"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-primary shadow-sm transition hover:border-brand hover:text-brand"
            aria-label="Next review"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={emblaRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_100%] px-1 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="mx-2 flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current text-brand" />
                    ))}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      review.source === "Airtasker"
                        ? "bg-brand text-brand-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {review.source}
                  </span>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  "{review.text}"
                </p>
                <p className="text-sm font-bold text-primary">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <IndexPage />
  );
}

type ServiceId = typeof services[number]["id"];

function BookingPanel() {
  const [selected, setSelected] = useState<ServiceId | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await createBooking({
        data: {
          service: selected!,
          origin: fd.get("origin") as string,
          destination: fd.get("destination") as string,
          size: fd.get("size") as string,
          preferred_date: fd.get("date") as string,
          name: fd.get("name") as string,
          phone: fd.get("phone") as string,
          email: fd.get("email") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (selected) {
    const svc = services.find((s) => s.id === selected)!;
    const Icon = svc.icon;
    return (
      <div>
        <button
          onClick={() => { setSelected(null); setSubmitted(false); }}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" /> Back to services
        </button>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-secondary p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step 2 of 2</p>
            <h3 className="font-bold text-primary">{svc.title}</h3>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
              ✓
            </div>
            <h3 className="mt-3 text-lg font-bold text-primary">Request received</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We'll text you a confirmed hourly rate within 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field icon={MapPin} label="Pick-up suburb" name="origin" placeholder="e.g. Mermaid Beach" />
            <Field icon={MapPin} label="Drop-off suburb" name="destination" placeholder="e.g. Burleigh Heads" />

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Move size" name="size">
                <option value="">Select size</option>
                <option>Studio</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3 Bedrooms</option>
                <option>4+ Bedrooms</option>
                <option>Office</option>
              </SelectField>
              <Field icon={Calendar} label="Preferred date" name="date" type="date" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={User} label="Your name" name="name" placeholder="Full name" />
              <Field icon={Phone} label="Phone" name="phone" type="tel" placeholder="04xx xxx xxx" />
            </div>

            <Field icon={Mail} label="Email" name="email" type="email" placeholder="you@example.com" />

            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 rounded-xl bg-brand px-5 py-3 text-base font-bold text-brand-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? "Sending…" : "See my hourly rate →"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              No phone calls. No spam. Just a written quote in your inbox.
            </p>
          </form>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
          <Truck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Step 1 of 2</p>
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
            Select your service
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {services.map(({ id, icon: Icon, title, desc, price }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition group-hover:bg-brand group-hover:text-brand-foreground">
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-bold text-primary">{title}</h3>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {price}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, name, type = "text", placeholder }: { icon: React.ComponentType<{ className?: string }>; label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}

function SelectField({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <select
        name={name}
        required
        className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-primary outline-none focus:border-brand"
      >
        {children}
      </select>
    </label>
  );
}

function IndexPage() {
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
                4.9 · 1,447 reviews
              </span>
            </div>
          </div>

          {/* Mobile-only compact badges — sits between hero and booking on small screens */}
          <div className="flex gap-2 lg:hidden">
            <a
              href="https://www.airtasker.com/users/cristobal-c-6158778/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand bg-card px-3 py-2 shadow-sm transition active:scale-95"
            >
              <Star className="h-3.5 w-3.5 shrink-0 fill-current text-brand" />
              <span className="text-[13px] font-bold text-primary">4.9 Airtasker</span>
              <span className="text-[13px] text-muted-foreground">· 1,447</span>
            </a>
            <a
              href="https://maps.app.goo.gl/FZpwTAAiWAGw77gd8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 shadow-sm transition hover:border-brand active:scale-95"
            >
              <Star className="h-3.5 w-3.5 shrink-0 fill-current text-brand" />
              <span className="text-[13px] font-bold text-primary">4.9 Google</span>
              <span className="text-[13px] text-muted-foreground">· 16</span>
            </a>
          </div>

          {/* RIGHT: Service selector */}
          <div className="flex flex-col lg:col-start-2">
            <BookingPanel />

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-secondary p-4 sm:grid-cols-4">
              {[
                { label: "1,447 5-star reviews", icon: Star },
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

        {/* Social proof badges */}
        <SocialProofBadges />

        {/* Testimonials carousel — client-only: embla needs DOM */}
        <ClientOnly><TestimonialsCarousel /></ClientOnly>

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
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 GoMovers Australia · Based in Gold Coast &amp; Brisbane</span>
            <div className="flex items-center gap-4">
              <span>📞 0452 261 274 · Mon–Sat 7am–5pm · Sunday closed</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/gomoversremoval/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GoMovers on Instagram"
                  className="text-primary-foreground/70 transition hover:text-brand"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/gomoversremovalservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GoMovers on Facebook"
                  className="text-primary-foreground/70 transition hover:text-brand"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
