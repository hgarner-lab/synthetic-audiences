"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { segments, InfluenceRole } from "@/data/personas";
import { stanceLabels, stanceOrder, Reaction } from "@/data/reactions";
import { markets, MarketId, RoomPerson, readMarket, saveMarket } from "@/data/markets";
import { Face } from "@/components/Face";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import { SectionIcon, SectionId, sections } from "@/components/Sections";
import { useProfile } from "@/components/Profile";
import { saveVersion } from "@/components/version";
import "./room.css";
import "./room-brand.css";

const roleRows: { role: InfluenceRole; label: string; hint: string }[] = [
  { role: "validate", label: "Checkers", hint: "Test whether it's true" },
  { role: "block", label: "Gatekeepers", hint: "Can say no" },
  { role: "amplify", label: "Spreaders", hint: "Pass it on" },
  { role: "reframe", label: "Reshapers", hint: "Change what it means" },
];

const SPEAK_MS = 4200;

// Each person sits on their own colour until the room reacts.
// Colours are dealt out in a shuffled order so they never line up with role or group.
const restColours = ["--rest-1", "--rest-2", "--rest-3", "--rest-4", "--rest-5", "--rest-6"];
const restOrder = [...markets.china.people, ...markets.ksa.people]
  .map((person) => person.id)
  .sort((a, b) => hashText(`${a}:rest`) - hashText(`${b}:rest`));

function hashText(text: string) {
  let value = 0;
  for (let i = 0; i < text.length; i += 1) value = (value * 31 + text.charCodeAt(i)) >>> 0;
  return value;
}

function restColour(id: string) {
  return `var(${restColours[restOrder.indexOf(id) % restColours.length]})`;
}

// A different direction for each person's offset print layer.
function tilt(id: string) {
  return `${((restOrder.indexOf(id) * 47) % 50) - 25}deg`;
}

// Other parts of the experience, offered quietly once the room has reacted.
const deeperLinks: { id: SectionId; href: string; cta: string }[] = [
  { id: "ask", href: "/ask", cta: "Ask the room a question" },
  { id: "journey", href: "/decision", cta: "Follow your message through a refinery" },
  { id: "people", href: "/people", cta: "Meet all 24 people" },
];

// The main path through the experience, shown as a small progress line.
const pathSteps = ["See the reaction", "Try another version", "Get the recommendation"];

export default function Room() {
  const [reacted, setReacted] = useState(false);
  const [messageId, setMessageId] = useState("original");
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(true);
  // Whether the visitor has tried at least one version other than the original.
  const [tried, setTried] = useState(false);
  const [marketId, setMarketId] = useState<MarketId>("china");
  const { openProfile } = useProfile();
  const market = markets[marketId];
  const roomMessages = market.messages;
  const people = market.people;

  // Links from other pages can open the room on a version (?version=) or a person (?person=).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const version = params.get("version");
    const person = params.get("person");
    const linkedMarket = readMarket();
    setMarketId(linkedMarket);
    saveMarket(linkedMarket);
    const linkedPeople = markets[linkedMarket].people;
    if (version && markets[linkedMarket].messages.some((item) => item.id === version)) {
      setMessageId(version);
      saveVersion(version);
      setReacted(true);
      if (version !== "original") setTried(true);
    }
    if (person && linkedPeople.some((item) => item.id === person)) {
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
    if (message.id === "original") return market.originalSpeakers;
    return message.reactions.filter((item) => item.shift).map((item) => item.personaId);
  }, [message, market]);

  useEffect(() => {
    if (!reacted || !playing || pinnedId) return;
    const timer = window.setInterval(
      () => setSpeakerIndex((index) => (index + 1) % speakers.length),
      SPEAK_MS
    );
    return () => window.clearInterval(timer);
  }, [reacted, playing, pinnedId, speakers.length]);

  const speakerId = pinnedId ?? speakers[speakerIndex % speakers.length];
  const speaker = people.find((item) => item.id === speakerId)!;
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
    saveVersion(id);
    if (id !== "original") setTried(true);
    setSpeakerIndex(0);
    setPinnedId(null);
    setPlaying(true);
  }

  function chooseMarket(id: MarketId) {
    setMarketId(id);
    saveMarket(id);
    setSpeakerIndex(0);
    setPinnedId(null);
    setPlaying(true);
    // Keep the address shareable: ?market=ksa for Saudi Arabia, nothing for China.
    const url = new URL(window.location.href);
    if (id === "ksa") url.searchParams.set("market", "ksa");
    else url.searchParams.delete("market");
    url.searchParams.delete("person");
    window.history.replaceState(null, "", url);
  }

  function pickPerson(id: string) {
    // Tapping a face before the room has reacted starts the reaction on that person.
    setReacted(true);
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
        {reacted && (
          <ol className="frPath" aria-label="Your progress">
            {pathSteps.map((step, index) => {
              const done = index === 0 || (index === 1 && tried);
              const current = (index === 1 && !tried) || (index === 2 && tried);
              return (
                <li key={step} className={done ? "done" : current ? "current" : ""}>
                  <span className="frPathDot">{done ? "✓" : index + 1}</span>
                  {index === 2 && tried ? (
                    <a href={`/recommendation?${marketId === "ksa" ? "market=ksa&" : ""}version=${messageId}`}>{step}</a>
                  ) : (
                    step
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </header>

      {!reacted && (
        <section className="frDisplay">
          <h1 className="heavy">
            24 people. <span className="thin">One</span> decision.
          </h1>
          <p className="thin">What will the room say?</p>
        </section>
      )}

      <section className="frMessage">
        <div className="marketSwitch frMarket" role="group" aria-label="Choose a market">
          {(["china", "ksa"] as MarketId[]).map((id) => (
            <button
              key={id}
              className={marketId === id ? "active" : ""}
              aria-pressed={marketId === id}
              onClick={() => chooseMarket(id)}
            >
              {markets[id].name}
              {id === "ksa" && <span>New</span>}
            </button>
          ))}
        </div>
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
            <span className={tried ? "frSwitchLabel" : "frSwitchLabel prompt"}>
              {tried ? "Try another angle" : "Next: try a different angle. Pick one to see who changes their mind."}
            </span>
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
                people={people}
                onPick={pickPerson}
              />
            ))}
          </div>
          <p className="frHint">
            {reacted
              ? "Tap anyone to hear why."
              : `24 synthetic people who shape this decision in ${market.name}. Tap anyone to see their reaction.`}
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
                  <h2>{speaker.name.replace(/-/g, "\u2011")}</h2>
                  <p className="frSpotZh" lang={speaker.lang} dir={speaker.lang === "ar" ? "rtl" : undefined}>
                    {speaker.nameLocal}
                  </p>
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
                <p>{speakerReaction.shift ? speakerReaction.shift.reason : speaker.why}</p>
              </div>

              <div className="frNeeds">
                <p className="frEyebrow">What {speaker.name} needs</p>
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
                <button className="frProfile" onClick={() => openProfile(speaker.id)}>
                  Full profile
                </button>
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
          {tried ? (
            <section className="frRecommend" aria-labelledby="recommend-title">
              <SectionIcon id="recommendation" size={56} />
              <div className="frRecommendText">
                <h2 id="recommend-title">Seen enough?</h2>
                <p>
                  See the campaign we&rsquo;d build from this: one big idea, played out stage by stage, with who it
                  wins over at each step.
                </p>
              </div>
              <a
                className="nextLink primary"
                href={`/recommendation?${marketId === "ksa" ? "market=ksa&" : ""}version=${message.id}`}
              >
                See the recommendation →
              </a>
            </section>
          ) : (
            <section className="frRecommend isNudge" aria-labelledby="recommend-title">
              <SectionIcon id="try" size={56} />
              <div className="frRecommendText">
                <h2 id="recommend-title">Now change the message</h2>
                <p>Try one of four other versions and watch who changes their mind. Then we&rsquo;ll show you the campaign.</p>
              </div>
              <button
                className="nextLink primary"
                onClick={() => document.querySelector(".frSwitch")?.scrollIntoView({ behavior: "smooth", block: "center" })}
              >
                Try a different angle ↑
              </button>
            </section>
          )}

          <nav className="frDeeper" aria-label="Go deeper">
            <span className="frDeeperLabel">Or go deeper</span>
            {deeperLinks.map((link) => (
              <a
                key={link.href}
                className="frDeeperLink"
                href={
                  link.id === "journey"
                    ? `${link.href}?${marketId === "ksa" ? "market=ksa&" : ""}version=${messageId}`
                    : marketId === "ksa"
                      ? `${link.href}?market=ksa`
                      : link.href
                }
                style={{ "--accent": sections[link.id].colour } as CSSProperties}
              >
                <SectionIcon id={link.id} size={30} />
                {link.cta}
              </a>
            ))}
          </nav>
        </>
      )}

      <footer className="frFoot">
        <p>
          These are synthetic people: made up, but built from our audience data. Their reactions show the likely
          direction of opinion. Treat them as a guide, and test the finished work with real people.{" "}
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
  people,
  onPick,
}: {
  row: (typeof roleRows)[number];
  rowIndex: number;
  reacted: boolean;
  reactionById: Record<string, Reaction>;
  speakerId: string | null;
  highlightIds: string[];
  messageId: string;
  people: RoomPerson[];
  onPick: (id: string) => void;
}) {
  return (
    <>
      <span className="frRowHead">
        <strong>{row.label}</strong>
        <small>{row.hint}</small>
      </span>
      {segments.map((segment, colIndex) => {
        const person = people.find((item) => item.segment === segment && item.influenceRole === row.role)!;
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
            style={
              {
                "--delay": `${Math.round(distance * 70)}ms`,
                "--rest": restColour(person.id),
                "--tilt": tilt(person.id),
              } as CSSProperties
            }
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
            <span className="frName">
              <span className="frNameFull">{person.name.replace(/-/g, "\u2011")}</span>
              <span className="frNameShort">{person.name.split(" ")[0]}</span>
            </span>
            <span className="frState">{reacted ? stanceLabels[reaction.stance] : " "}</span>
          </button>
        );
      })}
    </>
  );
}
