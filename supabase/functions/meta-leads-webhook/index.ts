// Meta Lead Ads webhook -> qualify -> respond (WhatsApp + email) -> store in meta_leads
// Agente de Respuesta a Leads - GoMovers
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GRAPH = `https://graph.facebook.com/${Deno.env.get("GRAPH_VERSION") ?? "v21.0"}`;

// ---- Service areas (GoMovers) ----
const SERVICE_AREAS = [
  "gold coast","mermaid","burleigh","broadbeach","surfers paradise","robina","southport","nerang","coomera","palm beach","currumbin","varsity","miami","labrador","helensvale",
  "brisbane","logan","ipswich","redland","chermside","sunnybank","carindale","toowong","north lakes",
  "byron","northern rivers","ballina","lennox","tweed","murwillumbah","queensland","qld","nsw"
];

function inServiceArea(...vals: (string | null | undefined)[]): boolean {
  const hay = vals.filter(Boolean).join(" ").toLowerCase();
  if (!hay.trim()) return true; // sin dato, no descartamos
  return SERVICE_AREAS.some((a) => hay.includes(a));
}

function toE164AU(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let p = raw.replace(/[^0-9+]/g, "");
  if (p.startsWith("+")) return p;
  if (p.startsWith("61")) return "+" + p;
  if (p.startsWith("0")) return "+61" + p.slice(1);
  if (p.length === 9) return "+61" + p;
  return "+" + p;
}

function pick(map: Record<string, string>, keys: string[]): string | null {
  for (const k of Object.keys(map)) {
    const lk = k.toLowerCase();
    if (keys.some((t) => lk.includes(t))) return map[k];
  }
  return null;
}

function parseDate(s: string | null): string | null {
  if (!s) return null;
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return null;
}

async function hmacOk(secret: string, raw: string, header: string | null): Promise<boolean> {
  if (!header) return false;
  const sig = header.replace("sha256=", "");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  // constant-time-ish compare
  if (hex.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ sig.charCodeAt(i);
  return diff === 0;
}

async function db(path: string, init: RequestInit) {
  const url = `${Deno.env.get("SUPABASE_URL")}/rest/v1/${path}`;
  const headers = {
    apikey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`,
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  };
  return await fetch(url, { ...init, headers });
}

async function sendWhatsApp(to: string, firstName: string): Promise<boolean> {
  const token = Deno.env.get("WHATSAPP_TOKEN");
  const phoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  const tpl = Deno.env.get("WHATSAPP_TEMPLATE_NAME");
  const lang = Deno.env.get("WHATSAPP_TEMPLATE_LANG") ?? "en_US";
  if (!token || !phoneId || !tpl) { console.log("WhatsApp env missing, skipping"); return false; }
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: { name: tpl, language: { code: lang }, components: [{ type: "body", parameters: [{ type: "text", text: firstName || "there" }] }] },
  };
  const r = await fetch(`${GRAPH}/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) { console.log("WhatsApp error", r.status, await r.text()); return false; }
  return true;
}

async function sendEmail(to: string, firstName: string, origin: string, dest: string, service: string, date: string): Promise<boolean> {
  const key = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("EMAIL_FROM") ?? "GoMovers <hello@gomovers.com.au>";
  if (!key || !to) { console.log("Email env/recipient missing, skipping"); return false; }
  const subject = `Your GoMovers quote — ${origin || "your move"} ${dest ? "to " + dest : ""}`.trim();
  const html = `<p>Hi ${firstName || "there"},</p>
<p>Thanks for reaching out to GoMovers. For your ${service || "move"}${date ? " around " + date : ""}, our honest hourly rate is <strong>from $160/hr + GST</strong> with 2 movers, a truck, fuel, blankets and trolleys included — no hidden fees, no fuel levy, and fully insured to $50,000.</p>
<p>We're rated <strong>4.9★ across 1,400+ reviews</strong> with 4,200+ moves completed. Get your written quote in 2 minutes: <a href=\"https://gomovers.com.au\">gomovers.com.au</a> — or just reply with your preferred time and we'll call you.</p>
<p>— The GoMovers Team<br/>0452 261 274 · Mon–Sat 7am–5pm</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!r.ok) { console.log("Email error", r.status, await r.text()); return false; }
  return true;
}

async function processLead(leadgenId: string, formId: string, pageId: string, adId: string) {
  // idempotency: skip if already contacted
  const existing = await db(`meta_leads?meta_leadgen_id=eq.${leadgenId}&select=id,whatsapp_sent_at,email_sent_at`, { method: "GET" });
  if (existing.ok) {
    const rows = await existing.json();
    if (rows.length && (rows[0].whatsapp_sent_at || rows[0].email_sent_at)) { console.log("Lead already contacted", leadgenId); return; }
  }

  // fetch lead detail from Graph API
  const pat = Deno.env.get("PAGE_ACCESS_TOKEN");
  let fieldMap: Record<string, string> = {};
  let campaignName: string | null = null;
  if (pat) {
    const lr = await fetch(`${GRAPH}/${leadgenId}?fields=field_data,campaign_name,ad_id,form_id&access_token=${pat}`);
    if (lr.ok) {
      const j = await lr.json();
      campaignName = j.campaign_name ?? null;
      for (const f of (j.field_data ?? [])) fieldMap[f.name] = (f.values ?? [])[0] ?? "";
    } else {
      console.log("Graph lead fetch error", lr.status, await lr.text());
    }
  }

  const fullName = pick(fieldMap, ["full_name", "name"]) ?? "";
  const firstName = (fullName || "").split(" ")[0];
  const phone = pick(fieldMap, ["phone"]);
  const email = pick(fieldMap, ["email"]);
  const origin = pick(fieldMap, ["origin", "from", "pickup", "current"]) ?? "";
  const dest = pick(fieldMap, ["destination", "to", "dropoff", "moving_to", "new"]) ?? "";
  const service = pick(fieldMap, ["service", "home", "bedroom", "property", "type"]) ?? "";
  const moveDate = parseDate(pick(fieldMap, ["date", "when", "move"]));

  const inArea = inServiceArea(origin, dest);
  let status = "qualified";
  let priority = "warm";
  let dqReason: string | null = null;
  if (!inArea) { status = "disqualified"; dqReason = "out_of_service_area"; priority = "cold"; }
  if (inArea && moveDate) {
    const days = (new Date(moveDate).getTime() - Date.now()) / 86400000;
    priority = days <= 14 ? "hot" : "warm";
  }

  const phoneE164 = toE164AU(phone);
  let waOk = false, emailOk = false;
  if (status === "qualified") {
    if (phoneE164) waOk = await sendWhatsApp(phoneE164, firstName);
    if (email) emailOk = await sendEmail(email, firstName, origin, dest, service, moveDate ?? "");
    if (waOk || emailOk) status = "contacted";
  }

  const row = {
    meta_leadgen_id: leadgenId,
    form_id: formId,
    page_id: pageId,
    ad_id: adId,
    campaign_name: campaignName,
    full_name: fullName,
    phone: phoneE164 ?? phone,
    email,
    origin_suburb: origin,
    destination_suburb: dest,
    move_date: moveDate,
    service_type: service,
    raw_fields: fieldMap,
    status,
    priority,
    in_service_area: inArea,
    disqualified_reason: dqReason,
    whatsapp_sent_at: waOk ? new Date().toISOString() : null,
    email_sent_at: emailOk ? new Date().toISOString() : null,
    first_response_at: (waOk || emailOk) ? new Date().toISOString() : null,
  };
  const up = await db(`meta_leads?on_conflict=meta_leadgen_id`, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(row),
  });
  if (!up.ok) console.log("DB upsert error", up.status, await up.text());
  else console.log("Lead processed", leadgenId, status, { waOk, emailOk });
}

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  // Webhook verification (GET)
  if (req.method === "GET") {
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");
    if (mode === "subscribe" && token && token === Deno.env.get("META_VERIFY_TOKEN")) {
      return new Response(challenge ?? "", { status: 200 });
    }
    return new Response("forbidden", { status: 403 });
  }

  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const raw = await req.text();
  const appSecret = Deno.env.get("META_APP_SECRET");
  if (appSecret) {
    const ok = await hmacOk(appSecret, raw, req.headers.get("x-hub-signature-256"));
    if (!ok) { console.log("Invalid signature"); return new Response("invalid signature", { status: 401 }); }
  }

  let payload: any;
  try { payload = JSON.parse(raw); } catch { return new Response("bad json", { status: 400 }); }

  try {
    for (const entry of (payload.entry ?? [])) {
      for (const change of (entry.changes ?? [])) {
        if (change.field !== "leadgen") continue;
        const v = change.value ?? {};
        await processLead(v.leadgen_id, v.form_id, v.page_id ?? entry.id, v.ad_id);
      }
    }
  } catch (e) {
    console.log("Processing error", String(e));
  }
  // Always 200 so Meta doesn't disable the webhook
  return new Response("ok", { status: 200 });
});
