"use client";

import { MarketId, markets } from "@/data/markets";

// A small flag beside each market's name, so the current country is easy to spot.
// Flags from flag-icons (MIT), see public/flags/README.md.
const flags: Record<MarketId, string> = { china: "/flags/cn.svg", ksa: "/flags/sa.svg" };

// China / Saudi Arabia switch, shared by every page that works in both markets.
export function MarketSwitch({
  value,
  onChange,
  className = "",
}: {
  value: MarketId;
  onChange: (id: MarketId) => void;
  className?: string;
}) {
  return (
    <div className={`marketSwitch ${className}`} role="group" aria-label="Choose a market">
      {(["china", "ksa"] as MarketId[]).map((id) => (
        <button key={id} className={value === id ? "active" : ""} aria-pressed={value === id} onClick={() => onChange(id)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="marketFlag" src={flags[id]} alt="" width={20} height={15} />
          {markets[id].name}
          {id === "ksa" && <span>New</span>}
        </button>
      ))}
    </div>
  );
}

// Keeps the address shareable: ?market=ksa for Saudi Arabia, nothing for China.
export function setMarketInUrl(id: MarketId, drop: string[] = []) {
  const url = new URL(window.location.href);
  if (id === "ksa") url.searchParams.set("market", "ksa");
  else url.searchParams.delete("market");
  drop.forEach((key) => url.searchParams.delete(key));
  window.history.replaceState(null, "", url);
}
