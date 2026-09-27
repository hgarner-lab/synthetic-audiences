import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as lorelei from "@dicebear/lorelei";
import type { Options as LoreleiOptions } from "@dicebear/lorelei";
import { personas } from "@/data/personas";
import type { Stance } from "@/data/reactions";

export type FaceMood = Stance | "waiting";

// Faces use the Lorelei style by Lisa Wischofsky (CC0 1.0), rendered with DiceBear.
// Each person keeps a fixed look; only the mouth and brows change with their stance.
// Looks are spread across people so the room reads as individuals, not a type.

const hairStyles: LoreleiOptions["hair"] = [
  "variant01", "variant02", "variant03", "variant07", "variant08", "variant09", "variant12",
  "variant13", "variant15", "variant16", "variant19", "variant21", "variant23", "variant25",
  "variant28", "variant33", "variant38", "variant40", "variant43", "variant47",
];
const skinTones = ["f1c9a5", "e5b48c", "d9a47a", "c98f66", "edc29c", "dcae86"];
const hairColours = ["1d1a18", "2b2420", "3a2e27", "151515", "4a4440", "8a8580"];
// Open, natural eye shapes only: no narrowed, half-closed or winking eyes, which
// read as caricature on East Asian faces. Expressions never change eye shape.
const eyeShapes: LoreleiOptions["eyes"] = [
  "variant02", "variant04", "variant06", "variant10", "variant14",
  "variant16", "variant20", "variant21", "variant24",
];

// Ordinary glasses only (variant02 is sunglasses).
const glassStyles: LoreleiOptions["glasses"] = ["variant01", "variant03", "variant04"];

const expressions: Record<FaceMood, Partial<LoreleiOptions>> = {
  waiting: { mouth: ["happy14"], eyebrows: ["variant09"] },
  in: { mouth: ["happy02"], eyebrows: ["variant01"] },
  unsure: { mouth: ["sad05"], eyebrows: ["variant12"] },
  pushback: { mouth: ["sad03"], eyebrows: ["variant13"] },
  out: { mouth: ["sad09"], eyebrows: ["variant11"] },
};

function hash(text: string) {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) >>> 0;
  return value;
}

function pick<T>(list: readonly T[] | undefined, index: number): T[] {
  return list ? [list[index % list.length]] : [];
}

// Each trait is dealt out in its own shuffled order, so looks never line up with
// role or group (the persona list is ordered by both).
function rank(id: string, trait: string) {
  const order = personas
    .map((persona) => persona.id)
    .sort((a, b) => hash(`${a}:${trait}`) - hash(`${b}:${trait}`));
  const index = order.indexOf(id);
  return index >= 0 ? index : hash(`${id}:${trait}`);
}

function looksFor(id: string): Partial<LoreleiOptions> {
  return {
    hair: pick(hairStyles, rank(id, "hair")),
    skinColor: pick(skinTones, rank(id, "skin")),
    hairColor: pick(hairColours, rank(id, "hairColour")),
    eyes: pick(eyeShapes, rank(id, "eyes")),
    glasses: pick(glassStyles, rank(id, "glassStyle")),
    glassesProbability: rank(id, "glasses") < 6 ? 100 : 0,
    earringsProbability: rank(id, "earrings") < 4 ? 100 : 0,
    beardProbability: 0,
    frecklesProbability: 0,
    hairAccessoriesProbability: 0,
  };
}

const cache = new Map<string, string>();

function avatarUri(id: string, mood: FaceMood) {
  const key = `${id}:${mood}`;
  let uri = cache.get(key);
  if (!uri) {
    uri = createAvatar(lorelei, { seed: id, ...looksFor(id), ...expressions[mood] }).toDataUri();
    cache.set(key, uri);
  }
  return uri;
}

// Draws a person's face on a stance-coloured disc; the expression follows their stance.
export function Face({ id, mood, size = 72 }: { id: string; mood: FaceMood; size?: number }) {
  const href = useMemo(() => avatarUri(id, mood), [id, mood]);
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
        <g className="faceHead">
          <image key={mood} className="faceImage" href={href} x="2" y="6" width="96" height="96" />
        </g>
      </g>
    </svg>
  );
}
