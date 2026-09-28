"use client";

import { useEffect, useMemo, useState } from "react";
import { personas, segments } from "@/data/personas";
import { roomMessages, stanceLabels } from "@/data/reactions";
import { InitialsPortrait, Portrait } from "@/components/Portrait";
import { ksaPeople } from "@/data/ksaPeople";
import { SectionTag } from "@/components/Sections";
import { useProfile } from "@/components/Profile";
import { readVersion, versionLabel } from "@/components/version";

export function PeopleList() {
  const { openProfile } = useProfile();
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [versionId, setVersionId] = useState("original");
  // China is the room everyone knows. Saudi Arabia (?market=ksa) shows its people only, for now.
  const [market, setMarket] = useState<"china" | "ksa">("china");

  useEffect(() => {
    setVersionId(readVersion());
    const params = new URLSearchParams(window.location.search);
    const person = params.get("person");
    if (params.get("market") === "ksa" || person?.startsWith("SA_")) setMarket("ksa");
    // A ?person= link opens that person's profile straight away.
    if (person && [...personas, ...ksaPeople].some((item) => item.id === person)) openProfile(person);
  }, [openProfile]);

  const chooseMarket = (next: "china" | "ksa") => {
    setMarket(next);
    setActiveSegment("All");
    const url = new URL(window.location.href);
    if (next === "ksa") url.searchParams.set("market", "ksa");
    else url.searchParams.delete("market");
    url.searchParams.delete("person");
    window.history.replaceState(null, "", url);
  };

  const reactions = useMemo(() => {
    const message = roomMessages.find((item) => item.id === versionId) ?? roomMessages[0];
    return Object.fromEntries(message.reactions.map((item) => [item.personaId, item.stance]));
  }, [versionId]);

  const visiblePeople = activeSegment === "All" ? personas : personas.filter((p) => p.segment === activeSegment);
  const visibleKsa = activeSegment === "All" ? ksaPeople : ksaPeople.filter((p) => p.segment === activeSegment);

  return (
    <section className="communitySection" id="community">
      <div className="communityHeader">
        <div>
          <SectionTag id="people" />
          <h2>Everyone involved in the decision</h2>
          <div className="marketSwitch" role="group" aria-label="Choose a market">
            <button
              className={market === "china" ? "active" : ""}
              aria-pressed={market === "china"}
              onClick={() => chooseMarket("china")}
            >
              China
            </button>
            <button
              className={market === "ksa" ? "active" : ""}
              aria-pressed={market === "ksa"}
              onClick={() => chooseMarket("ksa")}
            >
              Saudi Arabia <span>New</span>
            </button>
          </div>
          {market === "china" ? (
            <p className="communityIntroCopy">
              Meet all 24 people: what each one cares about, what they need, and how they affect everyone else. Their
              reactions are to the <strong>{versionLabel(versionId).toLowerCase()}</strong>.{" "}
              <a href={`/?version=${versionId}`}>Try another version in the room</a>.
            </p>
          ) : (
            <p className="communityIntroCopy">
              Meet the 24 people who shape the same kind of decision in Saudi Arabia. They haven&rsquo;t reacted to a
              message yet: that comes next. Until their faces are ready, each person shows as their initials.
            </p>
          )}
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

      {market === "ksa" ? (
        <div className="peopleGrid">
          {visibleKsa.map((person, index) => (
            <button
              className="personTile"
              key={person.id}
              onClick={() => openProfile(person.id)}
              style={{ animationDelay: `${Math.min(index * 25, 350)}ms` }}
            >
              <InitialsPortrait name={person.name} influenceRole={person.influenceRole} />
              <div className="personCopy">
                <div className="personNameRow">
                  <strong>{person.name.replace(/-/g, "\u2011")}</strong>
                </div>
                <span>{person.role}</span>
                <em className="personStance st-waiting">Not in the room yet</em>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="peopleGrid">
          {visiblePeople.map((persona, index) => (
            <button
              className="personTile"
              key={persona.id}
              onClick={() => openProfile(persona.id)}
              style={{ animationDelay: `${Math.min(index * 25, 350)}ms` }}
            >
              <Portrait persona={persona} />
              <div className="personCopy">
                <div className="personNameRow">
                  <strong>{persona.name}</strong>
                </div>
                <span>{persona.role}</span>
                <em className={`personStance st-${reactions[persona.id]}`}>{stanceLabels[reactions[persona.id]]}</em>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
