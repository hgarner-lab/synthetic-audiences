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
    stage: "Is it worth it?",
    arrival: "The head of strategy usually sees the message first.",
    question: "Why is this a better long-term decision for us?",
    interpretation:
      "The message asks them to treat a choice of crude oil as a long-term business decision. So the first thing to answer is how it helps them compete, keeps supply secure and adds value over time.",
    requirement: {
      title: "Show why it matters to the business",
      description:
        "Link the choice to competitiveness, secure supply and long-term value, as well as lower carbon.",
      evidence: ["Costs and returns worked out", "A plan for rolling it out"],
    },
  },
  {
    personaId: "CN_EN_V",
    stage: "Is it true?",
    arrival: "Once strategy is interested, the technical team checks the claim.",
    question: "Can we prove the carbon advantage?",
    interpretation:
      "A carbon figure gets attention, but it won't go far unless people can trust it, compare it and see real operating data behind it.",
    requirement: {
      title: "Back up the carbon claim",
      description:
        "Put the method, what the figure covers and the supporting data right next to the claim.",
      evidence: ["Checked data from real operations", "Results from trials", "A like-for-like comparison"],
    },
  },
  {
    personaId: "CN_CH_B",
    stage: "Is it safe to say?",
    arrival: "The stronger the environmental claim, the harder it gets checked.",
    question: "Who has independently checked this claim?",
    interpretation:
      "Once the message talks about environmental benefits, safety and compliance teams decide whether it can be said safely.",
    requirement: {
      title: "Make the claim safe to say",
      description:
        "Support any environmental benefit with an independent check, proof it meets Chinese rules and open reporting.",
      evidence: ["Independent certification", "Proof it meets Chinese rules", "Clear, open reporting"],
    },
  },
  {
    personaId: "CN_FL_V",
    stage: "Is it worth the money?",
    arrival: "Once the claim holds up, finance asks whether it makes a real difference.",
    question: "Even if it's true, is it worth real money?",
    interpretation:
      "The message promises a business advantage. It needs to show, step by step, how the choice of crude turns into money before finance will take it seriously.",
    requirement: {
      title: "Show what it's worth",
      description:
        "Show how the choice affects costs, risk or value to customers, using realistic scenarios.",
      evidence: ["A business case", "What-if scenarios", "What it means in money terms"],
    },
  },
];
