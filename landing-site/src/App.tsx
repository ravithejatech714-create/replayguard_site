import { useState } from 'react';
import { demoLinks, faqs, features, metrics, pains, safety, screenshots, solutions } from './data/content';

export function App() {
  const [activeScreenshot, setActiveScreenshot] = useState<(typeof screenshots)[number] | null>(null);

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="ReplayGuard home">
          <span className="brand-mark">RG</span>
          <span>ReplayGuard</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#problem">Problem</a>
          <a href="#features">Features</a>
          <a href="#screenshots">Screenshots</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href={demoLinks.requestDemo}>Request Demo</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Self-hosted Kafka replay control plane</p>
            <h1>Replay Kafka messages with guardrails, visibility, and audit history.</h1>
            <p className="hero-text">
              ReplayGuard helps engineering teams move Kafka replay and incident debugging from risky scripts
              to repeatable workflows with validation, RBAC, lifecycle controls, and worker progress tracking.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={demoLinks.requestDemo}>Request Demo</a>
              <a className="button secondary" href={demoLinks.viewPlatform}>View Platform</a>
            </div>
            <div className="trust-row" aria-label="Platform highlights">
              <span>Controlled replay</span>
              <span>Bounded inspection</span>
              <span>Self-hosted deployment</span>
            </div>
          </div>
          <ProductPreview />
        </section>

        <section id="problem" className="section two-column">
          <div>
            <p className="eyebrow">The replay problem</p>
            <h2>Kafka replay is powerful. Without controls, it is also easy to get wrong.</h2>
            <p>
              Teams often need to inspect messages, recover pipelines, backfill consumers, or reproduce incidents.
              ReplayGuard gives those actions an operational workflow instead of leaving them scattered across local scripts.
            </p>
          </div>
          <div className="pain-list">
            {pains.map((pain) => <div className="pain-item" key={pain}>{pain}</div>)}
          </div>
        </section>

        <section className="section solution-band">
          <div className="section-heading">
            <p className="eyebrow">The ReplayGuard approach</p>
            <h2>Guide, validate, execute, and audit replay operations.</h2>
          </div>
          <div className="solution-grid">
            {solutions.map((solution, index) => (
              <article key={solution} className="solution-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{solution}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section metrics-section">
          <div className="section-heading">
            <p className="eyebrow">Careful value</p>
            <h2>Move from ad-hoc recovery to repeatable replay operations.</h2>
          </div>
          <div className="metrics-grid">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <p>{metric.text}</p>
              </article>
            ))}
          </div>
          <EstimatePanel />
        </section>

        <section id="features" className="section">
          <div className="section-heading">
            <p className="eyebrow">Platform capabilities</p>
            <h2>Built for backend, platform, and SRE teams.</h2>
          </div>
          <div className="feature-grid">
            {features.map(([title, text]) => (
              <article className="feature-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section safety-section">
          <div className="section-heading">
            <p className="eyebrow">Replay safety</p>
            <h2>Guardrails before messages move.</h2>
          </div>
          <div className="safety-grid">
            {safety.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="screenshots" className="section screenshots-section">
          <div className="section-heading">
            <p className="eyebrow">Product views</p>
            <h2>See the core ReplayGuard workflows.</h2>
            <p>
              These sanitized demo screenshots show the control-plane views customers use to inspect Kafka topics,
              validate replay requests, monitor execution, and review audit history.
            </p>
          </div>
          <div className="screenshot-grid">
            {screenshots.map((shot, index) => (
              <ScreenshotCard
                key={shot.title}
                shot={shot}
                index={index}
                onOpen={() => setActiveScreenshot(shot)}
              />
            ))}
          </div>
        </section>

        <section className="section demo-cta">
          <div>
            <p className="eyebrow">See ReplayGuard in action</p>
            <h2>Bring safer Kafka replay workflows to your team.</h2>
            <p>
              Share a few details about your Kafka setup, replay pain points, and deployment preferences.
              We will follow up with a focused product walkthrough.
            </p>
          </div>
          <a className="button primary" href={demoLinks.requestDemo}>Request a Demo</a>
        </section>

        <section id="faq" className="section faq-section">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Common questions from platform teams.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand"><span className="brand-mark">RG</span><span>ReplayGuard</span></div>
        <div className="footer-links">
          <a href={demoLinks.requestDemo}>Request Demo</a>
          <a href={demoLinks.contact}>Contact</a>
          <a href="#screenshots">Screenshots</a>
        </div>
        <p>Copyright {new Date().getFullYear()} ReplayGuard. All rights reserved.</p>
      </footer>
      {activeScreenshot && (
        <ScreenshotLightbox shot={activeScreenshot} onClose={() => setActiveScreenshot(null)} />
      )}
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="ReplayGuard platform preview">
      <div className="preview-top">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
        <strong>Replay Jobs</strong>
      </div>
      <div className="preview-grid">
        <aside>
          <span className="nav-line selected" />
          <span className="nav-line" />
          <span className="nav-line short" />
          <span className="nav-line" />
        </aside>
        <div className="preview-main">
          <div className="preview-stat-row">
            <div><span>Ready</span><strong>4</strong></div>
            <div><span>Running</span><strong>1</strong></div>
            <div><span>Workers</span><strong>3</strong></div>
          </div>
          <div className="preview-table">
            {['READY', 'RUNNING', 'PAUSED', 'SUCCEEDED'].map((status) => (
              <div className="preview-row" key={status}>
                <span className={`pill ${status.toLowerCase()}`}>{status}</span>
                <span className="route-line" />
                <span className="offset-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EstimatePanel() {
  return (
    <aside className="estimate-panel" aria-label="Estimated workflow savings example">
      <div>
        <span>Incidents per month</span>
        <strong>6</strong>
      </div>
      <div>
        <span>Manual hours each</span>
        <strong>3</strong>
      </div>
      <div>
        <span>Estimated time reclaimed</span>
        <strong>Guided workflows</strong>
      </div>
      <p>Numbers are examples only. Actual savings depend on incident type, replay process, and team workflow.</p>
    </aside>
  );
}

function ScreenshotCard({
  shot,
  index,
  onOpen,
}: {
  shot: { title: string; path: string; text: string };
  index: number;
  onOpen: () => void;
}) {
  const imagePath = `${import.meta.env.BASE_URL}${shot.path.replace(/^\//, '')}`;
  return (
    <article className="screenshot-card">
      <button
        type="button"
        className={`screenshot-placeholder theme-${index % 3}`}
        onClick={onOpen}
        aria-label={`Open larger ${shot.title} screenshot`}
      >
        <img
          src={imagePath}
          alt={`${shot.title} screenshot`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="placeholder-bar" />
        <div className="placeholder-body">
          <span />
          <span />
          <span />
        </div>
      </button>
      <div>
        <h3>{shot.title}</h3>
        <p>{shot.text}</p>
      </div>
    </article>
  );
}

function ScreenshotLightbox({
  shot,
  onClose,
}: {
  shot: { title: string; path: string; text: string };
  onClose: () => void;
}) {
  const imagePath = `${import.meta.env.BASE_URL}${shot.path.replace(/^\//, '')}`;
  return (
    <div className="lightbox-backdrop" role="presentation" onClick={onClose}>
      <section
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby="screenshot-lightbox-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <p className="eyebrow">Product screenshot</p>
            <h2 id="screenshot-lightbox-title">{shot.title}</h2>
          </div>
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close screenshot preview">
            Close
          </button>
        </header>
        <img src={imagePath} alt={`${shot.title} screenshot enlarged`} />
        <p>{shot.text}</p>
      </section>
    </div>
  );
}

