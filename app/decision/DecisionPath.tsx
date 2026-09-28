"use client";

import { useEffect, useState } from "react";
import { stanceLabels, Stance } from "@/data/reactions";
import { MarketId, markets, readMarket, saveMarket } from "@/data/markets";
import { plans } from "@/data/plans";
import { Face } from "@/components/Face";
import { SectionTag } from "@/components/Sections";
import { useProfile } from "@/components/Profile";
import { MarketSwitch } from "@/components/MarketSwitch";
import { readVersion, saveVersion } from "@/components/version";

export function DecisionPath() {
  const { openProfile } = useProfile();
  const [versionId, setVersionId] = useState("original");
  const [marketId, setMarketId] = useState<MarketId>("china");
  const market = markets[marketId];
  const personas = market.people;
  const roomMessages = market.messages;
  const journeySteps = market.journey.steps;
  const stages = plans[marketId].stages;
  const marketQuery = marketId === "ksa" ? "market=ksa&" : "";

  const stanceOf = (id: string, personaId: string): Stance => {
    const message = roomMessages.find((item) => item.id === id) ?? roomMessages[0];
    return message.reactions.find((item) => item.personaId === personaId)!.stance;
  };
  const lineOf = (id: string, personaId: string) => {
    const message = roomMessages.find((item) => item.id === id) ?? roomMessages[0];
    return message.reactions.find((item) => item.personaId === personaId)!.line;
  };
  // How many people in the walkthrough the message gets past before it stalls.
  const reach = (id: string) => {
    const stall = journeySteps.findIndex((step) => stanceOf(id, step.personaId) !== "in");
    return stall === -1 ? journeySteps.length : stall;
  };

  useEffect(() => {
    setVersionId(readVersion());
    const linkedMarket = readMarket();
    setMarketId(linkedMarket);
    saveMarket(linkedMarket);
  }, []);

  function writeUrl(id: string, marketValue: MarketId) {
    window.history.replaceState(null, "", `/decision?${marketValue === "ksa" ? "market=ksa&" : ""}version=${id}`);
  }

  function choose(id: string) {
    setVersionId(id);
    saveVersion(id);
    writeUrl(id, marketId);
  }

  function chooseMarket(id: MarketId) {
    setMarketId(id);
    saveMarket(id);
    writeUrl(versionId, id);
  }

  const stall = reach(versionId);
  const stalled = stall < journeySteps.length ? journeySteps[stall] : null;
  const stalledPerson = stalled ? personas.find((p) => p.id === stalled.personaId)! : null;
  const stalledStance = stalled ? stanceOf(versionId, stalled.personaId) : null;
  const fix = stalled ? stages.find((stage) => stage.id === market.journey.fixingStage[stalled.personaId]) : null;
  const furtherVersions = roomMessages.filter((message) => reach(message.id) > stall);

  return (
    <section className="dp">
      <SectionTag id="journey" />
      <h1 className="dpTitle">Follow your message through {market.journey.place}</h1>
      <MarketSwitch value={marketId} onChange={chooseMarket} className="dpMarket" />
      <p className="dpIntro">
        Inside {market.journey.place}, a message has to get past four people before anything is bought. Each one asks a
        different question. See how far your version of the message gets, and where it stalls.
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
              <a className="nextLink primary" href={`/recommendation?${marketQuery}version=${versionId}#stage-${fix.id}`}>
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
            <h2>Your message gets all the way through {market.journey.place}.</h2>
            <div className="nextSteps">
              <a className="nextLink primary" href={`/recommendation?${marketQuery}version=${versionId}`}>
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
