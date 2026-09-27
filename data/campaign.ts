import { personas } from "@/data/personas";
import { roomMessages, Stance, stanceOrder } from "@/data/reactions";

// The campaign recommendation: one big idea, delivered in five funnel stages.
// Each stage says who matters most at that point, what we tell them, the proof they
// need, and how the room reacts. Reactions are our team's judgement from each
// person's needs, like the rest of the room, and assume each stage's proof is real.

export type StageReaction = {
  personaId: string;
  stance: Stance;
  line: string;
};

export type CampaignStage = {
  id: string;
  number: number;
  name: string;
  funnel: string;
  goal: string;
  startsWhen: string;
  whoMatters: string;
  message: string;
  messageNote?: string;
  whyItWorks: string;
  proof: string[];
  channels: string[];
  successSigns: string[];
  people: StageReaction[];
};

export const bigIdea = {
  name: "Proof, not promises",
  line: "Don't take our word for it.",
  summary:
    "Most energy marketing asks people to trust a claim. This campaign does the opposite: it invites them to check it. We open with independently checked carbon data, then give each group the proof it needs at the moment it gets involved: from journalists, to the strategy and policy people who frame the issue, to technical teams, finance and, finally, the partners who'll recommend it.",
};

export const stages: CampaignStage[] = [
  {
    id: "noticed",
    number: 1,
    name: "Get noticed",
    funnel: "Awareness",
    goal: "Make senior people in China's energy and industrial world aware that there's a lower-carbon crude whose numbers have been independently checked.",
    startsWhen: "The independent check of the carbon data is complete and published.",
    whoMatters: "Journalists, commentators and researchers. They decide whether this becomes a story people hear about.",
    message: "Lower-carbon crude, with the numbers independently checked. Don't take our word for it: read the report.",
    whyItWorks:
      "The original message gave journalists and researchers nothing new to report and nothing to check, so they tuned out or held back. An independent report gives them both, and a senior spokesperson gives them someone to question. Publishing the method with the report stops the number itself becoming the story.",
    proof: ["Independent evidence", "An open, clear method", "A news moment", "Access to a senior spokesperson"],
    channels: [
      "Publish the independent report and how the figure was worked out",
      "A launch briefing for journalists and analysts, with a senior spokesperson",
      "Energy and industry trade press",
      "Articles on company and industry WeChat channels",
    ],
    successSigns: [
      "Trade press coverage that mentions the independent check",
      "People reading and downloading the report",
      "Journalists and analysts asking for briefings",
    ],
    people: [
      { personaId: "CN_IC_A", stance: "in", line: "An independent report on a crude's carbon? That's a story I can run." },
      { personaId: "CN_IC_B", stance: "in", line: "A published method and a senior spokesperson to question. That I can report on fairly." },
      { personaId: "CN_IC_V", stance: "in", line: "The method is public, so I can review it and say what I think." },
      { personaId: "CN_IC_R", stance: "in", line: "Good. Now put it in the context of energy security." },
      { personaId: "CN_EN_A", stance: "unsure", line: "I've noticed it. But I'd still need a partner story before I pass it on." },
    ],
  },
  {
    id: "understood",
    number: 2,
    name: "Help them understand",
    funnel: "Education",
    goal: "Explain what lower-carbon crude means for China's refiners: how the carbon is measured, why it matters for energy security, and where it fits national policy.",
    startsWhen: "Alongside stage 1, and it keeps going. The guide and white paper should be ready soon after launch.",
    whoMatters: "Strategy and policy people, and the commentators who frame the issue. They shape how everyone else thinks about it.",
    message:
      "The carbon in your crude, explained: how it's measured, why it matters for China's energy security, and where it fits national policy.",
    whyItWorks:
      "B2B decisions take time, and people need to understand the issue before they'll judge the claim. This stage doesn't win many people outright, but fewer people tune out, and it builds the energy security case that finance and strategy will need later.",
    proof: ["An open, clear method", "Fit with national policy", "What-if scenarios", "Review by other experts"],
    channels: [
      "A plain-language guide to how the carbon in crude is measured",
      "A white paper on lower-carbon crude and China's energy security, reviewed by independent experts",
      "Seminars with industry associations",
      "A series of short WeChat explainers",
    ],
    successSigns: [
      "People coming back for more, such as returning readers and series subscribers",
      "Refinery and policy teams downloading the guide and white paper",
      "Questions moving from \"what is this?\" to \"how would this work for us?\"",
    ],
    people: [
      { personaId: "CN_EN_B", stance: "in", line: "It links lower carbon to energy security and policy. Now it's a strategic question for us." },
      { personaId: "CN_EN_R", stance: "in", line: "This gives me the story I'd tell my board." },
      { personaId: "CN_IC_R", stance: "in", line: "Finally, the energy security context. I can build on this." },
      { personaId: "CN_PG_V", stance: "unsure", line: "It fits the direction of policy. I still need to see the numbers." },
      { personaId: "CN_CH_A", stance: "unsure", line: "It explains why this matters for supply chains. Still no example I'd share." },
      { personaId: "CN_TE_A", stance: "unsure", line: "Useful background. I'd share it if there were a partner story." },
    ],
  },
  {
    id: "considered",
    number: 3,
    name: "Get considered",
    funnel: "Consideration",
    goal: "Get technical, safety and compliance teams to check the claim for themselves, and clear it.",
    startsWhen: "The full data pack is ready, and the claim has been confirmed to meet Chinese rules.",
    whoMatters: "The people who check facts and the people who can say no. Nothing moves forward until they're satisfied.",
    message:
      "Aramco Advantage Crude comes with independently checked carbon data, so refiners can judge the carbon and commercial benefits for themselves.",
    messageNote: "This is the version that tested best in the room.",
    whyItWorks:
      "It wins over the checkers and the gatekeepers and creates no new objections. Finance believes the number now, but still wants to see what it's worth. That's the job of the next stage.",
    proof: [
      "Checked data from real operations",
      "A like-for-like comparison",
      "Independent certification",
      "Proof it meets Chinese rules",
      "Proper internal sign-off",
    ],
    channels: [
      "Technical briefings for refinery technical and safety teams",
      "A full data pack: the method, what the figure covers, and the operating data",
      "One-to-one sessions with compliance and regulatory teams",
    ],
    successSigns: [
      "Technical teams asking for the full data pack",
      "Safety or compliance reviews under way",
      "Fewer \"is this true?\" questions in sales conversations",
    ],
    people: [
      { personaId: "CN_EN_V", stance: "in", line: "Checked operating data and a fair comparison. Now I can judge it." },
      { personaId: "CN_CH_V", stance: "in", line: "The data pack covers plant performance. I can take this to my team." },
      { personaId: "CN_TE_V", stance: "in", line: "Trial results and a review by other experts. That's the proof I asked for." },
      { personaId: "CN_CH_B", stance: "in", line: "Checked by an independent body, and it meets Chinese rules. I can stand behind that." },
      { personaId: "CN_PG_B", stance: "in", line: "Proof it meets our rules, and properly signed off. No objection from me." },
      { personaId: "CN_FL_B", stance: "in", line: "The claims are checked and the scope is clear. I can sign this off." },
      { personaId: "CN_FL_V", stance: "unsure", line: "I believe the number now. What I still can't see is what it's worth." },
    ],
  },
  {
    id: "chosen",
    number: 4,
    name: "Get chosen",
    funnel: "Selection",
    goal: "Show finance and strategy what it's worth, so choosing it becomes a sound business decision.",
    startsWhen: "The business case and value calculator are ready, and it's agreed how the calculator keeps refinery data secure.",
    whoMatters: "Finance and strategy. They decide whether it's worth the money.",
    message:
      "Because the carbon data is checked, the value is real: reliable supply, lower risk, and savings you can model with your own numbers.",
    whyItWorks:
      "When we tested leading with profits, the technical and safety people pushed back. Here the proof has already landed, so the business case builds on it instead of stretching it.",
    proof: ["A business case", "What-if scenarios", "What it means in money terms", "Fit with national policy"],
    channels: [
      "Business case workshops with finance and strategy teams",
      "A simple value calculator that uses the refinery's own numbers",
      "Executive roundtables on energy security",
    ],
    successSigns: [
      "Finance teams asking to run the business case with their own numbers",
      "Trials or pilot volumes agreed",
      "Energy security mentioned as a reason to buy",
    ],
    people: [
      { personaId: "CN_FL_V", stance: "in", line: "Now I can see what it's worth, under scenarios I recognise. I'd back this." },
      { personaId: "CN_FL_R", stance: "in", line: "Return for the risk, compared with the alternatives. This is an investment case." },
      { personaId: "CN_CH_R", stance: "in", line: "A clear return on investment. I can take this to the investment committee." },
      { personaId: "CN_PG_V", stance: "in", line: "It fits national policy and the numbers add up. I can support it." },
      { personaId: "CN_EN_V", stance: "in", line: "The proof came first, so I trust the business case built on it." },
      { personaId: "CN_TE_B", stance: "unsure", line: "If the calculator uses our operating data, I need to know it's kept secure." },
    ],
  },
  {
    id: "recommended",
    number: 5,
    name: "Get recommended",
    funnel: "Recommendation",
    goal: "Give the people who spread ideas a real Chinese example to point to, so others hear about it from someone they trust.",
    startsWhen: "A real Chinese partner has agreed to be named, and compliance has approved how their results are described.",
    whoMatters: "The people who pass ideas on across industry, government and finance.",
    message:
      "See how [a Chinese refinery partner] is using Aramco Advantage Crude, with checked carbon data and measured results for its customers.",
    messageNote: "Only with a real partner who has agreed to be named.",
    whyItWorks:
      "The people who spread ideas have held back at every stage so far, because there was nothing real to point to. A named partner changes that. The catch: compliance pushes back until the partner has agreed to be named and legal has approved how their results are described.",
    proof: ["A partner people trust", "A measured result", "Permission to name the partner", "Legal advice"],
    channels: [
      "A joint case study with the partner",
      "Speaking slots at industry events and association forums",
      "Features in trade and business press",
    ],
    successSigns: [
      "A partner agreeing to be named",
      "Industry bodies and press mentioning it without being asked",
      "Invitations to speak",
    ],
    people: [
      { personaId: "CN_EN_A", stance: "in", line: "A real Chinese refinery, with measured results. Now I'd share it." },
      { personaId: "CN_PG_A", stance: "in", line: "A local example that's good for the industry. Worth passing on." },
      { personaId: "CN_FL_A", stance: "in", line: "A real deal with real results. That I can talk about." },
      { personaId: "CN_CH_A", stance: "in", line: "Now it connects to our supply chain." },
      { personaId: "CN_TE_A", stance: "in", line: "A partner I can point to, with results. I'd share that with our network." },
      {
        personaId: "CN_FL_B",
        stance: "pushback",
        line: "Before we name them: do we have their permission, and are their results described accurately?",
      },
    ],
  },
];

// Which stage each tested angle feeds into, so a visitor's pick can be placed in the plan.
export const angleStage: Record<string, string> = {
  resilience: "understood",
  proof: "considered",
  economics: "chosen",
  "local-proof": "recommended",
};

// Which stage each campaign goal (chosen on the explore page) lines up with.
export const goalStage: Record<string, string> = {
  "Get noticed": "noticed",
  "Change what people think": "understood",
  "Get people considering us": "considered",
  "Help people decide to buy": "chosen",
  "Get people recommending us": "recommended",
};

// The people still to win at the end of the campaign, and what it takes.
export const stillToWin = [
  {
    personaId: "CN_TE_B",
    text: "needs to know how the value calculator stores refinery data and who can see it.",
  },
  {
    personaId: "CN_FL_B",
    text: "needs the partner's permission and legal sign-off before the partner is named.",
  },
];

export const channelsNote =
  "Channel ideas are our team's judgement. The audience data doesn't cover media habits, so test them with the client's media team.";

// How the whole room stands at the start and after each stage. Anyone a stage
// doesn't mention keeps where they were.
export type RoomSnapshot = { id: string; label: string; stances: Record<string, Stance> };

const start: Record<string, Stance> = Object.fromEntries(
  roomMessages[0].reactions.map((reaction) => [reaction.personaId, reaction.stance])
);

export const snapshots: RoomSnapshot[] = stages.reduce<RoomSnapshot[]>(
  (list, stage) => {
    const previous = list[list.length - 1].stances;
    const stances = { ...previous };
    stage.people.forEach((person) => {
      stances[person.personaId] = person.stance;
    });
    return [...list, { id: stage.id, label: stage.name, stances }];
  },
  [{ id: "start", label: "Before the campaign", stances: start }]
);

export function countStances(stances: Record<string, Stance>) {
  return Object.fromEntries(
    stanceOrder.map((stance) => [stance, personas.filter((persona) => stances[persona.id] === stance).length])
  ) as Record<Stance, number>;
}
