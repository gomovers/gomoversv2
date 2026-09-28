/**
 * Local area pages — /removalists/$area
 *
 * Every page must say something true and specific about moving in that area.
 * Do not add a suburb by copy-pasting another entry and swapping the name:
 * Google treats near-identical location pages as doorway pages and ignores
 * (or penalises) all of them. If there's nothing local to say, don't add the page.
 *
 * Prices, inclusions and NAP must stay identical to /pricing, __root.tsx and llms.txt.
 */

export type Area = {
  slug: string;
  name: string;
  /** Short region label shown under the H1 */
  region: string;
  state: "QLD" | "NSW";
  title: string;
  description: string;
  h1: string;
  intro: string[];
  /** What actually makes moving here different — access, housing, traffic */
  localNotes: { title: string; body: string }[];
  suburbs: string[];
  commonMoves: string[];
  faq: { q: string; a: string }[];
};

export const AREAS: Area[] = [
  {
    slug: "burleigh-heads",
    name: "Burleigh Heads",
    region: "Southern Gold Coast",
    state: "QLD",
    title: "Burleigh Heads Removalists from $160/hr + GST | GoMovers",
    description:
      "Removalists in Burleigh Heads, Miami, Burleigh Waters and Palm Beach. 2 movers + truck from $160/hr + GST, fuel and blankets included. Based 5 minutes away in Mermaid Beach.",
    h1: "Removalists in Burleigh Heads",
    intro: [
      "GoMovers is based in Mermaid Beach, a few minutes up the Gold Coast Highway from Burleigh Heads, so Burleigh moves are home turf for our crews. We move studio units near the beachfront, family homes in Burleigh Waters and West Burleigh, and everything in between.",
      "You pay from $160/hr + GST for two movers and a 4.5t truck, or from $215/hr + GST for the 6.5t truck on larger homes. Fuel, blankets and trolleys are included, and billing is door-to-door.",
    ],
    localNotes: [
      {
        title: "Walk-up unit blocks",
        body: "Many of the older blocks along the Esplanade and Gold Coast Highway have no lift. Tell us the floor and number of flights when you book so we can plan the crew and give you an honest time estimate.",
      },
      {
        title: "Parking near James Street",
        body: "Street parking around James Street and the beachfront is tight, especially on weekends. If your building has a loading bay or driveway, let us know — the closer the truck parks, the faster (and cheaper) your move.",
      },
      {
        title: "Burleigh Waters and canal homes",
        body: "Larger family homes in Burleigh Waters usually suit the 6.5t truck, so everything goes in one trip rather than two.",
      },
    ],
    suburbs: ["Burleigh Heads", "Burleigh Waters", "West Burleigh", "Miami", "Palm Beach", "Varsity Lakes", "Tallebudgera"],
    commonMoves: [
      "Burleigh Heads to Brisbane",
      "Burleigh Waters to Robina or Varsity Lakes",
      "Unit upsizes from Miami and Burleigh to the southern suburbs",
    ],
    faq: [
      {
        q: "How much do removalists cost in Burleigh Heads?",
        a: "GoMovers charges from $160/hr + GST ($176/hr inc GST) for two movers and a 4.5t truck, and from $215/hr + GST for a 6.5t truck. Fuel, blankets and trolleys are included and there is no call-out fee.",
      },
      {
        q: "Can you move me out of a unit with no lift?",
        a: "Yes. Walk-ups are common in Burleigh. Tell us the floor and the number of flights when you book so we can plan the job and estimate the hours accurately.",
      },
    ],
  },
  {
    slug: "southport",
    name: "Southport",
    region: "Central Gold Coast",
    state: "QLD",
    title: "Southport Removalists from $160/hr + GST | GoMovers",
    description:
      "Removalists in Southport, Labrador, Arundel and Parkwood. Units, apartments and family homes. 2 movers + truck from $160/hr + GST, fully insured to $50,000.",
    h1: "Removalists in Southport",
    intro: [
      "Southport is the Gold Coast's CBD, and it moves more than most suburbs — apartments near the Broadwater, rentals around Griffith University and Gold Coast University Hospital, and family homes in Labrador, Arundel and Parkwood.",
      "GoMovers moves Southport homes and small offices from $160/hr + GST with two movers and a truck. Fuel, blankets and trolleys are included and you only pay door-to-door.",
    ],
    localNotes: [
      {
        title: "Apartment buildings",
        body: "Most Southport towers need a lift booking through building management. Book the lift and any loading dock time before moving day and send us the details — we'll arrive to match the slot.",
      },
      {
        title: "Student and hospital rentals",
        body: "Rooms and small units near Griffith and the hospital are ideal for the 4.5t truck. Single items (a bed or a couch) can be done as a single-item delivery from $99.",
      },
      {
        title: "CBD traffic",
        body: "Southport's CBD and the light-rail corridor are slow at peak times. Morning starts usually make for a quicker, cheaper move.",
      },
    ],
    suburbs: ["Southport", "Labrador", "Main Beach", "Arundel", "Parkwood", "Molendinar", "Ashmore", "Biggera Waters"],
    commonMoves: [
      "Southport to Brisbane",
      "Student moves around Griffith University",
      "Southport apartments to family homes in the northern suburbs",
    ],
    faq: [
      {
        q: "Do you move apartments in Southport?",
        a: "Yes. Book the lift and loading dock with your building manager, send us the time slot, and we'll plan the crew and truck around it.",
      },
      {
        q: "Can you move just one item in Southport?",
        a: "Yes — single-item delivery starts from $99, for example a couch, fridge or bed across town.",
      },
    ],
  },
  {
    slug: "robina",
    name: "Robina",
    region: "Gold Coast",
    state: "QLD",
    title: "Robina Removalists from $160/hr + GST | GoMovers",
    description:
      "Removalists in Robina, Varsity Lakes, Mudgeeraba and Merrimac. Family homes and townhouses, 4.5t and 6.5t trucks. From $160/hr + GST, fuel included.",
    h1: "Removalists in Robina",
    intro: [
      "Robina and its neighbours — Varsity Lakes, Mudgeeraba, Merrimac and Clear Island Waters — are mostly family homes and townhouses, which means more furniture, more boxes and usually the bigger truck.",
      "GoMovers moves Robina homes with two movers and a 4.5t truck from $160/hr + GST, or the 6.5t truck from $215/hr + GST for 3- and 4-bedroom homes. Fuel, blankets and trolleys are always included.",
    ],
    localNotes: [
      {
        title: "Family homes = one trip, not two",
        body: "A 3- or 4-bedroom Robina home generally fits in the 6.5t truck in a single load. A smaller truck that needs two trips often ends up costing more in hours.",
      },
      {
        title: "Townhouse complexes",
        body: "Many complexes have narrow internal roads and visitor-only parking. Let us know the complex rules and where the truck can stop.",
      },
      {
        title: "Bond University rentals",
        body: "Share-house and student moves around Varsity Lakes are usually quick jobs in the 4.5t truck.",
      },
    ],
    suburbs: ["Robina", "Varsity Lakes", "Mudgeeraba", "Merrimac", "Clear Island Waters", "Carrara", "Bonogin"],
    commonMoves: [
      "Robina to Brisbane",
      "Varsity Lakes units to Robina family homes",
      "Robina to the northern Gold Coast (Coomera, Pimpama)",
    ],
    faq: [
      {
        q: "Which truck do I need for a 4-bedroom house in Robina?",
        a: "Usually the 6.5t truck (from $215/hr + GST). It carries a typical family home in one load, which saves the extra hours of a second trip.",
      },
      {
        q: "Is there a charge for travelling to Robina?",
        a: "No call-out fee. Billing is door-to-door: from arrival at your pickup address to finishing at the destination.",
      },
    ],
  },
  {
    slug: "surfers-paradise",
    name: "Surfers Paradise",
    region: "Central Gold Coast",
    state: "QLD",
    title: "Surfers Paradise Removalists — Apartments & High-Rise | GoMovers",
    description:
      "Apartment and high-rise removalists in Surfers Paradise, Main Beach, Bundall and Isle of Capri. Lift bookings planned, from $160/hr + GST, insured to $50,000.",
    h1: "Removalists in Surfers Paradise",
    intro: [
      "Moving in Surfers Paradise is mostly about towers: lift bookings, loading docks, low basement clearances and body corporate rules. Get those right and the move is quick. Get them wrong and you pay for a crew waiting at the kerb.",
      "GoMovers plans every Surfers job around your building's rules. Two movers and a truck from $160/hr + GST, with fuel, blankets and trolleys included and $50,000 transit insurance on every move.",
    ],
    localNotes: [
      {
        title: "Book the lift first",
        body: "Most buildings require a lift booking (often with padded lift covers) and some only allow moves in set time windows. Book it with building management before you book us, then send us the time.",
      },
      {
        title: "Loading docks and clearances",
        body: "Check whether the building has a loading dock and its height clearance. If the truck can't get in, tell us where it can stop on the street so we can plan the carry.",
      },
      {
        title: "Canal homes in Isle of Capri and Chevron Island",
        body: "Canal-front homes usually have good driveway access but longer carries from the back of the house. We'll factor it into the estimate.",
      },
    ],
    suburbs: ["Surfers Paradise", "Main Beach", "Bundall", "Chevron Island", "Isle of Capri", "Benowa", "Broadbeach"],
    commonMoves: [
      "Surfers Paradise apartments to Brisbane",
      "High-rise to house moves (Benowa, Bundall)",
      "Holiday-let furniture changeovers",
    ],
    faq: [
      {
        q: "Do you move high-rise apartments in Surfers Paradise?",
        a: "Yes. Book the lift and loading dock with your building manager, send us the time slot, and we'll arrive to match it. Blankets and trolleys are included in the hourly rate.",
      },
      {
        q: "What if my building only allows moves at certain times?",
        a: "That's common in Surfers. Tell us the permitted window when you request a quote and we'll schedule the crew inside it.",
      },
    ],
  },
  {
    slug: "broadbeach",
    name: "Broadbeach",
    region: "Central Gold Coast",
    state: "QLD",
    title: "Broadbeach Removalists from $160/hr + GST | GoMovers",
    description:
      "Removalists in Broadbeach, Broadbeach Waters, Mermaid Waters and Nobby Beach. Apartments and canal homes, 2 movers + truck from $160/hr + GST.",
    h1: "Removalists in Broadbeach",
    intro: [
      "Broadbeach sits right next to our base in Mermaid Beach. We move apartments along the beachfront and around Pacific Fair, and canal homes in Broadbeach Waters and Mermaid Waters.",
      "Two movers and a 4.5t truck from $160/hr + GST, or the 6.5t truck from $215/hr + GST for larger homes. Fuel, blankets and trolleys included, door-to-door billing.",
    ],
    localNotes: [
      {
        title: "Apartment lift bookings",
        body: "Beachfront buildings usually need a lift booking and sometimes a loading dock slot. Send us the times and we'll plan around them.",
      },
      {
        title: "Canal homes",
        body: "Broadbeach Waters and Mermaid Waters homes are often large, single-level and full of furniture — a good fit for the 6.5t truck in one load.",
      },
      {
        title: "Event weekends",
        body: "Broadbeach hosts big events through the year and roads around the Kurrawa and Pacific Fair area get busy. A weekday or early start is usually faster.",
      },
    ],
    suburbs: ["Broadbeach", "Broadbeach Waters", "Mermaid Beach", "Mermaid Waters", "Nobby Beach", "Clear Island Waters"],
    commonMoves: [
      "Broadbeach apartments to Brisbane",
      "Broadbeach Waters to Robina or Burleigh",
      "Downsizing from canal homes to apartments",
    ],
    faq: [
      {
        q: "Are you close to Broadbeach?",
        a: "Yes — GoMovers is based at Unit 3/26 William St, Mermaid Beach, right next to Broadbeach.",
      },
      {
        q: "How much does a move in Broadbeach cost?",
        a: "From $160/hr + GST for two movers and a 4.5t truck, or $215/hr + GST for the 6.5t truck. The total depends on volume, stairs or lifts and the drive between addresses.",
      },
    ],
  },
  {
    slug: "coomera",
    name: "Coomera",
    region: "Northern Gold Coast",
    state: "QLD",
    title: "Coomera Removalists — Northern Gold Coast | GoMovers",
    description:
      "Removalists in Coomera, Upper Coomera, Pimpama, Ormeau and Helensvale. New estates and family homes, from $160/hr + GST. Halfway to Brisbane, so no long drive.",
    h1: "Removalists in Coomera and the northern Gold Coast",
    intro: [
      "Coomera, Upper Coomera, Pimpama and Ormeau are some of the fastest-growing suburbs on the Gold Coast, full of new estates and young families. Many of the moves we do here are into brand-new homes, or from Brisbane to the Gold Coast.",
      "Being halfway between Brisbane and the southern Gold Coast, the northern suburbs are well suited to both directions of the corridor. From $160/hr + GST with two movers and a truck, fuel and blankets included.",
    ],
    localNotes: [
      {
        title: "Moving into a new build",
        body: "New estates often have unsealed verges, builders' vehicles and no street numbers yet. Send us a pin drop and your handover date so we can plan access.",
      },
      {
        title: "Family homes",
        body: "Most homes in the estates are 3–4 bedrooms, which usually suits the 6.5t truck in a single load.",
      },
      {
        title: "M1 timing",
        body: "The M1 between Coomera and Brisbane is slow at peak times. We'll suggest a start time that avoids the worst of it.",
      },
    ],
    suburbs: ["Coomera", "Upper Coomera", "Pimpama", "Ormeau", "Oxenford", "Helensvale", "Hope Island", "Pacific Pines"],
    commonMoves: [
      "Brisbane to Coomera and Pimpama",
      "Rental to new build within the northern Gold Coast",
      "Coomera to the southern Gold Coast",
    ],
    faq: [
      {
        q: "Do you cover Pimpama and Ormeau?",
        a: "Yes — Coomera, Upper Coomera, Pimpama, Ormeau, Oxenford, Helensvale and Hope Island.",
      },
      {
        q: "Can you move me on my new-home handover day?",
        a: "Yes. Send us the handover date and a pin drop for the new address when you request a quote so we can lock in the day.",
      },
    ],
  },
  {
    slug: "nerang",
    name: "Nerang",
    region: "Gold Coast hinterland",
    state: "QLD",
    title: "Nerang Removalists — Gold Coast Hinterland | GoMovers",
    description:
      "Removalists in Nerang, Highland Park, Gilston and the Gold Coast hinterland. Steep driveways and acreage handled. From $160/hr + GST, insured to $50,000.",
    h1: "Removalists in Nerang and the hinterland",
    intro: [
      "Nerang is the gateway to the Gold Coast hinterland. Moves here range from standard family homes in Highland Park and Pacific Pines to acreage properties towards Gilston and Advancetown with long, steep driveways.",
      "GoMovers moves Nerang homes from $160/hr + GST with two movers and a truck, or $215/hr + GST for the 6.5t truck. Fuel, blankets and trolleys are included.",
    ],
    localNotes: [
      {
        title: "Steep and long driveways",
        body: "Tell us if the driveway is steep, gravel or has a tight turn. It affects where the truck can park and how long the carry takes.",
      },
      {
        title: "Acreage properties",
        body: "Sheds, outdoor furniture and gym gear add up quickly on acreage. List them when you book so the estimate is accurate.",
      },
      {
        title: "Split-level homes",
        body: "Hillside homes often have internal stairs between levels. Mention them so we can plan the crew.",
      },
    ],
    suburbs: ["Nerang", "Highland Park", "Pacific Pines", "Gilston", "Advancetown", "Carrara", "Mount Nathan", "Gaven"],
    commonMoves: [
      "Nerang to the coast (Surfers, Broadbeach, Southport)",
      "Hinterland acreage to Brisbane",
      "Highland Park to Pacific Pines",
    ],
    faq: [
      {
        q: "Can your truck get up a steep driveway?",
        a: "Often yes, but not always. Describe the driveway (or send a photo) when you book. If the truck can't get close, we plan the carry and include it in the estimate.",
      },
      {
        q: "Do you move sheds and outdoor gear?",
        a: "Yes — outdoor furniture, gym equipment and shed contents. Please note we can't carry fuel, gas bottles, paint or chemicals.",
      },
    ],
  },
  {
    slug: "tweed-heads",
    name: "Tweed Heads",
    region: "Tweed Coast, NSW",
    state: "NSW",
    title: "Tweed Heads Removalists — Cross-Border Moves | GoMovers",
    description:
      "Removalists in Tweed Heads, Banora Point, Kingscliff and Coolangatta. Cross-border QLD–NSW moves, from $160/hr + GST, fuel included, insured to $50,000.",
    h1: "Removalists in Tweed Heads",
    intro: [
      "Tweed Heads and Coolangatta are twin towns split by the Queensland–New South Wales border, and plenty of our moves cross it — Gold Coast to Tweed, Tweed to Brisbane, and along the Tweed Coast to Kingscliff and Cabarita.",
      "Cross-border moves are priced exactly the same as local ones: from $160/hr + GST for two movers and a truck, door-to-door, with fuel, blankets and trolleys included.",
    ],
    localNotes: [
      {
        title: "Daylight saving",
        body: "NSW runs daylight saving and Queensland doesn't, so from October to April Tweed is an hour ahead of the Gold Coast. We confirm your arrival time in your local time so there's no confusion.",
      },
      {
        title: "Banora Point and Terranora hills",
        body: "Hillside homes with steep driveways are common. Let us know the access so we can plan where the truck parks.",
      },
      {
        title: "Tweed Coast",
        body: "We also cover Kingscliff, Cabarita Beach and Pottsville — and further south to Byron Bay.",
      },
    ],
    suburbs: ["Tweed Heads", "Tweed Heads South", "Banora Point", "Terranora", "Coolangatta", "Kingscliff", "Cabarita Beach", "Pottsville"],
    commonMoves: [
      "Gold Coast to Tweed Heads",
      "Tweed Heads to Brisbane",
      "Coolangatta to Kingscliff",
    ],
    faq: [
      {
        q: "Do you charge extra to cross the border?",
        a: "No. Cross-border moves use the same hourly rate — from $160/hr + GST — billed door-to-door, with fuel included.",
      },
      {
        q: "Which time zone is my booking in?",
        a: "We confirm the arrival time in your local time. During daylight saving (October–April) NSW is an hour ahead of Queensland.",
      },
    ],
  },
  {
    slug: "brisbane",
    name: "Brisbane",
    region: "Brisbane & surrounds",
    state: "QLD",
    title: "Brisbane Removalists from $160/hr + GST | GoMovers",
    description:
      "Brisbane removalists for units, Queenslanders and family homes. 2 movers + truck from $160/hr + GST, fuel and blankets included, door-to-door billing, 4.9★.",
    h1: "Removalists in Brisbane",
    intro: [
      "GoMovers moves homes and offices across Brisbane — inner-city apartments in New Farm, West End and South Brisbane, Queenslanders on stumps in the older suburbs, and family homes from the northside to the bayside. We also do a lot of moves between Brisbane and the Gold Coast.",
      "Two movers and a 4.5t truck from $160/hr + GST, or the 6.5t truck from $215/hr + GST. Fuel, blankets and trolleys are included and billing is door-to-door, with the final figure confirmed before we start.",
    ],
    localNotes: [
      {
        title: "Queenslanders and external stairs",
        body: "Older homes on stumps usually mean a flight of outdoor stairs, sometimes steep and narrow. Tell us about them so we bring the right crew and give an accurate estimate.",
      },
      {
        title: "Inner-city apartments",
        body: "Book the lift and any loading dock through building management, then send us the time slot. Inner-city streets are tight, so let us know where the truck can stop.",
      },
      {
        title: "Brisbane ↔ Gold Coast",
        body: "Moving between Brisbane and the Gold Coast is one of our most common jobs. It's still billed at the hourly rate, door-to-door.",
      },
    ],
    suburbs: ["Brisbane CBD", "New Farm", "West End", "South Brisbane", "Paddington", "Chermside", "Carindale", "Sunnybank", "Indooroopilly", "Redcliffe"],
    commonMoves: [
      "Brisbane to the Gold Coast",
      "Inner-city units to family homes in the suburbs",
      "Brisbane to Logan and the Redlands",
    ],
    faq: [
      {
        q: "How much do removalists cost in Brisbane?",
        a: "GoMovers charges from $160/hr + GST ($176/hr inc GST) for two movers and a 4.5t truck, and from $215/hr + GST for a 6.5t truck. Fuel, blankets and trolleys are included, with no call-out fee or fuel levy.",
      },
      {
        q: "Do you cover the whole of Brisbane?",
        a: "We cover Brisbane from the northside (including Redcliffe and Moreton Bay) to the southside and bayside, plus Logan and the Redlands. We don't service the Sunshine Coast.",
      },
    ],
  },
  {
    slug: "logan",
    name: "Logan",
    region: "Between Brisbane and the Gold Coast",
    state: "QLD",
    title: "Logan Removalists from $160/hr + GST | GoMovers",
    description:
      "Removalists in Logan, Springwood, Beenleigh, Shailer Park and Browns Plains. Family homes, from $160/hr + GST, fuel and blankets included, insured to $50,000.",
    h1: "Removalists in Logan",
    intro: [
      "Logan sits right in the middle of the Brisbane–Gold Coast corridor we work every day. We move homes in Springwood, Shailer Park, Loganholme, Beenleigh, Browns Plains and across the city.",
      "Two movers and a 4.5t truck from $160/hr + GST, or the 6.5t truck from $215/hr + GST for larger homes. Fuel, blankets and trolleys are included, and billing is door-to-door.",
    ],
    localNotes: [
      {
        title: "Family homes on bigger blocks",
        body: "Many Logan homes are 3–4 bedrooms with a garage and shed. The 6.5t truck usually does it in one trip.",
      },
      {
        title: "Central to both cities",
        body: "Being halfway between Brisbane and the Gold Coast means short drives to either end, which keeps door-to-door time down.",
      },
      {
        title: "M1 and Logan Motorway traffic",
        body: "Peak-hour traffic on the M1 and Logan Motorway can add time. We'll recommend a start time that avoids it.",
      },
    ],
    suburbs: ["Springwood", "Shailer Park", "Loganholme", "Beenleigh", "Eagleby", "Browns Plains", "Logan Central", "Daisy Hill"],
    commonMoves: [
      "Logan to the Gold Coast",
      "Logan to Brisbane",
      "Moves within Logan (Springwood, Shailer Park, Beenleigh)",
    ],
    faq: [
      {
        q: "Do you cover Beenleigh and Browns Plains?",
        a: "Yes — Beenleigh, Eagleby, Browns Plains, Springwood, Shailer Park, Loganholme, Daisy Hill and the rest of Logan.",
      },
      {
        q: "What's included in the hourly rate?",
        a: "Two experienced movers, the truck, fuel, moving blankets, trolleys and straps, and $50,000 transit insurance.",
      },
    ],
  },
  {
    slug: "redlands",
    name: "Redlands",
    region: "Redland City, bayside",
    state: "QLD",
    title: "Redlands Removalists — Cleveland, Capalaba, Redland Bay | GoMovers",
    description:
      "Removalists in the Redlands: Cleveland, Capalaba, Victoria Point, Redland Bay and Wellington Point. From $160/hr + GST, fuel included, insured to $50,000.",
    h1: "Removalists in the Redlands",
    intro: [
      "We move homes across mainland Redland City — Cleveland, Capalaba, Alexandra Hills, Wellington Point, Thornlands, Victoria Point and Redland Bay. Plenty of our Redlands moves are to or from Brisbane and the Gold Coast.",
      "Two movers and a 4.5t truck from $160/hr + GST, or the 6.5t truck from $215/hr + GST for larger homes. Fuel, blankets and trolleys included, billed door-to-door.",
    ],
    localNotes: [
      {
        title: "Bayside family homes",
        body: "Larger homes around Thornlands, Victoria Point and Redland Bay usually suit the 6.5t truck in one load.",
      },
      {
        title: "Mainland only",
        body: "We cover the Redlands mainland. For moves to or from the bay islands, contact us first so we can tell you honestly whether we can help.",
      },
      {
        title: "Getting there",
        body: "Door-to-door billing means you don't pay for our drive to your pickup address.",
      },
    ],
    suburbs: ["Cleveland", "Capalaba", "Alexandra Hills", "Wellington Point", "Ormiston", "Thornlands", "Victoria Point", "Redland Bay"],
    commonMoves: [
      "Redlands to Brisbane",
      "Redlands to the Gold Coast",
      "Moves within the Redlands (Capalaba to Cleveland)",
    ],
    faq: [
      {
        q: "Do you cover Redland Bay and Victoria Point?",
        a: "Yes — plus Cleveland, Capalaba, Alexandra Hills, Wellington Point, Ormiston and Thornlands.",
      },
      {
        q: "Do you move to the bay islands?",
        a: "We cover the Redlands mainland. Contact us before booking an island move and we'll let you know whether we can help.",
      },
    ],
  },
  {
    slug: "byron-bay",
    name: "Byron Bay",
    region: "Northern Rivers, NSW",
    state: "NSW",
    title: "Byron Bay Removalists — Northern Rivers | GoMovers",
    description:
      "Removalists for Byron Bay, Ballina, Lennox Head, Bangalow and the Northern Rivers. Gold Coast–Byron and Brisbane–Byron moves, from $160/hr + GST.",
    h1: "Removalists in Byron Bay and the Northern Rivers",
    intro: [
      "GoMovers covers Byron Bay and the Northern Rivers — Suffolk Park, Bangalow, Lennox Head, Ballina and Mullumbimby — as well as moves between Byron and the Gold Coast or Brisbane.",
      "The rate is the same as anywhere else we work: from $160/hr + GST for two movers and a truck, with fuel, blankets and trolleys included and door-to-door billing.",
    ],
    localNotes: [
      {
        title: "Rural and hinterland properties",
        body: "Properties around Bangalow and the hinterland often have long gravel driveways or tight access. Describe the access (or send photos) when you book.",
      },
      {
        title: "Daylight saving",
        body: "NSW runs daylight saving, so from October to April Byron is an hour ahead of Queensland. We confirm times in your local time.",
      },
      {
        title: "Book ahead",
        body: "Byron moves involve a longer drive, so we schedule them in advance. Give us as much notice as you can, especially around the end of the month.",
      },
    ],
    suburbs: ["Byron Bay", "Suffolk Park", "Bangalow", "Lennox Head", "Ballina", "Mullumbimby", "Brunswick Heads"],
    commonMoves: [
      "Gold Coast to Byron Bay",
      "Brisbane to Byron Bay",
      "Byron Bay to Ballina and Lennox Head",
    ],
    faq: [
      {
        q: "Do you move between the Gold Coast and Byron Bay?",
        a: "Yes. Gold Coast–Byron and Brisbane–Byron moves are billed at the same hourly rate, door-to-door, with fuel included.",
      },
      {
        q: "How far ahead should I book a Byron Bay move?",
        a: "As early as you can — ideally 2–3 weeks, and more for end-of-month dates.",
      },
    ],
  },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
