// Plain-English versions of the researched group background in the persona cards.
// The profile shows these first, with the full research one click away. Each line
// matches the card item at the same position. These are our summaries of the back
// end's research: they should move into the cards themselves once reviewed.

export const plainGrounding: Record<string, { proof: string[]; debates: string[] }> = {
  CN_ENERGY: {
    proof: [
      "Real performance data from the grid, collected over time in live operation.",
      "Independent lab tests against Chinese national or industry standards, with certificates.",
      "Audited figures on lifetime cost and efficiency under Chinese conditions.",
    ],
    debates: [
      "Turning the new five-year plan (2026–2030) into targets, while keeping energy secure, affordable and on track for the 2030 carbon peak.",
      "Market pricing has made income from renewables less predictable, and the industry wants fairer, steadier rules.",
    ],
  },
  CN_CHEMICALS: {
    proof: [
      "Long-running data from full-size plants: output, uptime, yield and quality.",
      "Independent lab tests, with methods others can check and repeat.",
      "Written proof that safety risks have been studied, controlled and signed off.",
    ],
    debates: [
      "How fast to grow: the industry is under pressure to avoid overcapacity and invest in higher-value materials.",
      "Old plants must be upgraded to meet safety and emissions rules, or closed. The question is how to pay for it.",
    ],
  },
  CN_FINANCE_LEGAL: {
    proof: [
      "Audited accounts, and cash-flow models that show what happens if things go wrong.",
      "Formal legal opinions confirming approvals, ownership and anti-money-laundering checks.",
      "Clear proof a project counts as green under China's official list, with the numbers to back it up.",
    ],
    debates: [
      "Banks are applying China's new 2025 green-finance rules and working out how much proof each project needs.",
      "New ways to fund infrastructure are opening up, with closer checks on who owns what and how it performs.",
    ],
  },
  CN_PUBLIC_GOVERNMENT: {
    proof: [
      "A clear map of how a proposal fits national plans, laws and each ministry's responsibilities.",
      "Official or audited statistics, with clear definitions and methods.",
      "Local pilots with measured results and costs, and proof they can be repeated elsewhere.",
    ],
    debates: [
      "Turning the new five-year plan into local plans, targets, projects and funding.",
      "Making China one fair national market by cutting local favouritism, selective subsidies and mismatched standards.",
    ],
  },
  CN_TECHNOLOGY: {
    proof: [
      "Proof of official filings, security reviews or passed compliance audits.",
      "Test reports from qualified labs showing it meets national and industry standards.",
      "Clear records of what data is used, where it came from, who can see it and how AI models are governed.",
    ],
    debates: [
      "Moving industrial AI from demos to real productivity gains that are reliable, affordable and safely supervised.",
      "Building good-quality industry data for AI while sorting out ownership, privacy and security.",
    ],
  },
  CN_INFLUENCE_COMMENTARY: {
    proof: [
      "Clear links to official Party, government and ministry documents.",
      "Official national statistics over time, including how they're measured.",
      "Audited data on costs, capacity, productivity, exports and investment.",
    ],
    debates: [
      "What the new five-year plan's \"high-quality development\" means in practice: domestic demand, advanced manufacturing, home-grown technology, a green transition and managing risk.",
      "Whether the crackdown on price wars between manufacturers will lift quality and margins without harming healthy competition.",
    ],
  },
};
