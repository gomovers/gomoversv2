/**
 * Service pages — /services/$service
 *
 * Same rules as src/data/areas.ts: every figure must match /pricing and the
 * MovingCompany schema in __root.tsx. Reviews quoted here must be real and
 * already published on the home page.
 */

export type Service = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  /** Short price line shown under the H1 */
  priceLine: string;
  intro: string[];
  points: { title: string; body: string }[];
  howItWorks: string[];
  review?: { name: string; source: "Airtasker" | "Google"; text: string };
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "gold-coast-to-brisbane-removalists",
    name: "Gold Coast ↔ Brisbane",
    title: "Gold Coast to Brisbane Removalists — Hourly, Door-to-Door | GoMovers",
    description:
      "Moving between the Gold Coast and Brisbane? 2 movers + truck from $160/hr + GST, door-to-door, fuel included. No fuel levy, no call-out fee. 4.9★ from 1,400+ reviews.",
    h1: "Gold Coast to Brisbane removalists",
    priceLine: "From $160/hr + GST · door-to-door · fuel included",
    intro: [
      "The Gold Coast–Brisbane corridor is where GoMovers works every day. We move people in both directions — Gold Coast to Brisbane, Brisbane to the Gold Coast — and everywhere in between: Logan, the Redlands, Coomera and Pimpama.",
      "It's charged at the same hourly rate as a local move: from $160/hr + GST for two movers and a 4.5t truck, or $215/hr + GST for the 6.5t truck. The clock runs door-to-door, from arrival at your pickup to finishing at your new home. No fuel levy, no travel surcharge.",
    ],
    points: [
      {
        title: "One load, one trip",
        body: "On a long run, a second trip is expensive. We match the truck to your home so everything goes in one load — the 6.5t truck for most 3- and 4-bedroom homes.",
      },
      {
        title: "Timed around the M1",
        body: "Peak-hour traffic on the M1 can add real time. We'll suggest a start time that keeps the drive short.",
      },
      {
        title: "Written estimate first",
        body: "Tell us both suburbs and the size of the home and you'll get a written rate and likely hours before you book.",
      },
    ],
    howItWorks: [
      "Request a quote online in about 2 minutes: date, both suburbs and home size.",
      "Get a written hourly rate and estimated hours by email.",
      "On the day, the crew loads, drives and unloads — you pay door-to-door time only.",
    ],
    review: {
      name: "Marie Luise von Koeller",
      source: "Google",
      text: "I relocated from Gold Coast to Brisbane and they offered the best and most reliable service. They got in on time, were very detail-oriented with my things, clean, organized and efficient. Everything came perfect!",
    },
    faq: [
      {
        q: "How much does it cost to move from the Gold Coast to Brisbane?",
        a: "GoMovers charges from $160/hr + GST for two movers and a 4.5t truck, or from $215/hr + GST for the 6.5t truck, billed door-to-door. The total depends on the volume, access (stairs, lifts) and traffic. Request a quote for a written estimate of the hours.",
      },
      {
        q: "Is there a fuel levy or travel fee?",
        a: "No. Fuel is included in the hourly rate and there is no call-out fee or travel surcharge.",
      },
      {
        q: "Do you move from Brisbane to the Gold Coast as well?",
        a: "Yes — both directions, plus Logan, the Redlands and the northern Gold Coast.",
      },
    ],
  },
  {
    slug: "interstate-removals-qld-nsw",
    name: "Interstate QLD–NSW",
    title: "Interstate Removalists QLD to NSW — Tweed & Byron | GoMovers",
    description:
      "Cross-border removals between Queensland and northern NSW: Gold Coast and Brisbane to Tweed Heads, Kingscliff, Byron Bay and Ballina. From $160/hr + GST, fuel included.",
    h1: "Interstate removals between Queensland and northern NSW",
    priceLine: "From $160/hr + GST · same rate across the border",
    intro: [
      "GoMovers moves people across the Queensland–New South Wales border every week: Gold Coast and Brisbane to Tweed Heads, Kingscliff, Byron Bay, Ballina and the Northern Rivers — and back again.",
      "Crossing the border doesn't change the price. It's the same hourly rate — from $160/hr + GST for two movers and a truck — billed door-to-door, with fuel, blankets and trolleys included.",
    ],
    points: [
      {
        title: "Where we go in NSW",
        body: "Tweed Heads, Banora Point, Kingscliff, Cabarita Beach, Pottsville, Byron Bay, Bangalow, Lennox Head, Ballina and Mullumbimby.",
      },
      {
        title: "Daylight saving sorted",
        body: "From October to April NSW is an hour ahead of Queensland. We confirm arrival times in your local time.",
      },
      {
        title: "Insured the whole way",
        body: "Every move carries $50,000 transit insurance, on both sides of the border.",
      },
    ],
    howItWorks: [
      "Request a quote with both addresses and your home size.",
      "Get a written hourly rate and estimated hours.",
      "We load, drive and unload — billed door-to-door.",
    ],
    faq: [
      {
        q: "Do you do long-distance interstate moves, like Brisbane to Sydney?",
        a: "Our service area is South East Queensland (Redcliffe to the Gold Coast) and northern NSW (Tweed to Byron Bay and Ballina). For moves outside that, contact us first.",
      },
      {
        q: "Is an interstate move more expensive per hour?",
        a: "No. Moves into northern NSW use the same hourly rate as local moves, with fuel included.",
      },
    ],
  },
  {
    slug: "office-removals",
    name: "Office removals",
    title: "Office Removalists Gold Coast & Brisbane — After-Hours | GoMovers",
    description:
      "Office and commercial removals on the Gold Coast and in Brisbane. After-hours and weekend moves so your team is back at work Monday. Fully insured to $50,000.",
    h1: "Office and commercial removals",
    priceLine: "Custom quote · after-hours and weekend moves",
    intro: [
      "Moving an office is about downtime. GoMovers moves small offices, clinics, studios and shops across the Gold Coast and Brisbane — after hours or on a Saturday — so your team is back at work on Monday morning.",
      "Office moves are quoted per job, because every fit-out is different. Tell us what's moving, the floors and access at both ends, and when you need it done.",
    ],
    points: [
      {
        title: "Out of hours",
        body: "Evening and Saturday moves keep your business running during the week.",
      },
      {
        title: "Building access handled",
        body: "Send us your building's loading dock and lift rules for both sites and we'll plan the crew around them.",
      },
      {
        title: "Insured",
        body: "$50,000 transit insurance on every move, and documentation available on request for your building manager.",
      },
    ],
    howItWorks: [
      "Send us a list (or photos) of what's moving and both addresses.",
      "We confirm a written quote and a time window that suits your business.",
      "The crew moves you out of hours and places everything where you want it.",
    ],
    faq: [
      {
        q: "Can you move our office on a weekend?",
        a: "Yes — Saturday moves are available. Contact us about your timing when you request a quote.",
      },
      {
        q: "Can you provide proof of insurance for our building?",
        a: "Yes. GoMovers carries $50,000 transit insurance and can provide documentation on request.",
      },
    ],
  },
  {
    slug: "piano-removals",
    name: "Piano & antiques",
    title: "Piano Removalists Gold Coast & Brisbane — Piano & Antiques | GoMovers",
    description:
      "Piano, antique and fragile furniture removals on the Gold Coast and in Brisbane. Specialist crew, blankets and straps included, insured to $50,000.",
    h1: "Piano and antique removals",
    priceLine: "Specialist crew · quoted per job",
    intro: [
      "Pianos, marble tables, antique cabinets and artwork need more than two strong people — they need planning, the right equipment and a crew that has done it before. GoMovers moves pianos and antiques across the Gold Coast, Brisbane and Byron Bay.",
      "Piano and antique moves are quoted per job. Tell us the type of piano (or the pieces), and the access at both ends — stairs, steps, tight corners — and we'll confirm the crew and price.",
    ],
    points: [
      {
        title: "Protected the whole way",
        body: "Every piece is wrapped in moving blankets and strapped in the truck. Blankets, trolleys and straps are included.",
      },
      {
        title: "Access planned first",
        body: "Stairs are the hard part of any piano move. We ask about them upfront so there are no surprises on the day.",
      },
      {
        title: "Insured",
        body: "$50,000 transit insurance on every move.",
      },
    ],
    howItWorks: [
      "Tell us the piano type or the pieces, plus photos of the access at both ends.",
      "Get a written quote with the crew size confirmed.",
      "We wrap, move and place the item where you want it.",
    ],
    review: {
      name: "Jason T.",
      source: "Airtasker",
      text: "These guys were exceptional! They went over and above, nothing was too much hassle. We moved from Manly — a house with lots of stairs, they moved our entire house, piano, white goods, all boxes etc, and drove to Tallebudgera valley.",
    },
    faq: [
      {
        q: "Can you move a piano up stairs?",
        a: "Often yes. Send us photos of the stairs and the piano type when you request a quote and we'll confirm the crew and whether it can be done safely.",
      },
      {
        q: "Can you move a marble table?",
        a: "We move marble furniture such as tables with care. Loose marble slabs, however, can't be carried under Australian transport regulations.",
      },
    ],
  },
  {
    slug: "single-item-delivery",
    name: "Single-item delivery",
    title: "Single Item Removals & Furniture Delivery from $99 | GoMovers",
    description:
      "Need one item moved? Couches, fridges, beds and Marketplace pickups on the Gold Coast and in Brisbane from $99. Blankets and straps included.",
    h1: "Single-item removals and furniture delivery",
    priceLine: "From $99 + GST",
    intro: [
      "Bought a couch on Marketplace? Need a fridge, bed or dining table moved across town? GoMovers' single-item delivery starts from $99 — cheaper than hiring a trailer and a lot easier on your back.",
      "Our crew picks it up, wraps it, straps it in the truck and carries it inside at the other end. Available across the Gold Coast and Brisbane.",
    ],
    points: [
      {
        title: "Marketplace and Gumtree pickups",
        body: "Send us the pickup address and seller's contact, and we'll collect and deliver it to your door.",
      },
      {
        title: "Wrapped and strapped",
        body: "Every item is blanket-wrapped and strapped in the truck — no loose furniture rolling around a ute tray.",
      },
      {
        title: "Carried inside",
        body: "We carry it in and put it where you want it. Tell us about stairs when you book.",
      },
    ],
    howItWorks: [
      "Tell us the item, pickup and drop-off suburbs.",
      "Get a confirmed price.",
      "We collect, deliver and place it inside.",
    ],
    faq: [
      {
        q: "How much does it cost to move one item?",
        a: "Single-item delivery starts from $99 + GST. The final price depends on the item, the distance and access such as stairs.",
      },
      {
        q: "Can you pick up something I bought on Facebook Marketplace?",
        a: "Yes. Give us the pickup address and the seller's details and we'll collect and deliver it.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
