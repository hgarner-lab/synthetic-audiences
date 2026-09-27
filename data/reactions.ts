import { personas } from "@/data/personas";
import { ideaOptions, IdeaShiftDirection } from "@/data/ideas";

export type Stance = "in" | "unsure" | "pushback" | "out";

export const stanceLabels: Record<Stance, string> = {
  in: "Leaning in",
  unsure: "Not convinced",
  pushback: "Pushing back",
  out: "Tuning out",
};

export const stanceOrder: Stance[] = ["in", "unsure", "pushback", "out"];

export const originalMessage = {
  id: "original",
  label: "Original message",
  proposition:
    "Aramco's lower-carbon crude oil can give your business a lasting commercial advantage.",
};

// Short first-person lines, drawn from each persona's internal thought and needs.
const originalLines: Record<string, string> = {
  CN_EN_V: "Could be true. But show me checked data before I believe the number.",
  CN_EN_B: "Where's the energy security angle? I can't back this without it.",
  CN_EN_A: "No partner, no use case. Nothing here I'd pass on.",
  CN_EN_R: "Interesting start. I'd make it about competitiveness, though.",
  CN_CH_V: "Too vague. What does it do for our plant's output and reliability?",
  CN_CH_B: "Who has independently checked this claim? Until then, it's a risk.",
  CN_CH_A: "Nothing here connects to our supply chain. I'd skip it.",
  CN_CH_R: "I'd buy it as an investment story, with the numbers behind it.",
  CN_FL_V: "Maybe it's true. Is it worth any money, though?",
  CN_FL_B: "I'd need a legal view before this goes anywhere public.",
  CN_FL_A: "No deal, no partner, no outcome. Not for me.",
  CN_FL_R: "Show me how it makes our money go further and I'm interested.",
  CN_PG_V: "How does this fit national policy? It doesn't say.",
  CN_PG_B: "Where's the proof it meets Chinese rules?",
  CN_PG_A: "No link to our industry or the local economy. Moving on.",
  CN_PG_R: "Good, if it means local jobs and local capability.",
  CN_TE_V: "Show me results from trials and a review by other experts.",
  CN_TE_B: "What about the data behind it? Who looks after that?",
  CN_TE_A: "Nothing here about partners. I wouldn't share it.",
  CN_TE_R: "Tie it to bringing industry online and I'd use it.",
  CN_IC_V: "I'd want to see how it was worked out before I comment.",
  CN_IC_B: "Sounds like a press release. Who's accountable for it?",
  CN_IC_A: "It could be a headline, but where's the news?",
  CN_IC_R: "It's really an energy security story. Say that.",
};

// First-person lines for the people each alternative route moves.
const routeLines: Record<string, Record<string, string>> = {
  resilience: {
    CN_EN_R: "Now it's about competitiveness. That's the conversation I want.",
    CN_EN_B: "Energy security is finally on the table. I'm listening.",
    CN_IC_R: "Better. It admits the bigger geopolitical picture.",
    CN_EN_V: "A broader story, but the same unproven number.",
    CN_CH_B: "A bigger story doesn't make the claim any safer.",
    CN_FL_V: "You're promising long-term value now. Prove it with a model.",
  },
  proof: {
    CN_EN_V: "Independently checked data? Now I can actually judge it.",
    CN_CH_B: "That's what I needed. I can stand behind an assured claim.",
    CN_IC_V: "I can see how it was worked out. That I can review.",
    CN_FL_B: "Much lower risk, as long as the scope is clear.",
    CN_FL_V: "I believe the number now. I still don't see the money.",
    CN_EN_A: "Credible, but still nothing I'd share. Where's the customer?",
  },
  economics: {
    CN_FL_V: "Now you're answering my question: what is it worth?",
    CN_FL_R: "This is an investment story now. Good.",
    CN_CH_R: "Return on capital, finally. This I can use.",
    CN_EN_R: "Carbon linked to real commercial value. Stronger.",
    CN_EN_V: "Bigger promise, bigger proof. How does lower carbon actually make money?",
    CN_CH_B: "You're claiming more now, so there's more for me to check.",
  },
  "local-proof": {
    CN_EN_A: "A real Chinese partner? That I'd share.",
    CN_PG_A: "Now it connects to local industry. Worth passing on.",
    CN_PG_R: "Local capability, a local partner. This fits our plans.",
    CN_IC_A: "Now there's a story to tell.",
    CN_EN_V: "It only helps if the case comes with comparable data.",
    CN_FL_B: "Using a customer's name raises new questions: permission, proof, wording.",
  },
};

// The one reaction per message that people wouldn't predict.
const surprises: Record<string, { personaIds: string[]; text: string }> = {
  original: {
    personaIds: ["CN_EN_A", "CN_CH_A", "CN_FL_A", "CN_PG_A", "CN_TE_A", "CN_IC_A"],
    text: "Every person who would spread this message is tuning out. The only people leaning in are the ones who'd rewrite it.",
  },
  resilience: {
    personaIds: ["CN_FL_V"],
    text: "Making the long-term value more visible wins over strategy, but it raises the bar for finance. Sun Ying now pushes back.",
  },
  proof: {
    personaIds: ["CN_CH_B"],
    text: "Gao Yan, the toughest critic in the room, comes round. Finance still isn't moved, and nobody new will share it.",
  },
  economics: {
    personaIds: ["CN_EN_V", "CN_CH_B"],
    text: "Finance comes on board, but the bigger promise turns technical and compliance people from doubtful to pushing back.",
  },
  "local-proof": {
    personaIds: ["CN_EN_A", "CN_PG_A", "CN_IC_A"],
    text: "The people who'd spread it wake up for the first time. The catch: compliance now has new questions about using a partner's name.",
  },
};

export type Reaction = {
  personaId: string;
  stance: Stance;
  line: string;
  // Present only when this message moved the person compared with the original.
  shift?: {
    direction: IdeaShiftDirection;
    label: string;
    reason: string;
    from: Stance;
  };
};

export type RoomMessage = {
  id: string;
  label: string;
  proposition: string;
  reactions: Reaction[];
  surprise: { personaIds: string[]; text: string };
};

function originalStance(action: string): Stance {
  if (action === "Agree") return "in";
  if (action === "Ignore") return "out";
  return "unsure";
}

function shiftedStance(direction: IdeaShiftDirection, from: Stance): Stance {
  if (direction === "more-resolved") return "in";
  if (direction === "new-tension") return "pushback";
  return from;
}

const originalReactions: Reaction[] = personas.map((persona) => ({
  personaId: persona.id,
  stance: originalStance(persona.action),
  line: originalLines[persona.id],
}));

export const roomMessages: RoomMessage[] = [
  { ...originalMessage, reactions: originalReactions, surprise: surprises.original },
  ...ideaOptions.map((idea) => ({
    id: idea.id,
    label: idea.label,
    proposition: idea.proposition,
    surprise: surprises[idea.id],
    reactions: originalReactions.map((base) => {
      const shift = idea.shifts.find((item) => item.personaId === base.personaId);
      if (!shift) return base;
      return {
        personaId: base.personaId,
        stance: shiftedStance(shift.direction, base.stance),
        line: routeLines[idea.id]?.[base.personaId] ?? base.line,
        shift: {
          direction: shift.direction,
          label: shift.label,
          reason: shift.reason,
          from: base.stance,
        },
      };
    }),
  })),
];
