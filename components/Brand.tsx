// Product name with the McCann wordmark, used at the top of every page.
export function BrandLockup({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <a className={`brandLockup brandLockup-${tone}`} href="/" aria-label="Synthetic Audiences by McCann, back to the room">
      <span className="brandLockupName">SYNTHETIC AUDIENCES</span>
      <span className="brandLockupRule" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brandLockupLogo"
        src={tone === "light" ? "/brand/mccann-white.png" : "/brand/mccann-black.png"}
        alt="McCann"
        width={482}
        height={114}
      />
    </a>
  );
}

// Small sign-off used in page footers.
export function McCannCredit() {
  return <span className="mccannCredit">A McCann prototype</span>;
}
