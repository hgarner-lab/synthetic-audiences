"use client";

import { useMemo, useState } from "react";
import { personas, Persona, segments } from "@/data/personas";
import { journeySteps } from "@/data/journey";

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
    <div
      className={`portrait ${large ? "portraitLarge" : ""} role-${persona.influenceRole}`}
      aria-hidden="true"
    >
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
                <span className="softChip" key={item}>
                  {item}
                </span>
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
            {persona.influenceRole === "validate" &&
              "Can confer credibility when the evidence meets their threshold."}
            {persona.influenceRole === "block" &&
              "Can increase scrutiny and raise the proof threshold for others."}
            {persona.influenceRole === "amplify" &&
              "Can carry a credible idea into wider professional networks."}
            {persona.influenceRole === "reframe" &&
              "Can change what the proposition means once it enters the decision system."}
          </p>
        </div>

        <details className="evidenceDetails">
          <summary>Why we think this</summary>
          <div>
            <p className="eyebrow">Underlying persona signal</p>
            <p>{persona.internalThought}</p>
            <p className="methodNote">
              This is a synthetic, directional representation derived from the loaded persona
              data. It is not a quote or observed behaviour from a real individual.
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
          Start with the job the campaign has to do. We’ll show you the people who shape the
          decision, what they need from you, and what that means for the work.
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

function GuidedJourney({
  onOpenPersona,
}: {
  onOpenPersona: (persona: Persona) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxRevealed, setMaxRevealed] = useState(0);

  const activeStep = journeySteps[currentStep];
  const activePersona = personas.find((persona) => persona.id === activeStep.personaId);
  const isLastStep = currentStep === journeySteps.length - 1;

  if (!activePersona) {
    return null;
  }

  const goNext = () => {
    if (isLastStep) {
      document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxRevealed((value) => Math.max(value, nextStep));
  };

  return (
    <section className="journeySection">
      <div className="journeyHeader">
        <div>
          <p className="sectionNumber lightSectionNumber">03 — FOLLOW THE DECISION</p>
          <h2>See who enters the conversation — and why.</h2>
        </div>
        <p className="journeyMethod">
          A plausible decision path assembled from the current persona model. It is a strategic
          scenario, not an observed buying sequence.
        </p>
      </div>

      <div className="journeyProgress" aria-label="Decision journey progress">
        {journeySteps.map((step, index) => {
          const persona = personas.find((person) => person.id === step.personaId);
          const isAvailable = index <= maxRevealed;
          const isCurrent = index === currentStep;

          return (
            <button
              key={step.personaId}
              className={`journeyProgressStep ${isCurrent ? "current" : ""} ${
                isAvailable ? "available" : "locked"
              }`}
              onClick={() => isAvailable && setCurrentStep(index)}
              disabled={!isAvailable}
            >
              <span className="progressNumber">0{index + 1}</span>
              <span className="progressPerson">{persona?.name ?? "Audience member"}</span>
              <span className="progressStage">{step.stage}</span>
            </button>
          );
        })}
      </div>

      <div className="journeyWorkspace">
        <article className="journeyEncounter" key={activeStep.personaId}>
          <div className="journeyPortraitColumn">
            <Portrait persona={activePersona} large />
            <button className="profileLink" onClick={() => onOpenPersona(activePersona)}>
              Explore full persona →
            </button>
          </div>

          <div className="journeyEncounterCopy">
            <div className="arrivalLine">
              <span>Why they enter now</span>
              <p>{activeStep.arrival}</p>
            </div>

            <div className="personaIdentity">
              <span className="syntheticBadge darkBadge">Synthetic persona</span>
              <span className={`rolePill rolePill-${activePersona.influenceRole}`}>
                {roleLabels[activePersona.influenceRole]}
              </span>
              <h3>{activePersona.name}</h3>
              <p>{activePersona.role}</p>
            </div>

            <blockquote>“{activeStep.question}”</blockquote>

            <div className="journeyInterpretation">
              <span>What this means for the campaign</span>
              <p>{activeStep.interpretation}</p>
            </div>

            <div className="journeyEvidence">
              <span>Grounded in persona needs</span>
              <div className="journeyEvidenceChips">
                {activePersona.needs.map((need) => (
                  <span key={need}>{need}</span>
                ))}
              </div>
            </div>

            <div className="journeyControls">
              <button
                className="secondaryJourneyButton"
                onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                disabled={currentStep === 0}
              >
                ← Previous
              </button>
              <button className="journeyNextButton" onClick={goNext}>
                {isLastStep ? "Explore the wider room" : "Bring in the next voice"}
                <span>→</span>
              </button>
            </div>
          </div>
        </article>

        <aside className="blueprintRail">
          <div className="blueprintRailHeader">
            <span>LIVE CAMPAIGN BLUEPRINT</span>
            <strong>{maxRevealed + 1}/4 requirements surfaced</strong>
          </div>

          <div className="blueprintItems">
            {journeySteps.map((step, index) => {
              const revealed = index <= maxRevealed;
              const active = index === currentStep;
              const persona = personas.find((person) => person.id === step.personaId);

              return (
                <div
                  key={step.requirement.title}
                  className={`blueprintItem ${revealed ? "revealed" : "unrevealed"} ${
                    active ? "activeBlueprint" : ""
                  }`}
                >
                  <div className="blueprintItemTop">
                    <span>0{index + 1}</span>
                    {revealed && <em>From {persona?.name}</em>}
                  </div>
                  {revealed ? (
                    <>
                      <h4>{step.requirement.title}</h4>
                      <p>{step.requirement.description}</p>
                      <div className="blueprintEvidence">
                        {step.requirement.evidence.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>Requirement not yet surfaced</h4>
                      <p>Continue through the decision system to reveal the next pressure on the campaign.</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {maxRevealed === journeySteps.length - 1 && (
            <div className="blueprintComplete">
              <span>Blueprint taking shape</span>
              <p>
                Four distinct audience needs now define what the campaign has to solve before
                execution begins.
              </p>
            </div>
          )}
        </aside>
      </div>
    </section>
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
    () => (activeSegment === "All" ? personas : personas.filter((p) => p.segment === activeSegment)),
    [activeSegment]
  );

  return (
    <main className="roomPage">
      <header className="roomHeader">
        <button className="brandButton" onClick={onReset}>
          SYNTHETIC AUDIENCES
        </button>
        <div className="headerContext">
          <span>{objective}</span>
          <span>China</span>
          <button className="quietButton" onClick={onReset}>
            Change challenge
          </button>
        </div>
      </header>

      <section className="roomIntro">
        <div>
          <p className="sectionNumber">02 — THE DECISION ROOM</p>
          <h1>24 people. Six communities. One decision.</h1>
        </div>
        <div className="roomPropositionWrap">
          <span>Your proposition</span>
          <p className="roomProposition">{proposition}</p>
        </div>
      </section>

      <GuidedJourney onOpenPersona={setSelected} />

      <section className="communitySection" id="community">
        <div className="communityHeader">
          <div>
            <p className="eyebrow">Free explore</p>
            <h2>The wider decision system</h2>
            <p className="communityIntroCopy">
              The guided path is only one way through the audience. Explore any persona to see the
              other pressures, proof needs and influence roles around the decision.
            </p>
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
          Synthetic personas are directional representations built from the loaded audience
          dataset. They are designed to make structured audience evidence easier to explore, not
          to impersonate real people.
        </p>
        <button className="textButton">How this audience is built →</button>
      </footer>

      {selected && <PersonaPanel persona={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

export default function Home() {
  const [challenge, setChallenge] = useState<{
    objective: string;
    proposition: string;
  } | null>(null);

  if (!challenge) {
    return (
      <Challenge
        onEnter={(objective, proposition) => setChallenge({ objective, proposition })}
      />
    );
  }

  return (
    <DecisionRoom
      objective={challenge.objective}
      proposition={challenge.proposition}
      onReset={() => setChallenge(null)}
    />
  );
}
