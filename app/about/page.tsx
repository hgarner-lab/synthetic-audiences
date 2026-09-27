import type { Metadata } from "next";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import "../recommendation/recommendation.css";
import "./about.css";

export const metadata: Metadata = {
  title: "How this works · Synthetic Audiences",
  description: "Who the synthetic people are, where their reactions come from, and what they can and can't tell you.",
};

const roles = [
  ["Checkers", "test whether a claim is true before they'll back it."],
  ["Gatekeepers", "can say no, and make everyone else ask for more proof."],
  ["Spreaders", "pass a good idea on to a wide network of people."],
  ["Reshapers", "change what a message means as they pass it around."],
];

export default function About() {
  return (
    <main className="rc">
      <header className="rcTop">
        <BrandLockup />
        <nav className="rcNav">
          <a href="/">← Back to the room</a>
          <a href="/recommendation">See the recommendation</a>
        </nav>
      </header>

      <section className="rcHero">
        <p className="rcEyebrow">How this works</p>
        <h1>Put a campaign message in front of the people who decide on it, before you spend on research or creative.</h1>
      </section>

      <section className="rcSection abText">
        <h2>Who the people are</h2>
        <p>
          The room holds 24 synthetic people. They are made up, but each one is built from our audience data. In this
          demo they are senior decision-makers in China&rsquo;s energy and industrial world, across six groups: energy,
          chemicals, finance and legal, government, technology, and media and commentary.
        </p>
        <p>Each group has four kinds of people:</p>
        <ul>
          {roles.map(([name, text]) => (
            <li key={name}>
              <strong>{name}</strong> {text}
            </li>
          ))}
        </ul>
        <p>
          For every person we know what shapes their view, what they need before they&rsquo;ll back a message, and how
          they affect the people around them.
        </p>
      </section>

      <section className="rcSection abText">
        <h2>Where their reactions come from</h2>
        <p>
          In this demo, our team wrote each reaction from that person&rsquo;s data: what they care about and what they
          need. The reactions are not generated live by AI, and they are not quotes from real people.
        </p>
      </section>

      <section className="rcSection abTwo">
        <div className="abText">
          <h2>What it can tell you</h2>
          <ul>
            <li>Who is likely to lean in, doubt the message or tune out.</li>
            <li>What proof each group needs before they&rsquo;ll back it.</li>
            <li>How changing the message moves people.</li>
            <li>Where fixing one problem creates another.</li>
          </ul>
        </div>
        <div className="abText">
          <h2>What it can&rsquo;t tell you</h2>
          <ul>
            <li>How many real people will react a certain way. It&rsquo;s not a survey or a forecast.</li>
            <li>How people react to wording it hasn&rsquo;t been set up for. This demo covers five versions of one message.</li>
            <li>Whether the finished campaign works. Always test it with real people before launch.</li>
          </ul>
        </div>
      </section>

      <section className="rcOnward">
        <h2>Where to next?</h2>
        <div className="nextSteps onDark">
          <a className="nextLink primary" href="/">
            Go to the room
          </a>
          <a className="nextLink" href="/recommendation">
            See the recommendation
          </a>
          <a className="nextLink" href="/explore">
            Explore the full audience
          </a>
        </div>
      </section>

      <footer className="rcFoot">
        <p>Synthetic Audiences is an early prototype.</p>
        <McCannCredit />
      </footer>
    </main>
  );
}
