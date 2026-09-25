export type AudienceResponseFixture = {
  personaId: string;
  response: string;
  theme: string;
  evidence: string[];
};

export type AudienceQuestion = {
  id: string;
  prompt: string;
  takeaway: string;
  responses: AudienceResponseFixture[];
};

export const audienceQuestions: AudienceQuestion[] = [
  {
    id: "believe",
    prompt: "What would make you believe this?",
    takeaway:
      "The audience does not mainly need a stronger claim. It needs a stronger evidence architecture around the claim.",
    responses: [
      {
        personaId: "CN_EN_V",
        theme: "Technical proof",
        response:
          "Show me the methodology, the operating evidence and a like-for-like comparison behind the carbon-intensity number.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_CH_B",
        theme: "Independent assurance",
        response:
          "Independent assurance and local compliance evidence. I need to know the claim can withstand scrutiny.",
        evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
      },
      {
        personaId: "CN_FL_V",
        theme: "Commercial proof",
        response:
          "Connect the claim to a worked commercial case. Show me when the advantage becomes financially material.",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
      {
        personaId: "CN_EN_A",
        theme: "Visible proof",
        response:
          "Give me a credible Chinese partner, customer or use case that makes the benefit concrete enough to carry forward.",
        evidence: ["Credible partner", "Visible use case", "Measured outcome"],
      },
      {
        personaId: "CN_IC_V",
        theme: "Method transparency",
        response:
          "Let me inspect the methodology and the technical review behind it. Precision without transparency will not be enough.",
        evidence: ["Technical peer review", "Transparent methodology"],
      },
      {
        personaId: "CN_FL_B",
        theme: "Governance",
        response:
          "I need governance assurance around the comparative and downstream claims before I would support using them externally.",
        evidence: ["Legal opinion", "Governance assurance"],
      },
    ],
  },
  {
    id: "worry",
    prompt: "What worries you most?",
    takeaway:
      "The main risk is the jump from one upstream carbon metric to broad commercial, environmental and downstream benefit claims.",
    responses: [
      {
        personaId: "CN_CH_B",
        theme: "Overclaiming",
        response:
          "That an environmental advantage is being stated more strongly than the available assurance can support.",
        evidence: ["Third-party certification", "Transparent disclosure"],
      },
      {
        personaId: "CN_FL_B",
        theme: "Claims governance",
        response:
          "That comparative, tax or marketing language creates a governance problem before the substantiation is ready.",
        evidence: ["Legal opinion", "Governance assurance"],
      },
      {
        personaId: "CN_EN_B",
        theme: "Strategic fit",
        response:
          "That the story is disconnected from Chinese energy security, policy alignment and the scenarios decision-makers actually plan against.",
        evidence: ["Policy alignment", "Scenario analysis"],
      },
      {
        personaId: "CN_IC_R",
        theme: "Strategic incompleteness",
        response:
          "That the proposition ignores the geopolitical and supply-resilience context that will shape how the message is interpreted.",
        evidence: ["Scenario analysis", "Transparent methodology"],
      },
      {
        personaId: "CN_IC_B",
        theme: "Public scrutiny",
        response:
          "That a precise headline number becomes the story before the campaign can answer basic questions about how it was calculated.",
        evidence: ["Transparent disclosures", "Senior spokesperson access"],
      },
      {
        personaId: "CN_EN_V",
        theme: "Technical overreach",
        response:
          "That a credible upstream measurement is being asked to prove downstream outcomes that have not been demonstrated yet.",
        evidence: ["Audited operating data", "Comparable methodology"],
      },
    ],
  },
  {
    id: "lead",
    prompt: "What should we lead with?",
    takeaway:
      "Lead with the quality of the business decision and long-term advantage. Use the carbon-intensity figure as evidence, not the entire story.",
    responses: [
      {
        personaId: "CN_EN_R",
        theme: "Strategic value",
        response:
          "Lead with why this is a better long-term decision for competitiveness and resilience, then prove the carbon advantage underneath it.",
        evidence: ["Economic model", "Deployment roadmap"],
      },
      {
        personaId: "CN_EN_B",
        theme: "Resilience",
        response:
          "Frame the choice through supply resilience and energy security so the proposition connects to an existing strategic priority.",
        evidence: ["Policy alignment", "Scenario analysis"],
      },
      {
        personaId: "CN_FL_V",
        theme: "Material value",
        response:
          "Give me the economic consequence early. A carbon number becomes more useful when I can see what it changes commercially.",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
      {
        personaId: "CN_CH_R",
        theme: "Investment case",
        response:
          "Make the story about return on capital and industrial upgrading rather than treating sustainability as an isolated benefit.",
        evidence: ["Investment case", "Economic model"],
      },
      {
        personaId: "CN_IC_R",
        theme: "Strategic context",
        response:
          "Acknowledge the wider energy and geopolitical context. That makes the proposition feel strategically complete rather than promotional.",
        evidence: ["Scenario analysis", "Transparent methodology"],
      },
      {
        personaId: "CN_EN_A",
        theme: "Concrete example",
        response:
          "Lead with an outcome people can point to — a partner, customer or use case — so the strategic story has something visible behind it.",
        evidence: ["Credible partner", "Visible use case", "Measured outcome"],
      },
    ],
  },
  {
    id: "missing",
    prompt: "What's missing?",
    takeaway:
      "The proposition has an organising idea, but the proof package, local relevance and worked path to customer value are incomplete.",
    responses: [
      {
        personaId: "CN_EN_A",
        theme: "Partner proof",
        response:
          "A credible local partner or customer example. Right now there is nothing visible that shows the idea working in-market.",
        evidence: ["Credible partner", "Visible use case", "Measured outcome"],
      },
      {
        personaId: "CN_FL_V",
        theme: "Economic model",
        response:
          "A worked financial pathway from feedstock choice to commercial advantage under realistic scenarios.",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
      {
        personaId: "CN_EN_V",
        theme: "Methodology",
        response:
          "The source, boundaries and operating evidence behind the carbon-intensity comparison.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_CH_B",
        theme: "Assurance",
        response:
          "Independent certification, local compliance evidence and a disclosure standard that makes the claim defensible.",
        evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
      },
      {
        personaId: "CN_PG_R",
        theme: "Local value",
        response:
          "A clearer connection to Chinese industrial development, local capability and partnership.",
        evidence: ["Economic model", "Local partnership"],
      },
      {
        personaId: "CN_IC_A",
        theme: "Reason to carry it",
        response:
          "A timely event, independent evidence or partner story that gives the message a reason to travel beyond paid media.",
        evidence: ["Timely event", "Independent evidence", "Partner story"],
      },
    ],
  },
];

export const defaultResponderIds = [
  "CN_EN_R",
  "CN_EN_V",
  "CN_CH_B",
  "CN_FL_V",
  "CN_PG_V",
  "CN_IC_B",
];
