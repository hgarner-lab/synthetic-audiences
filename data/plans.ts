// Everything the recommendation page needs for one market, so the same page can show
// the China plan or the Saudi plan.
import { Stance, stanceOrder, RoomMessage } from "@/data/reactions";
import { recommendation, recommendedId } from "@/data/recommendation";
import { angleStage, bigIdea, CampaignStage, channelsNote, stages, stillToWin } from "@/data/campaign";
import { ksaAngleStage, ksaBigIdea, ksaRecommendation, ksaRecommendedId, ksaStages, ksaStillToWin } from "@/data/ksaCampaign";
import { markets, MarketId, RoomPerson } from "@/data/markets";

export type RoomSnapshot = { id: string; label: string; stances: Record<string, Stance> };
export type VersionTally = { id: string; label: string; counts: Record<Stance, number> };

export type Plan = {
  market: MarketId;
  marketName: string;
  people: RoomPerson[];
  bigIdea: { name: string; line: string; summary: string };
  stages: CampaignStage[];
  snapshots: RoomSnapshot[];
  versionTallies: VersionTally[];
  recommendedId: string;
  // Why the campaign starts where it does, for "How we chose where to start".
  choseWhy: string;
  // What the page says when the visitor picked the version the campaign is built on.
  builtOn: string;
  angleStage: Record<string, string>;
  stillToWin: { personaId: string; text: string }[];
  recommendation: typeof recommendation;
  channelsNote: string;
  // Parts of the experience that exist for this market so far.
  hasAsk: boolean;
  hasDecision: boolean;
};

function tallies(messages: RoomMessage[]): VersionTally[] {
  return messages.map((message) => ({
    id: message.id,
    label: message.id === "original" ? "Original message" : message.label,
    counts: Object.fromEntries(
      stanceOrder.map((stance) => [stance, message.reactions.filter((r) => r.stance === stance).length])
    ) as Record<Stance, number>,
  }));
}

// How the whole room stands at the start and after each stage. Anyone a stage doesn't
// mention keeps where they were.
function snapshotsFor(messages: RoomMessage[], planStages: CampaignStage[]): RoomSnapshot[] {
  const start = Object.fromEntries(messages[0].reactions.map((r) => [r.personaId, r.stance])) as Record<string, Stance>;
  return planStages.reduce<RoomSnapshot[]>(
    (list, stage) => {
      const stances = { ...list[list.length - 1].stances };
      stage.people.forEach((person) => {
        stances[person.personaId] = person.stance;
      });
      return [...list, { id: stage.id, label: stage.name, stances }];
    },
    [{ id: "start", label: "Before the campaign", stances: start }]
  );
}

export function countStances(stances: Record<string, Stance>) {
  const values = Object.values(stances);
  return Object.fromEntries(
    stanceOrder.map((stance) => [stance, values.filter((value) => value === stance).length])
  ) as Record<Stance, number>;
}

export const plans: Record<MarketId, Plan> = {
  china: {
    market: "china",
    marketName: "China",
    people: markets.china.people,
    bigIdea,
    stages,
    snapshots: snapshotsFor(markets.china.messages, stages),
    versionTallies: tallies(markets.china.messages),
    recommendedId,
    choseWhy:
      "We put five versions of the message to the room. Leading with independent proof won over the most people and created no new objections, so the campaign opens with it.",
    builtOn: "That's the version this campaign is built on: it's the message for stage 3, get considered.",
    angleStage,
    stillToWin,
    recommendation,
    channelsNote,
    hasAsk: true,
    hasDecision: true,
  },
  ksa: {
    market: "ksa",
    marketName: "Saudi Arabia",
    people: markets.ksa.people,
    bigIdea: ksaBigIdea,
    stages: ksaStages,
    snapshots: snapshotsFor(markets.ksa.messages, ksaStages),
    versionTallies: tallies(markets.ksa.messages),
    recommendedId: ksaRecommendedId,
    choseWhy:
      "We put five versions of the message to the room. Building around a Saudi partner won over the most people, including two gatekeepers who pushed back on everything else. So local partnership runs through the whole campaign, and the named partner story is where it lands.",
    builtOn:
      "That's the version this campaign is built on: local partnership runs through every stage, and the named partner story is stage 5, get recommended.",
    angleStage: ksaAngleStage,
    stillToWin: ksaStillToWin,
    recommendation: ksaRecommendation,
    channelsNote,
    hasAsk: true,
    hasDecision: true,
  },
};
