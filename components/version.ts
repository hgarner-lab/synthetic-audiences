import { roomMessages } from "@/data/reactions";

// The version of the message the visitor is working with, so every part of the
// experience can respond to it. A ?version= link wins; otherwise the last version
// chosen in the room (kept for this browser tab); otherwise the original.
const KEY = "sa-version";

function valid(id: string | null): id is string {
  return !!id && roomMessages.some((message) => message.id === id);
}

export function readVersion(): string {
  if (typeof window === "undefined") return "original";
  const fromLink = new URLSearchParams(window.location.search).get("version");
  if (valid(fromLink)) return fromLink;
  try {
    const saved = window.sessionStorage.getItem(KEY);
    if (valid(saved)) return saved;
  } catch {
    // Storage can be unavailable (e.g. private browsing).
  }
  return "original";
}

export function saveVersion(id: string) {
  try {
    window.sessionStorage.setItem(KEY, id);
  } catch {
    // Nothing else depends on it.
  }
}

export function versionLabel(id: string) {
  const message = roomMessages.find((item) => item.id === id);
  return !message || message.id === "original" ? "Original message" : message.label;
}
