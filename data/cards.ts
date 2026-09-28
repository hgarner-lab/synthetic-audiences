// Extra depth for each person, read from the back end's persona cards (schema v2) in
// data/source. The site's own names, faces and reactions stay in personas.ts and
// reactions.ts; this only adds to the profile. Load it with import() so pages don't
// carry the whole file until someone opens a profile's "More about them".
import source from "@/data/source/synthetic_communities_all_markets.json";
import { plainGrounding, plainInfluence } from "@/data/cardPlain";

type Card = {
  persona_id: string;
  audience_id: string;
  professional_context: { decision_authority_level: number };
  belief_and_decision_model: { cares: string[]; distrusts: string[]; proof_requirements: string[] };
  information_behaviour: {
    trusted_source_types: string[];
    preferred_channels: string[];
    communications_preferences: string[];
  };
  influence_model: { influence_targets: string[]; role_description: string };
};

type AudienceGrounding = {
  audience_id: string;
  retrieved: string;
  grounding: {
    proof_currencies: string[];
    current_dynamics: string[];
    key_sources: { title: string; url: string }[];
  };
};

type Dataset = {
  market_code: string;
  last_reviewed: string;
  persona_records: Card[];
  audience_grounding: AudienceGrounding[];
};

export type CardExtras = {
  say: number;
  cares: string[];
  needs: string[];
  wary: string[];
  trusts: string[];
  looksAt: string[];
  likes: string[];
  influences: string[];
  influenceNote: string;
  group: {
    // Plain-English lines to show first, and the full research behind them.
    proof: { plain: string; research: string }[];
    debates: { plain: string; research: string }[];
    sources: { title: string; url: string }[];
    researched: string;
  } | null;
  reviewed: string;
};

// The cards' group names, as the site shows them.
const groupNames: Record<string, string> = {
  ENERGY: "Energy",
  CHEMICALS: "Chemicals",
  FINANCE_LEGAL: "Finance & legal",
  PUBLIC_GOVERNMENT: "Government",
  TECHNOLOGY: "Technology",
  INFLUENCE_COMMENTARY: "Media & commentary",
};

// Words the plain conversion below would get wrong.
const fixes: Record<string, string> = { esg: "ESG", ai: "AI", lockin: "lock-in" };

// Whole tokens that read better written out.
const phrases: Record<string, string> = {
  precise_documented: "Precise and documented",
  technical_detailed: "Technical and detailed",
  visual_demonstrative: "Visual and demonstrative",
  data_led: "Led by data",
  peer_led: "Led by peers",
};

// Turns a card token like "third_party_certification" into "Third party certification".
export function label(token: string) {
  if (phrases[token]) return phrases[token];
  const words = token.split("_").map((word) => fixes[word] ?? word);
  const text = words.join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function groupName(audienceId: string) {
  const key = audienceId.split("_").slice(1).join("_");
  return groupNames[key] ?? label(key.toLowerCase());
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Some research lines end with a web-search citation like "([site](url))". The sources
// are listed separately, so drop it.
function clean(text: string) {
  return text.replace(/\s*\(\[[^\]]*\]\([^)]*\)\)/g, "").trim();
}

// Matches each research line with its plain version, falling back to the research itself.
function pair(research: string[], plain: string[] = []) {
  return research.map((line, index) => ({ plain: plain[index] ?? clean(line), research: clean(line) }));
}

const datasets = (source as { datasets: Dataset[] }).datasets;

// Returns null when the cards have no one with this ID, so the profile simply leaves the section out.
export function cardExtras(personaId: string): CardExtras | null {
  const dataset = datasets.find((item) => item.persona_records.some((card) => card.persona_id === personaId));
  const card = dataset?.persona_records.find((item) => item.persona_id === personaId);
  if (!dataset || !card) return null;

  const grounding = dataset.audience_grounding.find((item) => item.audience_id === card.audience_id);
  return {
    say: card.professional_context.decision_authority_level,
    cares: card.belief_and_decision_model.cares.map(label),
    needs: card.belief_and_decision_model.proof_requirements.map(label),
    wary: card.belief_and_decision_model.distrusts.map(label),
    trusts: card.information_behaviour.trusted_source_types.map(label),
    looksAt: card.information_behaviour.preferred_channels.map(label),
    likes: card.information_behaviour.communications_preferences.map(label),
    influences: card.influence_model.influence_targets.map(groupName),
    influenceNote: plainInfluence[personaId] ?? card.influence_model.role_description,
    group: grounding
      ? {
          proof: pair(grounding.grounding.proof_currencies.slice(0, 3), plainGrounding[card.audience_id]?.proof),
          debates: pair(grounding.grounding.current_dynamics.slice(0, 2), plainGrounding[card.audience_id]?.debates),
          sources: grounding.grounding.key_sources.slice(0, 3),
          researched: formatDate(grounding.retrieved),
        }
      : null,
    reviewed: formatDate(dataset.last_reviewed),
  };
}
