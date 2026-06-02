import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({
  service: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  size: z.string().min(1),
  preferred_date: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1),
  email: z.string().email("Valid email required"),
});

export type BookingInput = z.infer<typeof schema>;

export const createBooking = createServerFn({ method: "POST" })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Server configuration error");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("bookings").insert([{
      service: data.service,
      origin: data.origin,
      destination: data.destination,
      size: data.size,
      preferred_date: data.preferred_date,
      name: data.name,
      phone: data.phone,
      email: data.email,
    }]);

    if (dbError) throw new Error("Could not save your booking. Please try again.");

    if (resendKey && notifyEmail) {
      const rows = [
        ["Service", data.service],
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Pick-up", data.origin],
        ["Drop-off", data.destination],
        ["Move size", data.size],
        ["Preferred date", data.preferred_date],
      ]
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${k}</td><td>${v}</td></tr>`)
        .join("");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: notifyEmail,
          subject: `New booking request — ${data.service}`,
          html: `<h2>New GoMovers Booking</h2><table>${rows}</table>`,
        }),
      });
    }

    return { ok: true as const };
  });
