"use client";

import { useEffect, useMemo, useState } from "react";
import { personas, segments } from "@/data/personas";
import { roomMessages, stanceLabels } from "@/data/reactions";
import { Portrait } from "@/components/Portrait";
import { SectionTag } from "@/components/Sections";
import { useProfile } from "@/components/Profile";
import { readVersion, versionLabel } from "@/components/version";

export function PeopleList() {
  const { openProfile } = useProfile();
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [versionId, setVersionId] = useState("original");

  useEffect(() => {
    setVersionId(readVersion());
    // A ?person= link opens that person's profile straight away.
    const person = new URLSearchParams(window.location.search).get("person");
    if (person && personas.some((item) => item.id === person)) openProfile(person);
  }, [openProfile]);

  const reactions = useMemo(() => {
    const message = roomMessages.find((item) => item.id === versionId) ?? roomMessages[0];
    return Object.fromEntries(message.reactions.map((item) => [item.personaId, item.stance]));
  }, [versionId]);

  const visiblePeople = activeSegment === "All" ? personas : personas.filter((p) => p.segment === activeSegment);

  return (
    <section className="communitySection" id="community">
      <div className="communityHeader">
        <div>
          <SectionTag id="people" />
          <h2>Everyone involved in the decision</h2>
          <p className="communityIntroCopy">
            Meet all 24 people: what each one cares about, what they need, and how they affect everyone else. Their
            reactions are to the <strong>{versionLabel(versionId).toLowerCase()}</strong>.{" "}
            <a href={`/?version=${versionId}`}>Try another version in the room</a>.
          </p>
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
    </section>
  );
}
