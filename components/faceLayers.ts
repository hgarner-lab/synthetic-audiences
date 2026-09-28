// Extra layers drawn over (and behind) a Lorelei face, for people whose look the style
// doesn't cover: head coverings, short beards, fine age lines and a hint of collar.
// Everything is drawn in the face's own 980x980 space, in the same line weight.
// Used for the Saudi people (data/ksaPeople.ts).

const OUT = 10;

export type Covering =
  | { kind: "none" }
  | { kind: "scarf"; color: string; shade: string }
  | { kind: "ghutra" }
  | { kind: "shemagh" };

export type Wear =
  | { kind: "thobe" }
  | { kind: "abaya"; accent?: string }
  | { kind: "suit" | "suitTie" | "blazer"; color: string; shirt: string; tie?: string }
  | { kind: "top"; color: string };

// ---- Head coverings ----

const SCARF = "M470 120 C650 110 800 210 812 400 C822 530 800 640 772 720 C760 790 820 870 880 1200 L110 1200 C150 880 205 815 214 735 C184 615 166 490 190 380 C220 220 320 128 470 120 Z";
const SCARF_OPENING = "M330 330 C360 200 560 168 702 232 C740 380 738 560 716 650 C704 700 652 742 582 744 C505 744 425 712 372 660 C348 612 336 560 338 480 C340 420 326 380 330 330 Z";
const SCARF_HAIR = "M330 330 C360 200 560 168 702 232 C714 270 718 300 714 334 C650 300 585 290 532 296 L512 238 L498 294 C440 296 380 314 330 348 Z";

const CLOTH = "M470 96 C668 90 826 192 830 372 L850 690 C862 810 900 905 940 1200 L700 1200 C712 860 726 742 729 640 C736 520 734 400 706 322 C640 300 560 296 520 312 C480 296 400 300 352 322 C340 420 338 530 344 625 C338 700 322 850 300 1200 L50 1200 C100 880 150 782 158 682 L166 372 C182 192 296 102 470 96 Z";
const CLOTH_BACK = "M470 96 C668 90 826 192 830 372 L850 690 C862 810 900 905 940 1200 L50 1200 C100 880 150 782 158 682 L166 372 C182 192 296 102 470 96 Z";

const SHEMAGH_PATTERN = `<defs><pattern id="shemagh" width="70" height="70" patternUnits="userSpaceOnUse" patternTransform="rotate(6)">
  <rect width="70" height="70" fill="#f7f5f0"/>
  <path d="M0 0 H70 M0 35 H70 M0 0 V70 M35 0 V70" stroke="#c23b2e" stroke-width="5"/>
  <rect x="11" y="11" width="13" height="13" fill="#c23b2e"/>
  <rect x="46" y="46" width="13" height="13" fill="#c23b2e"/>
</pattern></defs>`;

function clothFill(covering: Covering) {
  return covering.kind === "shemagh" ? "url(#shemagh)" : "#f7f5f0";
}

// Fabric behind the face, so no background shows in the gaps beside the jaw.
function coveringBack(covering: Covering) {
  if (covering.kind === "scarf") return `<path d="${SCARF}" fill="${covering.color}"/>`;
  if (covering.kind === "ghutra" || covering.kind === "shemagh")
    return `${covering.kind === "shemagh" ? SHEMAGH_PATTERN : ""}<path d="${CLOTH_BACK}" fill="${clothFill(covering)}"/>`;
  return "";
}

function coveringFront(covering: Covering, hairColor: string) {
  if (covering.kind === "scarf")
    // Worn a little back from the forehead, so the front of the hair shows.
    return `<path d="${SCARF_HAIR}" fill="${hairColor}"/>
      <path d="${SCARF} ${SCARF_OPENING}" fill-rule="evenodd" fill="${covering.color}" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M760 740 C700 800 640 860 600 1200" stroke="${covering.shade}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M250 760 C300 840 330 900 340 975" stroke="${covering.shade}" stroke-width="9" fill="none" opacity="0.7" stroke-linecap="round"/>`;
  if (covering.kind === "ghutra" || covering.kind === "shemagh")
    // The headcloth, then the black agal band around the crown.
    return `<path d="${CLOTH}" fill="${clothFill(covering)}" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M470 110 C455 170 445 230 440 262" stroke="#cfcac0" stroke-width="8" fill="none"/>
      <path d="M172 318 C300 220 640 205 822 300" stroke="#141414" stroke-width="30" fill="none" stroke-linecap="round"/>
      <path d="M176 360 C305 262 640 248 826 342" stroke="#141414" stroke-width="30" fill="none" stroke-linecap="round"/>`;
  return "";
}

// ---- A hint of collar ----

const SHOULDERS = "M96 1200 C118 902 232 858 380 850 C420 880 540 885 590 850 C722 858 842 900 874 1200 Z";

function clothes(wear: Wear) {
  let out: string;
  if (wear.kind === "thobe") {
    out = `<path d="${SHOULDERS}" fill="#f7f5f0" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M380 850 C420 880 540 885 590 850" stroke="#000" stroke-width="${OUT}" fill="none"/>
      <path d="M486 882 L486 1200" stroke="#000" stroke-width="7"/><circle cx="486" cy="915" r="7" fill="#000"/>`;
  } else if (wear.kind === "abaya") {
    out = `<path d="${SHOULDERS}" fill="#161616" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M430 872 C450 920 470 960 478 1200 M540 872 C520 920 505 960 500 1200" stroke="${wear.accent ?? "#555"}" stroke-width="10" fill="none" opacity="0.55"/>`;
  } else if (wear.kind === "top") {
    out = `<path d="${SHOULDERS}" fill="${wear.color}" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M400 852 C430 900 540 905 572 852" stroke="#000" stroke-width="7" fill="none"/>`;
  } else {
    out = `<path d="${SHOULDERS}" fill="${wear.color}" stroke="#000" stroke-width="${OUT}" stroke-linejoin="round"/>
      <path d="M392 852 L486 1200 L578 852 C540 880 430 880 392 852 Z" fill="${wear.shirt}" stroke="#000" stroke-width="7"/>
      ${wear.kind === "suitTie" ? `<path d="M470 872 L502 872 L496 900 L512 1010 L486 1040 L460 1010 L476 900 Z" fill="${wear.tie ?? "#7a2e3a"}" stroke="#000" stroke-width="6" stroke-linejoin="round"/>` : ""}
      ${wear.kind === "blazer" ? `<path d="M420 860 C450 900 530 902 556 860" stroke="#000" stroke-width="6" fill="none"/>` : ""}
      <path d="M392 852 L450 940 L486 1200 M578 852 L520 940 L486 1200" stroke="#000" stroke-width="7" fill="none"/>`;
  }
  // Raised so the collar covers the end of the neck drawing.
  return `<g transform="translate(0 -80)">${out}</g>`;
}

// ---- Age and beards ----

// Fine lines from about 45, a few more from about 55. The forehead line only shows when
// the forehead isn't covered.
function ageLines(age: number, forehead: boolean) {
  if (age < 45) return "";
  const older = age >= 55;
  const s = `stroke="#3a2a22" stroke-linecap="round" fill="none" opacity="${older ? 0.55 : 0.4}"`;
  return `<path d="M468 560 C448 590 446 622 470 650" ${s} stroke-width="7"/>
    <path d="M648 560 C664 590 664 622 640 650" ${s} stroke-width="7"/>
    <path d="M420 500 C440 512 470 512 490 502" ${s} stroke-width="5"/>
    <path d="M640 498 C652 508 668 508 678 500" ${s} stroke-width="5"/>
    ${older ? `<path d="M412 520 C440 534 474 532 494 520" ${s} stroke-width="4"/>` : ""}
    ${forehead ? `<path d="M430 350 C480 340 560 338 620 348" ${s} stroke-width="5"/>` : ""}`;
}

const BEARD = "M348 505 C352 590 380 680 440 742 C492 780 540 792 572 790 C650 786 706 728 720 650 C726 600 726 560 722 505 C716 530 708 548 700 556 L690 546 L684 566 C668 580 652 588 640 592 L632 580 L622 598 C600 594 540 590 500 596 C488 598 478 600 470 598 L460 584 L448 594 C420 584 396 566 380 548 L370 560 L362 536 C356 526 352 516 348 505 Z";
const BEARD_MOUTH = "M476 610 C515 600 590 600 628 610 C622 656 586 676 552 676 C516 676 482 656 476 610 Z";

// A short, solid beard with the mouth left clear. Grey beards get a light salt-and-pepper texture.
function beard(age: number) {
  const color = age >= 55 ? "#a39e98" : age >= 50 ? "#6f6a65" : "#2b2420";
  if (age < 50) return `<path d="${BEARD} ${BEARD_MOUTH}" fill-rule="evenodd" fill="${color}"/>`;
  return `<defs><pattern id="saltpepper" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
      <rect width="30" height="30" fill="${color}"/>
      <path d="M5 5 l5 9 M19 14 l4 8" stroke="#3a3430" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
      <path d="M17 3 l3 6" stroke="#d8d4cf" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    </pattern></defs>
    <path d="${BEARD} ${BEARD_MOUTH}" fill-rule="evenodd" fill="url(#saltpepper)"/>`;
}

export type FaceExtras = { covering: Covering; wear: Wear; beard: boolean; age: number };

export function hairColorFor(age: number) {
  return age >= 55 ? "9a958f" : age >= 50 ? "5f5954" : "2b2420";
}

// Adds the layers to a Lorelei SVG string: fabric behind the face, then clothes, age lines,
// beard and head covering in front.
export function addFaceLayers(svg: string, extras: FaceExtras) {
  const { covering, wear, age } = extras;
  const forehead = covering.kind === "none" || covering.kind === "scarf";
  const front =
    clothes(wear) +
    ageLines(age, forehead) +
    (extras.beard ? beard(age) : "") +
    coveringFront(covering, `#${hairColorFor(age)}`);
  return svg
    .replace('<g mask="url(#viewboxMask)">', `<g mask="url(#viewboxMask)">${coveringBack(covering)}`)
    .replace(/<\/g><\/svg>$/, `${front}</g></svg>`);
}
