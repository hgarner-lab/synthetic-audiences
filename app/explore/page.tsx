"use client";

import { useEffect } from "react";

// The explore page has been split into /ask, /decision and /people.
// Old links (including #section and ?person= / ?ask= links) are sent to the right place.
export default function ExploreRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    const person = params.get("person");
    const ask = params.get("ask");
    let target = "/people";
    if (hash === "ask" || ask) target = ask ? `/ask?ask=${ask}` : "/ask";
    else if (hash === "journey") target = "/decision";
    else if (hash === "try") target = "/";
    if (person) target = `/people?person=${person}`;
    window.location.replace(target);
  }, []);

  return null;
}
