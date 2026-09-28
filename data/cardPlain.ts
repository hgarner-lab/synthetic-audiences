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
  SA_ENERGY: {
    proof: [
      "Audited field-trial results from Saudi conditions: heat, dust, salt and high pressure.",
      "Approved-supplier status, and references from major national energy companies.",
      "Certificates and test reports from recognised Saudi and international standards bodies and labs.",
    ],
    debates: [
      "How fast to raise local-content and skills-transfer rules without losing access to specialist technology or slowing projects.",
      "Balancing reliable oil production with building more refining, chemicals and local supply chains at home.",
    ],
  },
  SA_CHEMICALS: {
    proof: [
      "Valid industrial, environmental and safety permits, with inspection issues closed.",
      "Safety studies and risk assessments signed off by recognised independent specialists.",
      "Accredited lab results and continuous monitoring showing emissions and workplace exposure are within limits.",
    ],
    debates: [
      "Moving onto the new national chemical-safety platform (launched November 2025), which brings records from different regulators together.",
      "Stricter safety rules, including new insurance requirements from August 2026, mean more proof and paperwork.",
    ],
  },
  SA_FINANCE_LEGAL: {
    proof: [
      "Audited financial models that show what happens if things go wrong, and whether debts can be repaid.",
      "Independent technical, market, environmental and legal checks.",
      "A formal ruling from a Sharia committee that the deal follows Islamic finance rules, with audit records.",
    ],
    debates: [
      "The national privatisation plan brings a large pipeline of infrastructure projects, and the work now is making them bankable.",
      "Since February 2026 all foreign investors can buy directly on the main Saudi stock market, so advisers are updating their checks.",
    ],
  },
  SA_PUBLIC_GOVERNMENT: {
    proof: [
      "Audited certificates showing how much of a contract's value stays in the Kingdom.",
      "Valid licences, and written support from every ministry or regulator involved.",
      "Before-and-after targets that map directly to Vision 2030 and national industry goals.",
    ],
    debates: [
      "The 2026 budget looks for measurable returns, finished projects, efficient spending and private investment.",
      "From August 2026, 233 products must meet minimum local-content levels, so companies must show real value added in the Kingdom.",
    ],
  },
  SA_TECHNOLOGY: {
    proof: [
      "A point-by-point match to Saudi rules on cybersecurity, data, AI and telecoms.",
      "Audited results from Saudi sites showing lasting gains in uptime, output, safety or cost.",
      "Clear records of what data is held, where it flows, privacy checks and the rules for sending data abroad.",
    ],
    debates: [
      "2026 is Saudi Arabia's Year of AI. AI is moving from pilots to everyday use, with closer checks on governance, privacy and real value.",
      "How to move to the cloud faster and control costs, while keeping data in the Kingdom and services reliable.",
    ],
  },
  SA_INFLUENCE_COMMENTARY: {
    proof: [
      "Official statistics with clear definitions that can be compared over time.",
      "Vision 2030 results that have been audited or independently checked against published targets.",
      "Ministry of Finance budget reports, debt figures and records of projects being re-prioritised.",
    ],
    debates: [
      "How to re-prioritise spending on big projects and events while protecting the budget and business confidence.",
      "Whether the economy is diversifying through productivity, exports and investment, or still leans on government spending.",
    ],
  },
};

// Plain-English versions of each card's influence_model.role_description.
export const plainInfluence: Record<string, string> = {
  CN_EN_V: "Once they've seen evidence they can check for themselves, others in energy take the technology seriously.",
  CN_EN_B: "Spots policy, delivery and reputation risks, and can stop others backing an idea because of them.",
  CN_EN_A: "Gets a message talked about through industry partners and professional networks.",
  CN_EN_R: "Retells energy stories as being about China's industrial strength, energy security and long-term competitiveness.",
  CN_CH_V: "Backs claims once a process is shown to be safe, efficient and repeatable.",
  CN_CH_B: "Pushes back on any claim that can't show solid safety, compliance and environmental controls.",
  CN_CH_A: "Shares believable stories of companies working together, through professional and supply-chain networks.",
  CN_CH_R: "Retells technical ideas as questions of careful investment, industrial upgrading and returns.",
  CN_FL_V: "Backs ideas that show sound economics, good governance and careful handling of risk.",
  CN_FL_B: "Can stop an idea being accepted if legal, regulatory or disclosure requirements aren't met.",
  CN_FL_A: "Gets a message seen across deal-makers, advisers and investors.",
  CN_FL_R: "Retells company claims in terms of where money goes, the return for the risk and how long a market will last.",
  CN_PG_V: "Backs claims that fit policy, make a practical contribution and serve the public.",
  CN_PG_B: "Stops stories that are unclear on compliance, governance or who is accountable locally.",
  CN_PG_A: "Promotes initiatives that involve industry, deliver practical value and fit policy.",
  CN_PG_R: "Retells outside companies' stories in terms of local development, building skills and delivering results.",
  CN_TE_V: "Backs AI and digital claims only when performance, security and real-world use are clearly proven.",
  CN_TE_B: "Stops technology claims when it's unclear who can access the data, who is responsible for security, or how it's governed.",
  CN_TE_A: "Passes on stories of technology that works, and fits China, through developer and partner communities.",
  CN_TE_R: "Retells technology stories as being about building industrial capability, getting value from data and delivering.",
  CN_IC_V: "Their coverage follows the evidence. Claims that stand up to checking gain public credibility through them.",
  CN_IC_B: "Shapes how risks are described across markets, and can turn a story into a warning in client briefings.",
  CN_IC_A: "Carries concrete industry stories to professional audiences across the value chain.",
  CN_IC_R: "Retells outside stories in terms of what they do for China's national development, before they spread further.",
  SA_EN_V: "Backs claims proven in operations like theirs elsewhere in the Gulf, and others follow their lead.",
  SA_EN_B: "Stops support for an idea that lacks commitments to local content, Saudi jobs or local suppliers.",
  SA_EN_A: "Gets a message talked about across energy and chemicals partner networks.",
  SA_EN_R: "Retells energy stories in terms of the economics of joined-up operations and the Kingdom's industrial strategy.",
  SA_CH_V: "Backs process claims that show safe, reliable, repeatable performance.",
  SA_CH_B: "Pushes back on sustainability claims without independent checks and proof of meeting Gulf rules.",
  SA_CH_A: "Shares stories of companies working together across chemicals and energy networks.",
  SA_CH_R: "Retells ideas as questions of careful investment and returns.",
  SA_FL_V: "Backs ideas that show bankable economics and good governance.",
  SA_FL_B: "Can stop an idea being accepted if Islamic finance (Sharia) rules or regulations aren't addressed.",
  SA_FL_A: "Gets commercially important stories seen across deal-makers and government contacts.",
  SA_FL_R: "Retells claims in terms of whether the money will last and the return for the risk.",
  SA_PG_V: "Backs initiatives that fit national programmes and can show they'll be delivered.",
  SA_PG_B: "Stops stories that are unclear on compliance, local content or who is accountable for delivery.",
  SA_PG_A: "Promotes initiatives built on partnership and local participation that add national value.",
  SA_PG_R: "Retells outside companies' stories in terms of local development and delivering results.",
  SA_TE_V: "Backs technology claims proven in real industrial use, with security checked.",
  SA_TE_B: "Stops technology claims when it's unclear where data is stored, who is responsible for security, or how it's governed.",
  SA_TE_A: "Passes on stories of technology that works, and fits Saudi Arabia, through the tech community.",
  SA_TE_R: "Retells technology stories as being about building Saudi capability and delivering.",
  SA_IC_V: "Their coverage follows the evidence. Claims that stand up to checking gain public credibility through them.",
  SA_IC_B: "Shapes how risks are described across the region, and can turn a story into a warning in client briefings.",
  SA_IC_A: "Carries concrete industry stories to professional audiences across the region.",
  SA_IC_R: "Retells outside stories in terms of what they do for the Kingdom's transformation, before they spread further.",
};
