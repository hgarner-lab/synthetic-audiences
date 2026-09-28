import type { Persona } from "@/data/personas";
import { Face } from "@/components/Face";

// A person's face on a tinted card, used in profiles and the people list.
export function Portrait({
  persona,
  large = false,
}: {
  persona: Pick<Persona, "id" | "name" | "influenceRole">;
  large?: boolean;
}) {
  // "Chen Jing" becomes "CJ"; "Adel Al-Harbi" becomes "AH", skipping the "Al-".
  const initials = persona.name
    .split(" ")
    .map((part) => part.replace(/^Al-/, "")[0])
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

