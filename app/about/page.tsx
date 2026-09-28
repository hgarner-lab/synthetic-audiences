import type { Metadata } from "next";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import { ShellNav } from "@/components/PageShell";
import { SectionIcon, SectionId } from "@/components/Sections";
import "../recommendation/recommendation.css";
import "./about.css";

export const metadata: Metadata = {
  title: "McCann Audience Truth Engine",
  description:
    "How McCann audience intelligence, process and specialist expertise power the Synthetic Audiences experience.",
};

const enginePillars = [
  {
    title: "Audience intelligence",
    text: "McCann proprietary audience intelligence, licensed data, client and first-party data, existing research and bespoke investigation.",
  },
  {
    title: "McCann process",
    text: "A structured way to define who matters, organise evidence, identify needs and influence, validate signals and translate them into implications.",
  },
  {
    title: "Specialist expertise",
    text: "Audience strategists, researchers and domain specialists shape the questions, evidence thresholds and outputs the system uses.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Define",
    text: "Identify the people, communities and decision roles that matter to the business problem.",
  },
  {
    number: "02",
    title: "Structure",
    text: "Organise priorities, tensions, proof needs, influence and relationships into a usable audience model.",
  },
  {
    number: "03",
    title: "Validate",
    text: "Challenge assumptions, check the evidence and make the limits of the model explicit.",
  },
  {
    number: "04",
    title: "Translate",
    text: "Turn audience truth into decisions about messages, proof, sequencing and the work that follows.",
  },
];

const experiences: { id: SectionId; title: string; text: string; href: string }[] = [
  {
    id: "room",
    title: "The room",
    text: "See where a message earns interest, doubt, resistance or attention, then try another version and watch the pattern change.",
    href: "/",
  },
  {
    id: "journey",
    title: "Follow the decision",
    text: "See how the message travels through a realistic decision path, where it stalls and what each person needs next.",
    href: "/decision",
  },
  {
    id: "ask",
    title: "Ask the room",
    text: "Put a question directly to different audience perspectives and keep disagreement visible.",
    href: "/ask",
  },
  {
    id: "people",
    title: "Meet everyone",
    text: "Explore the priorities, proof needs and influence roles behind the reaction.",
    href: "/people",
  },
  {
    id: "recommendation",
    title: "The recommendation",
    text: "Turn the audience response into a clearer campaign direction, with the message, proof and sequence the room needs.",
    href: "/recommendation",
  },
];

const roles = [
  ["Checkers", "test whether a claim is true before they will back it."],
  ["Gatekeepers", "can stop an idea and raise the proof threshold for everyone else."],
  ["Spreaders", "carry a credible idea into wider professional networks."],
  ["Reshapers", "change what a message means as it moves through the decision system."],
];

const dataSources = [
  "McCann Truth Central",
  "Acxiom",
  "GWI",
  "YouGov",
  "Dun & Bradstreet",
  "Client data",
  "First-party data",
  "Bespoke research",
];

export default function About() {
  return (
    <main className="rc ab">
      <header className="rcTop">
        <BrandLockup />
        <ShellNav />
      </header>

      <section className="rcHero abHero">
        <p className="rcEyebrow">McCann Audience Truth Engine</p>
        <h1>Audience intelligence you can work with.</h1>
        <p className="abHeroLead">
          Synthetic Audiences is an interactive application of the McCann Audience Truth Engine,
          a specialist audience system that combines McCann audience intelligence, a structured
          process and domain expertise with AI.
        </p>
        <p className="abHeroSupport">
          The result is an audience model you can see, question and put ideas in front of, with a
          clear route back to the evidence and logic underneath each response.
        </p>
      </section>

      <section className="rcSection abEquationSection">
        <p className="abKicker">What makes the system specialist</p>
        <h2 className="abEquationTitle">
          Audience intelligence <span>×</span> McCann process <span>×</span> specialist expertise
        </h2>
        <div className="abPillars">
          {enginePillars.map((pillar, index) => (
            <article className="abPillar" key={pillar.title}>
              <span className="abPillarNumber">0{index + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
        <div className="abAiLine">
          <strong>AI provides the reasoning capability that makes this intelligence interactive.</strong>
          <span>
            McCann supplies the audience knowledge, working method and specialist judgement that
            shape the job the system performs.
          </span>
        </div>
      </section>

      <section className="rcSection abArchitectureSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">What sits beneath the room</p>
            <h2>The synthetic people are the interface to the intelligence underneath.</h2>
          </div>
          <p>
            The visible experience is the top layer. Beneath it sits a structured audience model,
            the McCann Audience Truth Engine and the evidence ecosystem that grounds the work.
          </p>
        </div>

        <div className="abStack" aria-label="McCann Audience Truth Engine architecture">
          <div className="abLayer abLayerExperience">
            <div className="abLayerLabel">Experience</div>
            <div className="abLayerBody">
              <strong>Synthetic Audiences</strong>
              <div className="abLayerChips">
                <span>See the reaction</span>
                <span>Try another version</span>
                <span>Ask the room</span>
                <span>Follow the decision</span>
                <span>Meet everyone</span>
                <span>Get the recommendation</span>
              </div>
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerModel">
            <div className="abLayerLabel">Audience decision model</div>
            <div className="abLayerBody">
              <strong>People with different needs and different power in the decision</strong>
              <div className="abLayerChips">
                <span>Priorities</span>
                <span>Proof needs</span>
                <span>Decision roles</span>
                <span>Relationships</span>
                <span>Response logic</span>
                <span>Influence</span>
              </div>
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerEngine">
            <div className="abLayerLabel">McCann Audience Truth Engine</div>
            <div className="abEngineGrid">
              {enginePillars.map((pillar) => (
                <div key={pillar.title}>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerData">
            <div className="abLayerLabel">Audience evidence</div>
            <div className="abLayerBody">
              <strong>The McCann data ecosystem</strong>
              <div className="abSourceGrid">
                {dataSources.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
              <p className="abLayerNote">
                Sources vary by project. The Engine can combine McCann proprietary intelligence
                with approved external, client and bespoke research sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rcSection abProcessSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">The McCann process</p>
            <h2>Data becomes useful when it is turned into a decision system.</h2>
          </div>
          <p>
            The process gives structure to the evidence and keeps the output focused on a real
            marketing decision.
          </p>
        </div>
        <div className="abProcessGrid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rcSection abExperienceSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">What the Engine lets you do</p>
            <h2>Work with the audience from reaction to recommendation.</h2>
          </div>
          <p>
            Each part of the experience exposes a different part of the same audience model.
          </p>
        </div>
        <div className="abExperienceGrid">
          {experiences.map((item) => (
            <a className="abExperienceCard" href={item.href} key={item.id}>
              <SectionIcon id={item.id} size={36} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="abCardArrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="rcSection abPrototypeSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">Inside this prototype</p>
            <h2>24 synthetic people represent six parts of the China energy decision system.</h2>
          </div>
          <p>
            Each person is built from structured audience fields covering what shapes their view,
            what proof they need and how they affect the people around them.
          </p>
        </div>

        <div className="abRoleGrid">
          {roles.map(([name, text]) => (
            <article key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="abPrototypeNote">
          <strong>How reactions are produced in this demo</strong>
          <p>
            The reactions are prepared from the persona data and the tested message versions.
            They should be read as directional scenario outputs, never as quotes or survey
            responses from real individuals.
          </p>
        </div>
      </section>

      <section className="rcSection abReadingSection">
        <p className="abKicker">How to read the output</p>
        <h2>Use the room to find patterns, tensions and the next problem to solve.</h2>
        <div className="abTwo abBoundaryGrid">
          <div className="abText">
            <h3>Useful for</h3>
            <ul>
              <li>Seeing who leans in, doubts the message or tunes out.</li>
              <li>Understanding the proof different groups need.</li>
              <li>Finding where a message stalls as it moves through a decision.</li>
              <li>Comparing alternative message directions.</li>
              <li>Building a clearer sequence for the campaign.</li>
            </ul>
          </div>
          <div className="abText">
            <h3>Validate with real audiences when</h3>
            <ul>
              <li>You need population estimates or percentages.</li>
              <li>You need to predict individual behaviour.</li>
              <li>You are testing a direction outside the evidence loaded into the model.</li>
              <li>You need to validate finished creative before launch.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rcOnward abOnward">
        <p className="abKicker">See it in practice</p>
        <h2>Go back into the audience.</h2>
        <div className="nextSteps onDark">
          <a className="nextLink primary" href="/">
            Go to the room
          </a>
          <a className="nextLink" href="/ask">
            Ask the room
          </a>
          <a className="nextLink" href="/recommendation">
            See the recommendation
          </a>
        </div>
      </section>

      <footer className="rcFoot">
        <p>Synthetic Audiences is an early prototype of the McCann Audience Truth Engine.</p>
        <McCannCredit />
      </footer>
    </main>
  );
}
