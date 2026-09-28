"use client";

import { useEffect, useState } from "react";
import { personas, Persona, segments } from "@/data/personas";
import { audienceQuestions, defaultResponderIds, AudienceResponseFixture } from "@/data/questions";
import { Face } from "@/components/Face";
import { Portrait } from "@/components/Portrait";
import { SectionTag } from "@/components/Sections";
import { useProfile } from "@/components/Profile";

// "Independent certification" -> "checked by an independent body", keeping words like "Chinese" as they are.
function lowerFirst(text: string) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function listOf(items: string[]) {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const roleLabels = {
  validate: "Checker",
  block: "Gatekeeper",
  amplify: "Spreader",
  reframe: "Reshaper",
};

export function AskTheRoom() {
  const { openProfile } = useProfile();
  const onOpenPersona = (persona: Persona) => openProfile(persona.id);
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

  // Arriving with ?ask=<question id> (e.g. from the recommendation) asks that question straight away.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("ask");
    const question = audienceQuestions.find((item) => item.id === id);
    if (question) {
      setInput(question.prompt);
      askQuestion(question.prompt, question.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="askRoomSection" id="ask">
      <div className="askRoomHeader">
        <div>
          <SectionTag id="ask" />
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
            These answers come from synthetic people built from our audience data. Treat them as a
            guide to how each group is likely to respond.
          </p>

          <div className="nextSteps">
            <span>Next</span>
            <a className="nextLink primary" href="/recommendation">
              See the recommendation →
            </a>
            <a className="nextLink" href="/decision">
              Follow the decision
            </a>
            <a className="nextLink" href="/">
              Try another version in the room
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

