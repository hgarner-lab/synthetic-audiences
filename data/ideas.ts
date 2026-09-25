export type IdeaShiftDirection = "more-resolved" | "still-unresolved" | "new-tension";

export type IdeaAudienceShift = {
  personaId: string;
  direction: IdeaShiftDirection;
  label: string;
  reason: string;
  evidence: string[];
};

export type IdeaOption = {
  id: string;
  label: string;
  description: string;
  proposition: string;
  takeaway: string;
  shifts: IdeaAudienceShift[];
  routeImpact: {
    strengthens: string;
    stillNeeds: string;
    nextMove: string;
  };
};

export const ideaOptions: IdeaOption[] = [
  {
    id: "resilience",
    label: "Lead with supply resilience",
    description:
      "Broaden the story from carbon performance into a more strategic decision about resilience and long-term competitiveness.",
    proposition:
      "Aramco Advantage Crude can help Chinese refiners make a more resilient long-term supply decision, combining reliable supply with lower upstream carbon intensity and the potential for durable commercial value.",
    takeaway:
      "This framing creates more strategic relevance for energy and geopolitical audiences, but it does not remove the need to substantiate the carbon and commercial claims.",
    shifts: [
      {
        personaId: "CN_EN_R",
        direction: "more-resolved",
        label: "More strategically relevant",
        reason:
          "The story now speaks directly to competitiveness, energy security and the long-term consequences of the supply decision.",
        evidence: ["Industrial competitiveness", "Energy security", "Long-term value"],
      },
      {
        personaId: "CN_EN_B",
        direction: "more-resolved",
        label: "Closer to an existing priority",
        reason:
          "Supply resilience and energy security are now explicit rather than left outside the proposition.",
        evidence: ["Energy security", "Policy alignment", "Risk"],
      },
      {
        personaId: "CN_IC_R",
        direction: "more-resolved",
        label: "Strategically more complete",
        reason:
          "The proposition now acknowledges the wider supply and geopolitical context that shapes interpretation.",
        evidence: ["Energy security", "Geopolitical context"],
      },
      {
        personaId: "CN_EN_V",
        direction: "still-unresolved",
        label: "Proof threshold unchanged",
        reason:
          "The framing is broader, but the carbon-intensity claim still needs audited operating evidence and a comparable methodology.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_CH_B",
        direction: "still-unresolved",
        label: "Assurance gap remains",
        reason:
          "A more strategic story does not make the environmental claim safer without independent assurance and local compliance evidence.",
        evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
      },
      {
        personaId: "CN_FL_V",
        direction: "new-tension",
        label: "Commercial promise is now more visible",
        reason:
          "Long-term commercial value is more prominent, which increases the need for a worked investment case and scenario analysis.",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
    ],
    routeImpact: {
      strengthens:
        "Strategic relevance: resilience gives the proposition a broader reason to matter beyond sustainability.",
      stillNeeds:
        "Technical and commercial substantiation: the carbon figure and value claim still carry the same evidence burden.",
      nextMove:
        "Use resilience as the lead frame, then place independently assured carbon evidence and a worked commercial case underneath it.",
    },
  },
  {
    id: "proof",
    label: "Lead with independently assured proof",
    description:
      "Move the proposition closer to what technical, compliance and expert audiences need before they will validate it.",
    proposition:
      "Aramco Advantage Crude combines reliable supply with independently assured upstream carbon-intensity data, giving refiners a clearer evidence base for assessing potential carbon and commercial value.",
    takeaway:
      "This reduces the largest credibility barrier. The remaining weakness is not whether the claim can be trusted, but whether the advantage is commercially material and locally relevant.",
    shifts: [
      {
        personaId: "CN_EN_V",
        direction: "more-resolved",
        label: "Closer to validation",
        reason:
          "The proposition now foregrounds assurance and an evidence base rather than asking the numerical claim to stand alone.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_CH_B",
        direction: "more-resolved",
        label: "Lower claims risk",
        reason:
          "Independent assurance directly addresses the requirement for defensible environmental claims.",
        evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
      },
      {
        personaId: "CN_IC_V",
        direction: "more-resolved",
        label: "More research-grade",
        reason:
          "The route now makes methodology and independent review central to the story rather than peripheral.",
        evidence: ["Technical peer review", "Transparent methodology"],
      },
      {
        personaId: "CN_FL_B",
        direction: "more-resolved",
        label: "Governance improves",
        reason:
          "Assurance reduces the governance risk around comparative and downstream claims, provided the scope is explicit.",
        evidence: ["Legal opinion", "Governance assurance"],
      },
      {
        personaId: "CN_FL_V",
        direction: "still-unresolved",
        label: "Commercial case still missing",
        reason:
          "Evidence can make the carbon claim credible without proving that the financial consequence is material.",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
      {
        personaId: "CN_EN_A",
        direction: "still-unresolved",
        label: "Still lacks social proof",
        reason:
          "The proposition remains difficult to carry through trusted networks without a visible partner, customer or use case.",
        evidence: ["Credible partner", "Visible use case", "Measured outcome"],
      },
    ],
    routeImpact: {
      strengthens:
        "Credibility: the route now starts to answer the most common technical, compliance and expert objection.",
      stillNeeds:
        "Commercial consequence and social proof: trusted evidence is necessary but not sufficient to create consideration.",
      nextMove:
        "Keep assurance close to the core claim, then add a worked customer-value pathway and visible local proof.",
    },
  },
  {
    id: "economics",
    label: "Lead with refinery economics",
    description:
      "Make the proposition more obviously commercial by connecting the feedstock decision to capital, risk and long-term value.",
    proposition:
      "A better-informed feedstock decision can strengthen refinery economics over time when lower upstream carbon intensity is converted into verifiable operational, customer and risk-adjusted value.",
    takeaway:
      "This makes the proposition more useful to strategy and finance audiences, but it raises the burden of proving the path from upstream carbon intensity to downstream economic outcomes.",
    shifts: [
      {
        personaId: "CN_FL_V",
        direction: "more-resolved",
        label: "Commercial relevance improves",
        reason:
          "The proposition now answers the question finance naturally asks: what economic consequence follows from the decision?",
        evidence: ["Investment case", "Scenario analysis", "Economic consequence"],
      },
      {
        personaId: "CN_FL_R",
        direction: "more-resolved",
        label: "Closer to an investment narrative",
        reason:
          "Capital efficiency and risk-adjusted return are now closer to the centre of the story.",
        evidence: ["Economic model", "Peer benchmarking"],
      },
      {
        personaId: "CN_CH_R",
        direction: "more-resolved",
        label: "Industrial value is clearer",
        reason:
          "The proposition shifts toward return on capital and industrial upgrading rather than treating sustainability as a standalone benefit.",
        evidence: ["Investment case", "Economic model"],
      },
      {
        personaId: "CN_EN_R",
        direction: "more-resolved",
        label: "Long-term value is clearer",
        reason:
          "The strategic decision is now connected to a concrete commercial outcome rather than only a carbon advantage.",
        evidence: ["Economic model", "Deployment roadmap"],
      },
      {
        personaId: "CN_EN_V",
        direction: "new-tension",
        label: "Causal proof becomes more important",
        reason:
          "The stronger the downstream economic claim becomes, the more technical evidence is needed to show how the upstream metric creates that outcome.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_CH_B",
        direction: "new-tension",
        label: "Claims scrutiny increases",
        reason:
          "A wider statement about operational and customer value expands the surface area that must be substantiated and disclosed carefully.",
        evidence: ["Third-party certification", "Local compliance evidence", "Transparent disclosure"],
      },
    ],
    routeImpact: {
      strengthens:
        "Commercial relevance: the audience can see what the campaign is trying to change in business terms.",
      stillNeeds:
        "A defensible causal chain: the route must prove how upstream carbon intensity reaches refinery economics and customer value.",
      nextMove:
        "Build a worked value pathway with scenarios, operating evidence and a precise statement of where the benefit does — and does not — apply.",
    },
  },
  {
    id: "local-proof",
    label: "Build around a China partner case",
    description:
      "Make the proposition tangible through a real local partner, customer or refinery example — if that evidence exists.",
    proposition:
      "A China-specific Aramco Advantage Crude story built around a real refinery or industrial partner, showing how reliable supply, verified carbon data and customer value work together in practice.",
    takeaway:
      "This could improve relevance and amplification substantially, but it is a route requirement rather than a claim ready to use. The prototype does not contain a verified partner case.",
    shifts: [
      {
        personaId: "CN_EN_A",
        direction: "more-resolved",
        label: "Much easier to carry",
        reason:
          "A visible partner or customer example directly addresses the current lack of social proof and market relevance.",
        evidence: ["Credible partner", "Visible use case", "Measured outcome"],
      },
      {
        personaId: "CN_PG_A",
        direction: "more-resolved",
        label: "More locally relevant",
        reason:
          "A China-specific case creates a clearer connection to industry coordination and economic development.",
        evidence: ["Partner case", "Sector outcome"],
      },
      {
        personaId: "CN_PG_R",
        direction: "more-resolved",
        label: "Local value becomes visible",
        reason:
          "The story can now connect more naturally to local capability, industrial development and partnership.",
        evidence: ["Economic model", "Local partnership"],
      },
      {
        personaId: "CN_IC_A",
        direction: "more-resolved",
        label: "Creates a reason to amplify",
        reason:
          "A partner, event or visible outcome gives the proposition a stronger editorial and professional hook.",
        evidence: ["Timely event", "Independent evidence", "Partner story"],
      },
      {
        personaId: "CN_EN_V",
        direction: "still-unresolved",
        label: "Case quality matters",
        reason:
          "A local case only helps technical validation if it contains comparable operating evidence and a transparent method.",
        evidence: ["Audited operating data", "Pilot results", "Comparable methodology"],
      },
      {
        personaId: "CN_FL_B",
        direction: "new-tension",
        label: "Claims governance expands",
        reason:
          "Customer and partner proof creates new governance requirements around permissions, substantiation and how outcomes are represented.",
        evidence: ["Legal opinion", "Governance assurance"],
      },
    ],
    routeImpact: {
      strengthens:
        "Local relevance and amplification: a real example gives the story something people can point to and carry.",
      stillNeeds:
        "Verified evidence: no customer, partner or refinery case should be implied until a real substantiation pack exists.",
      nextMove:
        "Treat the local case as a creative brief requirement. Source a verified example, then build the route around the specific evidence it can support.",
    },
  },
];
