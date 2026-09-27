import type { CSSProperties } from "react";
import type { Stance } from "@/data/reactions";

export type FaceMood = Stance | "waiting";

const skinTones = ["#f1c9a5", "#e5b48c", "#d9a47a", "#c98f66", "#edc29c", "#dcae86"];
const hairColours = ["#1d1a18", "#2b2420", "#3a2e27", "#151515", "#4a4440"];
const clothes = ["#2f3b4a", "#5b4a3c", "#3d4f46", "#6b6f78", "#1f2d3a", "#7a5a52", "#44505e"];

const mouths: Record<FaceMood, string> = {
  waiting: "M45 56 Q50 57.5 55 56",
  in: "M43 54.5 Q50 61.5 57 54.5",
  unsure: "M44 57 Q48 55.5 56 56.5",
  pushback: "M43 59 Q50 53 57 59",
  out: "M46 57 Q50 57 54 57",
};

const brows: Record<FaceMood, string> = {
  waiting: "M39 39 Q42.5 38 46 39 M54 39 Q57.5 38 61 39",
  in: "M39 37.5 Q42.5 35 46 37.5 M54 37.5 Q57.5 35 61 37.5",
  unsure: "M39 39.5 L46 39.5 M54 37.5 Q57.5 35 61 38",
  pushback: "M39 36.5 L46 40 M54 40 L61 36.5",
  out: "M39.5 40.5 L46 40.5 M54 40.5 L60.5 40.5",
};

function hash(text: string) {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) >>> 0;
  return value;
}

function Hair({ variant, colour, layer }: { variant: number; colour: string; layer: "back" | "front" }) {
  if (layer === "back") {
    if (variant === 2)
      return <path d="M31 46 C29 24 42 20 50 20 C60 20 71 25 69 46 L70 63 C66 61 64 57 64 50 L36 50 C36 57 34 61 30 63 Z" fill={colour} />;
    if (variant === 3)
      return <path d="M30 46 C28 23 42 19 50 19 C61 19 72 24 70 46 L72 76 C66 74 64 66 64 54 L36 54 C36 66 34 74 28 76 Z" fill={colour} />;
    return null;
  }
  switch (variant) {
    case 0:
      return <path d="M33 42 C32 26 42 21 50 21 C60 21 68 27 67 42 C64 34 58 30 50 30 C42 30 36 34 33 42 Z" fill={colour} />;
    case 1:
      return <path d="M33 44 C31 25 45 20 52 21 C63 22 69 30 67 44 C66 36 62 31 56 29 C50 33 40 35 33 44 Z" fill={colour} />;
    case 2:
    case 3:
      return <path d="M33 41 C34 27 44 23 50 23 C58 23 66 27 67 41 C60 33 44 31 33 41 Z" fill={colour} />;
    case 4:
      return <path d="M34 38 C36 26 44 23 50 23 C57 23 64 26 66 38 C60 32 40 32 34 38 Z" fill={colour} />;
    default:
      return (
        <g fill={colour}>
          <circle cx="50" cy="19" r="6" />
          <path d="M33 42 C32 27 42 22 50 22 C60 22 68 27 67 42 C64 34 58 31 50 31 C42 31 36 34 33 42 Z" />
        </g>
      );
  }
}

// Draws an illustrated, clearly synthetic face whose expression follows the person's stance.
export function Face({ id, mood, size = 72 }: { id: string; mood: FaceMood; size?: number }) {
  const seed = hash(id);
  const skin = skinTones[seed % skinTones.length];
  const hair = hairColours[(seed >> 3) % hairColours.length];
  const cloth = clothes[(seed >> 5) % clothes.length];
  const hairVariant = (seed >> 7) % 6;
  const glasses = (seed >> 11) % 4 === 0;
  const clipId = `clip-${id}-${size}`;

  return (
    <svg className={`face mood-${mood}`} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>
      <circle className="faceBg" cx="50" cy="50" r="48" />
      <g clipPath={`url(#${clipId})`}>
        <g className="faceBody">
          <path d="M12 106 C16 79 33 70 50 70 C67 70 84 79 88 106 Z" fill={cloth} />
          <path d="M44 66 L50 74 L56 66 Z" fill="#f4efe6" opacity="0.85" />
        </g>
        <g className="faceHead">
          <Hair variant={hairVariant} colour={hair} layer="back" />
          <rect x="44" y="56" width="12" height="14" rx="4" fill={skin} />
          <ellipse cx="33.5" cy="46" rx="3" ry="4.5" fill={skin} />
          <ellipse cx="66.5" cy="46" rx="3" ry="4.5" fill={skin} />
          <ellipse cx="50" cy="44" rx="17" ry="20" fill={skin} />
          <Hair variant={hairVariant} colour={hair} layer="front" />
          <g className="faceEyes">
            <circle cx="43" cy="45" r="1.9" fill="#1f1a17" />
            <circle cx="57" cy="45" r="1.9" fill="#1f1a17" />
          </g>
          <path
            className="faceBrows"
            d={brows[mood]}
            style={{ d: `path("${brows[mood]}")` } as CSSProperties}
            stroke={hair}
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {glasses && (
            <g stroke="#2a2522" strokeWidth="1.2" fill="none" opacity="0.85">
              <circle cx="43" cy="45" r="5" />
              <circle cx="57" cy="45" r="5" />
              <path d="M48 45 L52 45" />
            </g>
          )}
          <path
            className="faceMouth"
            d={mouths[mood]}
            style={{ d: `path("${mouths[mood]}")` } as CSSProperties}
            stroke="#6b3a2e"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
}
