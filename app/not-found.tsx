import { BrandLockup, McCannCredit } from "@/components/Brand";
import "./recommendation/recommendation.css";

export default function NotFound() {
  return (
    <main className="rc">
      <header className="rcTop">
        <BrandLockup />
      </header>

      <section className="rcHero">
        <p className="rcEyebrow">Page not found</p>
        <h1>We couldn&rsquo;t find that page.</h1>
        <p className="rcLead">The link may be out of date or mistyped. Here are the main places to go.</p>
        <div className="nextSteps">
          <a className="nextLink primary" href="/">
            Go to the room
          </a>
          <a className="nextLink" href="/recommendation">
            See the recommendation
          </a>
          <a className="nextLink" href="/people">
            Meet the people
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
