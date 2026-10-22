export default function AuthHero() {
  return (
    <div className="auth-hero">
      <span className="bubble bubble-1" />
      <span className="bubble bubble-2" />
      <span className="bubble bubble-3" />

      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="brand-logo" />
        <div>
          <div className="fw-bold fs-5">MiBilletera</div>
          <small>Tu dinero, siempre contigo</small>
        </div>
      </div>

      <h2 className="hero-title">
        Envía, recibe<br />y controla tu dinero<br />
        <span>en un solo lugar.</span>
      </h2>

      <p className="hero-script my-4">
        Una forma simple,<br />rápida y segura de administrar tu dinero.
      </p>

      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="hero-dot" />
        <div>
          <div className="fw-semibold fs-5">Transferencias</div>
          <small>Envía dinero a cualquier persona.</small>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="hero-dot" />
        <div>
          <div className="fw-semibold fs-5">Seguro y confiable</div>
          <small>Tu información y dinero están protegidos.</small>
        </div>
      </div>
    </div>
  );
}