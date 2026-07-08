const logoIconSrc = `${import.meta.env.BASE_URL}assets/replayguard-logo-icon.png`;

export function BrandLogo() {
  return (
    <>
      <img className="brand-mark" src={logoIconSrc} alt="" aria-hidden="true" />
      <span className="brand-wordmark">ReplayGuard</span>
    </>
  );
}
