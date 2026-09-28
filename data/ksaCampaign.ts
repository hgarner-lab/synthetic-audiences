// The Saudi campaign recommendation. Same shape as the China one (data/campaign.ts):
// one big idea, five funnel stages, who matters at each, and how the Saudi room reacts.
// Reactions start from where the Saudi room stands on the original message, follow each
// person's persona card, and assume each stage's proof is real.
import type { CampaignStage } from "@/data/campaign";

// The version the Saudi room responds to best: the most people leaning in, including
// two gatekeepers who push back on every other version.
export const ksaRecommendedId = "local-proof";

export const ksaBigIdea = {
  name: "Built in the Kingdom",
  line: "Proven here, by people here.",
  summary:
    "In Saudi Arabia, a lower-carbon claim is judged by what it does for the Kingdom. This campaign leads with local partnership: Saudi suppliers, Saudi engineers and certified local content, backed by independently checked data and proof it meets Gulf rules. Each group gets the proof it needs as it gets involved, building to a named Saudi partner people can point to.",
};

export const ksaStages: CampaignStage[] = [
  {
    id: "noticed",
    number: 1,
    name: "Get noticed",
    funnel: "Awareness",
    goal: "Make senior people in Saudi energy and industry aware of a lower-carbon crude whose numbers are independently checked and whose work is done in the Kingdom.",
    startsWhen: "The independent check of the carbon data is complete, and the local-content commitments are agreed.",
    whoMatters: "Editors, commentators and analysts. They decide whether this becomes a story, and whether it's told as a national one.",
    message:
      "Lower-carbon crude, checked independently and delivered with Saudi suppliers and engineers. Read the report.",
    whyItWorks:
      "The original gave journalists nothing to check and gatekeepers nothing on local content. A published report gives the press something to verify, and leading with Saudi suppliers and engineers makes it a national story from the first day.",
    proof: ["Independent evidence", "An open, clear method", "Local-content commitments", "A senior spokesperson"],
    channels: [
      "Publish the independent report and how the figure was worked out, in Arabic and English",
      "A launch briefing for editors and analysts, with a senior spokesperson",
      "Saudi business and energy press",
      "Posts on LinkedIn and X from company leaders",
    ],
    successSigns: [
      "Coverage that mentions the independent check and the local content",
      "People reading and downloading the report",
      "Analysts asking for briefings",
    ],
    people: [
      { personaId: "SA_IC_V", stance: "in", line: "The method is published, so I can check it. That I can report." },
      { personaId: "SA_IC_R", stance: "in", line: "A Saudi story with checked numbers. I'll tell it." },
      { personaId: "SA_IC_B", stance: "unsure", line: "A published method helps. I still want the risk picture before I brief on it." },
      { personaId: "SA_IC_A", stance: "unsure", line: "I've noticed it. For a real story I'd need a named partner." },
    ],
  },
  {
    id: "understood",
    number: 2,
    name: "Help them understand",
    funnel: "Education",
    goal: "Explain what lower-carbon crude means for Saudi industry: how the carbon is measured, where it fits Vision 2030 and the industrial strategy, and what it means for local jobs and suppliers.",
    startsWhen: "Alongside stage 1, and it keeps going. The guide and briefing paper should be ready soon after launch.",
    whoMatters: "Strategy and policy people, and the commentators who frame the issue. They decide how everyone else sees it.",
    message:
      "What lower-carbon crude means for Saudi industry: how the carbon is measured, where it fits Vision 2030, and what it means for local jobs and suppliers.",
    whyItWorks:
      "Every reshaper in the room retells outside claims in terms of the Kingdom's development. Giving them that story, with the risk and policy picture, turns the people who frame the issue into supporters before anyone is asked to choose.",
    proof: ["Fit with national programmes", "Value created in the Kingdom", "How risks are managed", "An open, clear method"],
    channels: [
      "A plain-language guide to how the carbon in crude is measured, in Arabic and English",
      "A briefing paper on lower-carbon crude, Vision 2030 and local jobs, reviewed by independent experts",
      "Roundtables with industry associations and chambers of commerce",
      "Short explainer videos for LinkedIn and X",
    ],
    successSigns: [
      "Strategy and policy teams downloading the guide and paper",
      "Commentators linking it to Vision 2030 without being asked",
      "Questions moving from \"what is this?\" to \"how would this work for us?\"",
    ],
    people: [
      { personaId: "SA_EN_R", stance: "in", line: "Now it's about the value chain and the industrial plan. That's the story." },
      { personaId: "SA_PG_R", stance: "in", line: "Saudi jobs and skills are part of it from the start. I can back that." },
      { personaId: "SA_TE_R", stance: "in", line: "It's about building Saudi capability. I'd use this." },
      { personaId: "SA_IC_B", stance: "in", line: "Policy fit and the risk picture, in one place. Now I can brief on it fairly." },
      { personaId: "SA_PG_V", stance: "unsure", line: "It fits the programmes. I still need a delivery plan with dates." },
      { personaId: "SA_EN_A", stance: "unsure", line: "Useful background. I'd share it once there's a partner." },
    ],
  },
  {
    id: "considered",
    number: 3,
    name: "Get considered",
    funnel: "Consideration",
    goal: "Get technical, compliance and local-content teams to check the claim for themselves, and clear it.",
    startsWhen: "The full data pack is ready, the claim meets Gulf rules, and local content is certified.",
    whoMatters: "The people who check facts and the people who can say no. In Saudi Arabia that includes local content, as well as safety and compliance.",
    message:
      "Aramco Advantage Crude comes with independently checked carbon data, proof it meets Gulf rules, and certified local content, so Saudi industry can judge it for themselves.",
    messageNote: "Builds on \"Lead with independent proof\", adding the local content that version was missing.",
    whyItWorks:
      "In the room, independent proof won over the checkers but left the local-content gatekeeper pushing back. Adding certified local content and a Saudization plan clears every gatekeeper at once.",
    proof: [
      "Audited data from Gulf operations",
      "Independent assurance",
      "Proof it meets Gulf rules",
      "Certified local content",
      "A Saudization plan with dates",
    ],
    channels: [
      "Technical briefings for plant engineering and safety teams",
      "A full data pack: the method, what the figure covers, and the operating data",
      "Sessions with compliance, licensing and local-content teams",
    ],
    successSigns: [
      "Technical teams asking for the full data pack",
      "Local-content certificates accepted in supplier reviews",
      "Fewer \"is this true?\" questions in sales conversations",
    ],
    people: [
      { personaId: "SA_EN_V", stance: "in", line: "Checked data from Gulf operations. Now I can judge it." },
      { personaId: "SA_CH_V", stance: "in", line: "Plant data, safety evidence and the method. I can take this to my team." },
      { personaId: "SA_TE_V", stance: "in", line: "The measurement system has benchmarks and a security review. Good." },
      { personaId: "SA_CH_B", stance: "in", line: "Independently assured, and it meets Gulf rules. I can stand behind that." },
      { personaId: "SA_EN_B", stance: "in", line: "Certified local content and a Saudization plan. Now I can sign this off." },
      { personaId: "SA_PG_B", stance: "in", line: "Local content I can check, and someone accountable. No objection." },
      { personaId: "SA_FL_V", stance: "unsure", line: "I believe the number now. I still can't see what it's worth." },
    ],
  },
  {
    id: "chosen",
    number: 4,
    name: "Get chosen",
    funnel: "Selection",
    goal: "Show finance and strategy what it's worth, in terms that work for Saudi finance, so choosing it becomes a sound business decision.",
    startsWhen: "The business case and value calculator are ready, any financing is documented as Sharia-compliant, and plant data stays in the Kingdom.",
    whoMatters: "Finance, legal and strategy. They decide whether it's bankable, and whether any deal is structured properly.",
    message:
      "Because the data is checked and the content is local, the value is real: reliable supply, lower risk, and savings you can model with your own numbers.",
    messageNote: "Any financing offered comes with documented Sharia approval.",
    whyItWorks:
      "Leading with profits in the room turned the engineering checker and the general counsel against it. Here the proof and local content have already landed, and the Sharia approval answers the general counsel before she has to ask.",
    proof: ["A bankable business case", "How it compares with peers", "Documented Sharia approval", "A delivery plan with dates"],
    channels: [
      "Business case workshops with finance and strategy teams",
      "A simple value calculator that uses the plant's own numbers, hosted in the Kingdom",
      "Executive roundtables on the industrial strategy",
    ],
    successSigns: [
      "Finance teams asking to run the business case with their own numbers",
      "Trials or pilot volumes agreed",
      "Legal reviews completed without new objections",
    ],
    people: [
      { personaId: "SA_FL_V", stance: "in", line: "Open numbers and clear governance. It's bankable. I'd back this." },
      { personaId: "SA_FL_R", stance: "in", line: "The return for the risk, against peers. This is an investment case." },
      { personaId: "SA_CH_R", stance: "in", line: "Cost, return and a roll-out plan. I can take this to the investment committee." },
      { personaId: "SA_PG_V", stance: "in", line: "It fits the programmes and there's a plan with dates. I can support it." },
      { personaId: "SA_FL_B", stance: "in", line: "Sharia approval documented and disclosure clear. I can sign this off." },
      { personaId: "SA_TE_B", stance: "unsure", line: "If the calculator uses our plant data, it has to stay in the Kingdom." },
    ],
  },
  {
    id: "recommended",
    number: 5,
    name: "Get recommended",
    funnel: "Recommendation",
    goal: "Give the people who spread ideas a real Saudi partner to point to, so others hear about it from someone they trust.",
    startsWhen: "A real Saudi partner has agreed to be named, and legal has approved how their results are described.",
    whoMatters: "The people who pass ideas on across industry, government, finance and the press.",
    message:
      "See how [a Saudi petrochemical partner] is using Aramco Advantage Crude, with local suppliers, Saudi engineers and measured results.",
    messageNote: "Only with a real partner who has agreed to be named.",
    whyItWorks:
      "This is the version that won the room: the spreaders have held back at every stage because there was nothing real to point to. The catch is the same as in the room: the general counsel pushes back until the partner has agreed to be named and the wording is approved.",
    proof: ["A partner people trust", "A measured result", "Permission to name the partner", "Legal sign-off"],
    channels: [
      "A joint case study with the partner, in Arabic and English",
      "Speaking slots at major Saudi industry events",
      "Features in Saudi business and trade press",
    ],
    successSigns: [
      "A partner agreeing to be named",
      "Industry bodies and press mentioning it without being asked",
      "Invitations to speak",
    ],
    people: [
      { personaId: "SA_EN_A", stance: "in", line: "A real Saudi partner, with local suppliers. Now I'd share it." },
      { personaId: "SA_CH_A", stance: "in", line: "Companies working together, with results for customers. Worth passing on." },
      { personaId: "SA_PG_A", stance: "in", line: "Partners, jobs, local suppliers. That's an investment story I can promote." },
      { personaId: "SA_FL_A", stance: "in", line: "A real deal with a credible partner. Investors will notice." },
      { personaId: "SA_TE_A", stance: "in", line: "A local partner with results I can point to. I'd share it." },
      { personaId: "SA_IC_A", stance: "in", line: "Now there's a story to tell." },
      {
        personaId: "SA_FL_B",
        stance: "pushback",
        line: "Before we name them: do we have their permission, and are their results described accurately?",
      },
    ],
  },
];

export const ksaAngleStage: Record<string, string> = {
  resilience: "understood",
  proof: "considered",
  economics: "chosen",
  "local-proof": "recommended",
};

export const ksaStillToWin = [
  { personaId: "SA_TE_B", text: "needs to know the value calculator keeps plant data in the Kingdom." },
  { personaId: "SA_FL_B", text: "needs the partner's permission and legal sign-off before the partner is named." },
];

export const ksaRecommendation = {
  needs: [
    {
      title: "Commit to local content, and prove it",
      detail: "Certified local content, Saudi suppliers and engineers, and a Saudization plan with dates. Without it, the gatekeepers stop the message whatever else it says.",
      askedBy: ["SA_EN_B", "SA_PG_B", "SA_PG_R"],
    },
    {
      title: "Get the carbon data independently checked, in Gulf conditions",
      detail: "The main claim needs audited data from operations like theirs, and a check by an independent body.",
      askedBy: ["SA_EN_V", "SA_CH_V", "SA_IC_V"],
    },
    {
      title: "Show it meets Gulf rules",
      detail: "Any environmental benefit needs independent assurance and proof it meets Saudi and Gulf rules, with a clear method.",
      askedBy: ["SA_CH_B", "SA_PG_B", "SA_IC_B"],
    },
    {
      title: "Build a bankable business case, with Sharia approval",
      detail: "Show how the choice of crude affects costs, risk and value, against peers. Any financing needs documented Sharia approval.",
      askedBy: ["SA_FL_V", "SA_FL_R", "SA_FL_B"],
    },
    {
      title: "Find a real Saudi partner example",
      detail: "A named Saudi partner gives people something to point to and pass on. Only use one that is real, checked and agreed to be named.",
      askedBy: ["SA_EN_A", "SA_PG_A", "SA_IC_A"],
    },
  ],
  watchOuts: [
    {
      title: "Don't lead with profits before the proof is ready",
      detail: "When we tried leading with refinery profits, the engineering checker and the general counsel started pushing back. A bigger promise needs bigger proof, and a clear structure.",
      personaIds: ["SA_EN_V", "SA_FL_B"],
    },
    {
      title: "Don't frame it as a company's green ambition",
      detail: "Reshapers retell outside claims in terms of what they do for the Kingdom. Keep the story about Saudi industry, jobs and capability.",
      personaIds: ["SA_EN_R", "SA_PG_R"],
    },
    {
      title: "Don't name a partner without permission",
      detail: "Naming a partner raises new questions for legal: permission to name them, proof of their results, and how those results are described.",
      personaIds: ["SA_FL_B"],
    },
    {
      title: "Keep plant data in the Kingdom",
      detail: "If the value calculator uses a plant's own numbers, their data team will want to know it stays in the Kingdom and who can see it. Agree this before stage 4.",
      personaIds: ["SA_TE_B"],
    },
  ],
  nextSteps: [
    "Share this recommendation with the client team and agree which evidence and local-content commitments already exist.",
    "Agree the local-content commitments first. Every stage depends on them.",
    "Commission the independent check of the carbon data, and confirm it meets Gulf rules.",
    "Start the Arabic and English education content early, so it's ready soon after launch.",
    "Build the business case and value calculator in parallel, with Sharia review and in-Kingdom hosting, ready for stage 4.",
    "Start looking for a Saudi partner willing to be named, ready for stage 5.",
    "Put the finished work for each stage back in front of the room, then test it with real people before launch.",
  ],
};
