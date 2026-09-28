// The Saudi room: the same five versions of the message as China, reworded for Saudi
// Arabia, and prepared reactions from the 24 Saudi people. Each reaction follows that
// person's persona card (data/source): what they care about, the proof they need, and
// their two response rules. Like the China reactions, they are prepared in advance.
import type { IdeaShiftDirection } from "@/data/ideas";
import type { Reaction, RoomMessage, Stance } from "@/data/reactions";
import { ksaPeople } from "@/data/ksaPeople";

// What each person needs, and why they react to the original the way they do.
export const ksaDetail: Record<string, { stance: Stance; line: string; why: string; needs: string[] }> = {
  SA_EN_V: {
    stance: "unsure",
    line: "Maybe. Show me it working in Gulf conditions, checked by someone independent.",
    why: "Trusts results from operations like his own. This claim has no field data, no regional reference and no independent review.",
    needs: ["Audited data from real operations", "Results from a scaled-up trial", "An independent technical review"],
  },
  SA_EN_B: {
    stance: "pushback",
    line: "Where's the local content? Who builds it, and how many Saudis does it employ?",
    why: "Signs off suppliers against local-content rules. A message with nothing on local content, Saudi jobs or suppliers is one she stops.",
    needs: ["Local-content compliance", "Value created in the Kingdom", "A delivery plan with dates"],
  },
  SA_EN_A: {
    stance: "out",
    line: "No partner, no project, nothing local. Nothing here I'd pass on.",
    why: "Spreads stories about partnerships that deliver for the Kingdom. This one has no partner, no local benefit and no use case.",
    needs: ["A partner people trust", "Value created in the Kingdom", "Results for customers"],
  },
  SA_EN_R: {
    stance: "unsure",
    line: "This reads like a corporate green claim. Where does it fit the industrial strategy?",
    why: "Sees energy through the value chain and the Kingdom's industrial plan. The message frames it as a company's environmental ambition only.",
    needs: ["The economics worked out", "A delivery plan with dates", "How it compares with peers"],
  },
  SA_CH_V: {
    stance: "unsure",
    line: "Lasting advantage in whose plant? I'd need the operating and safety data.",
    why: "Backs process claims once plant data, safety evidence and the method are on the table. None of those are here yet.",
    needs: ["Audited plant data", "Safety evidence", "An open, clear method"],
  },
  SA_CH_B: {
    stance: "pushback",
    line: "An environmental claim with no assurance and nothing on Gulf rules? I can't let that through.",
    why: "Stops sustainability claims that lack independent assurance and proof they meet Gulf rules. This one has neither.",
    needs: ["Independent assurance", "Proof it meets Gulf rules", "An open, clear method"],
  },
  SA_CH_A: {
    stance: "out",
    line: "There's no customer and no partner. It's too abstract to share.",
    why: "Shares stories where companies work together and customers benefit. This message has no partner and no customer outcome.",
    needs: ["A partner people trust", "Results for customers", "Visible industry involvement"],
  },
  SA_CH_R: {
    stance: "unsure",
    line: "Nice aspiration. What does it cost, and what does it return?",
    why: "Retells ideas as questions of careful investment and returns. The message has ambition with no cost, return or roll-out plan.",
    needs: ["The economics worked out", "A delivery plan with dates", "How it compares with peers"],
  },
  SA_FL_V: {
    stance: "unsure",
    line: "Could be bankable. I'd want the numbers and the governance behind it.",
    why: "Backs ideas with open economics and clear governance. The message has no financial evidence or governance detail.",
    needs: ["The economics worked out", "Clear governance", "Open disclosure"],
  },
  SA_FL_B: {
    stance: "unsure",
    line: "Nothing to object to yet. It depends how any deal would be structured.",
    why: "Her concerns are Sharia compliance, disclosure and regulation. The message makes no financial or legal claim yet, so she waits.",
    needs: ["Sharia compliance evidence", "Clear governance", "Open disclosure"],
  },
  SA_FL_A: {
    stance: "out",
    line: "There's no deal or partner in it. Investors won't notice this.",
    why: "Spreads news that matters to deal-makers and investors. Broad reputation messages without a transaction don't reach him.",
    needs: ["A partner people trust", "The economics worked out", "Careful handling of investment risk"],
  },
  SA_FL_R: {
    stance: "unsure",
    line: "Lasting advantage is a big claim. Show me the return for the risk.",
    why: "Retells claims in terms of durable value and the return for the risk. The message has no commercial metrics.",
    needs: ["The economics worked out", "How it compares with peers", "Careful handling of investment risk"],
  },
  SA_PG_V: {
    stance: "unsure",
    line: "How does this serve Vision 2030? It doesn't say.",
    why: "Backs initiatives that fit national programmes and can be delivered. The message has no national relevance or delivery detail.",
    needs: ["Fit with national programmes", "Value created in the Kingdom", "A delivery plan with dates"],
  },
  SA_PG_B: {
    stance: "pushback",
    line: "Vague on compliance and silent on local content. That won't get a licence.",
    why: "Enforces local-content and licensing rules. The message is vague on compliance, local content and who is accountable.",
    needs: ["Compliance evidence", "Local-content compliance", "Open disclosure"],
  },
  SA_PG_A: {
    stance: "out",
    line: "No partners, no jobs, no investment story. I've nothing to promote.",
    why: "Promotes partnerships that bring investment and jobs. This is an isolated corporate claim with no visible national value.",
    needs: ["A partner people trust", "Visible industry involvement", "Value created in the Kingdom"],
  },
  SA_PG_R: {
    stance: "unsure",
    line: "Good for Aramco's reputation. What does it do for Saudi jobs and skills?",
    why: "Retells outside stories in terms of local development. The message centres the company's reputation over local jobs and skills.",
    needs: ["Value created in the Kingdom", "A delivery plan with dates", "The economics worked out"],
  },
  SA_TE_V: {
    stance: "unsure",
    line: "If there's technology behind the carbon figure, I'd want benchmarks and security checks.",
    why: "Backs technology claims proven in real use. Any digital measurement behind the claim would need benchmarks and security assurance.",
    needs: ["Technical benchmarks", "A real deployment", "Security assurance"],
  },
  SA_TE_B: {
    stance: "unsure",
    line: "Who holds the carbon data, and does it stay in the Kingdom?",
    why: "Guards data residency and security. The message doesn't say where the data behind the claim lives or who controls it.",
    needs: ["Security assurance", "Clear governance", "Compliance evidence"],
  },
  SA_TE_A: {
    stance: "out",
    line: "Nothing to demo and no local partner. I wouldn't share it.",
    why: "Passes on stories of technology that works in Saudi Arabia. This has no demonstration, local relevance or partner.",
    needs: ["A real deployment", "A partner people trust", "Value created in the Kingdom"],
  },
  SA_TE_R: {
    stance: "unsure",
    line: "Tie it to building Saudi capability and I'd use it.",
    why: "Retells technology stories around domestic capability. The message says nothing about building skills or capability at home.",
    needs: ["A delivery plan with dates", "Technical benchmarks", "The economics worked out"],
  },
  SA_IC_V: {
    stance: "unsure",
    line: "Which figures is 'lower carbon' based on? I'd check before I write about it.",
    why: "Her coverage follows the evidence. A promotional claim with no verifiable data or method won't get her backing.",
    needs: ["Open disclosure", "An open, clear method", "Independent assurance"],
  },
  SA_IC_B: {
    stance: "pushback",
    line: "No risk picture at all. In a client briefing, I'd flag this as a claim to watch.",
    why: "Shapes how risk is described across the region. A claim with no risk analysis or policy context is one he warns people about.",
    needs: ["Fit with national policy", "How risks are managed", "An open, clear method"],
  },
  SA_IC_A: {
    stance: "out",
    line: "Sounds like a press release. Where's the story?",
    why: "Carries concrete industry stories. Generic corporate messages with no partner, project or result don't get passed on.",
    needs: ["A partner people trust", "A real deployment", "Results for customers"],
  },
  SA_IC_R: {
    stance: "in",
    line: "A Saudi company leading on lower carbon? That's a national story I'd tell.",
    why: "Tells stories of national transformation. Because Aramco is Saudi, she hears this as a national achievement.",
    needs: ["Fit with national policy", "Value created in the Kingdom", "Open disclosure"],
  },
};

type Shift = { personaId: string; direction: IdeaShiftDirection; label: string; reason: string; line: string };

type KsaVersion = {
  id: string;
  label: string;
  proposition: string;
  shifts: Shift[];
  surprise: { personaIds: string[]; text: string };
};

export const ksaOriginal = {
  id: "original",
  label: "Original message",
  proposition: "Aramco's lower-carbon crude oil can give your business a lasting commercial advantage.",
  surprise: {
    personaIds: ["SA_EN_B", "SA_CH_B", "SA_PG_B", "SA_IC_B"],
    text: "Four gatekeepers push back outright: the message says nothing about local content or who is accountable. The only person leaning in is Samar Al-Faraj, who hears a Saudi success story.",
  },
};

const ksaVersions: KsaVersion[] = [
  {
    id: "resilience",
    label: "Lead with secure supply",
    proposition:
      "Aramco Advantage Crude gives Saudi refiners and petrochemical plants reliable supply for the long term, with lower carbon and lasting commercial value.",
    shifts: [
      {
        personaId: "SA_EN_R",
        direction: "more-resolved",
        label: "Now about the value chain",
        reason: "Reliable supply to Saudi plants links the message to the value chain and the Kingdom's industrial plan.",
        line: "Now it's about keeping Saudi industry supplied. That's the real story.",
      },
      {
        personaId: "SA_IC_B",
        direction: "more-resolved",
        label: "Risk is on the table",
        reason: "Supply security speaks directly to the risk picture he watches, so the claim is less exposed.",
        line: "Supply risk is finally addressed. I can brief on that.",
      },
      {
        personaId: "SA_PG_V",
        direction: "still-unresolved",
        label: "Still no local value",
        reason: "Supply matters, but the message still doesn't show jobs, local content or a national programme it serves.",
        line: "Reliable supply is good. What does it add to the national programmes?",
      },
      {
        personaId: "SA_EN_V",
        direction: "still-unresolved",
        label: "Still needs field proof",
        reason: "A broader story, but the carbon figure still has no Gulf operating data or independent review.",
        line: "A bigger story, but the same unproven number.",
      },
      {
        personaId: "SA_CH_B",
        direction: "still-unresolved",
        label: "Still needs assurance",
        reason: "A bigger story doesn't make the environmental claim safe without independent assurance and proof it meets Gulf rules.",
        line: "Supply doesn't change my question. Who assured the carbon figure?",
      },
      {
        personaId: "SA_FL_V",
        direction: "new-tension",
        label: "Now expects the numbers",
        reason: "Promising long-term commercial value makes finance want a bankable case and the governance behind it.",
        line: "You're promising long-term value now. Show me the model.",
      },
    ],
    surprise: {
      personaIds: ["SA_IC_B", "SA_FL_V"],
      text: "Hamad Al-Yami, who pushed back on the original, comes round once supply risk is addressed. Finance goes the other way: Hisham Al-Qahtani now pushes back.",
    },
  },
  {
    id: "proof",
    label: "Lead with independent proof",
    proposition:
      "Aramco Advantage Crude comes with independently checked carbon data, so Saudi industry can judge the carbon and commercial benefits for themselves.",
    shifts: [
      {
        personaId: "SA_EN_V",
        direction: "more-resolved",
        label: "Can now check the claim",
        reason: "Independent checks on the carbon data are what he needs before he backs a performance claim.",
        line: "Independently checked data? Now I can judge it.",
      },
      {
        personaId: "SA_CH_B",
        direction: "more-resolved",
        label: "Safer to say",
        reason: "Independent assurance is exactly what's needed to stand behind an environmental claim, as long as it covers Gulf rules.",
        line: "Assured data I can work with. Make sure it covers Gulf rules.",
      },
      {
        personaId: "SA_IC_V",
        direction: "more-resolved",
        label: "Now open to checking",
        reason: "The figures and the independent check are now at the centre, so she can verify before she writes.",
        line: "Now there's something I can verify. That I can report.",
      },
      {
        personaId: "SA_EN_B",
        direction: "still-unresolved",
        label: "Still no local content",
        reason: "Proof makes the claim believable, but there's still nothing on local content, Saudi jobs or suppliers.",
        line: "Proof is fine. My question hasn't changed: what's the local content?",
      },
      {
        personaId: "SA_FL_V",
        direction: "still-unresolved",
        label: "Still no business case",
        reason: "Evidence makes the carbon claim believable without showing it's worth real money.",
        line: "I believe the number now. I still don't see the money.",
      },
      {
        personaId: "SA_EN_A",
        direction: "still-unresolved",
        label: "Still nothing to share",
        reason: "Without a partner, customer or real example, there's still nothing people would want to pass on.",
        line: "Credible, but still nothing I'd share. Where's the partner?",
      },
    ],
    surprise: {
      personaIds: ["SA_EN_B"],
      text: "The checkers come round, and so does the chemicals gatekeeper. Noura Al-Dosari still pushes back: in Saudi Arabia, proof isn't enough without local content.",
    },
  },
  {
    id: "economics",
    label: "Lead with refinery profits",
    proposition:
      "Choosing Aramco Advantage Crude can improve plant profits over time, when its lower carbon is turned into proven savings, customer value and lower risk.",
    shifts: [
      {
        personaId: "SA_FL_V",
        direction: "more-resolved",
        label: "Now talks about money",
        reason: "The message now answers the question finance always asks: is this bankable?",
        line: "Now you're answering my question: is it bankable?",
      },
      {
        personaId: "SA_FL_R",
        direction: "more-resolved",
        label: "Now sounds like an investment",
        reason: "Durable value and the return for the risk are now at the centre of the story.",
        line: "This is an investment story now. Good.",
      },
      {
        personaId: "SA_CH_R",
        direction: "more-resolved",
        label: "Value is clearer",
        reason: "The message now talks about cost, return and lower risk, which is how she judges any upgrade.",
        line: "Return on capital, finally. This I can use.",
      },
      {
        personaId: "SA_EN_R",
        direction: "more-resolved",
        label: "Long-term value is clearer",
        reason: "Lower carbon linked to lasting commercial value fits how he sees the value chain.",
        line: "Carbon tied to real commercial value. Stronger.",
      },
      {
        personaId: "SA_EN_V",
        direction: "new-tension",
        label: "Bigger promise, more to prove",
        reason: "A profit claim raises the bar: he now needs field data showing how lower carbon becomes savings.",
        line: "Bigger promise, bigger proof. How does lower carbon make money?",
      },
      {
        personaId: "SA_FL_B",
        direction: "new-tension",
        label: "Now asks how it's structured",
        reason: "Once the message makes money claims, she needs to see disclosure and that any deal would be Sharia-compliant.",
        line: "Now you're talking about returns, I need to see how any deal is structured.",
      },
    ],
    surprise: {
      personaIds: ["SA_FL_B"],
      text: "Finance comes on board, but the money claim wakes up Ghada Al-Zahrani, the general counsel. She now pushes back until she sees how any deal would be structured.",
    },
  },
  {
    id: "local-proof",
    label: "Build around a Saudi partner",
    proposition:
      "A story built around a real Saudi petrochemical partner, with local suppliers and Saudi engineers, showing reliable supply, checked carbon data and customer value working together.",
    shifts: [
      {
        personaId: "SA_EN_B",
        direction: "more-resolved",
        label: "Local content is visible",
        reason: "Local suppliers and Saudi engineers are exactly the local-content and workforce commitments she looks for.",
        line: "Local suppliers and Saudi engineers. Now I can sign this off.",
      },
      {
        personaId: "SA_PG_B",
        direction: "more-resolved",
        label: "Now meets the rules",
        reason: "A named partner with local content makes compliance and accountability visible.",
        line: "Local content I can check, and someone accountable. That works.",
      },
      {
        personaId: "SA_PG_R",
        direction: "more-resolved",
        label: "Local value is visible",
        reason: "Saudi jobs and skills are now part of the story, which is how he judges any outside claim.",
        line: "Saudi engineers doing the work. That's the story I'd tell.",
      },
      {
        personaId: "SA_EN_A",
        direction: "more-resolved",
        label: "Now worth passing on",
        reason: "A credible partner, local benefit and a real use case give her a story to share.",
        line: "A real Saudi partner? That I'd share.",
      },
      {
        personaId: "SA_PG_A",
        direction: "more-resolved",
        label: "Now a national story",
        reason: "Partnership, local participation and jobs are what she promotes to investors.",
        line: "Partners, jobs, local suppliers. Worth promoting.",
      },
      {
        personaId: "SA_IC_A",
        direction: "more-resolved",
        label: "Now a story worth telling",
        reason: "A named partner with a real outcome gives him the concrete story he carries.",
        line: "Now there's a story to tell.",
      },
      {
        personaId: "SA_FL_B",
        direction: "new-tension",
        label: "New questions to answer",
        reason: "Naming a partner raises new questions: permission, disclosure and how the partnership is structured.",
        line: "Naming a partner raises new questions: permission, disclosure, structure.",
      },
    ],
    surprise: {
      personaIds: ["SA_EN_B", "SA_PG_B"],
      text: "This is the version Saudi Arabia was waiting for. Local content turns two gatekeepers from pushing back to leaning in, and the spreaders finally have a story. The catch: it only works with a real, checked partner.",
    },
  },
];

function shiftedStance(direction: IdeaShiftDirection, from: Stance): Stance {
  if (direction === "more-resolved") return "in";
  if (direction === "new-tension") return "pushback";
  return from;
}

const originalReactions: Reaction[] = ksaPeople.map((person) => ({
  personaId: person.id,
  stance: ksaDetail[person.id].stance,
  line: ksaDetail[person.id].line,
}));

export const ksaRoomMessages: RoomMessage[] = [
  { ...ksaOriginal, reactions: originalReactions },
  ...ksaVersions.map((version) => ({
    id: version.id,
    label: version.label,
    proposition: version.proposition,
    surprise: version.surprise,
    reactions: originalReactions.map((base) => {
      const shift = version.shifts.find((item) => item.personaId === base.personaId);
      if (!shift) return base;
      return {
        personaId: base.personaId,
        stance: shiftedStance(shift.direction, base.stance),
        line: shift.line,
        shift: { direction: shift.direction, label: shift.label, reason: shift.reason, from: base.stance },
      };
    }),
  })),
];

// Who speaks first in the Saudi room, for the original message.
export const ksaOriginalSpeakers = ["SA_EN_B", "SA_IC_R", "SA_CH_B", "SA_EN_A", "SA_PG_V", "SA_IC_B"];
