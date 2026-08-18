export type HomeSize = "studio" | "1 bed" | "2 bed" | "3 bed" | "4+" | "office" | "single item";

export interface ChatTranscriptTurn {
  role: "bot" | "user";
  text: string;
}

export interface ChatLeadPayload {
  full_name: string;
  phone: string;
  email?: string;
  origin_suburb: string;
  destination_suburb: string;
  move_date: string;
  home_size: HomeSize;
  notes?: string;
  consent: boolean;
  transcript: ChatTranscriptTurn[];
  page: string;
  company: string;
}

export interface ChatQuote {
  service: string;
  rate: number | null;
  unit: "hour" | "flat" | "custom";
  truck?: string;
}

export interface ChatLeadResponse {
  ok: boolean;
  in_service_area: boolean;
  disqualified_reason: string | null;
  quote: ChatQuote | null;
  whatsapp_url: string | null;
}

export async function submitChatLead(payload: ChatLeadPayload): Promise<ChatLeadResponse> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/web-chat-lead`;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "We couldn't reach our server. Check your connection and try again, or call us on 0452 261 274.",
    );
  }

  if (!res.ok) {
    if (res.status === 400) {
      throw new Error("Please double check your details and try again.");
    }
    throw new Error("Something went wrong on our end. Please try again, or call us on 0452 261 274.");
  }

  return res.json();
}
