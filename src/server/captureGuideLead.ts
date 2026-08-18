import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().optional(),
  source: z.string().default("guide-download"),
});

export const captureGuideLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const supabaseUrl = env.SUPABASE_URL ?? process.env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Server configuration error. Please try again later.");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error: dbError } = await supabase.from("guide_leads").insert([{
      email: data.email,
      name: data.name ?? null,
      source: data.source,
    }]);

    if (dbError) throw new Error("Could not save your details. Please try again.");

    const resendKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "GoMovers <noreply@gomovers.com.au>",
          to: data.email,
          subject: "Your free moving guide — 7 Mistakes to Avoid",
          html: `<h2 style="color:#1a1a1a">Here's your free GoMovers guide</h2>
<p>Hi${data.name ? ` ${data.name}` : ""},</p>
<p>Thanks for downloading. Click below to get your copy:</p>
<p style="margin:24px 0">
  <a href="https://gomovers.com.au/downloads/7-moving-mistakes.pdf"
     style="background:#22c55e;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
    Download: 7 Costly Moving Mistakes
  </a>
</p>
<p>And when you're ready to book, we're here — honest hourly rates from $160/hr + GST, 2 movers + truck, fully insured to $50k.</p>
<p>📞 0452 261 274 · <a href="https://gomovers.com.au">gomovers.com.au</a></p>
<p>Cheers,<br>The GoMovers team</p>`,
        }),
      });
    }

    return { ok: true as const };
  });
