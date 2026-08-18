import { useState } from "react";
import { Download, Mail, Loader2, CheckCircle } from "lucide-react";
import { captureGuideLead } from "@/server/captureGuideLead";

interface Props {
  compact?: boolean;
  source?: string;
}

export function GuideDownload({ compact = false, source = "guide-page" }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await captureGuideLead({ data: { email, source } });
      setSubmitted(true);
      const a = document.createElement("a");
      a.href = "/downloads/7-moving-mistakes.pdf";
      a.download = "7-Moving-Mistakes-GoMovers.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return compact ? (
      <div className="flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand/5 px-6 py-5">
        <CheckCircle className="h-5 w-5 shrink-0 text-brand" />
        <div>
          <p className="font-semibold text-primary">Downloading now</p>
          <p className="text-sm text-muted-foreground">Check your inbox too — we've sent you the link.</p>
        </div>
      </div>
    ) : (
      <div className="rounded-2xl border border-brand bg-brand/5 p-6 sm:p-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-brand" />
        <p className="mt-3 font-bold text-primary">Downloading now</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We've also sent the link to {email}. No spam, unsubscribe any time.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/5 px-6 py-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p className="font-semibold text-primary">Free guide: 7 Costly Moving Mistakes</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {loading ? "Sending…" : "Send me the guide"}
            </button>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <p className="text-xs text-muted-foreground">No spam. Unsubscribe any time.</p>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground">
          <Download className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-primary">Get the PDF guide — free</p>
          <p className="text-sm text-muted-foreground">Enter your email and we'll send it straight to your inbox.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Your email
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 focus-within:border-brand">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {loading ? "Sending…" : "Send me the free guide"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe any time.</p>
    </div>
  );
}
