import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import * as lorelei from "@dicebear/lorelei";
import type { Options as LoreleiOptions } from "@dicebear/lorelei";
import { personas } from "@/data/personas";
import { ksaPeople } from "@/data/ksaPeople";
import { addFaceLayers, hairColorFor } from "@/components/faceLayers";
import type { Stance } from "@/data/reactions";

export type FaceMood = Stance | "waiting";

// Faces use the Lorelei style by Lisa Wischofsky (CC0 1.0), rendered with DiceBear.
// Each person keeps a fixed look that matches their gender and age; only the mouth
// and brows change with their stance. Other traits are spread across people so the
// room reads as individuals, not a type.

// Hairstyles that read clearly for each gender at small sizes.
const hairStyles: Record<"woman" | "man", LoreleiOptions["hair"]> = {
  woman: [
    "variant13", "variant15", "variant16", "variant19", "variant21", "variant23", "variant29",
    "variant31", "variant33", "variant38", "variant40", "variant42", "variant48",
  ],
  man: [
    "variant01", "variant02", "variant03", "variant06", "variant07", "variant08",
    "variant11", "variant12", "variant25", "variant28", "variant39", "variant47",
  ],
};
const skinTones = ["f1c9a5", "e5b48c", "d9a47a", "c98f66", "edc29c", "dcae86"];
const darkHair = ["1d1a18", "2b2420", "3a2e27", "151515", "4a4440"];
// People whose age range starts at 50 or above get grey or greying hair.
const greyHair = ["6f6a66", "8a8580"];
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
// role or group (the persona list is ordered by both). Pass a smaller group to
// deal only among those people, e.g. hairstyles among the women.
function rank(id: string, trait: string, among = personas) {
  const order = among
    .map((persona) => persona.id)
    .sort((a, b) => hash(`${a}:${trait}`) - hash(`${b}:${trait}`));
  const index = order.indexOf(id);
  return index >= 0 ? index : hash(`${id}:${trait}`);
}

function looksFor(id: string): Partial<LoreleiOptions> {
  const persona = personas.find((item) => item.id === id);
  const gender = persona?.gender ?? (hash(id) % 2 ? "woman" : "man");
  const sameGender = personas.filter((item) => item.gender === gender);
  const older = (persona?.ageRange[0] ?? 0) >= 50;
  return {
    hair: pick(hairStyles[gender], rank(id, "hair", sameGender)),
    skinColor: pick(skinTones, rank(id, "skin")),
    hairColor: older ? pick(greyHair, rank(id, "hairColour")) : pick(darkHair, rank(id, "hairColour")),
    eyes: pick(eyeShapes, rank(id, "eyes")),
    glasses: pick(glassStyles, rank(id, "glassStyle")),
    glassesProbability: rank(id, "glasses") < 6 ? 100 : 0,
    earringsProbability: gender === "woman" && rank(id, "earrings", sameGender) < 4 ? 100 : 0,
    beardProbability: 0,
    frecklesProbability: 0,
    hairAccessoriesProbability: 0,
  };
}

const cache = new Map<string, string>();

// Saudi people have a set look, with head coverings, beards and collars drawn on top
// (components/faceLayers.ts). Their age comes from the middle of their age range.
function ksaAvatarUri(id: string, mood: FaceMood) {
  const person = ksaPeople.find((item) => item.id === id);
  if (!person) return null;
  const { look } = person;
  const age = (person.ageRange[0] + person.ageRange[1]) / 2;
  const svg = createAvatar(lorelei, {
    seed: id,
    hair: [look.hair] as LoreleiOptions["hair"],
    hairColor: [hairColorFor(age)],
    skinColor: [look.skin],
    eyes: [look.eyes] as LoreleiOptions["eyes"],
    glasses: look.glasses ? ([look.glasses] as LoreleiOptions["glasses"]) : undefined,
    glassesProbability: look.glasses ? 100 : 0,
    earringsProbability: 0,
    beardProbability: 0,
    frecklesProbability: 0,
    hairAccessoriesProbability: 0,
    ...expressions[mood],
  }).toString();
  const layered = addFaceLayers(svg, { covering: look.covering, wear: look.wear, beard: look.beard, age });
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(layered)}`;
}

function avatarUri(id: string, mood: FaceMood) {
  const key = `${id}:${mood}`;
  let uri = cache.get(key);
  if (!uri) {
    uri =
      ksaAvatarUri(id, mood) ??
      createAvatar(lorelei, { seed: id, ...looksFor(id), ...expressions[mood] }).toDataUri();
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
