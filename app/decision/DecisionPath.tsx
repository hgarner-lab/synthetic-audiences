"use client";

import { useEffect, useState } from "react";
import { personas } from "@/data/personas";
import { journeySteps } from "@/data/journey";
import { roomMessages, stanceLabels, Stance } from "@/data/reactions";
import { stages } from "@/data/campaign";
import { Face } from "@/components/Face";
import { SectionTag } from "@/components/Sections";
import { useProfile } from "@/components/Profile";
import { readVersion, saveVersion, versionLabel } from "@/components/version";

// The campaign stage that gets each person in the walkthrough to let the message through.
const fixingStage: Record<string, string> = {
  CN_EN_R: "understood",
  CN_EN_V: "considered",
  CN_CH_B: "considered",
  CN_FL_V: "chosen",
};

function stanceOf(versionId: string, personaId: string): Stance {
  const message = roomMessages.find((item) => item.id === versionId) ?? roomMessages[0];
  return message.reactions.find((item) => item.personaId === personaId)!.stance;
}

function lineOf(versionId: string, personaId: string) {
  const message = roomMessages.find((item) => item.id === versionId) ?? roomMessages[0];
  return message.reactions.find((item) => item.personaId === personaId)!.line;
}

// How many people in the walkthrough the message gets past before it stalls.
function reach(versionId: string) {
  const stall = journeySteps.findIndex((step) => stanceOf(versionId, step.personaId) !== "in");
  return stall === -1 ? journeySteps.length : stall;
}

export function DecisionPath() {
  const { openProfile } = useProfile();
  const [versionId, setVersionId] = useState("original");

  useEffect(() => setVersionId(readVersion()), []);

  function choose(id: string) {
    setVersionId(id);
    saveVersion(id);
    window.history.replaceState(null, "", `/decision?version=${id}`);
  }

  const stall = reach(versionId);
  const stalled = stall < journeySteps.length ? journeySteps[stall] : null;
  const stalledPerson = stalled ? personas.find((p) => p.id === stalled.personaId)! : null;
  const stalledStance = stalled ? stanceOf(versionId, stalled.personaId) : null;
  const fix = stalled ? stages.find((stage) => stage.id === fixingStage[stalled.personaId]) : null;
  const furtherVersions = roomMessages.filter((message) => reach(message.id) > stall);

  return (
    <section className="dp">
      <SectionTag id="journey" />
      <h1 className="dpTitle">Follow your message through the refinery</h1>
      <p className="dpIntro">
        Inside a refinery, a message has to get past four people before anything is bought. Each one asks a different
        question. See how far your version of the message gets, and where it stalls.
      </p>

      <div className="dpVersions" role="group" aria-label="Choose a version of the message">
        <span>Your message</span>
        <div className="frChips">
          {roomMessages.map((message) => (
            <button
              key={message.id}
              className={message.id === versionId ? "frChip active" : "frChip"}
              aria-pressed={message.id === versionId}
              onClick={() => choose(message.id)}
            >
              {message.id === "original" ? "Original" : message.label}
            </button>
          ))}
        </div>
        <blockquote>&ldquo;{roomMessages.find((m) => m.id === versionId)?.proposition}&rdquo;</blockquote>
      </div>

      <ol className="dpPath" key={versionId}>
        {journeySteps.map((step, index) => {
          const person = personas.find((p) => p.id === step.personaId)!;
          const stance = stanceOf(versionId, step.personaId);
          const state = index < stall ? "passes" : index === stall ? "stalls" : "waiting";
          const label =
            state === "passes"
              ? "Lets it through"
              : state === "waiting"
                ? "Never sees it"
                : stance === "pushback"
                  ? "Pushes back"
                  : "Stalls here";
          return (
            <li key={step.personaId} className={`dpStep is-${state}`} style={{ animationDelay: `${index * 180}ms` }}>
              <span className="dpNode" aria-hidden="true">
                {state === "passes" ? "✓" : state === "stalls" ? "✕" : index + 1}
              </span>
              <div className="dpCard">
                <button className={`dpFace st-${state === "waiting" ? "waiting" : stance}`} onClick={() => openProfile(person.id)}>
                  <Face id={person.id} mood={state === "waiting" ? "waiting" : stance} size={64} />
                </button>
                <div className="dpBody">
                  <p className="dpAsk">{step.stage}</p>
                  <h3>
                    <button onClick={() => openProfile(person.id)}>{person.name}</button>
                  </h3>
                  <p className="dpRole">{person.role}</p>
                  {state === "waiting" ? (
                    <p className="dpLine muted">Would ask: &ldquo;{step.question}&rdquo;</p>
                  ) : (
                    <p className="dpLine">&ldquo;{lineOf(versionId, step.personaId)}&rdquo;</p>
                  )}
                </div>
                <span className={`dpStatus is-${state} ${stance === "pushback" && state === "stalls" ? "is-pushback" : ""}`}>
                  {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <div className={stalled ? "dpVerdict" : "dpVerdict isThrough"}>
        {stalled && stalledPerson && fix ? (
          <>
            <p className="dpVerdictKicker">
              Gets past {stall} of {journeySteps.length}
            </p>
            <h2>
              Your message {stalledStance === "pushback" ? "meets push-back from" : "stalls with"} {stalledPerson.name}.
            </h2>
            <p>
              <strong>{stalled.requirement.title}.</strong> {stalled.requirement.description}
            </p>
            <div className="nextSteps">
              <a className="nextLink primary" href={`/recommendation?version=${versionId}#stage-${fix.id}`}>
                See how the campaign fixes this →
              </a>
              {furtherVersions.length > 0 && (
                <>
                  <span>Or change course:</span>
                  {furtherVersions.map((message) => (
                    <button key={message.id} className="nextLink" onClick={() => choose(message.id)}>
                      {message.label} gets past {reach(message.id)}
                    </button>
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="dpVerdictKicker">Gets past all {journeySteps.length}</p>
            <h2>Your message gets all the way through the refinery.</h2>
            <div className="nextSteps">
              <a className="nextLink primary" href={`/recommendation?version=${versionId}`}>
                See the recommendation →
              </a>
            </div>
          </>
        )}
      </div>

      <section className="dpNeeds">
        <h2>What each person needs to let it through</h2>
        <ul>
          {journeySteps.map((step, index) => {
            const person = personas.find((p) => p.id === step.personaId)!;
            const met = index < stall;
            return (
              <li key={step.personaId} className={met ? "isMet" : ""}>
                <span className="dpCheck" aria-hidden="true">
                  {met ? "✓" : ""}
                </span>
                <div>
                  <strong>{step.requirement.title}</strong>
                  <p>{step.requirement.description}</p>
                  <small>
                    For {person.name} · {met ? "met by this version" : stanceLabels[stanceOf(versionId, step.personaId)].toLowerCase()}
                  </small>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
