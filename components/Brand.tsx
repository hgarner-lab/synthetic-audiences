// The McCann logo followed by the product name, so it reads "McCann Audience Truth Engine".
// Used at the top of every page.
export function BrandLockup({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <a className={`brandLockup brandLockup-${tone}`} href="/" aria-label="McCann Audience Truth Engine, back to the room">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brandLockupLogo"
        src={tone === "light" ? "/brand/mccann-white.png" : "/brand/mccann-black.png"}
        alt="McCann"
        width={482}
        height={114}
      />
      <span className="brandLockupRule" aria-hidden="true" />
      <span className="brandLockupName">AUDIENCE TRUTH ENGINE</span>
    </a>
  );
}

// Small sign-off used in page footers.
export function McCannCredit() {
  return <span className="mccannCredit">A McCann prototype</span>;
}
