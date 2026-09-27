"use client";

import { useEffect, useState } from "react";
import { personas } from "@/data/personas";
import { roomMessages, stanceLabels, stanceOrder } from "@/data/reactions";
import { recommendation, recommendedId, versionTallies } from "@/data/recommendation";
import { Face } from "@/components/Face";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import "./recommendation.css";

const personById = Object.fromEntries(personas.map((persona) => [persona.id, persona]));
const recommended = roomMessages.find((message) => message.id === recommendedId)!;
const recommendedTally = versionTallies.find((tally) => tally.id === recommendedId)!;
const wonOver = recommended.reactions.filter(
  (reaction) => reaction.shift?.direction === "more-resolved" && reaction.shift.from !== "in"
);

function firstName(personaId: string) {
  return personById[personaId].name.split(" ")[0];
}

export default function Recommendation() {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const version = new URLSearchParams(window.location.search).get("version");
    if (version && versionTallies.some((tally) => tally.id === version)) setPickedId(version);
  }, []);

  const picked = versionTallies.find((tally) => tally.id === pickedId);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/recommendation`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy this link:", `${window.location.origin}/recommendation`);
    }
  }

  return (
    <main className="rc">
      <header className="rcTop">
        <BrandLockup />
        <nav className="rcNav">
          <a href={`/?version=${pickedId ?? recommendedId}`}>← Back to the room</a>
          <a href="/explore">Explore the full audience</a>
        </nav>
      </header>

      <section className="rcHero">
        <p className="rcEyebrow">Campaign recommendation · Aramco Advantage Crude · China</p>
        <h1>{recommendation.headline}</h1>
        <p className="rcLead">{recommendation.why}</p>

        {picked && (
          <p className="rcPicked">
            {picked.id === recommendedId ? (
              <>You picked <strong>{picked.label}</strong>. That&rsquo;s the version we&rsquo;d recommend too.</>
            ) : (
              <>
                You picked <strong>{picked.label}</strong>: {picked.counts.in} people leaning in and{" "}
                {picked.counts.pushback} pushing back. We&rsquo;d lead with independent proof instead:{" "}
                {recommendedTally.counts.in} leaning in, and nobody pushing back.
              </>
            )}
          </p>
        )}
      </section>

      <section className="rcSection">
        <h2>How the five versions compare</h2>
        <p className="rcIntro">How the 24 people in the room reacted to each version of the message.</p>
        <div className="rcCompare">
          {versionTallies.map((tally) => (
            <div
              key={tally.id}
              className={`rcRow ${tally.id === recommendedId ? "best" : ""} ${tally.id === pickedId ? "picked" : ""}`}
            >
              <div className="rcRowLabel">
                <strong>{tally.label}</strong>
                <span>
                  {tally.id === recommendedId && <em className="rcTag">Recommended</em>}
                  {tally.id === pickedId && tally.id !== recommendedId && <em className="rcTag alt">Your pick</em>}
                </span>
              </div>
              <div className="rcBar" aria-hidden="true">
                {stanceOrder.map((stance) => (
                  <span key={stance} className={`st-${stance}`} style={{ flexGrow: tally.counts[stance] }} />
                ))}
              </div>
              <p className="rcRowCounts">
                <strong>{tally.counts.in}</strong> leaning in · <strong>{tally.counts.pushback}</strong> pushing back
                <span className="rcSr">
                  {" "}
                  · {tally.counts.unsure} {stanceLabels.unsure.toLowerCase()} · {tally.counts.out}{" "}
                  {stanceLabels.out.toLowerCase()}
                </span>
              </p>
            </div>
          ))}
        </div>
        <ul className="rcKey" aria-hidden="true">
          {stanceOrder.map((stance) => (
            <li key={stance}>
              <span className={`rcDot st-${stance}`} />
              {stanceLabels[stance]}
            </li>
          ))}
        </ul>
      </section>

      <section className="rcSection">
        <h2>The message</h2>
        <blockquote className="rcMessage">“{recommended.proposition}”</blockquote>
        <p className="rcIntro">
          Tested in the room: {recommendedTally.counts.in} of 24 leaning in, nobody pushing back.{" "}
          <a href={`/?version=${recommendedId}`}>See the room react to it →</a>
        </p>
      </section>

      <section className="rcSection rcTwoCol">
        <div>
          <h2>Who it wins over</h2>
          <ul className="rcPeople">
            {wonOver.map((reaction) => (
              <li key={reaction.personaId}>
                <span className="rcFace st-in">
                  <Face id={reaction.personaId} mood="in" size={52} />
                </span>
                <div>
                  <strong>{personById[reaction.personaId].name}</strong>
                  <small>{personById[reaction.personaId].role}</small>
                  <p>“{reaction.line}”</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Who still needs work</h2>
          <ul className="rcPeople">
            {recommendation.stillNeedsWork.map((item) => {
              const stance = recommended.reactions.find((r) => r.personaId === item.personaId)!.stance;
              return (
                <li key={item.personaId}>
                  <span className={`rcFace st-${stance}`}>
                    <Face id={item.personaId} mood={stance} size={52} />
                  </span>
                  <div>
                    <strong>{personById[item.personaId].name}</strong>
                    <small>{personById[item.personaId].role}</small>
                    <p>{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="rcSection">
        <h2>What the campaign needs before launch</h2>
        <p className="rcIntro">Four things the room asked for. None of them can be skipped.</p>
        <ol className="rcNeeds">
          {recommendation.needs.map((need) => (
            <li key={need.title}>
              <h3>{need.title}</h3>
              <p>{need.detail}</p>
              <div className="rcAsked">
                <span>Asked for by</span>
                {need.askedBy.map((id) => (
                  <span key={id} className="rcAskedPerson">
                    <Face id={id} mood="waiting" size={24} />
                    {firstName(id)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rcSection">
        <h2>Watch out for</h2>
        <ul className="rcWatch">
          {recommendation.watchOuts.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="rcAsked">
                {item.personaIds.map((id) => (
                  <span key={id} className="rcAskedPerson">
                    <Face id={id} mood="pushback" size={24} />
                    {firstName(id)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rcSection">
        <h2>Next steps</h2>
        <ol className="rcSteps">
          {recommendation.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rcOnward">
        <h2>What would you like to do next?</h2>
        <div className="nextSteps onDark">
          <button className="nextLink primary" onClick={() => window.print()}>
            Save as PDF
          </button>
          <button className="nextLink" onClick={copyLink}>
            {copied ? "Link copied ✓" : "Copy link to share"}
          </button>
          <a className="nextLink" href={`/?version=${pickedId && pickedId !== recommendedId ? pickedId : "original"}`}>
            Try another version in the room
          </a>
          <a className="nextLink" href="/explore#ask">
            Ask the room a question
          </a>
          <a className="nextLink" href="/about">
            How this works
          </a>
        </div>
      </section>

      <footer className="rcFoot">
        <p>
          This recommendation is based on synthetic people: made up, but built from our audience data. It shows
          which way opinion is likely to move. Test the finished work with real people before launch.
        </p>
        <McCannCredit />
      </footer>
    </main>
  );
}
