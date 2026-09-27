"use client";

import { useEffect, useState } from "react";
import { personas, segments, InfluenceRole } from "@/data/personas";
import { Stance, stanceLabels, stanceOrder } from "@/data/reactions";
import { recommendation, recommendedId, versionTallies } from "@/data/recommendation";
import { bigIdea, channelsNote, countStances, snapshots, stages } from "@/data/campaign";
import { Face } from "@/components/Face";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import "./recommendation.css";

const personById = Object.fromEntries(personas.map((persona) => [persona.id, persona]));
const recommendedTally = versionTallies.find((tally) => tally.id === recommendedId)!;
const roleOrder: InfluenceRole[] = ["validate", "block", "amplify", "reframe"];

// The room laid out as on the home page: groups across, roles down.
const roomOrder = roleOrder.flatMap((role) =>
  segments.map((segment) => personas.find((p) => p.segment === segment && p.influenceRole === role)!.id)
);

function firstName(personaId: string) {
  return personById[personaId].name.split(" ")[0];
}

function MiniRoom({ stances, focus }: { stances: Record<string, Stance>; focus: string[] }) {
  return (
    <div className="rcMiniRoom" aria-hidden="true">
      {roomOrder.map((id) => (
        <span key={id} className={`rcMiniFace st-${stances[id]} ${focus.includes(id) ? "focus" : ""}`}>
          <Face id={id} mood={stances[id]} size={34} />
        </span>
      ))}
    </div>
  );
}

function StanceBar({ stances }: { stances: Record<string, Stance> }) {
  const counts = countStances(stances);
  return (
    <div className="rcBar" aria-hidden="true">
      {stanceOrder.map((stance) => (
        <span key={stance} className={`st-${stance}`} style={{ flexGrow: counts[stance] }} />
      ))}
    </div>
  );
}

export default function Recommendation() {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const version = new URLSearchParams(window.location.search).get("version");
    if (version && versionTallies.some((tally) => tally.id === version)) setPickedId(version);
  }, []);

  const picked = versionTallies.find((tally) => tally.id === pickedId);
  const finalCounts = countStances(snapshots[snapshots.length - 1].stances);

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
        <h1>{bigIdea.name}</h1>
        <p className="rcLine">“{bigIdea.line}”</p>
        <p className="rcLead">{bigIdea.summary}</p>

        {picked && (
          <p className="rcPicked">
            {picked.id === recommendedId ? (
              <>You picked <strong>{picked.label}</strong>. That&rsquo;s the version this campaign is built on.</>
            ) : (
              <>
                You picked <strong>{picked.label}</strong>: {picked.counts.in} people leaning in and{" "}
                {picked.counts.pushback} pushing back. This campaign leads with independent proof instead (
                {recommendedTally.counts.in} leaning in, nobody pushing back), and brings in your angle later
                where it helps.
              </>
            )}
          </p>
        )}
      </section>

      <section className="rcSection">
        <h2>How the room moves through the campaign</h2>
        <p className="rcIntro">
          Each stage wins over a different group. By the end, {finalCounts.in} of 24 people are leaning in.
        </p>
        <div className="rcCompare">
          {snapshots.map((snapshot, index) => {
            const counts = countStances(snapshot.stances);
            return (
              <div key={snapshot.id} className={`rcRow ${index === snapshots.length - 1 ? "best" : ""}`}>
                <div className="rcRowLabel">
                  <strong>
                    {index > 0 && <span className="rcStageNum">{index}</span>}
                    {snapshot.label}
                  </strong>
                </div>
                <StanceBar stances={snapshot.stances} />
                <p className="rcRowCounts">
                  <strong>{counts.in}</strong> leaning in · <strong>{counts.pushback}</strong> pushing back
                  <span className="rcSr">
                    {" "}
                    · {counts.unsure} not convinced · {counts.out} tuning out
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        <Key />
        <p className="rcSmall">This assumes the proof for each stage is real and ready before that stage starts.</p>
      </section>

      <section className="rcSection">
        <h2>How we chose where to start</h2>
        <p className="rcIntro">
          We put five versions of the message to the room. Leading with independent proof won over the most people
          and created no new objections, so the campaign opens with it.
        </p>
        <div className="rcCompare">
          {versionTallies.map((tally) => (
            <div
              key={tally.id}
              className={`rcRow ${tally.id === recommendedId ? "best" : ""} ${tally.id === pickedId ? "picked" : ""}`}
            >
              <div className="rcRowLabel">
                <strong>{tally.label}</strong>
                <span>
                  {tally.id === recommendedId && <em className="rcTag">Where we start</em>}
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
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rcSection">
        <h2>The campaign, stage by stage</h2>
        <p className="rcIntro">
          Each stage speaks to the people who matter most at that point, and gives them the proof they need to move
          on.
        </p>

        {stages.map((stage, index) => {
          const before = snapshots[index].stances;
          const after = snapshots[index + 1].stances;
          const gained = countStances(after).in - countStances(before).in;
          return (
            <article key={stage.id} className="rcStage" id={`stage-${stage.id}`}>
              <header className="rcStageHead">
                <span className="rcStageBadge">
                  Stage {stage.number} · {stage.funnel}
                </span>
                <h3>{stage.name}</h3>
                <p>{stage.goal}</p>
              </header>

              <div className="rcStageBody">
                <div className="rcStageRoom">
                  <MiniRoom stances={after} focus={stage.people.map((p) => p.personaId)} />
                  <p>
                    <strong>{countStances(after).in} of 24</strong> leaning in after this stage
                    {gained > 0 && <span className="rcGain"> +{gained}</span>}
                  </p>
                </div>
                <div>
                  <p className="rcLabel">Who matters now</p>
                  <p className="rcWho">{stage.whoMatters}</p>
                  <p className="rcLabel">What we say</p>
                  <blockquote className="rcStageMessage">“{stage.message}”</blockquote>
                  {stage.messageNote && <p className="rcNote">{stage.messageNote}</p>}
                  <p className="rcLabel">Why it works</p>
                  <p className="rcWhy">{stage.whyItWorks}</p>
                </div>
              </div>

              <ul className="rcPeople rcStagePeople">
                {stage.people.map((person) => {
                  const from = before[person.personaId];
                  return (
                    <li key={person.personaId}>
                      <span className={`rcFace st-${person.stance}`}>
                        <Face id={person.personaId} mood={person.stance} size={48} />
                      </span>
                      <div>
                        <strong>{personById[person.personaId].name}</strong>
                        <small>{personById[person.personaId].role}</small>
                        <span className="rcShift">
                          {from !== person.stance && (
                            <>
                              <em className={`st-${from}`}>{stanceLabels[from]}</em> →{" "}
                            </>
                          )}
                          <em className={`st-${person.stance}`}>{stanceLabels[person.stance]}</em>
                        </span>
                        <p>“{person.line}”</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="rcStageCols">
                <div>
                  <p className="rcLabel">Proof they need</p>
                  <div className="rcChips">
                    {stage.proof.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="rcLabel">Channels and formats</p>
                  <ul>
                    {stage.channels.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="rcLabel">Signs it&rsquo;s working</p>
                  <ul>
                    {stage.successSigns.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
        <p className="rcSmall">{channelsNote}</p>
      </section>

      <section className="rcSection">
        <h2>The whole plan on one page</h2>
        <p className="rcIntro">
          <strong>{bigIdea.name}.</strong> “{bigIdea.line}”
        </p>
        <div className="rcPlan">
          {stages.map((stage) => (
            <div key={stage.id} className="rcPlanCol">
              <span className="rcStageBadge">
                Stage {stage.number} · {stage.funnel}
              </span>
              <h3>{stage.name}</h3>
              <p className="rcLabel">Who</p>
              <p>{stage.people.map((p) => firstName(p.personaId)).join(", ")}</p>
              <p className="rcLabel">Message</p>
              <p className="rcPlanMessage">“{stage.message}”</p>
              <p className="rcLabel">Proof</p>
              <p>{stage.proof.join(" · ")}</p>
              <p className="rcLabel">Channels</p>
              <ul>
                {stage.channels.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="rcLabel">Working when</p>
              <ul>
                {stage.successSigns.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rcSection">
        <h2>What has to be true first</h2>
        <p className="rcIntro">The campaign only works if these exist. None of them can be skipped.</p>
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
          This recommendation is based on synthetic people: made up, but built from our audience data. Reactions to
          each stage are our team&rsquo;s judgement from what each person needs. Test the finished work with real
          people before launch.
        </p>
        <McCannCredit />
      </footer>
    </main>
  );
}

function Key() {
  return (
    <ul className="rcKey" aria-hidden="true">
      {stanceOrder.map((stance) => (
        <li key={stance}>
          <span className={`rcDot st-${stance}`} />
          {stanceLabels[stance]}
        </li>
      ))}
    </ul>
  );
}
