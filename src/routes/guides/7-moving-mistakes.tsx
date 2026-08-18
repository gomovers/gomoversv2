import { createFileRoute, Link } from "@tanstack/react-router";
import logoFinal from "@/assets/logo_final.png";
import { ArrowLeft, Phone } from "lucide-react";
import { GuideDownload } from "@/components/GuideDownload";

const mistakes = [
  {
    n: "01",
    title: "Booking Too Late",
    body: "Experienced removalists — especially on the Gold Coast and in Brisbane — get booked weeks ahead, particularly on Fridays, weekends and end-of-month dates when leases turn over. Leaving it to the last minute limits your choice and often means paying more, or finding no truck available on the day you need it.",
    tip: "Book at least 2–3 weeks in advance for a standard move. For end-of-month dates, allow 4 weeks. The earlier you lock in your date, the more control you have over timing and cost.",
  },
  {
    n: "02",
    title: "Not Decluttering Before You Pack",
    body: "On an hourly rate, every extra box adds to the clock. Moving is the perfect moment to cut loose from clutter — yet most people pack everything first and deal with it later. You end up paying movers to carry items you'll donate or throw out within weeks of arriving.",
    tip: "Work through your home room by room at least a week before your move. Sell, donate or dispose of anything you haven't used in the past year. Fewer boxes equals fewer hours equals a lower bill.",
  },
  {
    n: "03",
    title: "Getting Only a Verbal Quote",
    body: "A verbal quote is a number with nothing behind it. Without confirmation in writing, there's nothing to hold a removalist to if the price shifts on moving day — and with some operators, it does. Charges for stairs, long carries or heavy items can quietly double the original figure.",
    tip: "Always ask for a written quote that clearly states the hourly rate, what's included and any conditions. GoMovers sends confirmed rates by email before every job — no surprises on the day.",
  },
  {
    n: "04",
    title: "Packing Without a System",
    body: "Unlabelled boxes slow movers down and turn unpacking into a two-day puzzle. Mixing heavy books with fragile glasses in one box is a reliable way to break something. And the 'one big box for miscellaneous things' approach wastes truck space and loading time — both of which you're paying for.",
    tip: "Label every box with the destination room and a short contents note. Pack heavy items in small boxes and light items in large ones. Prepare a clearly marked 'Day 1' box for essentials: kettle, phone charger, toilet paper, a change of clothes.",
  },
  {
    n: "05",
    title: "Moving Valuables and Documents in the Truck",
    body: "Passports, jewellery, laptops, external drives, medication and irreplaceable photos should never travel in a moving truck. Even with careful, experienced movers, boxes can shift, items get buried under furniture, and a moving truck is not a secure environment.",
    tip: "Before moving day, set aside a 'do not load' bag and keep it with you. Put all valuables, important documents and anything irreplaceable in your own car. Be explicit with your movers about what stays out of the truck.",
  },
  {
    n: "06",
    title: "Forgetting to Update Your Address",
    body: "The list of places that hold your address is longer than most people realise: your bank, Medicare, the ATO, your employer, your super fund, your GP, subscriptions, loyalty cards and more. Miss one and you risk a missed bill, a lost package or a tax notice going to a stranger.",
    tip: "Write a full address-change checklist before you move and work through it in the week after arrival. Australia Post's mail redirection service is a useful safety net — it forwards mail from your old address while you update everything else.",
  },
  {
    n: "07",
    title: "Assuming All Removalists Carry Insurance",
    body: "Not every removalist carries proper transit insurance — and some that claim they do hold only minimal coverage that won't come close to replacing a damaged flat screen or antique. If something is broken by an uninsured mover, your only path is a dispute that's rarely worth the effort.",
    tip: "Before booking, ask specifically: do you carry transit insurance, and for how much? GoMovers is insured up to $50,000 on every job and can provide documentation on request.",
  },
];

export const Route = createFileRoute("/guides/7-moving-mistakes")({
  head: () => ({
    meta: [
      { title: "7 Costly Moving Mistakes to Avoid | GoMovers" },
      {
        name: "description",
        content: "Planning a move on the Gold Coast or Brisbane? Avoid these 7 common removalist mistakes that cost people time, money and stress. Free guide from GoMovers.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://gomovers.com.au/guides/7-moving-mistakes" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "7 Costly Moving Mistakes (and How to Avoid Them)",
          "description": "Planning a move on the Gold Coast or Brisbane? Avoid these 7 common removalist mistakes that cost people time, money and stress.",
          "author": { "@type": "Organization", "name": "GoMovers", "url": "https://gomovers.com.au" },
          "publisher": {
            "@type": "Organization",
            "name": "GoMovers",
            "logo": { "@type": "ImageObject", "url": "https://gomovers.com.au/assets/logo_final-0gIALZtD.png" },
          },
          "datePublished": "2026-06-06",
          "dateModified": "2026-06-06",
          "url": "https://gomovers.com.au/guides/7-moving-mistakes",
          "mainEntityOfPage": { "@type": "WebPage", "@id": "https://gomovers.com.au/guides/7-moving-mistakes" },
        }),
      },
    ],
  }),
  component: SevenMistakesPage,
});

function SevenMistakesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/">
            <img src={logoFinal} alt="GoMovers" className="h-14 w-auto" />
          </Link>
          <a href="tel:0452261274" className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-brand">
            <Phone className="h-4 w-4" /> 0452 261 274
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Back to GoMovers
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand">
            Free Moving Guide
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            7 Costly Moving Mistakes<br className="hidden sm:block" /> (and How to Avoid Them)
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Moving is one of life's more stressful events — and an expensive one if things go wrong. Here are the seven mistakes Gold Coast and Brisbane movers make most often, and exactly how to sidestep them.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition hover:opacity-90"
            >
              Get a free quote →
            </Link>
          </div>
        </div>

        {/* PDF download gate */}
        <div className="mb-12">
          <GuideDownload source="guide-page" />
        </div>

        {/* Mistakes */}
        <div className="flex flex-col gap-14">
          {mistakes.map(({ n, title, body, tip }) => (
            <section key={n} id={`mistake-${n}`} className="scroll-mt-20">
              <div className="flex items-start gap-5">
                <span aria-hidden="true" className="shrink-0 select-none text-6xl font-black leading-none text-brand/20">
                  {n}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-primary">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
                  <div className="mt-4 rounded-2xl border-l-4 border-brand bg-brand/5 px-5 py-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand">Pro tip</p>
                    <p className="text-sm leading-relaxed text-primary">{tip}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-primary px-8 py-10 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Ready to move the right way?</h2>
          <p className="mx-auto mt-2 max-w-md text-primary-foreground/80">
            GoMovers — Gold Coast &amp; Brisbane removalists. Honest hourly rates from $160/hr + GST, fully insured to $50k, 4.9 stars from 1,400+ reviews.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-xl bg-brand px-6 py-3 font-bold text-brand-foreground transition hover:opacity-90"
            >
              Get your free quote →
            </Link>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/60">No phone calls. No spam. Just a written quote in your inbox.</p>
        </div>
      </main>

      <footer className="mt-12 border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm">
          © 2026 GoMovers Australia ·{" "}
          <a href="tel:0452261274" className="hover:text-brand">0452 261 274</a>{" "}
          ·{" "}
          <a href="https://gomovers.com.au" className="hover:text-brand">gomovers.com.au</a>
        </div>
      </footer>
    </div>
  );
}
