// The product lockup, used at the top of every page: MATE, with its full name beside it.
export function BrandLockup({ tone = "light" }: { tone?: "dark" | "light" }) {
  return (
    <a className={`brandLockup brandLockup-${tone}`} href="/" aria-label="MATE, the McCann Audience Truth Engine. Back to the room">
      <span className="brandLockupName">MATE</span>
      <span className="brandLockupRule" aria-hidden="true" />
      <span className="brandLockupFull">McCann Audience Truth Engine</span>
    </a>
  );
}

// Small sign-off used in page footers.
export function McCannCredit() {
  return <span className="mccannCredit">A McCann prototype</span>;
}
