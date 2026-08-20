import { useEffect, useState } from 'react';
import { track } from './analytics';
import { BrandLogo } from './BrandLogo';
import { LeadCaptureForm } from './LeadCaptureForm';
import {
  automationControls,
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
  governanceSteps,
  recoveryOperations,
  replayComparison,
  sameTopicSafeguards,
  safetyGroups,
  screenshots,
  site,
  successCriteria,
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
        <a href="#operations">Operations</a>
        <a href="#governance">Governance</a>
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
        Book a Recovery Review
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
      <RecoveryOperations />
      <DemoVideoSection />
      <ReplayComparison />
      <ReplayWorkflow />
      <AutomationSection />
      <SameTopicSection />
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
        <p className="eyebrow">Self-hosted Kafka recovery control plane</p>
        <h1>Govern Kafka recovery inside your infrastructure</h1>
        <p className="hero-text">
          ReplayGuard gives platform and SRE teams one governed workflow for offset-range replay,
          timestamp recovery, DLQ redrive and consumer-group reset, with enforceable policies,
          maker-checker approvals and evidence after execution.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href="#request-review"
            onClick={() => track('hero_review_cta_click', { source: 'hero' })}
          >
            Book a Recovery Workflow Review
          </a>
          <a className="button secondary" href="#operations">Explore Recovery Operations</a>
        </div>
        <div className="trust-row" aria-label="Platform highlights">
          <span>Self-hosted</span>
          <span>Policy-enforced scope</span>
          <span>Maker-checker approval</span>
          <span>Agent-ready APIs</span>
          <span>Recovery evidence</span>
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
        <p className="eyebrow">Recovery under pressure</p>
        <h2>Can your team answer these questions before production state changes?</h2>
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
        If these answers depend on the individual running a command, recovery is relying on judgement instead of an enforceable control plane.
      </p>
    </section>
  );
}

function RecoveryOperations() {
  return (
    <section id="operations" className="section recovery-operations-section">
      <div className="section-heading wide">
        <p className="eyebrow">One control plane, four recovery paths</p>
        <h2>Move from replay tooling to governed Kafka recovery</h2>
        <p>
          Operators use a consistent preview, policy, approval and evidence model across the
          recovery actions that otherwise live in separate scripts, runbooks and command-line tools.
        </p>
      </div>
      <div className="recovery-operation-grid">
        {recoveryOperations.map((operation) => (
          <article className="recovery-operation-card" key={operation.title}>
            <span>{operation.code}</span>
            <h3>{operation.title}</h3>
            <p>{operation.text}</p>
            <small>{operation.detail}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function DemoVideoSection() {
  const videoPath = `${import.meta.env.BASE_URL}${demoVideo.path.replace(/^\//, '')}`;
  const posterPath = `${import.meta.env.BASE_URL}${demoVideo.poster.replace(/^\//, '')}`;

  return (
    <section id="demo" className="section demo-video-section">
      <div className="section-heading">
        <p className="eyebrow">Governed recovery walkthrough</p>
        <h2>See ReplayGuard govern Kafka recovery from proposal to evidence</h2>
        <p>
          Follow a complete recovery workflow: inspect Kafka state, resolve the exact scope, apply
          policy guardrails and independent approval, execute with runtime controls, then review
          verification and immutable evidence.
        </p>
      </div>
      <div className="video-frame">
        <video
          aria-label="ReplayGuard governed Kafka recovery demo"
          controls
          playsInline
          preload="metadata"
          poster={posterPath}
          onPlay={() => track('demo_video_play')}
        >
          <source src={videoPath} type="video/mp4" />
          <a href={videoPath}>Download the ReplayGuard governed recovery demo.</a>
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
        <p className="eyebrow">Operational difference</p>
        <h2>A recovery command changes Kafka state. A control plane governs the decision.</h2>
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
        Well-engineered internal tools remain useful. ReplayGuard standardizes the policy, approval,
        execution and evidence surrounding production recovery without replacing Kafka itself.
      </p>
    </section>
  );
}

function ReplayWorkflow() {
  return (
    <section id="governance" className="section workflow-section">
      <div className="section-heading">
        <p className="eyebrow">Governance before execution</p>
        <h2>Every recovery follows a reviewable control chain</h2>
      </div>
      <div className="workflow-grid">
        {governanceSteps.map(([title, text], index) => (
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

function AutomationSection() {
  return (
    <section className="section automation-section">
      <div className="automation-layout">
        <div className="section-heading">
          <p className="eyebrow">Automation without bypassing control</p>
          <h2>Let incident agents propose recovery, not silently approve themselves</h2>
          <p>
            Service accounts give incident agents, runbooks and internal automation a narrow machine
            identity. They can validate scope and submit governed proposals while human approval remains
            in force wherever policy requires it.
          </p>
        </div>
        <div className="automation-control-list">
          {automationControls.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SameTopicSection() {
  return (
    <section className="section same-topic-section">
      <div className="same-topic-copy">
        <p className="eyebrow">Guarded same-topic replay</p>
        <h2>Support the high-risk route without normalizing unsafe execution</h2>
        <p>
          Replaying back into the source topic can be operationally necessary, but it can also create
          feedback loops and duplicate previously replayed records. ReplayGuard treats it as a distinct,
          approval-gated path rather than a normal destination choice.
        </p>
      </div>
      <ul className="safeguard-list">
        {sameTopicSafeguards.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function OperationalImpact() {
  return (
    <section className="section impact-section">
      <div className="section-heading">
        <p className="eyebrow">Operational impact</p>
        <h2>Reduce the coordination cost and uncertainty surrounding Kafka recovery</h2>
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
        <h2>Purpose-built for recovery scope, governance, execution and evidence</h2>
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
        <h2>See the operational foundation</h2>
        <p>
          These sanitized product views show the established replay and inspection workflow. The
          governed recovery interface extends the same visual model to policies, approvals, recovery
          operations and service accounts.
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
        <h2>Run the recovery control plane inside your environment</h2>
        <p>
          Deploy ReplayGuard using Docker Compose or Kubernetes with Helm. Your environment controls
          Kafka connectivity, network access, PostgreSQL and the application endpoint.
        </p>
      </div>
      <div className="architecture-card" aria-label="ReplayGuard self-hosted deployment architecture">
        <div className="arch-flow">
          {['Engineers + incident agents', 'Customer HTTPS endpoint', 'ReplayGuard UI + governed API', 'Policy + approval control plane', 'Replay workers', 'Customer Kafka clusters'].map((node, index, list) => (
            <div className="arch-node-wrap" key={node}>
              <div className="arch-node">{node}</div>
              {index < list.length - 1 && <span className="arch-arrow" aria-hidden="true">-&gt;</span>}
            </div>
          ))}
        </div>
        <div className="arch-side-grid">
          <div><strong>State and coordination</strong><span>Customer PostgreSQL</span></div>
          <div><strong>Deployment choices</strong><span>Docker Compose or Kubernetes + Helm</span></div>
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
        <h2>Built for teams that treat recovery as a production operation</h2>
        <p>
          ReplayGuard is most relevant when reprocessing, redrive and offset changes require stronger
          repeatability, separation of duties and evidence than scripts and tickets provide.
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
        <h2>Evaluate ReplayGuard against one real recovery runbook</h2>
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
        <h2>A recovery control plane, not another Kafka platform</h2>
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
        <h2>Focused infrastructure software for governed Kafka recovery</h2>
        <p>
          ReplayGuard is an independently built infrastructure product focused on safer recovery and
          incident operations around Kafka. Product walkthroughs, technical evaluations and early
          customer onboarding are handled directly by the founder.
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
        <p className="eyebrow">Recovery Workflow Review</p>
        <h2>Discuss your current Kafka recovery runbook</h2>
        <p>
          Share one replay, DLQ, timestamp or offset-reset process you use today. The first call focuses
          on workflow risk, governance gaps and whether a self-hosted evaluation is appropriate.
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
        <h2>Make Kafka recovery a governed operational workflow</h2>
        <p>
          Review one current runbook, identify policy and evidence gaps, and evaluate ReplayGuard
          against a defined recovery scenario inside your environment.
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
          Book a Recovery Workflow Review
        </a>
        <a className="button secondary" href="#demo">Watch the Core Workflow</a>
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="ReplayGuard governed recovery preview">
      <div className="preview-top">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
        <strong>Governed recovery operation</strong>
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
            <div><span>Policy</span><strong>Allowed</strong></div>
            <div><span>Approval</span><strong>Verified</strong></div>
            <div><span>Evidence</span><strong>Ready</strong></div>
          </div>
          <div className="preview-table">
            {['PREVIEW', 'FINGERPRINT', 'APPROVE', 'EXECUTE'].map((status) => (
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
        <p>Self-hosted control plane for governed Kafka recovery operations.</p>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="#product">Product</a>
        <a href="#governance">Governance</a>
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
