"use client";

import { useMemo, useState } from "react";
import { featuredPersonas, personas, Persona, segments } from "@/data/personas";

const objectives = [
  "Build awareness",
  "Change perception",
  "Create consideration",
  "Support a buying decision",
  "Build advocacy",
];

const roleLabels = {
  validate: "Validator",
  block: "Blocker",
  amplify: "Amplifier",
  reframe: "Reframer",
};

function Portrait({ persona, large = false }: { persona: Persona; large?: boolean }) {
  const initials = persona.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className={`portrait ${large ? "portraitLarge" : ""} role-${persona.influenceRole}`} aria-hidden="true">
      <div className="portraitGlow" />
      <div className="portraitFigure">
        <div className="portraitHead" />
        <div className="portraitShoulders" />
      </div>
      <span className="portraitInitials">{initials}</span>
    </div>
  );
}

function PersonaPanel({
  persona,
  onClose,
}: {
  persona: Persona;
  onClose: () => void;
}) {
  return (
    <div className="panelBackdrop" onClick={onClose}>
      <aside className="personaPanel" onClick={(event) => event.stopPropagation()}>
        <button className="closeButton" onClick={onClose} aria-label="Close persona">
          ×
        </button>
        <div className="panelTop">
          <Portrait persona={persona} large />
          <div>
            <span className="syntheticBadge">Synthetic persona</span>
            <h2>{persona.name}</h2>
            <p className="panelRole">{persona.role}</p>
            <p className="panelMeta">{persona.segment} · China</p>
          </div>
        </div>

        <div className="likelyQuestion">
          <span>Likely response</span>
          <strong>{persona.action}</strong>
          <p>{persona.actionDetail}</p>
        </div>

        <div className="panelGrid">
          <section>
            <p className="eyebrow">What shapes their view</p>
            <div className="chipRow">
              {persona.lens.map((item) => (
                <span className="softChip" key={item}>{item}</span>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow">What they need from you</p>
            <ul className="needList">
              {persona.needs.map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="influenceCard">
          <div>
            <span className={`rolePill rolePill-${persona.influenceRole}`}>
              {roleLabels[persona.influenceRole]}
            </span>
            <strong>How {persona.name.split(" ")[0]} affects the room</strong>
          </div>
          <p>
            {persona.influenceRole === "validate" && "Can confer credibility when the evidence meets their threshold."}
            {persona.influenceRole === "block" && "Can increase scrutiny and raise the proof threshold for others."}
            {persona.influenceRole === "amplify" && "Can carry a credible idea into wider professional networks."}
            {persona.influenceRole === "reframe" && "Can change what the proposition means once it enters the decision system."}
          </p>
        </div>

        <details className="evidenceDetails">
          <summary>Why we think this</summary>
          <div>
            <p className="eyebrow">Underlying persona signal</p>
            <p>{persona.internalThought}</p>
            <p className="methodNote">
              This is a synthetic, directional representation derived from the loaded persona data. It is not a quote or observed behaviour from a real individual.
            </p>
          </div>
        </details>
      </aside>
    </div>
  );
}

function Challenge({
  onEnter,
}: {
  onEnter: (objective: string, proposition: string) => void;
}) {
  const [objective, setObjective] = useState("Create consideration");
  const [proposition, setProposition] = useState(
    "See Aramco's lower-carbon crude as a meaningful source of long-term commercial advantage."
  );

  return (
    <main className="challengePage">
      <div className="topBar">
        <span className="brandMark">SYNTHETIC AUDIENCES</span>
        <span className="prototypeTag">Prototype · China</span>
      </div>

      <section className="challengeHero">
        <p className="sectionNumber">01 — SET THE CHALLENGE</p>
        <h1>Meet the people your campaign needs to convince.</h1>
        <p className="heroSub">
          Start with the job the campaign has to do. We’ll show you the people who shape the decision, what they need from you, and what that means for the work.
        </p>

        <div className="challengeForm">
          <fieldset>
            <legend>What are you trying to achieve?</legend>
            <div className="objectiveGrid">
              {objectives.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={objective === item ? "objectiveCard selected" : "objectiveCard"}
                  onClick={() => setObjective(item)}
                >
                  <span>{item}</span>
                  <span className="selectionDot" />
                </button>
              ))}
            </div>
          </fieldset>

          <label className="propositionField">
            <span>What do you want the audience to believe or do differently?</span>
            <textarea
              value={proposition}
              onChange={(event) => setProposition(event.target.value)}
              rows={3}
            />
          </label>

          <div className="contextRow">
            <div>
              <span className="eyebrow">Market</span>
              <strong>China</strong>
            </div>
            <div>
              <span className="eyebrow">Loaded community</span>
              <strong>Energy & industrial decision system</strong>
            </div>
            <div>
              <span className="eyebrow">Audience model</span>
              <strong>24 synthetic personas</strong>
            </div>
          </div>

          <button
            className="primaryButton"
            onClick={() => onEnter(objective, proposition)}
            disabled={!proposition.trim()}
          >
            Enter the audience <span>↗</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function DecisionRoom({
  objective,
  proposition,
  onReset,
}: {
  objective: string;
  proposition: string;
  onReset: () => void;
}) {
  const [selected, setSelected] = useState<Persona | null>(null);
  const [activeSegment, setActiveSegment] = useState<string>("All");

  const visiblePeople = useMemo(
    () => activeSegment === "All" ? personas : personas.filter((p) => p.segment === activeSegment),
    [activeSegment]
  );

  return (
    <main className="roomPage">
      <header className="roomHeader">
        <button className="brandButton" onClick={onReset}>SYNTHETIC AUDIENCES</button>
        <div className="headerContext">
          <span>{objective}</span>
          <span>China</span>
          <button className="quietButton" onClick={onReset}>Change challenge</button>
        </div>
      </header>

      <section className="roomIntro">
        <div>
          <p className="sectionNumber">02 — THE DECISION ROOM</p>
          <h1>24 people. Six communities. One decision.</h1>
        </div>
        <p className="roomProposition">{proposition}</p>
      </section>

      <section className="featuredStrip">
        <div className="stripCopy">
          <p className="eyebrow">Start here</p>
          <h2>Four people are especially important to this objective.</h2>
          <p>
            They represent different pressures on whether the idea is understood, believed and carried forward.
          </p>
        </div>
        <div className="featuredPeople">
          {featuredPersonas.map((persona, index) => (
            <button
              key={persona.id}
              className="featuredPerson"
              onClick={() => setSelected(persona)}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <Portrait persona={persona} />
              <span className="featuredIndex">0{index + 1}</span>
              <strong>{persona.name}</strong>
              <span>{persona.role}</span>
              <em>{roleLabels[persona.influenceRole]}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="communitySection">
        <div className="communityHeader">
          <div>
            <p className="eyebrow">Explore the room</p>
            <h2>The wider decision system</h2>
          </div>
          <div className="segmentFilters">
            <button
              className={activeSegment === "All" ? "filter active" : "filter"}
              onClick={() => setActiveSegment("All")}
            >
              All 24
            </button>
            {segments.map((segment) => (
              <button
                key={segment}
                className={activeSegment === segment ? "filter active" : "filter"}
                onClick={() => setActiveSegment(segment)}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>

        <div className="peopleGrid">
          {visiblePeople.map((persona, index) => (
            <button
              className={persona.featured ? "personTile featuredTile" : "personTile"}
              key={persona.id}
              onClick={() => setSelected(persona)}
              style={{ animationDelay: `${Math.min(index * 25, 350)}ms` }}
            >
              <Portrait persona={persona} />
              <div className="personCopy">
                <div className="personNameRow">
                  <strong>{persona.name}</strong>
                  <span className={`miniRole miniRole-${persona.influenceRole}`} />
                </div>
                <span>{persona.role}</span>
                <small>{persona.segment}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="roomFooter">
        <p>
          Synthetic personas are directional representations built from the loaded audience dataset. They are designed to make structured audience evidence easier to explore, not to impersonate real people.
        </p>
        <button className="textButton">How this audience is built →</button>
      </footer>

      {selected && <PersonaPanel persona={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

export default function Home() {
  const [challenge, setChallenge] = useState<{ objective: string; proposition: string } | null>(null);

  if (!challenge) {
    return <Challenge onEnter={(objective, proposition) => setChallenge({ objective, proposition })} />;
  }

  return (
    <DecisionRoom
      objective={challenge.objective}
      proposition={challenge.proposition}
      onReset={() => setChallenge(null)}
    />
  );
}
