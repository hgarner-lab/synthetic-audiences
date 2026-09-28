import type { ReactNode } from "react";
import { BrandLockup, McCannCredit } from "@/components/Brand";
import { SectionIcon, SectionId, sections } from "@/components/Sections";
import "@/app/recommendation/recommendation.css";

const links: { id: SectionId; href: string; label: string }[] = [
  { id: "room", href: "/", label: "The room" },
  { id: "ask", href: "/ask", label: "Ask the room" },
  { id: "journey", href: "/decision", label: "Follow the decision" },
  { id: "people", href: "/people", label: "The people" },
  { id: "recommendation", href: "/recommendation", label: "The recommendation" },
];

// The main navigation, used in page headers.
export function ShellNav({ current }: { current?: SectionId }) {
  return (
    <nav className="shellNav" aria-label="Main">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className={link.id === current ? "isCurrent" : ""}
          aria-current={link.id === current ? "page" : undefined}
          style={{ "--accent": sections[link.id].colour } as React.CSSProperties}
        >
          <SectionIcon id={link.id} size={22} />
          <span>{link.label}</span>
        </a>
      ))}
    </nav>
  );
}

// Header, navigation and footer shared by the pages around the room.
export function PageShell({ current, children }: { current?: SectionId; children: ReactNode }) {
  return (
    <main className="rc">
      <header className="rcTop">
        <BrandLockup />
        <ShellNav current={current} />
      </header>
      {children}
      <footer className="rcFoot">
        <p>
          These are synthetic people: made up, but built from our audience data. Treat what they say as a guide, and
          test the finished work with real people. <a href="/about">How this works</a>
        </p>
        <McCannCredit />
      </footer>
    </main>
  );
}
