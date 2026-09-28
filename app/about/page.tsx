import type { Metadata } from "next";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import { ShellNav } from "@/components/PageShell";
import { SectionIcon, SectionId } from "@/components/Sections";
import "../recommendation/recommendation.css";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "How the McCann Audience Truth Engine turns what McCann knows about an audience into people you can see, question and test ideas on.",
};

const enginePillars = [
  {
    title: "Audience knowledge",
    text: "McCann's own research, licensed data, client and first-party data, and new research where it's needed.",
  },
  {
    title: "McCann process",
    text: "A set way of working out who matters, sorting the evidence, finding what each person needs and checking it holds up.",
  },
  {
    title: "Specialist expertise",
    text: "Strategists, researchers and sector experts decide which questions to ask, how much proof is enough and what the people should say.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Find the people",
    text: "Work out who matters to the decision: the people, the groups they belong to and the part each one plays.",
  },
  {
    number: "02",
    title: "Build their view",
    text: "Set down what each person cares about, what worries them, what proof they need and who they listen to.",
  },
  {
    number: "03",
    title: "Check it",
    text: "Test the assumptions against the evidence, and be clear about what the people can and can't tell you.",
  },
  {
    number: "04",
    title: "Turn it into decisions",
    text: "Use what the people tell you to choose the message, the proof and the order to say things in.",
  },
];

const uses: { id: SectionId; label: string; href: string }[] = [
  { id: "room", label: "See the reaction", href: "/" },
  { id: "ask", label: "Ask the room", href: "/ask" },
  { id: "journey", label: "Follow the decision", href: "/decision" },
  { id: "people", label: "Meet everyone", href: "/people" },
  { id: "recommendation", label: "Get the recommendation", href: "/recommendation" },
];

const roles = [
  ["Checkers", "test whether a claim is true before they'll back it."],
  ["Gatekeepers", "can say no, and make everyone else ask for more proof."],
  ["Spreaders", "pass a good idea on to a wide network of people."],
  ["Reshapers", "change what a message means as they pass it around."],
];

const dataSources = [
  "McCann Truth Central",
  "Acxiom",
  "GWI",
  "YouGov",
  "Dun & Bradstreet",
  "Client data",
  "First-party data",
  "Commissioned research",
];

export default function About() {
  return (
    <main className="rc ab">
      <header className="rcTop">
        <BrandLockup />
        <ShellNav />
      </header>

      <section className="rcHero abHero">
        <p className="rcEyebrow">About the McCann Audience Truth Engine</p>
        <h1>Audience truth you can work with.</h1>
        <p className="abHeroLead">
          The Engine turns what McCann knows about an audience into people you can see, question and
          test ideas on. Every reaction traces back to the evidence behind it.
        </p>
        <p className="abHeroSupport">
          The Engine is designed to work with AI, so the people can answer new questions and react to
          new ideas. In this demo, their reactions are prepared in advance from their data.
        </p>
      </section>

      <section className="rcSection abArchitectureSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">How it fits together</p>
            <h2>The people in the room sit on top of everything McCann knows about them.</h2>
          </div>
          <p>
            What you see is the top layer. Underneath are the people, how McCann builds them, and
            the evidence they come from.
          </p>
        </div>

        <div className="abStack" aria-label="How the Engine fits together">
          <div className="abLayer abLayerExperience">
            <div className="abLayerLabel">What you use</div>
            <div className="abLayerBody">
              <strong>Five ways into the audience</strong>
              <div className="abLayerChips">
                {uses.map((use) => (
                  <a href={use.href} key={use.id}>
                    <SectionIcon id={use.id} size={20} />
                    {use.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerModel">
            <div className="abLayerLabel">The people</div>
            <div className="abLayerBody">
              <strong>24 people with different needs and different say in the decision</strong>
              <p className="abLayerNote">
                Each one has their own priorities, the proof they need, the people they listen to
                and the part they play in how a decision gets made.
              </p>
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerEngine">
            <div className="abLayerLabel">How McCann builds them</div>
            <div className="abLayerBody">
              <strong>
                Audience knowledge <span className="abTimes">×</span> McCann process{" "}
                <span className="abTimes">×</span> specialist expertise
              </strong>
              <div className="abEngineGrid">
                {enginePillars.map((pillar) => (
                  <div key={pillar.title}>
                    <strong>{pillar.title}</strong>
                    <p>{pillar.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="abConnector" aria-hidden="true">
            <span>↑</span>
          </div>

          <div className="abLayer abLayerData">
            <div className="abLayerLabel">The evidence</div>
            <div className="abLayerBody">
              <strong>Where the knowledge comes from</strong>
              <div className="abSourceGrid">
                {dataSources.map((source) => (
                  <span key={source}>{source}</span>
                ))}
              </div>
              <p className="abLayerNote">
                Sources vary by project. The Engine can combine McCann&rsquo;s own research, data from our
                partners, client data and commissioned research.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rcSection abProcessSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">The McCann process</p>
            <h2>Four steps from data to decisions.</h2>
          </div>
          <p>The process keeps the evidence organised and the people focused on a real marketing decision.</p>
        </div>
        <div className="abProcessGrid">
          {processSteps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rcSection abPrototypeSection">
        <div className="abSectionHead">
          <div>
            <p className="abKicker">Inside this demo</p>
            <h2>24 people from six groups who shape energy decisions in China.</h2>
          </div>
          <p>
            Each person is built from their data: what shapes their view, what proof they need and
            how they affect the people around them. Each one also plays a part in how the decision
            spreads.
          </p>
        </div>

        <div className="abRoleGrid">
          {roles.map(([name, text]) => (
            <article key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="abPrototypeNote">
          <strong>Where the reactions come from</strong>
          <p>
            Our team prepared each reaction from that person&rsquo;s data and the five versions of
            the message. They show the likely direction of opinion. None of them are quotes or
            survey answers from real people.
          </p>
        </div>
      </section>

      <section className="rcSection abReadingSection">
        <p className="abKicker">How to use what you see</p>
        <h2>Use the room to spot patterns, disagreements and the next problem to solve.</h2>
        <div className="abTwo abBoundaryGrid">
          <div className="abText">
            <h3>Good for</h3>
            <ul>
              <li>Seeing who leans in, who has doubts and who tunes out.</li>
              <li>Understanding the proof different groups need.</li>
              <li>Finding where a message gets stuck on its way through a decision.</li>
              <li>Comparing different versions of a message.</li>
              <li>Working out the order to say things in.</li>
            </ul>
          </div>
          <div className="abText">
            <h3>Check with real people when</h3>
            <ul>
              <li>You need numbers or percentages for a whole population.</li>
              <li>You need to predict what one person will do.</li>
              <li>You&rsquo;re testing an idea the people&rsquo;s data doesn&rsquo;t cover.</li>
              <li>You need to sign off finished creative before launch.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rcOnward abOnward">
        <p className="abKicker">See it for yourself</p>
        <h2>Go back into the room.</h2>
        <div className="nextSteps onDark">
          <a className="nextLink primary" href="/">
            Go to the room
          </a>
          <a className="nextLink" href="/ask">
            Ask the room
          </a>
          <a className="nextLink" href="/recommendation">
            See the recommendation
          </a>
        </div>
      </section>

      <footer className="rcFoot">
        <p>The McCann Audience Truth Engine is an early prototype.</p>
        <McCannCredit />
      </footer>
    </main>
  );
}
