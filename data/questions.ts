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
      "A stronger claim won't help. What people need is more proof around the claim you already have.",
    responses: [
      {
        personaId: "CN_EN_V",
        theme: "Technical proof",
        response:
          "Show me how the carbon figure was worked out, the real operating data behind it, and a fair comparison with other crude.",
        evidence: ["Checked data from real operations", "Results from trials", "A like-for-like comparison"],
      },
      {
        personaId: "CN_CH_B",
        theme: "An independent check",
        response:
          "An independent check, and proof it meets Chinese rules. I need to know the claim will hold up if someone questions it.",
        evidence: ["Independent certification", "Proof it meets Chinese rules", "Clear, open reporting"],
      },
      {
        personaId: "CN_FL_V",
        theme: "Proof it pays",
        response:
          "Show me a business case. When does the advantage start to be worth real money?",
        evidence: ["A business case", "What-if scenarios", "What it means in money terms"],
      },
      {
        personaId: "CN_EN_A",
        theme: "A real example",
        response:
          "Give me a Chinese partner, customer or example people trust, so the benefit feels real enough to pass on.",
        evidence: ["A partner people trust", "A real example in use", "A measured result"],
      },
      {
        personaId: "CN_IC_V",
        theme: "An open method",
        response:
          "Let me see the method and who reviewed it. A precise number isn't enough if I can't see how you got it.",
        evidence: ["Review by other experts", "An open, clear method"],
      },
      {
        personaId: "CN_FL_B",
        theme: "Proper sign-off",
        response:
          "Before this is used publicly, I need to know the comparisons and wider claims have been properly checked and signed off.",
        evidence: ["Legal advice", "Proper internal sign-off"],
      },
    ],
  },
  {
    id: "worry",
    prompt: "What worries you most?",
    takeaway:
      "The biggest risk is going from one carbon figure to big claims about business, environmental and customer benefits.",
    responses: [
      {
        personaId: "CN_CH_B",
        theme: "Claiming too much",
        response:
          "That the environmental benefit is being claimed more strongly than the checks can support.",
        evidence: ["Independent certification", "Clear, open reporting"],
      },
      {
        personaId: "CN_FL_B",
        theme: "Getting ahead of the proof",
        response:
          "That comparisons or marketing language get used before the proof is ready. That creates problems for us.",
        evidence: ["Legal advice", "Proper internal sign-off"],
      },
      {
        personaId: "CN_EN_B",
        theme: "Missing the bigger picture",
        response:
          "That the story ignores China's energy security, national policy and the futures decision-makers actually plan for.",
        evidence: ["Fit with national policy", "What-if scenarios"],
      },
      {
        personaId: "CN_IC_R",
        theme: "Missing the context",
        response:
          "That the message ignores the global politics and supply worries that will shape how people read it.",
        evidence: ["What-if scenarios", "An open, clear method"],
      },
      {
        personaId: "CN_IC_B",
        theme: "The number becomes the story",
        response:
          "That a precise headline number becomes the story before anyone can explain how it was worked out.",
        evidence: ["Clear, open reporting", "Access to a senior spokesperson"],
      },
      {
        personaId: "CN_EN_V",
        theme: "Stretching the evidence",
        response:
          "That one solid measurement is being used to promise benefits further down the line that nobody has shown yet.",
        evidence: ["Checked data from real operations", "A like-for-like comparison"],
      },
    ],
  },
  {
    id: "lead",
    prompt: "What should we lead with?",
    takeaway:
      "Lead with why it's a better business decision over the long term. Use the carbon figure as proof, not as the whole story.",
    responses: [
      {
        personaId: "CN_EN_R",
        theme: "Why it matters",
        response:
          "Lead with why this is a better long-term decision for staying competitive and keeping supply secure. Then prove the carbon advantage.",
        evidence: ["Costs and returns worked out", "A plan for rolling it out"],
      },
      {
        personaId: "CN_EN_B",
        theme: "Secure supply",
        response:
          "Talk about secure supply and energy security, so the message connects to something we already care about.",
        evidence: ["Fit with national policy", "What-if scenarios"],
      },
      {
        personaId: "CN_FL_V",
        theme: "The money",
        response:
          "Tell me early what it's worth. A carbon number means more when I can see what it changes for the business.",
        evidence: ["A business case", "What-if scenarios", "What it means in money terms"],
      },
      {
        personaId: "CN_CH_R",
        theme: "Return on investment",
        response:
          "Make it about return on investment and modernising industry, not about sustainability on its own.",
        evidence: ["A business case", "Costs and returns worked out"],
      },
      {
        personaId: "CN_IC_R",
        theme: "The bigger picture",
        response:
          "Acknowledge the wider energy and political picture. Then it feels complete, rather than like an advert.",
        evidence: ["What-if scenarios", "An open, clear method"],
      },
      {
        personaId: "CN_EN_A",
        theme: "A real example",
        response:
          "Lead with a result people can point to: a partner, a customer or a real example. Then the bigger story has something behind it.",
        evidence: ["A partner people trust", "A real example in use", "A measured result"],
      },
    ],
  },
  {
    id: "missing",
    prompt: "What's missing?",
    takeaway:
      "The message has a clear idea behind it. What's missing is the proof, a local example and a clear link to value for customers.",
    responses: [
      {
        personaId: "CN_EN_A",
        theme: "A partner example",
        response:
          "A local partner or customer people trust. Right now nothing shows the idea working in China.",
        evidence: ["A partner people trust", "A real example in use", "A measured result"],
      },
      {
        personaId: "CN_FL_V",
        theme: "The numbers",
        response:
          "The numbers, step by step, from choosing this crude to making more money, under realistic scenarios.",
        evidence: ["A business case", "What-if scenarios", "What it means in money terms"],
      },
      {
        personaId: "CN_EN_V",
        theme: "The method",
        response:
          "Where the carbon figure comes from, what it covers, and the operating data behind the comparison.",
        evidence: ["Checked data from real operations", "Results from trials", "A like-for-like comparison"],
      },
      {
        personaId: "CN_CH_B",
        theme: "An independent check",
        response:
          "An independent check, proof it meets Chinese rules, and open reporting, so the claim can stand up to questions.",
        evidence: ["Independent certification", "Proof it meets Chinese rules", "Clear, open reporting"],
      },
      {
        personaId: "CN_PG_R",
        theme: "Local value",
        response:
          "A clearer link to Chinese industry, local skills and local partners.",
        evidence: ["Costs and returns worked out", "A local partner"],
      },
      {
        personaId: "CN_IC_A",
        theme: "A reason to share it",
        response:
          "A news moment, independent evidence or a partner story that gives people a reason to talk about it.",
        evidence: ["A news moment", "Independent evidence", "A partner's story"],
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
