"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { personas, Persona } from "@/data/personas";
import { roomMessages, stanceLabels, Stance } from "@/data/reactions";
import { snapshots, stages } from "@/data/campaign";
import { Face } from "@/components/Face";
import { Portrait } from "@/components/Portrait";
import { ksaPeople, KsaPerson } from "@/data/ksaPeople";
import { ksaRoomMessages } from "@/data/ksaRoom";
import { plans } from "@/data/plans";
import { readVersion, versionLabel } from "@/components/version";
import type { CardExtras } from "@/data/cards";

// Lets any page open a person's profile in place: const { openProfile } = useProfile().
const ProfileContext = createContext<{ openProfile: (personaId: string) => void }>({
  openProfile: () => {},
});

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const openProfile = useCallback((id: string) => setPersonaId(id), []);
  const person = personas.find((item) => item.id === personaId);
  const ksaPerson = ksaPeople.find((item) => item.id === personaId);
  const close = useCallback(() => setPersonaId(null), []);

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      {person && <ProfilePanel persona={person} onClose={close} />}
      {ksaPerson && <KsaProfilePanel person={ksaPerson} onClose={close} />}
    </ProfileContext.Provider>
  );
}

const roleLabels: Record<Persona["influenceRole"], string> = {
  validate: "Checker",
  block: "Gatekeeper",
  amplify: "Spreader",
  reframe: "Reshaper",
};

const roleEffects: Record<Persona["influenceRole"], string> = {
  validate: "Once the proof is good enough for them, others will trust it too.",
  block: "Can slow things down, and makes others ask for more proof.",
  amplify: "Can pass a good idea on to a wide network of people.",
  reframe: "Can change what the message means as it gets passed around.",
};

function reactionTo(versionId: string, personaId: string) {
  const message = roomMessages.find((item) => item.id === versionId) ?? roomMessages[0];
  return message.reactions.find((item) => item.personaId === personaId)!;
}

// The campaign stage that first brings this person to leaning in, if any.
function winningStage(personaId: string) {
  if (snapshots[0].stances[personaId] === "in") return { kind: "already" as const };
  for (let index = 1; index < snapshots.length; index += 1) {
    if (snapshots[index].stances[personaId] === "in") return { kind: "stage" as const, stage: stages[index - 1] };
  }
  return { kind: "never" as const, stance: snapshots[snapshots.length - 1].stances[personaId] as Stance };
}

function ProfilePanel({ persona, onClose }: { persona: Persona; onClose: () => void }) {
  const [versionId, setVersionId] = useState("original");

  useEffect(() => {
    setVersionId(readVersion());
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const current = reactionTo(versionId, persona.id);
  const wins = winningStage(persona.id);

  return (
    <div className="panelBackdrop" onClick={onClose}>
      <aside
        className="personaPanel"
        role="dialog"
        aria-modal="true"
        aria-label={`${persona.name}'s profile`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="closeButton" onClick={onClose} aria-label="Close profile">
          ×
        </button>
        <div className="panelTop">
          <Portrait persona={persona} large />
          <div>
            <span className="syntheticBadge">Synthetic person</span>
            <h2>{persona.name}</h2>
            <p className="panelNameZh" lang="zh-Hans">
              {persona.nameZh}
            </p>
            <p className="panelRole">{persona.role}</p>
            <p className="panelMeta">
              {persona.segment} · {roleLabels[persona.influenceRole]}
            </p>
          </div>
        </div>

        <div className="likelyQuestion">
          <span>Reaction to {versionLabel(versionId).toLowerCase()}</span>
          <strong className={`profileStance st-${current.stance}`}>{stanceLabels[current.stance]}</strong>
          <p>&ldquo;{current.line}&rdquo;</p>
        </div>

        <section className="profileVersions">
          <p className="eyebrow">Across all five versions</p>
          <ul>
            {roomMessages.map((message) => {
              const reaction = reactionTo(message.id, persona.id);
              return (
                <li key={message.id} className={message.id === versionId ? "isCurrent" : ""}>
                  <a href={`/?version=${message.id}&person=${persona.id}`}>
                    <span className={`profileDot st-${reaction.stance}`} title={stanceLabels[reaction.stance]} />
                    <span>{versionLabel(message.id)}</span>
                    <em>{stanceLabels[reaction.stance]}</em>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="profileWins">
          <p className="eyebrow">In the recommended campaign</p>
          {wins.kind === "already" && <p>Already leaning in before the campaign starts.</p>}
          {wins.kind === "stage" && (
            <p>
              Won over at{" "}
              <a href={`/recommendation#stage-${wins.stage.id}`}>
                stage {wins.stage.number}, {wins.stage.name.toLowerCase()}
              </a>
              .
            </p>
          )}
          {wins.kind === "never" && (
            <p>
              Still to win at the end ({stanceLabels[wins.stance].toLowerCase()}).{" "}
              <a href="/recommendation#test">See what it would take</a>.
            </p>
          )}
        </section>

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
            <span className={`rolePill rolePill-${persona.influenceRole}`}>{roleLabels[persona.influenceRole]}</span>
            <strong>How {persona.name} affects the room</strong>
          </div>
          <p>{roleEffects[persona.influenceRole]}</p>
        </div>

        <details className="evidenceDetails">
          <summary>Why we think this</summary>
          <div>
            <p className="eyebrow">What&rsquo;s behind their view</p>
            <p>{persona.internalThought}</p>
            <p className="methodNote">
              This person is synthetic: made up, but built from our audience data. This isn&rsquo;t a quote from a
              real person, or a record of anything someone did.
            </p>
          </div>
        </details>

        <MoreAboutThem personaId={persona.id} name={persona.name} />

        <div className="nextSteps">
          <a className="nextLink primary" href={`/?version=${versionId}&person=${persona.id}`}>
            <Face id={persona.id} mood={current.stance} size={22} />
            See {persona.name} in the room
          </a>
          <a className="nextLink" href="/ask">
            Ask the room a question
          </a>
        </div>
      </aside>
    </div>
  );
}

// The Saudi campaign stage that first brings this person to leaning in, if any.
function ksaWinningStage(personaId: string) {
  const { snapshots: ksaSnapshots, stages: ksaStages } = plans.ksa;
  if (ksaSnapshots[0].stances[personaId] === "in") return { kind: "already" as const };
  for (let index = 1; index < ksaSnapshots.length; index += 1) {
    if (ksaSnapshots[index].stances[personaId] === "in") return { kind: "stage" as const, stage: ksaStages[index - 1] };
  }
  return { kind: "never" as const, stance: ksaSnapshots[ksaSnapshots.length - 1].stances[personaId] as Stance };
}

// A Saudi person's profile: their reaction in the Saudi room, where the Saudi campaign
// wins them over, and who they are and what they need, from the persona cards.
function KsaProfilePanel({ person, onClose }: { person: KsaPerson; onClose: () => void }) {
  const [extras, setExtras] = useState<CardExtras | null>(null);
  const [versionId, setVersionId] = useState("original");
  const reactionTo = (id: string) =>
    (ksaRoomMessages.find((item) => item.id === id) ?? ksaRoomMessages[0]).reactions.find(
      (item) => item.personaId === person.id
    )!;
  const labelFor = (id: string) => {
    const message = ksaRoomMessages.find((item) => item.id === id);
    return !message || message.id === "original" ? "Original message" : message.label;
  };
  const current = reactionTo(versionId);

  useEffect(() => {
    setVersionId(readVersion());
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    setExtras(null);
    import("@/data/cards").then(({ cardExtras }) => setExtras(cardExtras(person.id))).catch(() => {});
  }, [person.id]);

  return (
    <div className="panelBackdrop" onClick={onClose}>
      <aside
        className="personaPanel"
        role="dialog"
        aria-modal="true"
        aria-label={`${person.name}'s profile`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="closeButton" onClick={onClose} aria-label="Close profile">
          ×
        </button>
        <div className="panelTop">
          <Portrait persona={person} large />
          <div>
            <span className="syntheticBadge">Synthetic person · Saudi Arabia</span>
            {/* A non-breaking hyphen keeps "Al-Zahrani" on one line. */}
            <h2>{person.name.replace(/-/g, "\u2011")}</h2>
            <p className="panelNameZh" lang="ar" dir="rtl">
              {person.nameAr}
            </p>
            <p className="panelRole">{person.role}</p>
            <p className="panelMeta">
              {person.segment} · {roleLabels[person.influenceRole]}
              {person.origin && ` · ${person.origin}`}
            </p>
          </div>
        </div>

        <div className="likelyQuestion">
          <span>Reaction to {labelFor(versionId).toLowerCase()}</span>
          <strong className={`profileStance st-${current.stance}`}>{stanceLabels[current.stance]}</strong>
          <p>&ldquo;{current.line}&rdquo;</p>
        </div>

        <section className="profileVersions">
          <p className="eyebrow">Across all five versions</p>
          <ul>
            {ksaRoomMessages.map((message) => {
              const reaction = reactionTo(message.id);
              return (
                <li key={message.id} className={message.id === versionId ? "isCurrent" : ""}>
                  <a href={`/?market=ksa&version=${message.id}&person=${person.id}`}>
                    <span className={`profileDot st-${reaction.stance}`} title={stanceLabels[reaction.stance]} />
                    <span>{labelFor(message.id)}</span>
                    <em>{stanceLabels[reaction.stance]}</em>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <KsaCampaignNote personaId={person.id} />

        {extras && (
          <div className="panelGrid">
            <section>
              <p className="eyebrow">What shapes their view</p>
              <div className="chipRow">
                {extras.cares.map((item) => (
                  <span className="softChip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <p className="eyebrow">What they need from you</p>
              <ul className="needList">
                {extras.needs.map((need) => (
                  <li key={need}>{need}</li>
                ))}
              </ul>
            </section>
          </div>
        )}

        <div className="influenceCard">
          <div>
            <span className={`rolePill rolePill-${person.influenceRole}`}>{roleLabels[person.influenceRole]}</span>
            <strong>How {person.name} affects the room</strong>
          </div>
          <p>{roleEffects[person.influenceRole]}</p>
        </div>

        <MoreAboutThem personaId={person.id} name={person.name} />

        <div className="nextSteps">
          <a className="nextLink primary" href={`/?market=ksa&version=${versionId}&person=${person.id}`}>
            <Face id={person.id} mood={current.stance} size={22} />
            See {person.name} in the room
          </a>
        </div>
      </aside>
    </div>
  );
}

// Extra depth from McCann's persona cards. The card file is large, so it only loads
// when someone opens this section. If the cards have no match, the section stays hidden.
function MoreAboutThem({ personaId, name }: { personaId: string; name: string }) {
  const [extras, setExtras] = useState<CardExtras | null | undefined>(undefined);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    setExtras(undefined);
    setMissing(false);
  }, [personaId]);

  const load = () => {
    if (extras !== undefined) return;
    import("@/data/cards")
      .then(({ cardExtras }) => {
        const found = cardExtras(personaId);
        setExtras(found);
        setMissing(!found);
      })
      .catch(() => setMissing(true));
  };

  if (missing) return null;

  return (
    <details className="evidenceDetails moreDetails" onToggle={(event) => event.currentTarget.open && load()}>
      <summary>More about {name}</summary>
      {extras === undefined && <p className="moreLoading">Loading…</p>}
      {extras && (
        <div>
          <p className="moreSay">
            <span>Say in the decision</span>
            <strong>{extras.say} out of 5</strong>
          </p>
          <MoreChips title="What makes them wary" items={extras.wary} />
          <MoreChips title="Who they trust" items={extras.trusts} />
          <MoreChips title="Where they look" items={extras.looksAt} />
          <MoreChips title="How to talk to them" items={extras.likes} />
          <section className="moreBlock">
            <p className="eyebrow">Who they influence</p>
            <p className="moreText">
              {extras.influenceNote} They pass views on to people in {listWords(extras.influences)}.
            </p>
          </section>
          {extras.group && (
            <section className="moreBlock moreGroup">
              <p className="eyebrow">What counts as proof in their group</p>
              <p className="moreHint">
                The kinds of evidence their group&rsquo;s institutions accept. If your message can&rsquo;t point to
                something like this, expect them to hold back.
              </p>
              <ul className="moreList">
                {extras.group.proof.map((item) => (
                  <li key={item.research}>{item.plain}</li>
                ))}
              </ul>
              <p className="eyebrow">What their group is talking about</p>
              <p className="moreHint">
                The live debates in their world right now. A message that speaks to these will feel relevant to
                them.
              </p>
              <ul className="moreList">
                {extras.group.debates.map((item) => (
                  <li key={item.research}>{item.plain}</li>
                ))}
              </ul>
              <details className="moreResearch">
                <summary>Show the full research</summary>
                <p className="eyebrow">Proof, in full</p>
                <ul className="moreList">
                  {extras.group.proof.map((item) => (
                    <li key={item.research}>{item.research}</li>
                  ))}
                </ul>
                <p className="eyebrow">Debates, in full</p>
                <ul className="moreList">
                  {extras.group.debates.map((item) => (
                    <li key={item.research}>{item.research}</li>
                  ))}
                </ul>
              </details>
              <p className="moreSources">
                Researched on {extras.group.researched}. Sources:{" "}
                {extras.group.sources.map((source, index, all) => {
                  const site = siteName(source.url);
                  const sameSite = all.filter((item) => siteName(item.url) === site);
                  const number = sameSite.length > 1 ? ` (${sameSite.indexOf(source) + 1})` : "";
                  return (
                    <span key={source.url}>
                      {index > 0 && "; "}
                      <a href={source.url} target="_blank" rel="noreferrer" title={source.title}>
                        {site}
                        {number}
                      </a>
                    </span>
                  );
                })}
              </p>
            </section>
          )}
          <p className="methodNote">
            From McCann&rsquo;s audience cards, last reviewed {extras.reviewed}. The person is synthetic; the
            background on their group is researched from public sources, and the short versions are our plain
            summaries of that research.
          </p>
        </div>
      )}
    </details>
  );
}

function MoreChips({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="moreBlock">
      <p className="eyebrow">{title}</p>
      <div className="chipRow">
        {items.map((item) => (
          <span className="softChip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

// Sources are often in Chinese, so the link shows the website: "www.nea.gov.cn" becomes "nea.gov.cn".
function siteName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

// "Energy", "Energy and Chemicals", "Energy, Chemicals and Government".
function listWords(items: string[]) {
  const unique = [...new Set(items)];
  if (unique.length <= 1) return unique.join("");
  return `${unique.slice(0, -1).join(", ")} and ${unique[unique.length - 1]}`;
}

function KsaCampaignNote({ personaId }: { personaId: string }) {
  const wins = ksaWinningStage(personaId);
  return (
    <section className="profileWins">
      <p className="eyebrow">In the recommended campaign</p>
      {wins.kind === "already" && <p>Already leaning in before the campaign starts.</p>}
      {wins.kind === "stage" && (
        <p>
          Won over at{" "}
          <a href={`/recommendation?market=ksa#stage-${wins.stage.id}`}>
            stage {wins.stage.number}, {wins.stage.name.toLowerCase()}
          </a>
          .
        </p>
      )}
      {wins.kind === "never" && (
        <p>
          Still to win at the end ({stanceLabels[wins.stance].toLowerCase()}).{" "}
          <a href="/recommendation?market=ksa#test">See what it would take</a>.
        </p>
      )}
    </section>
  );
}
