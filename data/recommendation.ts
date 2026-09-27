import { roomMessages, Stance, stanceOrder } from "@/data/reactions";

// The version the room responds to best: the most people leaning in and nobody pushing back.
export const recommendedId = "proof";

export type VersionTally = {
  id: string;
  label: string;
  counts: Record<Stance, number>;
};

export const versionTallies: VersionTally[] = roomMessages.map((message) => ({
  id: message.id,
  label: message.id === "original" ? "Original message" : message.label,
  counts: Object.fromEntries(
    stanceOrder.map((stance) => [stance, message.reactions.filter((r) => r.stance === stance).length])
  ) as Record<Stance, number>,
}));

export const recommendation = {
  headline: "Lead with independent proof. Then show what it's worth, and add a real Chinese partner story once you have one.",
  why: "Of the five versions we tested, this one wins over the most people and creates no new objections. It turns round the toughest critics in the room: the people who check facts and the people who can say no.",
  stillNeedsWork: [
    {
      personaId: "CN_FL_V",
      text: "Finance believes the number now, but still can't see what it's worth in money. They need a business case.",
    },
    {
      personaId: "CN_EN_A",
      text: "The people who'd spread the message still have nothing to share. They need a real Chinese partner or customer story.",
    },
  ],
  needs: [
    {
      title: "Get the carbon data independently checked",
      detail: "The main claim needs checked data from real operations, a like-for-like comparison with other crude, and a check by an independent body.",
      askedBy: ["CN_EN_V", "CN_CH_B", "CN_IC_V"],
    },
    {
      title: "Show it meets Chinese rules",
      detail: "Any environmental benefit must come with proof it meets Chinese rules and clear, open reporting, and be signed off internally before use.",
      askedBy: ["CN_CH_B", "CN_PG_B", "CN_FL_B"],
    },
    {
      title: "Build a business case",
      detail: "Show, step by step and with what-if scenarios, how the choice of crude affects costs, risk and value to customers.",
      askedBy: ["CN_FL_V", "CN_FL_R", "CN_CH_R"],
    },
    {
      title: "Find a real Chinese partner example",
      detail: "A named partner or customer gives people something to point to and pass on. Only use one that is real, checked and agreed to be named.",
      askedBy: ["CN_EN_A", "CN_PG_A", "CN_IC_A"],
    },
  ],
  watchOuts: [
    {
      title: "Don't lead with profits before the proof is ready",
      detail: "When we tried leading with refinery profits, the technical and safety people started pushing back. A bigger promise needs bigger proof.",
      personaIds: ["CN_EN_V", "CN_CH_B"],
    },
    {
      title: "Don't name a partner without permission",
      detail: "Using a customer's name raises new questions for compliance: permission to name them, proof of their results, and how those results are described.",
      personaIds: ["CN_FL_B"],
    },
    {
      title: "Don't let the number become the story",
      detail: "If a precise carbon figure makes the headline before anyone can explain it, journalists will focus on that instead of the message.",
      personaIds: ["CN_IC_B"],
    },
  ],
  nextSteps: [
    "Share this recommendation with the client team and agree which evidence already exists.",
    "Commission the independent check of the carbon data, and the business case, in parallel.",
    "Start looking for a Chinese partner or customer willing to be named.",
    "Brief the creative team using this page: the message, what each audience needs, and what to avoid.",
    "Put the finished creative back in front of the room, then test it with real people before launch.",
  ],
};
