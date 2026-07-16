import { useEffect, useState } from 'react';
import { track } from './analytics';
import { BrandLogo } from './BrandLogo';
import { LeadCaptureForm } from './LeadCaptureForm';
import {
  audienceFit,
  capabilityGroups,
  demoVideo,
  deploymentCallouts,
  diagnosticQuestions,
  evaluationSteps,
  faqs,
  fitComparisons,
  legalPages,
  operationalImpact,
  replayComparison,
  safetyGroups,
  screenshots,
  site,
  successCriteria,
  workflowSteps,
} from './data/content';

type Screenshot = (typeof screenshots)[number];
type LegalPageKey = keyof typeof legalPages;

export function App() {
  const [activeScreenshot, setActiveScreenshot] = useState<Screenshot | null>(null);
  const [hash, setHash] = useState(window.location.hash);
  const activePage = getLegalPage(hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      {activePage ? (
        <LegalPage pageKey={activePage} />
      ) : (
        <MarketingPage
          activeScreenshot={activeScreenshot}
          setActiveScreenshot={setActiveScreenshot}
        />
      )}
      <Footer />
      {activeScreenshot && (
        <ScreenshotLightbox shot={activeScreenshot} onClose={() => setActiveScreenshot(null)} />
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="ReplayGuard home">
        <BrandLogo />
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#problem">Problem</a>
        <a href="#workflow">Workflow</a>
        <a href="#product">Product</a>
        <a href="#security">Security</a>
        <a href="#deployment">Deployment</a>
        <a href="#evaluation">Evaluation</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a
        className="nav-cta"
        href="#request-review"
        onClick={() => track('hero_review_cta_click', { source: 'header' })}
      >
        Book a Replay Safety Review
      </a>
    </header>
  );
}

function MarketingPage({
  activeScreenshot,
  setActiveScreenshot,
}: {
  activeScreenshot: Screenshot | null;
  setActiveScreenshot: (shot: Screenshot | null) => void;
}) {
  return (
    <main id="main-content">
      <HeroSection />
      <DiagnosticQuestions />
      <DemoVideoSection />
      <ReplayComparison />
      <ReplayWorkflow />
      <OperationalImpact />
      <ProductCapabilities />
      <ProductScreenshots activeScreenshot={activeScreenshot} onOpen={setActiveScreenshot} />
      <SecuritySection />
      <DeploymentArchitecture />
      <AudienceFit />
      <EvaluationProcess />
      <PositioningComparison />
      <AboutReplayGuard />
      <FAQSection />
      <LeadCaptureSection />
      <FinalCTA />
    </main>
  );
}

function HeroSection() {
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Self-hosted Kafka replay control plane</p>
        <h1>Replay Kafka messages without relying on risky production scripts</h1>
        <p className="hero-text">
          ReplayGuard gives platform and SRE teams a controlled workflow to inspect, validate,
          execute and audit Kafka replays inside their own infrastructure.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href="#request-review"
            onClick={() => track('hero_review_cta_click', { source: 'hero' })}
          >
            Book a Kafka Replay Safety Review
          </a>
          <a className="button secondary" href="#demo">Watch the 3-Minute Workflow</a>
        </div>
        <div className="trust-row" aria-label="Platform highlights">
          <span>Self-hosted</span>
          <span>Customer-controlled Kafka access</span>
          <span>RBAC</span>
          <span>Audit history</span>
          <span>Rate-limited execution</span>
        </div>
      </div>
      <ProductPreview />
    </section>
  );
}

function DiagnosticQuestions() {
  return (
    <section id="problem" className="section diagnostic-section">
      <div className="section-heading">
        <p className="eyebrow">How controlled is your current replay process?</p>
        <h2>Can your team answer these questions before a replay begins?</h2>
      </div>
      <div className="question-grid">
        {diagnosticQuestions.map((question, index) => (
          <article className="question-card" key={question}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{question}</p>
          </article>
        ))}
      </div>
      <p className="closing-statement">
        If these answers depend on the engineer running the script, the workflow is not yet standardized.
      </p>
    </section>
  );
}

function DemoVideoSection() {
  const videoPath = `${import.meta.env.BASE_URL}${demoVideo.path.replace(/^\//, '')}`;
  const posterPath = `${import.meta.env.BASE_URL}${demoVideo.poster.replace(/^\//, '')}`;

  return (
    <section id="demo" className="section demo-video-section">
      <div className="section-heading">
        <p className="eyebrow">See the workflow</p>
        <h2>From selected offsets to controlled execution</h2>
        <p>
          See how an operator inspects Kafka records, creates a replay request, reviews validation,
          monitors execution and uses pause, resume or stop controls.
        </p>
      </div>
      <div className="video-frame">
        <video
          controls
          preload="metadata"
          poster={posterPath}
          onPlay={() => track('demo_video_play')}
        >
          <source src={videoPath} type="video/mp4" />
          <a href={videoPath}>Download the ReplayGuard workflow video.</a>
        </video>
      </div>
      <div className="workflow-tags" aria-label="Demo workflow stages">
        {demoVideo.stages.map((stage) => <span key={stage}>{stage}</span>)}
      </div>
    </section>
  );
}

function ReplayComparison() {
  return (
    <section className="section comparison-section">
      <div className="section-heading wide">
        <h2>A replay script moves messages. A replay workflow controls the operation.</h2>
      </div>
      <div className="comparison-table" role="table" aria-label="Manual replay versus controlled replay">
        <div className="comparison-row comparison-head" role="row">
          <span role="columnheader">Area</span>
          <span role="columnheader">Manual scripts / CLI</span>
          <span role="columnheader">ReplayGuard</span>
        </div>
        {replayComparison.map(([area, manual, replayguard]) => (
          <div className="comparison-row" role="row" key={area}>
            <strong role="cell">{area}</strong>
            <span role="cell">{manual}</span>
            <span role="cell">{replayguard}</span>
          </div>
        ))}
      </div>
      <p className="section-note">
        Well-engineered internal scripts can be effective. ReplayGuard focuses on standardizing the
        safety, governance and visibility surrounding replay operations.
      </p>
    </section>
  );
}

function ReplayWorkflow() {
  return (
    <section id="workflow" className="section workflow-section">
      <div className="section-heading">
        <p className="eyebrow">ReplayGuard workflow</p>
        <h2>A controlled Kafka replay workflow</h2>
      </div>
      <div className="workflow-grid">
        {workflowSteps.map(([title, text], index) => (
          <article className="workflow-card" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OperationalImpact() {
  return (
    <section className="section impact-section">
      <div className="section-heading">
        <p className="eyebrow">Operational impact</p>
        <h2>Reduce the engineering effort and risk surrounding replay incidents</h2>
      </div>
      <div className="impact-grid">
        {operationalImpact.map(([title, text]) => (
          <article className="impact-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductCapabilities() {
  return (
    <section id="product" className="section capability-section">
      <div className="section-heading">
        <p className="eyebrow">Product capabilities</p>
        <h2>Purpose-built for replay preparation, execution control and auditability</h2>
      </div>
      <div className="capability-grid">
        {capabilityGroups.map((group) => (
          <article className="capability-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductScreenshots({
  onOpen,
}: {
  activeScreenshot: Screenshot | null;
  onOpen: (shot: Screenshot) => void;
}) {
  return (
    <section id="screenshots" className="section screenshots-section">
      <div className="section-heading">
        <p className="eyebrow">Product proof</p>
        <h2>See the core ReplayGuard workflows</h2>
        <p>
          These sanitized demo screenshots show the views teams use to inspect Kafka topics,
          create replay requests, monitor execution and review operational history.
        </p>
      </div>
      <div className="screenshot-grid">
        {screenshots.map((shot, index) => (
          <ScreenshotCard
            key={shot.title}
            shot={shot}
            index={index}
            onOpen={() => {
              track('screenshot_open', { title: shot.title });
              onOpen(shot);
            }}
          />
        ))}
      </div>
    </section>
  );
}

function SecuritySection() {
  return (
    <section id="security" className="section security-section">
      <div className="section-heading">
        <p className="eyebrow">Operational safety and security</p>
        <h2>Designed for controlled production operations</h2>
      </div>
      <div className="security-grid">
        {safetyGroups.map((group) => (
          <article className="security-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <a className="text-link" href="#deployment">Review deployment and security details</a>
    </section>
  );
}

function DeploymentArchitecture() {
  return (
    <section id="deployment" className="section deployment-section">
      <div className="section-heading">
        <p className="eyebrow">Self-hosted deployment</p>
        <h2>ReplayGuard runs where your Kafka runs</h2>
        <p>
          Deploy ReplayGuard inside your infrastructure using private container images. Your environment
          controls Kafka connectivity, network access, PostgreSQL, Redis and the public application endpoint.
        </p>
      </div>
      <div className="architecture-card" aria-label="ReplayGuard self-hosted deployment architecture">
        <div className="arch-flow">
          {['Engineering users', 'replayguard.company.com', 'Customer reverse proxy', 'ReplayGuard frontend + API', 'ReplayGuard replay worker', 'Customer Kafka clusters'].map((node, index, list) => (
            <div className="arch-node-wrap" key={node}>
              <div className="arch-node">{node}</div>
              {index < list.length - 1 && <span className="arch-arrow" aria-hidden="true">-&gt;</span>}
            </div>
          ))}
        </div>
        <div className="arch-side-grid">
          <div><strong>ReplayGuard metadata</strong><span>Customer PostgreSQL</span></div>
          <div><strong>Runtime coordination</strong><span>Customer Redis</span></div>
          <div><strong>Subscription activation</strong><span>Signed customer licence key</span></div>
        </div>
      </div>
      <div className="callout-grid">
        {deploymentCallouts.map((callout) => <p key={callout}>{callout}</p>)}
      </div>
    </section>
  );
}

function AudienceFit() {
  return (
    <section className="section fit-section">
      <div className="section-heading">
        <p className="eyebrow">Qualification</p>
        <h2>Built for teams that treat replay as a production operation</h2>
        <p>
          ReplayGuard is most relevant when your team uses Kafka in production, occasionally performs
          selective reprocessing and needs stronger repeatability, control or auditability than scripts provide.
        </p>
      </div>
      <div className="fit-grid">
        <article>
          <h3>Suitable teams</h3>
          <ul>{audienceFit.suitable.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Not intended for</h3>
          <ul>{audienceFit.notIntended.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}

function EvaluationProcess() {
  return (
    <section id="evaluation" className="section evaluation-section">
      <div className="section-heading">
        <p className="eyebrow">Technical evaluation process</p>
        <h2>Evaluate ReplayGuard against one real replay workflow</h2>
      </div>
      <div className="evaluation-layout">
        <div className="evaluation-steps">
          {evaluationSteps.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="criteria-card">
          <h3>Success criteria</h3>
          <ul>{successCriteria.map((item) => <li key={item}>{item}</li>)}</ul>
          <a
            className="button primary"
            href="#request-review"
            onClick={() => track('evaluation_cta_click')}
          >
            Discuss a Technical Evaluation
          </a>
        </aside>
      </div>
    </section>
  );
}

function PositioningComparison() {
  return (
    <section className="section positioning-section">
      <div className="section-heading">
        <p className="eyebrow">Where ReplayGuard fits</p>
        <h2>Focused on replay governance, not replacing your Kafka platform</h2>
      </div>
      <div className="fit-comparison-grid">
        {fitComparisons.map(([name, strength, limitation]) => (
          <article key={name}>
            <h3>{name}</h3>
            <p><strong>Strength:</strong> {strength}</p>
            <p><strong>ReplayGuard addresses:</strong> {limitation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutReplayGuard() {
  return (
    <section className="section about-section">
      <div className="section-heading">
        <p className="eyebrow">About ReplayGuard</p>
        <h2>Focused infrastructure software for safer Kafka replay</h2>
        <p>
          ReplayGuard is an independently built infrastructure product focused on safer Kafka replay
          and incident debugging. Product walkthroughs, technical evaluations and early customer
          onboarding are handled directly by the founder.
        </p>
      </div>
      <div className="about-grid">
        <div><span>Founder</span><strong>{site.founderName}</strong></div>
        <div><span>Product status</span><strong>{site.productVersion} available for guided evaluations</strong></div>
        <div><span>Last updated</span><strong>{site.lastUpdated}</strong></div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="section faq-section">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Common questions from platform teams</h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details
            key={question}
            onToggle={(event) => {
              if (event.currentTarget.open) {
                track('faq_expand', { question });
              }
            }}
          >
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function LeadCaptureSection() {
  return (
    <section id="request-review" className="section lead-section">
      <div className="section-heading">
        <p className="eyebrow">Replay Safety Review</p>
        <h2>Discuss your current Kafka replay workflow</h2>
        <p>
          Share the replay process you use today. The first call focuses on workflow risk, technical fit
          and whether a self-hosted evaluation is appropriate.
        </p>
      </div>
      <LeadCaptureForm />
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section final-cta">
      <div>
        <h2>Make Kafka replay a controlled operational workflow</h2>
        <p>
          Review your current replay process, identify safety and auditability gaps,
          and evaluate ReplayGuard against one defined Kafka replay scenario.
        </p>
        <p className="supporting-line">
          20-minute technical discussion · No installation required for the first call · Self-hosted evaluation available
        </p>
      </div>
      <div className="final-actions">
        <a
          className="button primary"
          href="#request-review"
          onClick={() => track('hero_review_cta_click', { source: 'final_cta' })}
        >
          Book a Replay Safety Review
        </a>
        <a className="button secondary" href="#demo">Watch the Workflow</a>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="ReplayGuard replay workflow preview">
      <div className="preview-top">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
        <strong>Controlled replay workflow</strong>
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
            <div><span>Validation</span><strong>Passed</strong></div>
            <div><span>Rate</span><strong>Bounded</strong></div>
            <div><span>Audit</span><strong>Ready</strong></div>
          </div>
          <div className="preview-table">
            {['INSPECT', 'VALIDATE', 'EXECUTE', 'AUDIT'].map((status) => (
              <div className="preview-row" key={status}>
                <span className="pill running">{status}</span>
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

function ScreenshotCard({
  shot,
  index,
  onOpen,
}: {
  shot: Screenshot;
  index: number;
  onOpen: () => void;
}) {
  const imagePath = `${import.meta.env.BASE_URL}${shot.path.replace(/^\//, '')}`;
  return (
    <article className="screenshot-card">
      <button
        type="button"
        className={`screenshot-preview theme-${index % 3}`}
        onClick={onOpen}
        aria-label={`Open larger ${shot.title} screenshot`}
      >
        <img src={imagePath} alt={`${shot.title}: ${shot.text}`} loading="lazy" />
      </button>
      <div>
        <h3>{shot.title}</h3>
        <p>{shot.text}</p>
      </div>
    </article>
  );
}

function ScreenshotLightbox({ shot, onClose }: { shot: Screenshot; onClose: () => void }) {
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
        <img src={imagePath} alt={`${shot.title}: ${shot.text}`} />
        <p>{shot.text}</p>
      </section>
    </div>
  );
}

function LegalPage({ pageKey }: { pageKey: LegalPageKey }) {
  const page = legalPages[pageKey];
  return (
    <main id="main-content" className="legal-page">
      {/* Formal legal review should be completed before high-volume commercial use. */}
      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
        </div>
        <div className="legal-card">
          {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="button secondary" href="#top">Return to product page</a>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <BrandLogo />
        <p>Self-hosted Kafka replay control plane for controlled replay operations.</p>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="#product">Product</a>
        <a href="#workflow">Workflow</a>
        <a href="#/security">Security</a>
        <a href="#deployment">Deployment</a>
        <a href="#evaluation">Evaluation</a>
        <a href="#faq">FAQ</a>
        <a href="#/privacy">Privacy</a>
        <a href="#/terms">Terms</a>
        <a href="#/contact">Contact</a>
        <a href={site.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <p>Copyright {new Date().getFullYear()} ReplayGuard. All rights reserved.</p>
    </footer>
  );
}

function getLegalPage(hash: string): LegalPageKey | null {
  const key = hash.replace('#/', '') as LegalPageKey;
  return key in legalPages ? key : null;
}
