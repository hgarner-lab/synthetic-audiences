export type JourneyStep = {
  personaId: string;
  stage: string;
  arrival: string;
  question: string;
  interpretation: string;
  requirement: {
    title: string;
    description: string;
    evidence: string[];
  };
};

export const journeySteps: JourneyStep[] = [
  {
    personaId: "CN_EN_R",
    stage: "Strategic relevance",
    arrival: "The strategic owner encounters the proposition first.",
    question: "Why is this a strategically better decision for us?",
    interpretation:
      "The proposition asks the audience to treat a feedstock choice as a long-term growth decision. That makes competitiveness, energy security and future value the first questions to resolve.",
    requirement: {
      title: "Establish strategic value",
      description:
        "Connect the feedstock decision to competitiveness, resilience and long-term value — not carbon performance alone.",
      evidence: ["Economic model", "Deployment roadmap"],
    },
  },
  {
    personaId: "CN_EN_V",
    stage: "Technical credibility",
    arrival: "The strategic promise now needs technical validation.",
    question: "Can we actually substantiate the carbon advantage?",
    interpretation:
      "A quantified carbon claim can create attention, but the idea cannot travel far unless the number is credible, comparable and supported by operating evidence.",
    requirement: {
      title: "Make the carbon advantage defensible",
      description:
        "Put the methodology, boundaries and supporting technical evidence close to the core claim.",
      evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
    },
  },
  {
    personaId: "CN_CH_B",
    stage: "Claims scrutiny",
    arrival: "A stronger environmental claim attracts a higher proof threshold.",
    question: "What independent assurance sits behind this claim?",
    interpretation:
      "Once the campaign moves from a technical figure to environmental or downstream benefit, compliance and EHS scrutiny become central to whether the claim can be carried safely.",
    requirement: {
      title: "Make the claim safe to carry",
      description:
        "Support environmental benefit language with independent assurance, local compliance evidence and transparent disclosure.",
      evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
    },
  },
  {
    personaId: "CN_FL_V",
    stage: "Commercial materiality",
    arrival: "Once the claim is credible enough to progress, finance asks whether it matters.",
    question: "Even if it is true, is the financial consequence material?",
    interpretation:
      "The campaign is promising commercial advantage. That claim needs a worked bridge from feedstock choice to economic consequence before it can influence consideration.",
    requirement: {
      title: "Demonstrate commercial consequence",
      description:
        "Show how the proposition can affect economics, risk or customer value under realistic scenarios.",
      evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
    },
  },
];
