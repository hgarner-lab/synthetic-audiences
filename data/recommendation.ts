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
      detail: "If a precise carbon figure makes the headline before anyone can explain it, journalists will focus on the number and lose the message. Publish the method with the report, and have a spokesperson ready to explain it.",
      personaIds: ["CN_IC_B"],
    },
    {
      title: "Keep refinery data secure",
      detail: "If the value calculator uses a refinery's own numbers, their data security team will want to know how that data is stored and who can see it. Agree this before stage 4.",
      personaIds: ["CN_TE_B"],
    },
  ],
  nextSteps: [
    "Share this recommendation with the client team and agree which evidence already exists.",
    "Commission the independent check of the carbon data first. Stages 1 to 3 depend on it.",
    "Start the education content early. B2B decisions take months, so the guide and white paper need to be ready soon after launch.",
    "Build the business case and value calculator in parallel, ready for stage 4.",
    "Start looking for a Chinese partner willing to be named, ready for stage 5.",
    "Brief the creative team on the big idea and the five stages.",
    "Put the finished work for each stage back in front of the room, then test it with real people before launch.",
  ],
};
