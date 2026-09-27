export type IdeaShiftDirection = "more-resolved" | "still-unresolved" | "new-tension";

export type IdeaAudienceShift = {
  personaId: string;
  direction: IdeaShiftDirection;
  label: string;
  reason: string;
  evidence: string[];
};

export type IdeaOption = {
  id: string;
  label: string;
  description: string;
  proposition: string;
  takeaway: string;
  shifts: IdeaAudienceShift[];
  routeImpact: {
    strengthens: string;
    stillNeeds: string;
    nextMove: string;
  };
};

export const ideaOptions: IdeaOption[] = [
  {
    id: "resilience",
    label: "Lead with secure supply",
    description:
      "Widen the story from lower carbon to a bigger business decision: secure supply and staying competitive.",
    proposition:
      "Aramco Advantage Crude helps Chinese refiners lock in reliable supply for the long term, with lower carbon and lasting commercial value.",
    takeaway:
      "This makes the message matter more to energy and strategy people. But the carbon and money claims still need the same proof.",
    shifts: [
      {
        personaId: "CN_EN_R",
        direction: "more-resolved",
        label: "Now feels like a strategy question",
        reason:
          "The message now talks directly about competitiveness, energy security and the long-term effect of the choice.",
        evidence: ["Costs and returns worked out", "A plan for rolling it out"],
      },
      {
        personaId: "CN_EN_B",
        direction: "more-resolved",
        label: "Now connects to a priority",
        reason:
          "Secure supply and energy security are now part of the message instead of missing from it.",
        evidence: ["Fit with national policy", "What-if scenarios"],
      },
      {
        personaId: "CN_IC_R",
        direction: "more-resolved",
        label: "Now feels complete",
        reason:
          "The message now recognises the wider supply and political picture that shapes how people read it.",
        evidence: ["What-if scenarios", "An open, clear method"],
      },
      {
        personaId: "CN_EN_V",
        direction: "still-unresolved",
        label: "Still needs the same proof",
        reason:
          "The story is broader, but the carbon figure still needs checked operating data and a fair comparison.",
        evidence: ["Checked data from real operations", "A like-for-like comparison"],
      },
      {
        personaId: "CN_CH_B",
        direction: "still-unresolved",
        label: "Still needs an independent check",
        reason:
          "A bigger story doesn't make the environmental claim any safer without an independent check and proof it meets Chinese rules.",
        evidence: ["Independent certification", "Proof it meets Chinese rules"],
      },
      {
        personaId: "CN_FL_V",
        direction: "new-tension",
        label: "Now expects the numbers",
        reason:
          "The message now puts more weight on long-term value, so finance wants a business case and what-if scenarios to back it.",
        evidence: ["A business case", "What-if scenarios"],
      },
    ],
    routeImpact: {
      strengthens:
        "Why it matters: secure supply gives people a reason to care beyond sustainability.",
      stillNeeds:
        "Proof: the carbon figure and the value claim still need the same evidence as before.",
      nextMove:
        "Open with secure supply, then back it up with independently checked carbon data and a business case.",
    },
  },
  {
    id: "proof",
    label: "Lead with independent proof",
    description:
      "Put the evidence up front, because that's what technical, safety and expert people need before they'll back it.",
    proposition:
      "Aramco Advantage Crude comes with independently checked carbon data, so refiners can judge the carbon and commercial benefits for themselves.",
    takeaway:
      "This removes the biggest reason people doubt the claim. What's left is showing it's worth real money and relevant to China.",
    shifts: [
      {
        personaId: "CN_EN_V",
        direction: "more-resolved",
        label: "Can now check the claim",
        reason:
          "The message now leads with the independent check and the evidence, instead of asking a number to stand on its own.",
        evidence: ["Checked data from real operations", "A like-for-like comparison"],
      },
      {
        personaId: "CN_CH_B",
        direction: "more-resolved",
        label: "Now safer to say",
        reason:
          "An independent check is exactly what's needed to stand behind an environmental claim.",
        evidence: ["Independent certification", "Clear, open reporting"],
      },
      {
        personaId: "CN_IC_V",
        direction: "more-resolved",
        label: "Now open to review",
        reason:
          "The method and the independent review are now at the centre of the story, not tucked away.",
        evidence: ["Review by other experts", "An open, clear method"],
      },
      {
        personaId: "CN_FL_B",
        direction: "more-resolved",
        label: "Lower risk to sign off",
        reason:
          "An independent check lowers the risk around comparisons and wider claims, as long as it's clear what the check covers.",
        evidence: ["Legal advice", "Proper internal sign-off"],
      },
      {
        personaId: "CN_FL_V",
        direction: "still-unresolved",
        label: "Still no business case",
        reason:
          "Evidence can make the carbon claim believable without showing it's worth real money.",
        evidence: ["A business case", "What it means in money terms"],
      },
      {
        personaId: "CN_EN_A",
        direction: "still-unresolved",
        label: "Still nothing to share",
        reason:
          "Without a partner, customer or real example, there's still nothing people would want to pass on.",
        evidence: ["A partner people trust", "A real example in use"],
      },
    ],
    routeImpact: {
      strengthens:
        "Trust: the message now answers the most common objection from technical, safety and expert people.",
      stillNeeds:
        "Value and a real example: proof people trust isn't enough on its own to make them consider it.",
      nextMove:
        "Keep the independent check close to the main claim. Then add how it creates value for customers, and a local example.",
    },
  },
  {
    id: "economics",
    label: "Lead with refinery profits",
    description:
      "Make the message about money: how the choice of crude affects costs, risk and long-term value.",
    proposition:
      "Choosing Aramco Advantage Crude can improve refinery profits over time, when its lower carbon is turned into proven savings, customer value and lower risk.",
    takeaway:
      "This makes the message more useful to strategy and finance people. But it means proving, step by step, how lower carbon turns into money.",
    shifts: [
      {
        personaId: "CN_FL_V",
        direction: "more-resolved",
        label: "Now talks about money",
        reason:
          "The message now answers the question finance always asks: what is this worth to us?",
        evidence: ["A business case", "What it means in money terms"],
      },
      {
        personaId: "CN_FL_R",
        direction: "more-resolved",
        label: "Now sounds like an investment",
        reason:
          "Getting more from each dollar, and the return for the risk, are now closer to the centre of the story.",
        evidence: ["Costs and returns worked out", "Comparison with competitors"],
      },
      {
        personaId: "CN_CH_R",
        direction: "more-resolved",
        label: "Value to industry is clearer",
        reason:
          "The message now talks about return on investment and modernising industry, not sustainability on its own.",
        evidence: ["A business case", "Costs and returns worked out"],
      },
      {
        personaId: "CN_EN_R",
        direction: "more-resolved",
        label: "Long-term value is clearer",
        reason:
          "The decision is now linked to a real business result, not only a carbon advantage.",
        evidence: ["Costs and returns worked out", "A plan for rolling it out"],
      },
      {
        personaId: "CN_EN_V",
        direction: "new-tension",
        label: "Now wants proof of cause and effect",
        reason:
          "The bigger the promise about profits, the more evidence is needed that lower carbon actually causes it.",
        evidence: ["Checked data from real operations", "Results from trials"],
      },
      {
        personaId: "CN_CH_B",
        direction: "new-tension",
        label: "More to check",
        reason:
          "Claiming savings and customer value means more claims to prove and report carefully.",
        evidence: ["Independent certification", "Clear, open reporting"],
      },
    ],
    routeImpact: {
      strengthens:
        "Business relevance: people can see what the campaign wants to change, in money terms.",
      stillNeeds:
        "Proof of cause and effect: how lower carbon turns into better refinery profits and value for customers.",
      nextMove:
        "Show the value step by step, with scenarios, operating data and a clear line on where the benefit does and doesn't apply.",
    },
  },
  {
    id: "local-proof",
    label: "Build around a Chinese partner",
    description:
      "Make the message real with a local partner, customer or refinery example, if a real one exists.",
    proposition:
      "A story built around a real Chinese refinery partner, showing reliable supply, checked carbon data and customer value working together.",
    takeaway:
      "This could make the message much more relevant and worth sharing. But it only works with a real, checked example, and we don't have one yet.",
    shifts: [
      {
        personaId: "CN_EN_A",
        direction: "more-resolved",
        label: "Now worth passing on",
        reason:
          "A visible partner or customer is exactly what was missing to make the message feel real and relevant.",
        evidence: ["A partner people trust", "A real example in use"],
      },
      {
        personaId: "CN_PG_A",
        direction: "more-resolved",
        label: "Now relevant locally",
        reason:
          "A Chinese example connects the message to coordinating the industry and to economic growth.",
        evidence: ["A partner's story", "A measured result"],
      },
      {
        personaId: "CN_PG_R",
        direction: "more-resolved",
        label: "Local value is visible",
        reason:
          "The story now connects to local skills, industry growth and partnership.",
        evidence: ["Costs and returns worked out", "A local partner"],
      },
      {
        personaId: "CN_IC_A",
        direction: "more-resolved",
        label: "Now a story worth telling",
        reason:
          "A partner, event or visible result gives journalists and professionals something to write about.",
        evidence: ["A news moment", "A partner's story"],
      },
      {
        personaId: "CN_EN_V",
        direction: "still-unresolved",
        label: "Depends on the example",
        reason:
          "A local example only helps if it comes with comparable operating data and a clear method.",
        evidence: ["Checked data from real operations", "An open, clear method"],
      },
      {
        personaId: "CN_FL_B",
        direction: "new-tension",
        label: "New questions to answer",
        reason:
          "Using a partner or customer raises new questions: permission to use their name, proof of their results, and how those results are described.",
        evidence: ["Legal advice", "Proper internal sign-off"],
      },
    ],
    routeImpact: {
      strengthens:
        "Relevance and sharing: a real example gives people something to point to and pass on.",
      stillNeeds:
        "A checked example: don't hint at any customer, partner or refinery until there's real proof behind it.",
      nextMove:
        "Make finding a real local example part of the creative brief. Then build the story around what that example can prove.",
    },
  },
];
