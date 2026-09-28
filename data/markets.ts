// The markets the room can show. China is the full experience; Saudi Arabia has the
// room, the people and their profiles, and the rest of the experience follows.
import { personas, InfluenceRole } from "@/data/personas";
import { roomMessages, RoomMessage } from "@/data/reactions";
import { ksaPeople } from "@/data/ksaPeople";
import { ksaDetail, ksaOriginalSpeakers, ksaRoomMessages } from "@/data/ksaRoom";
import { audienceQuestions, AudienceQuestion, defaultResponderIds } from "@/data/questions";
import { journeySteps, JourneyStep } from "@/data/journey";
import { ksaDefaultResponderIds, ksaFixingStage, ksaJourneySteps, ksaLens, ksaQuestions } from "@/data/ksaAsk";

export type MarketId = "china" | "ksa";

// One person as the room shows them, whichever market they're in.
export type RoomPerson = {
  id: string;
  name: string;
  nameLocal: string;
  lang: "zh-Hans" | "ar";
  role: string;
  segment: string;
  influenceRole: InfluenceRole;
  needs: string[];
  why: string;
  // What shapes their view, and the thought behind it, for Ask the room.
  lens: string[];
  thought: string;
};

export type Market = {
  id: MarketId;
  name: string;
  people: RoomPerson[];
  messages: RoomMessage[];
  originalSpeakers: string[];
  questions: AudienceQuestion[];
  defaultResponderIds: string[];
  journey: { place: string; steps: JourneyStep[]; fixingStage: Record<string, string> };
};

export const markets: Record<MarketId, Market> = {
  china: {
    id: "china",
    name: "China",
    people: personas.map((person) => ({
      id: person.id,
      name: person.name,
      nameLocal: person.nameZh,
      lang: "zh-Hans",
      role: person.role,
      segment: person.segment,
      influenceRole: person.influenceRole,
      needs: person.needs,
      why: person.actionDetail,
      lens: person.lens,
      thought: person.internalThought,
    })),
    messages: roomMessages,
    originalSpeakers: ["CN_EN_A", "CN_IC_A", "CN_CH_B", "CN_FL_V", "CN_EN_R", "CN_IC_B"],
    questions: audienceQuestions,
    defaultResponderIds,
    journey: {
      place: "the refinery",
      steps: journeySteps,
      fixingStage: { CN_EN_R: "understood", CN_EN_V: "considered", CN_CH_B: "considered", CN_FL_V: "chosen" },
    },
  },
  ksa: {
    id: "ksa",
    name: "Saudi Arabia",
    people: ksaPeople.map((person) => ({
      id: person.id,
      name: person.name,
      nameLocal: person.nameAr,
      lang: "ar",
      role: person.role,
      segment: person.segment,
      influenceRole: person.influenceRole,
      needs: ksaDetail[person.id].needs,
      why: ksaDetail[person.id].why,
      lens: ksaLens[person.id],
      thought: ksaDetail[person.id].why,
    })),
    messages: ksaRoomMessages,
    originalSpeakers: ksaOriginalSpeakers,
    questions: ksaQuestions,
    defaultResponderIds: ksaDefaultResponderIds,
    journey: { place: "a Saudi refinery", steps: ksaJourneySteps, fixingStage: ksaFixingStage },
  },
};

export function marketForPerson(id: string): MarketId {
  return id.startsWith("SA_") ? "ksa" : "china";
}

// The market the visitor is looking at: a ?market= or ?person= link wins, then the last
// market chosen in this browser tab, then China.
const KEY = "sa-market";

export function readMarket(): MarketId {
  if (typeof window === "undefined") return "china";
  const params = new URLSearchParams(window.location.search);
  if (params.get("market") === "ksa") return "ksa";
  if (params.get("market") === "china") return "china";
  const person = params.get("person");
  if (person) return marketForPerson(person);
  try {
    if (window.sessionStorage.getItem(KEY) === "ksa") return "ksa";
  } catch {
    // Storage can be unavailable (e.g. private browsing).
  }
  return "china";
}

export function saveMarket(id: MarketId) {
  try {
    window.sessionStorage.setItem(KEY, id);
  } catch {
    // Nothing else depends on it.
  }
}
