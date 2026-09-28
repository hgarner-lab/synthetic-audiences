// Ask the room and Follow the decision for Saudi Arabia. Same questions and the same
// shape as China (data/questions.ts, data/journey.ts), answered by the Saudi people from
// their persona cards. Prepared in advance, like the rest of the room.
import type { AudienceQuestion } from "@/data/questions";
import type { JourneyStep } from "@/data/journey";

// What shapes each person's view, in plain words (from "cares" on their card). Used when
// someone asks a question we haven't prepared answers for.
export const ksaLens: Record<string, string[]> = {
  SA_EN_V: ["Proven performance in the field", "Reliable operations"],
  SA_EN_B: ["Local-content rules", "Saudi jobs and suppliers"],
  SA_EN_A: ["Partnerships that deliver", "What it adds to the Kingdom"],
  SA_EN_R: ["The whole value chain", "The Kingdom's industrial goals"],
  SA_CH_V: ["Reliable processes", "Plant safety"],
  SA_CH_B: ["Environmental claims that can be checked", "Fit with Gulf rules"],
  SA_CH_A: ["Local suppliers and manufacturing", "Visible industry partnerships"],
  SA_CH_R: ["Return on capital", "Upgrading industry"],
  SA_FL_V: ["Bankability", "Good governance"],
  SA_FL_B: ["Sharia compliance", "Regulatory discipline"],
  SA_FL_A: ["Credible deals and partners", "What investors will notice"],
  SA_FL_R: ["The return for the risk", "Lasting value"],
  SA_PG_V: ["Fit with national programmes", "Jobs created"],
  SA_PG_B: ["Enforcing local content", "Accountability"],
  SA_PG_A: ["Attracting investment", "Partnerships and jobs"],
  SA_PG_R: ["Local jobs", "Transferring skills"],
  SA_TE_V: ["Proven performance", "Security"],
  SA_TE_B: ["Keeping data in the Kingdom", "Who is accountable for security"],
  SA_TE_A: ["Technology that works", "Local relevance"],
  SA_TE_R: ["Building Saudi capability", "Delivering what's promised"],
  SA_IC_V: ["Accurate data", "Open markets"],
  SA_IC_B: ["Risk exposure", "Predictable policy"],
  SA_IC_A: ["Concrete stories", "Regional achievement"],
  SA_IC_R: ["The national transformation", "National achievement"],
};

export const ksaQuestions: AudienceQuestion[] = [
  {
    id: "believe",
    prompt: "What would make you believe this?",
    takeaway:
      "Proof matters, but in Saudi Arabia it has to come with local content. A claim that's checked but delivered from elsewhere still won't get through.",
    responses: [
      {
        personaId: "SA_EN_V",
        theme: "Proof from the Gulf",
        response: "Audited data from operations like ours, in Gulf heat and dust, reviewed by someone independent.",
        evidence: ["Audited data from real operations", "Results from a scaled-up trial", "An independent technical review"],
      },
      {
        personaId: "SA_EN_B",
        theme: "Local content",
        response:
          "Certified local content and a Saudization plan with dates. Without those, whether I believe it doesn't matter: it won't get past me.",
        evidence: ["Local-content compliance", "Value created in the Kingdom", "A delivery plan with dates"],
      },
      {
        personaId: "SA_CH_B",
        theme: "Independent assurance",
        response: "Independent assurance, and proof it meets Gulf rules. A standard written for Europe won't do on its own.",
        evidence: ["Independent assurance", "Proof it meets Gulf rules", "An open, clear method"],
      },
      {
        personaId: "SA_FL_V",
        theme: "A bankable case",
        response: "Open numbers and clear governance. Show me it's bankable and I'll believe the advantage.",
        evidence: ["The economics worked out", "Clear governance", "Open disclosure"],
      },
      {
        personaId: "SA_IC_V",
        theme: "Figures I can check",
        response: "Publish the figures and how they were worked out, so I can check them before I write anything.",
        evidence: ["Open disclosure", "An open, clear method", "Independent assurance"],
      },
      {
        personaId: "SA_EN_A",
        theme: "A Saudi partner",
        response: "A Saudi partner already using it, with results. Then I'd believe it, and I'd share it.",
        evidence: ["A partner people trust", "Value created in the Kingdom", "Results for customers"],
      },
    ],
  },
  {
    id: "worry",
    prompt: "What worries you most?",
    takeaway:
      "The worry is an outside green claim with nothing for the Kingdom: no local content, no assurance, no risk picture, and no clear owner for the data.",
    responses: [
      {
        personaId: "SA_EN_B",
        theme: "Nothing for the Kingdom",
        response: "That it's supply from abroad with nothing for Saudi suppliers or Saudi jobs.",
        evidence: ["Local-content compliance", "Value created in the Kingdom"],
      },
      {
        personaId: "SA_CH_B",
        theme: "Greenwashing",
        response: "An environmental claim with no life-cycle data behind it. If it's challenged, we carry the risk.",
        evidence: ["Independent assurance", "An open, clear method"],
      },
      {
        personaId: "SA_IC_B",
        theme: "Unmanaged risk",
        response:
          "There's no risk picture. If policy or prices shift, the claim looks exposed, and I'd have to tell clients so.",
        evidence: ["How risks are managed", "Fit with national policy"],
      },
      {
        personaId: "SA_FL_B",
        theme: "Structure and disclosure",
        response: "Any money side done without Sharia review or clear disclosure. That becomes a reputational problem fast.",
        evidence: ["Sharia compliance evidence", "Open disclosure"],
      },
      {
        personaId: "SA_TE_B",
        theme: "Where the data goes",
        response: "Plant data leaving the Kingdom, or nobody clearly accountable for keeping it secure.",
        evidence: ["Security assurance", "Compliance evidence"],
      },
      {
        personaId: "SA_PG_R",
        theme: "A company story",
        response: "That it's about Aramco's reputation abroad, with nothing on local jobs or skills.",
        evidence: ["Value created in the Kingdom", "A delivery plan with dates"],
      },
    ],
  },
  {
    id: "lead",
    prompt: "What should we lead with?",
    takeaway: "Lead with what it does for the Kingdom: local partners and local content, with the proof close behind.",
    responses: [
      {
        personaId: "SA_IC_R",
        theme: "A national story",
        response: "Lead with the Kingdom: Saudi industry leading on lower carbon. That's the story people want to tell.",
        evidence: ["Fit with national policy", "Value created in the Kingdom"],
      },
      {
        personaId: "SA_EN_B",
        theme: "Local content first",
        response: "Lead with local content. It's the first thing anyone in my seat checks.",
        evidence: ["Local-content compliance", "A delivery plan with dates"],
      },
      {
        personaId: "SA_EN_R",
        theme: "The industrial plan",
        response: "Lead with where it fits the industrial strategy and the value chain. Then the carbon.",
        evidence: ["The economics worked out", "A delivery plan with dates"],
      },
      {
        personaId: "SA_PG_V",
        theme: "Vision 2030",
        response: "Say which national programme it serves, and how it will be delivered.",
        evidence: ["Fit with national programmes", "A delivery plan with dates"],
      },
      {
        personaId: "SA_FL_R",
        theme: "Lasting value",
        response: "Lead with lasting value and the return for the risk. Lower carbon is how you get there.",
        evidence: ["The economics worked out", "How it compares with peers"],
      },
      {
        personaId: "SA_PG_A",
        theme: "Partners and jobs",
        response: "Lead with the partners and the jobs. That's what investors and ministries notice.",
        evidence: ["A partner people trust", "Visible industry involvement"],
      },
    ],
  },
  {
    id: "missing",
    prompt: "What's missing?",
    takeaway: "Three things are missing: local content, a Saudi partner, and proof from Gulf operations.",
    responses: [
      {
        personaId: "SA_EN_A",
        theme: "A Saudi partner",
        response: "A Saudi partner. Without one, there's nothing for people to point to.",
        evidence: ["A partner people trust", "Results for customers"],
      },
      {
        personaId: "SA_PG_B",
        theme: "Local-content evidence",
        response: "Local-content certificates, and someone accountable for delivery.",
        evidence: ["Local-content compliance", "Compliance evidence"],
      },
      {
        personaId: "SA_EN_V",
        theme: "Gulf field data",
        response: "Data from real operations in Gulf conditions. Results from somewhere cooler don't tell me much.",
        evidence: ["Audited data from real operations", "An independent technical review"],
      },
      {
        personaId: "SA_TE_R",
        theme: "Saudi capability",
        response: "Anything about building Saudi skills and capability. That's what makes it last.",
        evidence: ["A delivery plan with dates", "Technical benchmarks"],
      },
      {
        personaId: "SA_FL_V",
        theme: "The numbers",
        response: "The numbers. I can't back a commercial advantage I can't model.",
        evidence: ["The economics worked out", "Open disclosure"],
      },
      {
        personaId: "SA_IC_A",
        theme: "A story",
        response: "A concrete story: a named partner, a project and a result.",
        evidence: ["A partner people trust", "A real deployment"],
      },
    ],
  },
];

// Who answers a question we haven't prepared answers for.
export const ksaDefaultResponderIds = ["SA_EN_R", "SA_EN_V", "SA_EN_B", "SA_FL_V", "SA_PG_V", "SA_IC_B"];

// A Saudi refinery's decision. Supplier and local-content checks come first, so the
// local-content gatekeeper is the first person a message has to get past.
export const ksaJourneySteps: JourneyStep[] = [
  {
    personaId: "SA_EN_B",
    stage: "Does it meet local content?",
    arrival: "In a Saudi refinery, supplier and local-content checks come first.",
    question: "What's the local content, and how many Saudis does it employ?",
    interpretation:
      "Before anyone looks at the carbon figure, the supplier has to meet local-content rules and show what it adds to Saudi jobs and suppliers.",
    requirement: {
      title: "Show the local content",
      description: "Certified local content, Saudi suppliers and engineers, and a Saudization plan with dates.",
      evidence: ["Local-content compliance", "Value created in the Kingdom", "A delivery plan with dates"],
    },
  },
  {
    personaId: "SA_EN_V",
    stage: "Is it true?",
    arrival: "Once it clears local content, the engineers check the claim.",
    question: "Has it been proven in operations like ours?",
    interpretation:
      "A carbon figure only counts if it holds up in Gulf conditions and has been reviewed independently.",
    requirement: {
      title: "Prove it in Gulf conditions",
      description: "Audited data from comparable Gulf operations, reviewed by an independent body.",
      evidence: ["Audited data from real operations", "Results from a scaled-up trial", "An independent technical review"],
    },
  },
  {
    personaId: "SA_EN_R",
    stage: "Does it fit the plan?",
    arrival: "With the facts checked, strategy asks where it fits.",
    question: "Where does this fit the industrial strategy and our value chain?",
    interpretation:
      "Strategy judges the choice by what it does for the value chain and the Kingdom's industrial goals, beyond the carbon.",
    requirement: {
      title: "Link it to the industrial plan",
      description: "Show how the choice supports the value chain and national industrial goals, with a delivery plan.",
      evidence: ["The economics worked out", "A delivery plan with dates", "How it compares with peers"],
    },
  },
  {
    personaId: "SA_FL_V",
    stage: "Is it bankable?",
    arrival: "Finally, finance asks whether it's bankable.",
    question: "Even if it all holds up, is it bankable?",
    interpretation: "Finance needs open numbers and clear governance before a commercial advantage counts.",
    requirement: {
      title: "Show it's bankable",
      description: "A business case with open numbers, clear governance and realistic scenarios.",
      evidence: ["The economics worked out", "Clear governance", "Open disclosure"],
    },
  },
];

// The Saudi campaign stage that gets each person in the walkthrough to let the message through.
export const ksaFixingStage: Record<string, string> = {
  SA_EN_B: "considered",
  SA_EN_V: "considered",
  SA_EN_R: "understood",
  SA_FL_V: "chosen",
};
