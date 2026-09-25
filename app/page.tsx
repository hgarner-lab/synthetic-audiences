"use client";

import { useMemo, useState } from "react";
import { personas, Persona, segments } from "@/data/personas";
import { journeySteps } from "@/data/journey";
import { audienceQuestions, defaultResponderIds, AudienceResponseFixture } from "@/data/questions";

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

function AskTheRoom({
  onOpenPersona,
}: {
  onOpenPersona: (persona: Persona) => void;
}) {
  const [input, setInput] = useState("");
  const [askedPrompt, setAskedPrompt] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const [responses, setResponses] = useState<AudienceResponseFixture[]>([]);
  const [takeaway, setTakeaway] = useState("");

  const synthesizeCustomResponses = (): AudienceResponseFixture[] =>
    defaultResponderIds.flatMap((personaId) => {
      const persona = personas.find((person) => person.id === personaId);

      if (!persona) {
        return [];
      }

      let response = "";
      if (persona.influenceRole === "validate") {
        response =
          `Before I could answer that confidently, I would need ${persona.needs
            .slice(0, 2)
            .join(" and ")
            .toLowerCase()}. That is the threshold for me to treat the proposition as credible.`;
      } else if (persona.influenceRole === "block") {
        response =
          `I would test that first against ${persona.lens[0].toLowerCase()}. Show me ${persona.needs[0].toLowerCase()} before asking me to support the claim.`;
      } else if (persona.influenceRole === "amplify") {
        response =
          `I would need a reason to carry that idea forward — especially ${persona.needs
            .slice(0, 2)
            .join(" and ")
            .toLowerCase()}.`;
      } else {
        response =
          `I would translate that question into ${persona.lens
            .slice(0, 2)
            .join(" and ")
            .toLowerCase()}. Give me ${persona.needs[0].toLowerCase()} and I can make it strategically useful.`;
      }

      return [
        {
          personaId,
          response,
          theme: roleLabels[persona.influenceRole],
          evidence: persona.needs,
        },
      ];
    });

  const findClosestQuestion = (prompt: string) => {
    const lower = prompt.toLowerCase();

    if (/believ|credib|trust|proof/.test(lower)) {
      return audienceQuestions.find((question) => question.id === "believe");
    }

    if (/worr|risk|concern|problem|danger/.test(lower)) {
      return audienceQuestions.find((question) => question.id === "worry");
    }

    if (/lead|start|first|headline|message/.test(lower)) {
      return audienceQuestions.find((question) => question.id === "lead");
    }

    if (/missing|lack|need|gap/.test(lower)) {
      return audienceQuestions.find((question) => question.id === "missing");
    }

    return undefined;
  };

  const askQuestion = (prompt: string, suggestionId?: string) => {
    const cleanPrompt = prompt.trim();

    if (!cleanPrompt) {
      return;
    }

    const matched = suggestionId
      ? audienceQuestions.find((question) => question.id === suggestionId)
      : findClosestQuestion(cleanPrompt);

    setAskedPrompt(cleanPrompt);
    setActiveSuggestion(suggestionId ?? matched?.id ?? null);

    if (matched) {
      setResponses(matched.responses);
      setTakeaway(matched.takeaway);
    } else {
      setResponses(synthesizeCustomResponses());
      setTakeaway(
        "Different parts of the audience pull this question toward proof, risk, strategic value and local relevance. The disagreement is useful: it shows which tensions the campaign needs to resolve."
      );
    }
  };

  return (
    <section className="askRoomSection">
      <div className="askRoomHeader">
        <div>
          <p className="sectionNumber">04 — ASK THE ROOM</p>
          <h2>Don’t read a persona. Ask your audience.</h2>
        </div>
        <p>
          Put one question to the decision system and see how different people interpret it.
          Responses stay separate so disagreement remains visible.
        </p>
      </div>

      <div className="suggestedQuestions">
        {audienceQuestions.map((question) => (
          <button
            key={question.id}
            className={activeSuggestion === question.id ? "questionChip active" : "questionChip"}
            onClick={() => {
              setInput(question.prompt);
              askQuestion(question.prompt, question.id);
            }}
          >
            {question.prompt}
          </button>
        ))}
      </div>

      <div className="askComposer">
        <div className="composerLabel">
          <span>Ask the room</span>
          <small>Prototype synthesis from the loaded persona model</small>
        </div>
        <div className="composerInputRow">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                askQuestion(input);
              }
            }}
            placeholder="What would make this proposition more relevant?"
            aria-label="Ask the synthetic audience a question"
          />
          <button onClick={() => askQuestion(input)} disabled={!input.trim()}>
            Ask <span>→</span>
          </button>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className="roomWaiting">
          <div className="waitingFaces" aria-hidden="true">
            {personas.slice(0, 12).map((persona) => (
              <span key={persona.id} className={`waitingFace role-${persona.influenceRole}`}>
                {persona.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
            ))}
          </div>
          <div>
            <span>The room is listening</span>
            <p>
              Choose a question above or ask your own. The product will surface distinct
              perspectives rather than collapse the audience into one answer.
            </p>
          </div>
        </div>
      ) : (
        <div className="roomResponseStage">
          <div className="responseStageTop">
            <div>
              <span className="responseKicker">You asked</span>
              <h3>“{askedPrompt}”</h3>
            </div>
            <div className="responseCount">
              <strong>{responses.length}</strong>
              <span>perspectives surfaced</span>
            </div>
          </div>

          <div className="roomTakeaway">
            <span>What the room is telling you</span>
            <p>{takeaway}</p>
            <small>No average score. The disagreement is part of the signal.</small>
          </div>

          <div className="responseGrid">
            {responses.map((answer, index) => {
              const persona = personas.find((person) => person.id === answer.personaId);

              if (!persona) {
                return null;
              }

              return (
                <article
                  className="responseCard"
                  key={answer.personaId}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="responsePerson">
                    <button
                      className="miniPortraitButton"
                      onClick={() => onOpenPersona(persona)}
                      aria-label={`Open ${persona.name} persona`}
                    >
                      <Portrait persona={persona} />
                    </button>
                    <div>
                      <button className="responseName" onClick={() => onOpenPersona(persona)}>
                        {persona.name}
                      </button>
                      <span>{persona.role}</span>
                      <em>{answer.theme}</em>
                    </div>
                  </div>

                  <blockquote>“{answer.response}”</blockquote>

                  <details className="responseEvidence">
                    <summary>Why this answer?</summary>
                    <div>
                      <span>Grounded in persona needs</span>
                      <div className="responseEvidenceChips">
                        {answer.evidence.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                      <p>{persona.internalThought}</p>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>

          <p className="responseMethodNote">
            These are synthetic, directional responses generated from the loaded persona fields
            and scenario logic. They are not quotations, survey responses or observed behaviour
            from real individuals.
          </p>
        </div>
      )}
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

      <GuidedJourney onOpenPersona={setSelected} />\n\n      <AskTheRoom onOpenPersona={setSelected} />\n\n      <section className="communitySection" id="community">
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
