import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import {
  X,
  Send,
  MapPin,
  Calendar,
  MessageSquareText,
  User,
  Phone as PhoneIcon,
  Mail,
} from "lucide-react";
import { trackChatStep, trackChatLead } from "./track";
import { isBusinessHours } from "./businessHours";
import {
  submitChatLead,
  type ChatTranscriptTurn,
  type HomeSize,
  type ChatLeadResponse,
} from "./submitLead";

type Step =
  | "origin"
  | "destination"
  | "date"
  | "home_size"
  | "notes"
  | "contact"
  | "submitting"
  | "result";

interface FormState {
  origin_suburb: string;
  destination_suburb: string;
  move_date: string;
  home_size: HomeSize | "";
  notes: string;
}

const HOME_SIZE_OPTIONS: { value: HomeSize; label: string }[] = [
  { value: "studio", label: "Studio" },
  { value: "1 bed", label: "1 bedroom" },
  { value: "2 bed", label: "2 bedrooms" },
  { value: "3 bed", label: "3 bedrooms" },
  { value: "4+", label: "4+ bedrooms" },
  { value: "office", label: "Office / commercial" },
  { value: "single item", label: "Single item" },
];

const GREETING =
  "Hi! 👋 I can get you an hourly rate in about 30 seconds — no phone call needed. Where are you moving from?";

function formatPriceLine(quote: ChatLeadResponse["quote"]): string {
  if (!quote || quote.unit === "custom") return "a custom quote";
  if (quote.unit === "hour") return `from $${quote.rate}/hr + GST`;
  return `from $${quote.rate}`;
}

function declineMessage(reason: string | null): string {
  if (reason === "out_of_service_area") {
    return "Thanks for reaching out! Unfortunately that's outside our service area. Wishing you a smooth move!";
  }
  if (reason?.startsWith("prohibited_item:")) {
    const item = reason.split(":").slice(1).join(":").trim();
    const subject = item ? `${item.charAt(0).toUpperCase()}${item.slice(1)}` : "That item";
    return `Thanks for reaching out! ${subject} isn't something we're able to transport under Australian regulations, so we're not the right fit for this one — a specialist in restricted or hazardous items would be your best bet. Wishing you a smooth move!`;
  }
  return "Thanks for reaching out! We're not able to help with this one, but wishing you a smooth move!";
}

function renderWithBold(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export function ChatWidgetPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("origin");
  const [messages, setMessages] = useState<ChatTranscriptTurn[]>([
    { role: "bot", text: GREETING },
  ]);
  const [form, setForm] = useState<FormState>({
    origin_suburb: "",
    destination_suburb: "",
    move_date: "",
    home_size: "",
    notes: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ChatLeadResponse | null>(null);
  const resolvedRef = useRef(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, step]);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
  }, [step]);

  const say = useCallback((text: string) => {
    setMessages((m) => [...m, { role: "bot", text }].slice(-40));
  }, []);

  const reply = useCallback((text: string) => {
    setMessages((m) => [...m, { role: "user", text }].slice(-40));
  }, []);

  const handleOrigin = (value: string) => {
    reply(value);
    setForm((f) => ({ ...f, origin_suburb: value }));
    say("Nice one — and where's it heading to?");
    setStep("destination");
    trackChatStep("origin_suburb");
  };

  const handleDestination = (value: string) => {
    reply(value);
    setForm((f) => ({ ...f, destination_suburb: value }));
    say("When's the move? Pick a date and I'll flag it if it's urgent.");
    setStep("date");
    trackChatStep("destination_suburb");
  };

  const handleDate = (value: string) => {
    const label = new Date(`${value}T00:00:00`).toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    reply(label);
    setForm((f) => ({ ...f, move_date: value }));
    say("What size is the place — or is this a single item?");
    setStep("home_size");
    trackChatStep("move_date");
  };

  const handleHomeSize = (value: HomeSize, label: string) => {
    reply(label);
    setForm((f) => ({ ...f, home_size: value }));
    say("Anything special we should know about? Piano, pool table, anything oversized — totally optional.");
    setStep("notes");
    trackChatStep("home_size", { value });
  };

  const handleNotes = (value: string) => {
    reply(value || "Nothing special");
    setForm((f) => ({ ...f, notes: value }));
    say("Almost there — what's your name and best mobile number? I'll text your rate straight away.");
    setStep("contact");
    trackChatStep("notes", { skipped: !value });
  };

  const handleContactSubmit = async (name: string, phone: string, email: string) => {
    reply(email ? `${name} — ${phone} — ${email}` : `${name} — ${phone}`);
    setError(null);
    setStep("submitting");
    trackChatStep("contact_submitted");

    try {
      const response = await submitChatLead({
        full_name: name,
        phone,
        email: email || undefined,
        origin_suburb: form.origin_suburb,
        destination_suburb: form.destination_suburb,
        move_date: form.move_date,
        home_size: form.home_size as HomeSize,
        notes: form.notes || undefined,
        consent: true,
        transcript: messages,
        page: window.location.pathname,
        company: honeypot,
      });
      setResult(response);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep("contact");
      trackChatStep("result_error");
    }
  };

  useEffect(() => {
    if (!result || resolvedRef.current) return;
    resolvedRef.current = true;
    const qualified = result.in_service_area && !result.disqualified_reason;

    if (qualified) {
      const offHours = !isBusinessHours();
      const priceLine = formatPriceLine(result.quote);
      const service = result.quote?.service ?? "your move";
      let msg = `Perfect. For a ${service} from ${form.origin_suburb} to ${form.destination_suburb}, you're looking at **${priceLine}** — 2 movers, truck, fuel, blankets and trolleys all included, fully insured to $50k. No hidden fees, no fuel levy. We're rated 4.9★ across 1,400+ reviews with 4,200+ moves done.`;
      if (offHours) msg += " We're closed right now, but we'll get back to you first thing.";
      say(msg);
      trackChatLead();
      trackChatStep("result_qualified", { rate: result.quote?.rate, unit: result.quote?.unit });
    } else {
      say(declineMessage(result.disqualified_reason));
      trackChatStep("result_declined", { reason: result.disqualified_reason });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Chat with GoMovers"
      className="fixed inset-x-4 bottom-24 z-50 flex h-[min(560px,70vh)] flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl sm:inset-x-auto sm:right-6 sm:w-[380px]"
    >
      <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
        <div>
          <p className="text-sm font-bold text-primary-foreground">GoMovers</p>
          <p className="text-xs text-primary-foreground/70">Usually replies in minutes</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground/80 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-brand text-brand-foreground"
                  : "bg-secondary text-primary"
              }`}
            >
              {m.role === "bot" ? renderWithBold(m.text) : m.text}
            </div>
          </div>
        ))}
        {step === "submitting" && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border p-3">
        {step === "origin" && (
          <TextInputStep icon={MapPin} placeholder="e.g. Mermaid Beach" onSubmit={handleOrigin} />
        )}
        {step === "destination" && (
          <TextInputStep icon={MapPin} placeholder="e.g. Robina" onSubmit={handleDestination} />
        )}
        {step === "date" && <DateInputStep onSubmit={handleDate} />}
        {step === "home_size" && (
          <ChoiceStep options={HOME_SIZE_OPTIONS} onSubmit={handleHomeSize} />
        )}
        {step === "notes" && (
          <NotesStep onSubmit={handleNotes} onSkip={() => handleNotes("")} />
        )}
        {step === "contact" && (
          <ContactStep
            onSubmit={handleContactSubmit}
            error={error}
            honeypot={honeypot}
            onHoneypotChange={setHoneypot}
          />
        )}
        {step === "submitting" && (
          <p className="text-center text-xs text-muted-foreground">Getting your rate…</p>
        )}
        {step === "result" && result && <ResultActions result={result} />}
      </div>
    </div>
  );
}

function TextInputStep({
  placeholder,
  icon: Icon,
  onSubmit,
}: {
  placeholder: string;
  icon: React.ComponentType<{ className?: string }>;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        onSubmit(trimmed);
        setValue("");
      }}
      className="flex items-center gap-2"
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        aria-label="Send"
        disabled={!value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition hover:opacity-90 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function DateInputStep({ onSubmit }: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value) onSubmit(value);
      }}
      className="flex items-center gap-2"
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="date"
          min={today}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Move date"
          className="w-full bg-transparent text-sm text-primary outline-none"
        />
      </div>
      <button
        type="submit"
        aria-label="Send"
        disabled={!value}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition hover:opacity-90 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function ChoiceStep({
  options,
  onSubmit,
}: {
  options: { value: HomeSize; label: string }[];
  onSubmit: (value: HomeSize, label: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onSubmit(opt.value, opt.label)}
          className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm font-semibold text-primary transition hover:border-brand hover:bg-secondary"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function NotesStep({
  onSubmit,
  onSkip,
}: {
  onSubmit: (value: string) => void;
  onSkip: () => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value.trim());
      }}
      className="flex items-center gap-2"
    >
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <MessageSquareText className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Optional — e.g. piano, pool table"
          aria-label="Anything special (optional)"
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="button"
        onClick={onSkip}
        className="shrink-0 rounded-xl border border-border px-3 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-brand hover:text-primary"
      >
        Skip
      </button>
      <button
        type="submit"
        aria-label="Send"
        disabled={!value.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition hover:opacity-90 disabled:opacity-40"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function ContactStep({
  onSubmit,
  error,
  honeypot,
  onHoneypotChange,
}: {
  onSubmit: (name: string, phone: string, email: string) => void;
  error: string | null;
  honeypot: string;
  onHoneypotChange: (value: string) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) return;
        onSubmit(name.trim(), phone.trim(), email.trim());
      }}
      className="flex flex-col gap-2"
    >
      {/* Honeypot: hidden from real users via CSS + off-screen, not type="hidden" (bots skip those) */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="chat-widget-company">Company</label>
        <input
          id="chat-widget-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => onHoneypotChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <User className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <PhoneIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="04xx xxx xxx"
          aria-label="Mobile number"
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          aria-label="Email (optional)"
          className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
        />
      </div>
      <p className="text-[11px] leading-snug text-muted-foreground">
        We'll only use these details to text or email your quote — no spam, no cold calls.
      </p>
      {error && (
        <p className="rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
      )}
      <button
        type="submit"
        disabled={!name.trim() || !phone.trim()}
        className="mt-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
      >
        Get my rate →
      </button>
    </form>
  );
}

function ResultActions({ result }: { result: ChatLeadResponse }) {
  const qualified = result.in_service_area && !result.disqualified_reason;
  if (!qualified) return null;

  return (
    <div className="flex flex-col gap-2">
      {result.whatsapp_url && (
        <a
          href={result.whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackChatStep("whatsapp_click")}
          className="rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-bold text-brand-foreground shadow-sm transition hover:opacity-90"
        >
          Continue on WhatsApp
        </a>
      )}
      <a
        href="/#quote-form"
        onClick={() => trackChatStep("written_quote_click")}
        className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-bold text-primary transition hover:border-brand"
      >
        Written quote in 2 min
      </a>
    </div>
  );
}
