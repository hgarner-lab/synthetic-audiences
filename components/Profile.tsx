"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { personas, Persona } from "@/data/personas";
import { roomMessages, stanceLabels, Stance } from "@/data/reactions";
import { snapshots, stages } from "@/data/campaign";
import { Face } from "@/components/Face";
import { Portrait } from "@/components/Portrait";
import { readVersion, versionLabel } from "@/components/version";

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

  return (
    <ProfileContext.Provider value={{ openProfile }}>
      {children}
      {person && <ProfilePanel persona={person} onClose={() => setPersonaId(null)} />}
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
