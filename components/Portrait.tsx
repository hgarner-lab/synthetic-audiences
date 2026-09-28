import type { Persona } from "@/data/personas";
import { Face } from "@/components/Face";

// A person's face on a tinted card, used in profiles and the people list.
export function Portrait({ persona, large = false }: { persona: Persona; large?: boolean }) {
  const initials = persona.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className={`portrait ${large ? "portraitLarge" : ""} role-${persona.influenceRole}`} aria-hidden="true">
      <div className="portraitGlow" />
      <div className="portraitFace">
        <Face id={persona.id} mood="waiting" size={large ? 200 : 120} />
      </div>
      <span className="portraitInitials">{initials}</span>
    </div>
  );
}

// "Adel Al-Harbi" becomes "AH": the given name, then the family name after any "Al-".
export function initialsFor(name: string) {
  const parts = name.split(" ");
  const family = parts[parts.length - 1].replace(/^Al-/, "");
  return `${parts[0][0]}${family[0]}`.toUpperCase();
}

// Stands in for a face while a market's faces aren't ready (KSA, until head coverings
// are handled). Same card and role colour as a face portrait, with initials in the circle.
export function InitialsPortrait({
  name,
  influenceRole,
  large = false,
}: {
  name: string;
  influenceRole: Persona["influenceRole"];
  large?: boolean;
}) {
  return (
    <div className={`portrait ${large ? "portraitLarge" : ""} role-${influenceRole}`} aria-hidden="true">
      <div className="portraitGlow" />
      <div className="portraitFace portraitInitialsDisc">
        <span>{initialsFor(name)}</span>
      </div>
    </div>
  );
}
