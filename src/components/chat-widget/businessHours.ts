const TIMEZONE = "Australia/Brisbane";

/** Mon–Sat 7am–5pm, Australia/Brisbane (QLD has no daylight saving). */
export function isBusinessHours(now: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: TIMEZONE,
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");

  if (weekday === "Sun") return false;
  return hour >= 7 && hour < 17;
}
