import type { Persona } from "@/data/personas";
import { Face } from "@/components/Face";

// A person's face on a tinted card, used in profiles and the people list.
export function Portrait({
  persona,
  large = false,
}: {
  persona: Pick<Persona, "id" | "influenceRole">;
  large?: boolean;
}) {
  return (
    <div className={`portrait ${large ? "portraitLarge" : ""} role-${persona.influenceRole}`} aria-hidden="true">
      <div className="portraitGlow" />
      <div className="portraitFace">
        <Face id={persona.id} mood="waiting" size={large ? 200 : 120} />
      </div>
    </div>
  );
}

