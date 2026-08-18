type FbqWindow = typeof window & { fbq?: (...args: unknown[]) => void };

export function trackChatStep(step: string, extra?: Record<string, unknown>) {
  const w = window as FbqWindow;
  w.fbq?.("trackCustom", "ChatWidgetStep", { step, ...extra });
}

export function trackChatLead() {
  const w = window as FbqWindow;
  w.fbq?.("track", "Lead");
}
