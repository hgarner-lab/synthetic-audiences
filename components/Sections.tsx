import type { ReactElement } from "react";

// The core parts of the experience. Each has its own colour (from the McCann gradient)
// and icon, used wherever that part is linked to or introduced, so people learn them.

export type SectionId = "room" | "journey" | "ask" | "try" | "people" | "recommendation";

export const sections: Record<SectionId, { name: string; colour: string }> = {
  room: { name: "The room", colour: "#6f86ff" },
  journey: { name: "Follow the decision", colour: "#efcfae" },
  ask: { name: "Ask the room", colour: "#6fd0f0" },
  try: { name: "Try an idea", colour: "#f08fc0" },
  people: { name: "Meet everyone", colour: "#c3a1f0" },
  recommendation: { name: "The recommendation", colour: "#f08b62" },
};

const paths: Record<SectionId, ReactElement> = {
  // A grid of heads.
  room: (
    <>
      <circle cx="7" cy="8" r="2.2" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="7" cy="17" r="2.2" />
      <circle cx="17" cy="17" r="2.2" />
      <circle cx="12" cy="12.5" r="2.2" />
    </>
  ),
  // A path through four stops.
  journey: (
    <>
      <path d="M4 18 C8 18 8 6 12 6 S16 18 20 18" fill="none" strokeWidth="1.8" stroke="currentColor" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="20" cy="18" r="2" />
    </>
  ),
  // A speech bubble with a question mark.
  ask: (
    <>
      <path d="M4 5h16v11H10l-4 4v-4H4z" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinejoin="round" />
      <path d="M10.2 9a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1" fill="none" strokeWidth="1.6" stroke="currentColor" strokeLinecap="round" />
      <circle cx="12" cy="13.8" r="0.9" />
    </>
  ),
  // Two arrows swapping: try another version.
  try: (
    <>
      <path d="M5 9h12l-3-3M19 15H7l3 3" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Three people.
  people: (
    <>
      <circle cx="12" cy="8" r="2.6" />
      <path d="M7 19c0-3 2.2-5 5-5s5 2 5 5z" />
      <circle cx="5.5" cy="10" r="1.9" />
      <circle cx="18.5" cy="10" r="1.9" />
    </>
  ),
  // A flag: where to go.
  recommendation: (
    <>
      <path d="M6 20V4" fill="none" strokeWidth="1.8" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 5h11l-2.5 3.5L17 12H6z" />
    </>
  ),
};

export function SectionIcon({ id, size = 40 }: { id: SectionId; size?: number }) {
  return (
    <span
      className="sectionIcon"
      style={{ width: size, height: size, background: sections[id].colour }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="currentColor">
        {paths[id]}
      </svg>
    </span>
  );
}

// A section label with its icon, e.g. above a section heading.
export function SectionTag({ id, number }: { id: SectionId; number?: string }) {
  return (
    <p className="sectionTag" style={{ color: sections[id].colour }}>
      <SectionIcon id={id} size={26} />
      {number && <span className="sectionTagNumber">{number}</span>}
      {sections[id].name}
    </p>
  );
}
