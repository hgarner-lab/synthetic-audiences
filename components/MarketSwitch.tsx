"use client";

import { MarketId, markets } from "@/data/markets";

// China / Saudi Arabia switch, shared by the pages that work in both markets.
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
