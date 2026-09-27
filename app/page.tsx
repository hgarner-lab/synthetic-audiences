"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { personas, segments, InfluenceRole } from "@/data/personas";
import { roomMessages, stanceLabels, stanceOrder, Reaction } from "@/data/reactions";
import { Face } from "@/components/Face";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import "./room.css";

const roleRows: { role: InfluenceRole; label: string; hint: string }[] = [
  { role: "validate", label: "Checkers", hint: "Test whether it's true" },
  { role: "block", label: "Gatekeepers", hint: "Can say no" },
  { role: "amplify", label: "Spreaders", hint: "Pass it on" },
  { role: "reframe", label: "Reshapers", hint: "Change what it means" },
];

// Order in which voices take turns in the spotlight for the original message.
const originalSpeakers = ["CN_EN_A", "CN_IC_A", "CN_CH_B", "CN_FL_V", "CN_EN_R", "CN_IC_B"];

const SPEAK_MS = 4200;

const deeperLinks = [
  {
    href: "/explore#journey",
    title: "Follow the decision",
    body: "Walk through the four people this decision passes through, and what each one needs before it moves on.",
    cta: "Start the walkthrough",
  },
  {
    href: "/explore#ask",
    title: "Ask the room a question",
    body: "Put a question to the room and hear several people answer side by side.",
    cta: "Ask a question",
  },
  {
    href: "/explore#community",
    title: "Meet everyone",
    body: "Browse all 24 people: what shapes their view, what they need and how they affect the room.",
    cta: "See all 24",
  },
];

export default function Room() {
  const [reacted, setReacted] = useState(false);
  const [messageId, setMessageId] = useState("original");
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);

  // Links from other pages can open the room on a version (?version=) or a person (?person=).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const version = params.get("version");
    const person = params.get("person");
    if (version && roomMessages.some((item) => item.id === version)) {
      setMessageId(version);
      setReacted(true);
    }
    if (person && personas.some((item) => item.id === person)) {
      setReacted(true);
      setPinnedId(person);
      setPlaying(false);
    }
  }, []);

  const message = roomMessages.find((item) => item.id === messageId) ?? roomMessages[0];
  const reactionById = useMemo(
    () => Object.fromEntries(message.reactions.map((item) => [item.personaId, item])) as Record<string, Reaction>,
    [message]
  );

  const speakers = useMemo(() => {
    if (message.id === "original") return originalSpeakers;
    return message.reactions.filter((item) => item.shift).map((item) => item.personaId);
  }, [message]);

  useEffect(() => {
    if (!reacted || !playing || pinnedId) return;
    const timer = window.setInterval(
      () => setSpeakerIndex((index) => (index + 1) % speakers.length),
      SPEAK_MS
    );
    return () => window.clearInterval(timer);
  }, [reacted, playing, pinnedId, speakers.length]);

  const speakerId = pinnedId ?? speakers[speakerIndex % speakers.length];
  const speaker = personas.find((item) => item.id === speakerId)!;
  const speakerReaction = reactionById[speakerId];

  const counts = stanceOrder.map((stance) => ({
    stance,
    count: message.reactions.filter((item) => item.stance === stance).length,
  }));

  const wonOver = message.reactions.filter((item) => item.shift && item.shift.from !== "in" && item.stance === "in").length;
  const firmer = message.reactions.filter((item) => item.shift?.from === "in" && item.stance === "in").length;
  const newPushback = message.reactions.filter((item) => item.shift?.direction === "new-tension").length;
  const stillStuck = message.reactions.filter((item) => item.shift?.direction === "still-unresolved").length;

  function chooseMessage(id: string) {
    setMessageId(id);
    setSpeakerIndex(0);
    setPinnedId(null);
    setPlaying(true);
  }

  function pickPerson(id: string) {
    if (!reacted) return;
    setPinnedId(id);
    setPlaying(false);
    if (window.matchMedia("(max-width: 999px)").matches) {
      document.getElementById("spotlight")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function togglePlay() {
    if (pinnedId) {
      const index = speakers.indexOf(pinnedId);
      setSpeakerIndex(index >= 0 ? index : 0);
      setPinnedId(null);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  }

  return (
    <main className="fr">
      <header className="frTop">
        <BrandLockup />
        <nav className="frNav">
          <span className="frTag">Prototype · China</span>
          <a href="/explore">Explore the full audience</a>
          <a href="/recommendation">See the recommendation</a>
        </nav>
      </header>

      <section className="frMessage">
        <p className="frEyebrow">{reacted ? message.label : "The message"}</p>
        <blockquote key={message.id} className="frProposition">
          “{message.proposition}”
        </blockquote>

        {!reacted ? (
          <button className="frGo" onClick={() => setReacted(true)}>
            Put it to the room
          </button>
        ) : (
          <div className="frSwitch" role="group" aria-label="Try a different angle">
            <span className="frSwitchLabel">Try a different angle</span>
            <div className="frChips">
              {roomMessages.map((item) => (
                <button
                  key={item.id}
                  className={item.id === message.id ? "frChip active" : "frChip"}
                  aria-pressed={item.id === message.id}
                  onClick={() => chooseMessage(item.id)}
                >
                  {item.id === "original" ? "Original" : item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className={reacted ? "frSummary shown" : "frSummary"} aria-live="polite">
        <div className="frBar" aria-hidden="true">
          {counts.map(({ stance, count }) => (
            <span key={stance} className={`frBarSeg st-${stance}`} style={{ flexGrow: count }} />
          ))}
        </div>
        <ul className="frLegend">
          {counts.map(({ stance, count }) => (
            <li key={stance}>
              <span className={`frDot st-${stance}`} />
              <strong>{count}</strong> {stanceLabels[stance].toLowerCase()}
            </li>
          ))}
        </ul>
        {message.id !== "original" && (
          <p className="frDelta">
            Compared with the original: <strong>{wonOver} won over</strong>
            {firmer > 0 && <> · {firmer} already in, now more convinced</>}
            {newPushback > 0 && (
              <>
                {" · "}
                <strong className="warn">{newPushback} now pushing back</strong>
              </>
            )}
            {stillStuck > 0 && <> · {stillStuck} still not convinced</>}
          </p>
        )}
        <p className="frSurprise">
          <span>What you might not expect</span>
          {message.surprise.text}
        </p>
      </section>

      <div className="frStage">
        <section className="frGridWrap" aria-label="The room">
          <div className="frGrid">
            <span className="frCorner" />
            {segments.map((segment) => (
              <span key={segment} className="frColHead">
                {segment}
              </span>
            ))}
            {roleRows.map((row, rowIndex) => (
              <RoleRow
                key={row.role}
                row={row}
                rowIndex={rowIndex}
                reacted={reacted}
                reactionById={reactionById}
                speakerId={reacted ? speakerId : null}
                highlightIds={message.surprise.personaIds}
                messageId={message.id}
                onPick={pickPerson}
              />
            ))}
          </div>
          <p className="frHint">
            {reacted ? "Tap anyone to hear why." : "24 synthetic people who shape this decision in China."}
          </p>
        </section>

        <aside id="spotlight" className={reacted ? "frSpot shown" : "frSpot"} aria-live="polite">
          {reacted && speakerReaction && (
            <div key={`${message.id}-${speakerId}`} className="frSpotInner">
              <div className="frSpotHead">
                <div className={`frSpotFace st-${speakerReaction.stance}`}>
                  <Face id={speaker.id} mood={speakerReaction.stance} size={112} />
                </div>
                <div>
                  <h2>{speaker.name}</h2>
                  <p className="frSpotRole">{speaker.role}</p>
                  <p className="frSpotStance">
                    {speakerReaction.shift && speakerReaction.shift.from !== speakerReaction.stance && (
                      <>
                        <span className={`frStance st-${speakerReaction.shift.from}`}>
                          {stanceLabels[speakerReaction.shift.from]}
                        </span>
                        <span className="frArrow">→</span>
                      </>
                    )}
                    <span className={`frStance st-${speakerReaction.stance}`}>
                      {stanceLabels[speakerReaction.stance]}
                    </span>
                  </p>
                </div>
              </div>

              <p className="frQuote">“{speakerReaction.line}”</p>

              <div className="frWhy">
                <p className="frEyebrow">Why we think this</p>
                <p>{speakerReaction.shift ? speakerReaction.shift.reason : speaker.actionDetail}</p>
              </div>

              <div className="frNeeds">
                <p className="frEyebrow">What {speaker.name.split(" ")[0]} needs</p>
                <div>
                  {speaker.needs.map((need) => (
                    <span key={need}>{need}</span>
                  ))}
                </div>
              </div>

              <div className="frSpotFoot">
                <div className="frPips" aria-hidden="true">
                  {speakers.map((id, index) => (
                    <span
                      key={id}
                      className={!pinnedId && index === speakerIndex % speakers.length ? "on" : ""}
                    />
                  ))}
                </div>
                <a className="frProfile" href={`/explore?person=${speaker.id}#community`}>
                  Full profile
                </a>
                <button className="frPlay" onClick={togglePlay}>
                  {pinnedId ? "Back to the voices" : playing ? "Pause voices" : "Play voices"}
                </button>
              </div>
            </div>
          )}
          {!reacted && (
            <p className="frSpotEmpty">Once the room reacts, people take turns explaining their view here.</p>
          )}
        </aside>
      </div>

      {reacted && (
        <>
          <section className="frRecommend" aria-labelledby="recommend-title">
            <div>
              <h2 id="recommend-title">Seen enough?</h2>
              <p>See which version we&rsquo;d recommend, what the campaign needs before launch, and what to do next.</p>
            </div>
            <a className="nextLink primary" href={`/recommendation?version=${message.id}`}>
              See the recommendation →
            </a>
          </section>

          <section className="frDeeper" aria-labelledby="deeper-title">
            <h2 id="deeper-title">Go deeper</h2>
            <div className="frDeeperCards">
              {deeperLinks.map((link) => (
                <a key={link.href} className="frDeeperCard" href={link.href}>
                  <strong>{link.title}</strong>
                  <span>{link.body}</span>
                  <em>{link.cta} →</em>
                </a>
              ))}
            </div>
          </section>
        </>
      )}

      <footer className="frFoot">
        <p>
          These are synthetic people: made up, but built from our audience data. Their reactions show the likely
          direction of opinion. They are not quotes from real people, and not a forecast.{" "}
          <a href="/about">How this works</a>
        </p>
        <McCannCredit />
      </footer>
    </main>
  );
}

function RoleRow({
  row,
  rowIndex,
  reacted,
  reactionById,
  speakerId,
  highlightIds,
  messageId,
  onPick,
}: {
  row: (typeof roleRows)[number];
  rowIndex: number;
  reacted: boolean;
  reactionById: Record<string, Reaction>;
  speakerId: string | null;
  highlightIds: string[];
  messageId: string;
  onPick: (id: string) => void;
}) {
  return (
    <>
      <span className="frRowHead">
        <strong>{row.label}</strong>
        <small>{row.hint}</small>
      </span>
      {segments.map((segment, colIndex) => {
        const person = personas.find((item) => item.segment === segment && item.influenceRole === row.role)!;
        const reaction = reactionById[person.id];
        const mood = reacted ? reaction.stance : "waiting";
        // Ripple outwards from the middle of the room.
        const distance = Math.hypot(colIndex - 2.5, rowIndex - 1.5);
        const moved = reacted && reaction.shift && reaction.shift.direction !== "still-unresolved";
        const classes = [
          "frTile",
          `st-${mood}`,
          speakerId === person.id ? "speaking" : "",
          reacted && highlightIds.includes(person.id) ? "flagged" : "",
        ].join(" ");

        return (
          <button
            key={person.id}
            className={classes}
            style={{ "--delay": `${Math.round(distance * 70)}ms` } as CSSProperties}
            onClick={() => onPick(person.id)}
            aria-label={`${person.name}, ${person.role}${reacted ? `: ${stanceLabels[reaction.stance]}` : ""}`}
          >
            <span className="frFaceWrap">
              <Face id={person.id} mood={mood} />
              {moved && (
                <span
                  key={`${messageId}-${person.id}`}
                  className={reaction.shift!.direction === "new-tension" ? "frBadge warn" : "frBadge"}
                  aria-hidden="true"
                >
                  {reaction.shift!.direction === "new-tension" ? "!" : "↑"}
                </span>
              )}
            </span>
            <span className="frName">{person.name.split(" ")[0]}</span>
            <span className="frState">{reacted ? stanceLabels[reaction.stance] : " "}</span>
          </button>
        );
      })}
    </>
  );
}
