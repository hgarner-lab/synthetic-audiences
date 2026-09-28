# Synthetic Communities — Persona Card Schema (v2)

**Applies to:** `synthetic_communities_*` datasets, China v1.2 / KSA v1.1 and later.
**Companion files:** `evidence_vocabulary.json`, `validate_cards_v2.py`.
**Design principle:** the people are fictional synthetic archetypes; the world they
operate in is web-researched and real. Commercial brands never appear in persona
data — the tested brand lives in run configuration, not in the dataset.

## 1. Dataset Top Level

| Field | Type | Purpose |
|---|---|---|
| `dataset_id` | string | Stable identifier, e.g. `synthetic_communities_china_v1` |
| `record_type` | string | Always `persona_record_collection` |
| `market` / `market_code` | string | Canonical market + code (`China`/`CN`, `KSA`/`SA`) |
| `version` | string | Bumped by every reviewed transformation |
| `last_reviewed` | date | Human review date (ISO) |
| `record_defaults` | object | `persona_type`, `attribute_status`, `confidence`, `requires_human_review`, `source_references[]` |
| `market_grounding` | object | Web-researched market context (section 2) |
| `audience_grounding` | array | Per-audience web-researched context (section 2) |
| `persona_records` | array | The persona cards (section 3) |

## 2. Grounding Objects (the "world")

Added by `enrich_research.py` -> human digest review -> `merge_grounding.py`.
Merged only after human approval; merge asserts persona records are byte-identical.

| Field | In | Purpose |
|---|---|---|
| `attribute_status` | both | `web_grounded_context` — provenance label |
| `retrieved` | both | ISO date of web research |
| `policy_frame` | market | National policy/investment context |
| `policy_programs[]` | both | `{name, relevance, source_url}` — public programs only |
| `current_dynamics[]` | both | Live debates, last 12 months |
| `communication_culture` | both | Engagement norms |
| `confidence` | both | `high` / `medium` / `low`, human-reviewed |
| `key_sources[]` | both | `{title, url, source_type}` |
| `institutional_landscape` | audience | Which institution types hold validation authority |
| `proof_currencies[]` | audience | Evidence that actually persuades this audience |

**Consumed by:** the actor prompt (narrative layer) only. Never read by the rule engine.

## 3. Persona Record

| Field | Type / Values | Layer |
|---|---|---|
| `persona_id` | `{MKT}_{SEG}_{ROLE}` e.g. `CN_EN_V` | identity (immutable) |
| `record_type` | string | always `persona` |
| `persona_type` | string | always `fictional_synthetic_archetype` |
| `name` | string | culturally authentic, unique per market |
| `persona_label` | string | e.g. `Technical Validator` |
| `market` / `market_code` | canonical | filtering |
| `audience_id` | `{MKT}_{SEGMENT}` e.g. `CN_ENERGY` | network node |
| `segment` / `segment_code` | canonical | filtering |
| `influence_role` | `validate` / `block` / `amplify` / `reframe` | designed prior |
| `voice_profile` | one line | actor prompt only |
| `professional_context` | object (3.1) | actor prompt |
| `belief_and_decision_model` | object (3.2) | actor + proof-gap analysis |
| `information_behaviour` | object (3.3) | actor; future channel matching |
| `influence_model` | object (3.4) | network topology / waves |
| `expected_content_behaviour` | object (3.5) | predicted-vs-actual baseline |
| `message_response_rules` | array (3.6) | deterministic decision layer |

### 3.1 `professional_context`
`role_title` · `organisation_type` (generic type, never a brand) · `seniority` ·
`functional_remit[]` · `decision_authority_level` (1-5) · `geographic_remit`

### 3.2 `belief_and_decision_model`
| Field | Type | Notes |
|---|---|---|
| `cares[]` | tokens | motivational anchors |
| `distrusts[]` | tokens | scepticism triggers |
| `proof_requirements[]` | evidence tags | report section 7 proof gaps |
| `scepticism_level` | int 1-5 | baseline disposition |
| `baseline_brand_perception` | int 1-5 | brand-agnostic anchor |

### 3.3 `information_behaviour`
`trusted_source_types[]` · `preferred_channels[]` · `communications_preferences[]`

### 3.4 `influence_model`
| Field | Notes |
|---|---|
| `primary_mechanism` | how influence is exercised, e.g. `technical_credibility` |
| `influence_level` | int 1-5, weights the share forecast |
| `influence_targets[]` | audience_ids — the social graph; all must resolve; cross-audience edges are bridge edges (~20-40%) |
| `role_description` | one line |

### 3.5 `expected_content_behaviour`
`belief_level` / `risk_level` / `spread_level` (`low`/`medium`/`high`) plus
`interpretation` — the pre-declared expectation each reaction is compared against.

### 3.6 `message_response_rules[]`
| Field | Notes |
|---|---|
| `rule_id` | `{PERSONA_ID}_{NN}`, globally unique |
| `condition` | human-readable prose (authored intent) |
| `response` | one of 8 canonical responses (section 5) |
| `belief_change` / `risk_change` / `spread_change` / `reframe_change` | int -2..+2 |
| `interpretation_change` | snake_case meaning-shift label |
| `compiled_match` | machine-checkable predicate (section 4) |

## 4. Predicate Grammar (`compiled_match`)

- `{"evidence": "tag"}` — tag present in the decomposed message
- `{"framing": "tag"}` — framing tag present
- `{"all_of": [...]}` — every child predicate true
- `{"any_of": [...]}` — at least one child true
- `{"none_of": [...]}` — no child predicate true

Tags come from `evidence_vocabulary.json` (23 evidence + 6 framing). The claim
decomposer tags each message once per run; the rule engine then evaluates every
predicate in pure Python. Same message + same tags + same cards = same verdicts.

## 5. Response -> Canonical Action (scoring weights)

| Card response | Canonical | Weight |
|---|---|---|
| `validate` | VALIDATE | +1.00 |
| `amplify` | AMPLIFY | +1.25 |
| `acknowledge_mitigation` | VALIDATE soft | +0.50 |
| `reframe_positive` | REFRAME | +0.35 |
| `reframe_negative` | REFRAME | -0.35 |
| `withhold_validation` | WITHHOLD | 0.00 |
| `do_not_amplify` | WITHHOLD spread-negative | 0.00 |
| `block` | BLOCK | -1.00 |

`message_score = clamp(50 + 50 * sum(w) / (1.25 * n), 0, 100)`
Verdict tiers: >=75 strong · >=55 moderate · >=35 weak · <35 hostile.

## 6. Canonical Vocabularies

- Markets: China, KSA, USA, India, Japan, Singapore (codes CN SA US IN JP SG)
- Segments: Energy (EN), Chemicals (CH), Finance & Legal (FL),
  Public Administration (PG), Technology (TE), Influence & Commentary (IC)
- Coverage: 6 audiences per market, one V/B/A/R persona each
  (4 per audience, 24 per market, 144 at full build)
- Scales: all `*_level` ints 1-5; all `*_change` ints -2..+2

## 7. Reaction Provenance

Every reaction records `basis`: `rule_binding` (deterministic), `adjudicated_no_rules`
(LLM judged in character), `adjudicated_conflict` (LLM resolved conflicting rules),
`error`. Reports must never blur these categories. Rule verdicts cannot be changed
by the actor LLM — it only narrates them.

## 8. Governance Rules

1. Persona cards are frozen content; changes only via the reviewed pipeline;
   every merge asserts byte-identity of `persona_records`.
2. No commercial brands anywhere in persona records or grounding.
3. Grounding enters only after human digest approval, stamped with retrieval date.
4. `compiled_match` predicates are the repeatability backbone; changes require
   re-review of affected runs.
5. Dataset version bumps on every transformation; `.pre_*.json` backups are the
   rollback chain.