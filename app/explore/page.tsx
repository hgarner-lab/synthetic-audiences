"use client";

import { useEffect, useMemo, useState } from "react";
import { personas, Persona, segments } from "@/data/personas";
import { journeySteps } from "@/data/journey";
import { audienceQuestions, defaultResponderIds, AudienceResponseFixture } from "@/data/questions";
import { ideaOptions, IdeaOption, IdeaShiftDirection } from "@/data/ideas";
import { originalMessage } from "@/data/reactions";
import { Face } from "@/components/Face";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import { SectionTag } from "@/components/Sections";

const objectives = [
  "Get noticed",
  "Change what people think",
  "Get people considering us",
  "Help people decide to buy",
  "Get people recommending us",
];

// "Independent certification" -> "checked by an independent body", keeping words like "Chinese" as they are.
function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function listOf(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const defaultObjective = "Get people considering us";
const defaultProposition = originalMessage.proposition;

const actionLabels: Record<Persona["action"], string> = {
  Agree: "Leaning in",
  Skeptical: "Not convinced",
  Ignore: "Tuning out",
};

const roleLabels = {
  validate: "Checker",
  block: "Gatekeeper",
  amplify: "Spreader",
  reframe: "Reshaper",
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
      <div className="portraitFace">
        <Face id={persona.id} mood="waiting" size={large ? 200 : 120} />
      </div>
      <span className="portraitInitials">{initials}</span>
    </div>
  );
}

function PersonaPanel({
  persona,
  onClose,
  onAsk,
}: {
  persona: Persona;
  onClose: () => void;
  onAsk: () => void;
}) {
  return (
    <div className="panelBackdrop" onClick={onClose}>
      <aside className="personaPanel" onClick={(event) => event.stopPropagation()}>
        <button className="closeButton" onClick={onClose} aria-label="Close profile">
          ×
        </button>
        <div className="panelTop">
          <Portrait persona={persona} large />
          <div>
            <span className="syntheticBadge">Synthetic person</span>
            <h2>{persona.name}</h2>
            <p className="panelNameZh" lang="zh-Hans">{persona.nameZh}</p>
            <p className="panelRole">{persona.role}</p>
            <p className="panelMeta">{persona.segment} · China</p>
          </div>
        </div>

        <div className="likelyQuestion">
          <span>First reaction</span>
          <strong>{actionLabels[persona.action]}</strong>
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
            <strong>How {persona.name} affects the room</strong>
          </div>
          <p>
            {persona.influenceRole === "validate" &&
              "Once the proof is good enough for them, others will trust it too."}
            {persona.influenceRole === "block" &&
              "Can slow things down, and makes others ask for more proof."}
            {persona.influenceRole === "amplify" &&
              "Can pass a good idea on to a wide network of people."}
            {persona.influenceRole === "reframe" &&
              "Can change what the message means as it gets passed around."}
          </p>
        </div>

        <details className="evidenceDetails">
          <summary>Why we think this</summary>
          <div>
            <p className="eyebrow">What's behind their view</p>
            <p>{persona.internalThought}</p>
            <p className="methodNote">
              This person is synthetic: made up, but built from our audience data. This isn't a
              quote from a real person, or a record of anything someone did.
            </p>
          </div>
        </details>

        <div className="nextSteps">
          <a className="nextLink primary" href={`/?person=${persona.id}`}>
            Hear {persona.name}&rsquo;s reaction in the room
          </a>
          <button className="nextLink" onClick={onAsk}>
            Ask the room a question
          </button>
        </div>
      </aside>
    </div>
  );
}

function Challenge({
  onEnter,
}: {
  onEnter: (objective: string, proposition: string) => void;
}) {
  const [objective, setObjective] = useState(defaultObjective);
  const proposition = defaultProposition;

  return (
    <main className="challengePage">
      <div className="topBar">
        <BrandLockup />
        <a className="prototypeTag" href="/">
          ← Back to the room
        </a>
      </div>

      <section className="challengeHero">
        <p className="sectionNumber">01 — YOUR CHALLENGE</p>
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

          <div className="propositionField">
            <span>What do you want the audience to believe or do differently?</span>
            <p className="lockedMessage">{proposition}</p>
            <small className="lockedNote">
              This demo is set up for one campaign message, so you can&rsquo;t change it here. You can
              try four other versions of it later on.
            </small>
          </div>

          <div className="contextRow">
            <div>
              <span className="eyebrow">Market</span>
              <strong>China</strong>
            </div>
            <div>
              <span className="eyebrow">Audience</span>
              <strong>Energy and industry decision-makers</strong>
            </div>
            <div>
              <span className="eyebrow">People</span>
              <strong>24 synthetic people</strong>
            </div>
          </div>

          <button
            className="primaryButton"
            onClick={() => onEnter(objective, proposition)}
            disabled={!proposition.trim()}
          >
            Meet the audience <span>↗</span>
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
      document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxRevealed((value) => Math.max(value, nextStep));
  };

  return (
    <section className="journeySection" id="journey">
      <div className="journeyHeader">
        <div>
          <SectionTag id="journey" number="03" />
          <h2>See who gets involved, and why.</h2>
        </div>
        <p className="journeyMethod">
          A likely path this decision could take, based on our audience data. Use it as an informed
          example of how the decision might unfold.
        </p>
      </div>

      <div className="journeyProgress" aria-label="Walkthrough progress">
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
              See full profile →
            </button>
          </div>

          <div className="journeyEncounterCopy">
            <div className="arrivalLine">
              <span>Why they get involved now</span>
              <p>{activeStep.arrival}</p>
            </div>

            <div className="personaIdentity">
              <span className="syntheticBadge darkBadge">Synthetic person</span>
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
              <span>What they need</span>
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
                {isLastStep ? "Next: ask the room a question" : "Next person"}
                <span>→</span>
              </button>
            </div>
          </div>
        </article>

        <aside className="blueprintRail">
          <div className="blueprintRailHeader">
            <span>WHAT YOUR CAMPAIGN NEEDS</span>
            <strong>{maxRevealed + 1} of 4 found</strong>
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
                      <h4>Not found yet</h4>
                      <p>Meet the next person to find out what else the campaign needs.</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {maxRevealed === journeySteps.length - 1 && (
            <div className="blueprintComplete">
              <span>Your list is complete</span>
              <p>
                These are the four things the campaign needs to get right before any creative work
                starts.
              </p>
              <a className="blueprintLink" href="/recommendation">
                See the full recommendation →
              </a>
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
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);

  const showAnswer = (personaId: string) => {
    setActiveAnswer(personaId);
    document.getElementById(`answer-${personaId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const [takeaway, setTakeaway] = useState("");

  const synthesizeCustomResponses = (): AudienceResponseFixture[] =>
    defaultResponderIds.flatMap((personaId) => {
      const persona = personas.find((person) => person.id === personaId);

      if (!persona) {
        return [];
      }

      const cares = persona.lens.slice(0, 2).map(lowerFirst).join(" and ");
      const needs = listOf(persona.needs.map(lowerFirst));
      const response = `What matters most to me is ${cares}. Before I'd back anything, I'd want to see ${needs}.`;

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
    setActiveAnswer(null);
    setActiveSuggestion(suggestionId ?? matched?.id ?? null);

    if (matched) {
      setResponses(matched.responses);
      setTakeaway(matched.takeaway);
    } else {
      setResponses(synthesizeCustomResponses());
      setTakeaway(
        "We haven't prepared answers to that exact question yet. Here's what each of these people cares about and needs to see, which is a good guide to how they'd answer."
      );
    }
  };

  return (
    <section className="askRoomSection" id="ask">
      <div className="askRoomHeader">
        <div>
          <SectionTag id="ask" number="04" />
          <h2>Don’t just read about your audience. Ask them.</h2>
        </div>
        <p>
          Ask one question and hear how different people answer it. Answers stay separate, so you
          can see where they disagree.
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
          <small>Answers are built from our audience data</small>
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
            placeholder="What would make this message more relevant to you?"
            aria-label="Ask the audience a question"
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
                <Face id={persona.id} mood="waiting" size={96} />
              </span>
            ))}
          </div>
          <div>
            <span>The room is listening</span>
            <p>
              Pick a question above or ask your own. You&rsquo;ll hear from several people, each in
              their own words.
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
              <span>people answered</span>
            </div>
          </div>

          <AskRoomGrid key={askedPrompt} responses={responses} onPick={showAnswer} />
          <p className="askHint">Tap a lit-up face to read that person&rsquo;s answer.</p>

          <div className="roomTakeaway">
            <span>What the room is telling you</span>
            <p>{takeaway}</p>
            <small>There&rsquo;s no average score. Where people disagree is useful to know.</small>
          </div>

          <div className="responseGrid">
            {responses.map((answer, index) => {
              const persona = personas.find((person) => person.id === answer.personaId);

              if (!persona) {
                return null;
              }

              return (
                <article
                  className={activeAnswer === answer.personaId ? "responseCard isActive" : "responseCard"}
                  id={`answer-${answer.personaId}`}
                  key={answer.personaId}
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="responsePerson">
                    <button
                      className="miniPortraitButton"
                      onClick={() => onOpenPersona(persona)}
                      aria-label={`Open ${persona.name}'s profile`}
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
                      <span>What they need</span>
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
            These answers come from synthetic people built from our audience data. They are not
            quotes, survey answers or the behaviour of real people.
          </p>

          <div className="nextSteps">
            <span>Next</span>
            <button
              className="nextLink primary"
              onClick={() => document.getElementById("try")?.scrollIntoView({ behavior: "smooth" })}
            >
              Try a different version of the message →
            </button>
            <a className="nextLink" href="/recommendation">
              See the recommendation
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

// The whole room when a question is asked: the people answering light up with a
// short speech bubble, everyone else fades back. Colour here marks who is speaking,
// since answers to a question aren't a verdict.
const askRoles: Persona["influenceRole"][] = ["validate", "block", "amplify", "reframe"];

function AskRoomGrid({
  responses,
  onPick,
}: {
  responses: AudienceResponseFixture[];
  onPick: (personaId: string) => void;
}) {
  const answering = new Map(responses.map((answer, index) => [answer.personaId, { answer, index }]));
  return (
    <div className="askGrid" role="group" aria-label="Who answered">
      {askRoles.flatMap((role) =>
        segments.map((segment) => {
          const person = personas.find((p) => p.segment === segment && p.influenceRole === role)!;
          const speaking = answering.get(person.id);
          return speaking ? (
            <button
              key={person.id}
              className="askSeat speaking"
              style={{ animationDelay: `${speaking.index * 120}ms` } as React.CSSProperties}
              onClick={() => onPick(person.id)}
              aria-label={`${person.name}: ${speaking.answer.theme}. Show full answer`}
            >
              <span className="askFace">
                <Face id={person.id} mood="waiting" size={64} />
              </span>
              <span className="askBubble">{speaking.answer.theme}</span>
              <span className="askName">{person.name}</span>
            </button>
          ) : (
            <span key={person.id} className="askSeat quiet" aria-hidden="true">
              <span className="askFace">
                <Face id={person.id} mood="waiting" size={64} />
              </span>
            </span>
          );
        })
      )}
    </div>
  );
}

function TryAnIdea({
  currentProposition,
  onOpenPersona,
  onApply,
}: {
  currentProposition: string;
  onOpenPersona: (persona: Persona) => void;
  onApply: (idea: IdeaOption) => void;
}) {
  const [draft, setDraft] = useState("");
  const [selectedIdea, setSelectedIdea] = useState<IdeaOption | null>(null);
  const [testedIdea, setTestedIdea] = useState<IdeaOption | null>(null);
  const [appliedIdea, setAppliedIdea] = useState<IdeaOption | null>(null);
  const [customNotice, setCustomNotice] = useState("");

  const shiftLabels: Record<IdeaShiftDirection, string> = {
    "more-resolved": "Won over",
    "still-unresolved": "Still not convinced",
    "new-tension": "New concern",
  };

  const chooseIdea = (idea: IdeaOption) => {
    setSelectedIdea(idea);
    setDraft(idea.proposition);
    setTestedIdea(null);
    setAppliedIdea(null);
    setCustomNotice("");
  };

  const matchCustomIdea = (text: string) => {
    const lower = text.toLowerCase();

    if (/resilien|security|supply/.test(lower)) {
      return ideaOptions.find((idea) => idea.id === "resilience");
    }

    if (/proof|assur|verify|method|credib|evidence/.test(lower)) {
      return ideaOptions.find((idea) => idea.id === "proof");
    }

    if (/econom|commercial|value|return|capital|finance/.test(lower)) {
      return ideaOptions.find((idea) => idea.id === "economics");
    }

    if (/china|partner|customer|local|refinery case/.test(lower)) {
      return ideaOptions.find((idea) => idea.id === "local-proof");
    }

    return undefined;
  };

  const runTest = () => {
    const clean = draft.trim();

    if (!clean) {
      return;
    }

    const matched =
      selectedIdea && clean === selectedIdea.proposition
        ? selectedIdea
        : matchCustomIdea(clean);

    if (!matched) {
      setTestedIdea(null);
      setAppliedIdea(null);
      setCustomNotice(
        "We can't test your own wording yet. This early version only has reactions for the four versions above, and we'd rather show nothing than make something up."
      );
      return;
    }

    setSelectedIdea(matched);
    setTestedIdea(matched);
    setAppliedIdea(null);
    setCustomNotice("");
  };

  return (
    <section className="tryIdeaSection" id="try">
      <div className="tryIdeaHeader">
        <div>
          <SectionTag id="try" number="05" />
          <h2>Change the story. Put it back into the room.</h2>
        </div>
        <p>
          Rewrite the message, try it on the same people, and see who changes their mind and who
          doesn&rsquo;t.
        </p>
      </div>

      <div className="ideaHypotheses">
        {ideaOptions.map((idea) => (
          <button
            key={idea.id}
            className={selectedIdea?.id === idea.id ? "ideaHypothesis active" : "ideaHypothesis"}
            onClick={() => chooseIdea(idea)}
          >
            <span>{idea.label}</span>
            <p>{idea.description}</p>
          </button>
        ))}
      </div>

      <div className="ideaCompare">
        <div className="compareColumn currentRoute">
          <span>Current message</span>
          <p>{currentProposition}</p>
        </div>
        <div className="compareArrow" aria-hidden="true">→</div>
        <div className="compareColumn testRoute">
          <div className="compareColumnTop">
            <span>New version</span>
            {selectedIdea && <em>{selectedIdea.label}</em>}
          </div>
          <textarea
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setSelectedIdea(null);
              setTestedIdea(null);
              setAppliedIdea(null);
              setCustomNotice("");
            }}
            rows={5}
            placeholder="Pick a version above, or write your own…"
          />
          <button className="testIdeaButton" onClick={runTest} disabled={!draft.trim()}>
            Try it on the room <span>→</span>
          </button>
        </div>
      </div>

      {customNotice && (
        <div className="ideaPrototypeNotice">
          <span>Not available yet</span>
          <p>{customNotice}</p>
        </div>
      )}

      {testedIdea && (
        <div className="ideaResults" key={testedIdea.id}>
          <div className="ideaResultsTop">
            <div>
              <span className="resultKicker">What happens</span>
              <h3>What changes when we lead this way?</h3>
            </div>
            <p>{testedIdea.takeaway}</p>
          </div>

          <div className="movementLegend">
            <span className="legendMove">Won over</span>
            <span className="legendUnresolved">Still not convinced</span>
            <span className="legendTension">New concern</span>
          </div>

          <div className="movementGrid">
            {testedIdea.shifts.map((shift, index) => {
              const persona = personas.find((person) => person.id === shift.personaId);

              if (!persona) {
                return null;
              }

              return (
                <article
                  key={shift.personaId}
                  className={`movementCard movement-${shift.direction}`}
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <div className="movementPerson">
                    <button
                      className="movementPortraitButton"
                      onClick={() => onOpenPersona(persona)}
                      aria-label={`Open ${persona.name}'s profile`}
                    >
                      <Portrait persona={persona} />
                    </button>
                    <div>
                      <button className="movementName" onClick={() => onOpenPersona(persona)}>
                        {persona.name}
                      </button>
                      <span>{persona.role}</span>
                    </div>
                  </div>

                  <div className="movementStatus">
                    <span>{shiftLabels[shift.direction]}</span>
                    <strong>{shift.label}</strong>
                  </div>

                  <p>{shift.reason}</p>

                  <details>
                    <summary>What is this based on?</summary>
                    <div className="movementEvidence">
                      {shift.evidence.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </details>
                </article>
              );
            })}
          </div>

          <div className="routeImpactPanel">
            <div className="routeImpactHeader">
              <div>
                <span>What this means</span>
                <h3>The path to a stronger campaign</h3>
              </div>
              <button
                className={appliedIdea?.id === testedIdea.id ? "applyRouteButton applied" : "applyRouteButton"}
                onClick={() => {
                  setAppliedIdea(testedIdea);
                  onApply(testedIdea);
                }}
              >
                {appliedIdea?.id === testedIdea.id ? "Now your working message ✓" : "Use this version"}
              </button>
            </div>

            <div className="routeImpactGrid">
              <div>
                <span>What gets stronger</span>
                <p>{testedIdea.routeImpact.strengthens}</p>
              </div>
              <div>
                <span>What still needs solving</span>
                <p>{testedIdea.routeImpact.stillNeeds}</p>
              </div>
              <div>
                <span>What to do next</span>
                <p>{testedIdea.routeImpact.nextMove}</p>
              </div>
            </div>
          </div>

          {appliedIdea?.id === testedIdea.id && (
            <div className="workingRoute">
              <div>
                <span>Working message updated</span>
                <strong>{testedIdea.label}</strong>
              </div>
              <p>{testedIdea.proposition}</p>
              <small>
                This is still an idea to test. Any claim, customer example or independent check must
                be backed by real evidence before you use it.
              </small>
              <div className="nextSteps onDark">
                <span>Next</span>
                <a className="nextLink primary" href={`/recommendation?version=${testedIdea.id}`}>
                  See how it compares in the recommendation →
                </a>
                <a className="nextLink" href={`/?version=${testedIdea.id}`}>
                  Watch the whole room react to it
                </a>
              </div>
            </div>
          )}

          <p className="ideaMethodNote">
            These changes are informed judgements, based on what each person needs. They are not
            probabilities, predictions or measured changes in real behaviour.
          </p>
        </div>
      )}
    </section>
  );
}

function DecisionRoom({
  objective,
  proposition,
  initialPersonaId,
}: {
  objective: string;
  proposition: string;
  initialPersonaId?: string;
}) {
  const [selected, setSelected] = useState<Persona | null>(
    () => personas.find((persona) => persona.id === initialPersonaId) ?? null
  );
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [workingMessage, setWorkingMessage] = useState<string | null>(null);

  // Remember the goal so the recommendation can point to the matching stage.
  useEffect(() => {
    try {
      window.sessionStorage.setItem("sa-goal", objective);
    } catch {
      // Storage can be unavailable (e.g. private browsing); nothing else depends on it.
    }
  }, [objective]);

  const visiblePeople = useMemo(
    () => (activeSegment === "All" ? personas : personas.filter((p) => p.segment === activeSegment)),
    [activeSegment]
  );

  return (
    <main className="roomPage">
      <header className="roomHeader">
        <BrandLockup />
        <div className="headerContext">
          <span>{objective}</span>
          <a className="quietButton" href="/">
            Back to the room
          </a>
          <a className="quietButton" href="/recommendation">
            See the recommendation
          </a>
        </div>
      </header>

      <section className="roomIntro">
        <div>
          <p className="sectionNumber">02 — THE PEOPLE</p>
          <h1>24 people. Six groups. One decision.</h1>
        </div>
        <div className="roomPropositionWrap">
          <span>{workingMessage ? "Your working message" : "Your message"}</span>
          <p className="roomProposition">{workingMessage ?? proposition}</p>
        </div>
      </section>

      <GuidedJourney onOpenPersona={setSelected} />

      <AskTheRoom onOpenPersona={setSelected} />

      <TryAnIdea
        currentProposition={proposition}
        onOpenPersona={setSelected}
        onApply={(idea) => setWorkingMessage(idea.proposition)}
      />

      <section className="communitySection" id="community">
        <div className="communityHeader">
          <div>
            <SectionTag id="people" number="06" />
            <h2>Everyone involved in the decision</h2>
            <p className="communityIntroCopy">
              The walkthrough above follows four people. Here you can meet all 24 and see what each
              one cares about, what they need, and how they affect everyone else.
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
          These are synthetic people: made up, but built from our audience data. They make the data
          easier to explore, and don&rsquo;t represent any real individual.
        </p>
        <a className="textButton" href="/about">
          How this audience is built →
        </a>
      </footer>

      <section className="exploreOnward">
        <h2>Where to next?</h2>
        <div className="nextSteps onDark">
          <a className="nextLink primary" href="/recommendation">
            See the recommendation
          </a>
          <a className="nextLink" href="/">
            Back to the room
          </a>
          <a className="nextLink" href="/about">
            How this works
          </a>
        </div>
        <McCannCredit />
      </section>

      {selected && (
        <PersonaPanel
          persona={selected}
          onClose={() => setSelected(null)}
          onAsk={() => {
            setSelected(null);
            document.getElementById("ask")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
    </main>
  );
}

export default function Explore() {
  const [challenge, setChallenge] = useState<{
    objective: string;
    proposition: string;
  } | null>(null);
  const [initialPersonaId, setInitialPersonaId] = useState<string>();

  // Arriving from the room (a #section link or ?person=) skips the challenge form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const person = params.get("person") ?? undefined;
    if (!window.location.hash && !person) return;
    setInitialPersonaId(person);
    setChallenge({ objective: defaultObjective, proposition: defaultProposition });
  }, []);

  useEffect(() => {
    if (!challenge || !window.location.hash) return;
    const target = () => document.getElementById(window.location.hash.slice(1));
    target()?.scrollIntoView();
    // Faces load after the first scroll and push the page down, so scroll again once they have.
    const timer = window.setTimeout(() => target()?.scrollIntoView(), 700);
    return () => window.clearTimeout(timer);
  }, [challenge]);

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
      initialPersonaId={initialPersonaId}
    />
  );
}
