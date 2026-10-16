import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
  ShieldCheck,
  ScanSearch,
  SlidersHorizontal,
  FileCheck2,
  ZoomIn,
  Gauge,
  FlaskConical,
  Activity,
  ChevronDown,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { legalPages } from "./data/content";
import { track } from "./analytics";
import "./redesign.css";

const repo = "https://github.com/ravithejatech714-create/replayguard-community";
const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
const steps = [
  [
    "Inspect & select",
    "Find the records that need another pass.",
    "Explore topics and partitions. Define the source, destination and bounded offset range before any recovery begins.",
    ScanSearch,
  ],
  [
    "Preview impact",
    "See downstream impact before execution.",
    "Review the resolved recovery scope alongside downstream-impact information: destination topics, consumer groups and available lag information. Make an informed decision before replay begins.",
    SlidersHorizontal,
  ],
  [
    "Dry run",
    "Examine the recovery before producing records.",
    "Run the selected scope in dry-run mode to read the source and review the result without producing records into the destination topic.",
    FlaskConical,
  ],
  [
    "Govern & approve",
    "Keep recovery within your team's rules.",
    "Apply policy limits and independent approval where required. A recovery request is not unrestricted permission to execute.",
    ShieldCheck,
  ],
  [
    "Execute & control",
    "Set the pace. Keep control of the recovery.",
    "Configure a records-per-second limit and use pause, resume and stop controls during replay. Recover the selected events without handing over unrestricted execution.",
    Gauge,
  ],
  [
    "Monitor & recover",
    "Follow progress. Recover from interruptions.",
    "Monitor partition progress and recorded checkpoints. Eligible interrupted jobs can resume from checkpointed progress; infrastructure-failure edge cases can still result in duplicate delivery.",
    Activity,
  ],
  [
    "Audit & trace",
    "Know what replayed, who requested it and who approved.",
    "Review recovery scope, execution history, requester and approver details, and recorded results. Replay provenance helps trace recovered records back to the recovery operation.",
    FileCheck2,
  ],
] as const;

const productViews = [
  {
    title: "Execution controls",
    path: "screenshots/execution-controls-hd-20261016.png",
    description:
      "Follow replay progress and control execution with pause, resume and stop actions.",
    icon: Gauge,
  },
  {
    title: "Progress",
    path: "screenshots/recovery-progress-hd-20261016.png",
    description:
      "Monitor per-partition offsets, records read and produced, and checkpointed progress.",
    icon: Activity,
  },
  {
    title: "Governance",
    path: "screenshots/recovery-governance-hd-20261016.png",
    description:
      "Review recovery scope and require an authorized checker to approve policy-governed changes.",
    icon: ShieldCheck,
  },
] as const;
type ProductView = (typeof productViews)[number];
const operations = [
  [
    "Offset-range replay",
    "Recover a precise range of events after a processing fix.",
    "Select partitions and offset boundaries, preview the scope, then replay into an approved destination.",
    "Included in Community within its limits",
  ],
  [
    "Timestamp-window recovery",
    "Turn an incident window into a recovery scope.",
    "Resolve a start and end time to partition offsets, then review the proposed recovery before execution.",
    "Evaluation / paid plan",
  ],
  [
    "DLQ redrive",
    "Give failed events a controlled path back.",
    "Review dead-letter records and destination routing before reprocessing into an approved topic.",
    "Evaluation / paid plan",
  ],
  [
    "Consumer-group offset reset",
    "Reposition a consumer group with oversight.",
    "Preview the intended offset changes, apply policy checks and reconcile uncertain outcomes.",
    "Evaluation / paid plan",
  ],
];
const questions = [
  [
    "Is Community free or open source?",
    "Community is free to use under the software usage terms in the public repository. It is proprietary software, not an open-source license. No paid license is required to start.",
  ],
  [
    "What can I try in Community?",
    "Offset-range replay between different topics on one Kafka profile, including dry runs, within the limits shown above. Dry runs do not consume monthly execution credits, but other limits still apply.",
  ],
  [
    "Can I recover into the same topic or across clusters?",
    "These workflows require an appropriate evaluation or paid license. Same-topic replay has additional safeguards, including a matching dry run and approval. Discuss your route with us before evaluating.",
  ],
  [
    "Does recovery guarantee exactly-once business processing?",
    "No. Transactional replay is available on eligible routes, but downstream business processing must still handle repeated events safely. Recorded execution evidence is not proof of downstream application correctness.",
  ],
  [
    "Where does ReplayGuard run?",
    "Inside your own environment. The Community repository includes Docker Compose installation guidance. Contact us for a technical evaluation, including Kubernetes deployment requirements.",
  ],
  [
    "Can it recover events that Kafka no longer retains?",
    "Only if those events remain available from a suitable source. With Streambased K.S.I., historical data in Iceberg can provide that source. Availability and offset mapping must be verified; ReplayGuard does not recreate missing data.",
  ],
];

function Install({ placement }: { placement: string }) {
  return (
    <a
      className="rg-button rg-primary"
      href={repo}
      onClick={() =>
        track("evaluation_cta_click", {
          source: placement,
          action: "community_install",
        })
      }
    >
      Install Community <ArrowUpRight size={17} />
    </a>
  );
}

export function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState<ProductView | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const key = hash.replace("#/", "") as keyof typeof legalPages;
  const legal =
    hash.startsWith("#/") &&
    Object.prototype.hasOwnProperty.call(legalPages, key)
      ? legalPages[key]
      : null;
  useEffect(() => {
    const update = () => {
      setHash(window.location.hash);
      setMenu(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("hashchange", update);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("keydown", escape);
    };
  }, [menu]);
  useEffect(() => {
    if (legal) window.scrollTo(0, 0);
  }, [legal]);
  return (
    <div className="rg-site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="rg-header">
        <div className="rg-container rg-nav-row">
          <a className="brand" href="#top" aria-label="ReplayGuard home">
            <BrandLogo />
          </a>
          <button
            ref={menuButton}
            className="rg-menu"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="site-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav
            id="site-navigation"
            className={menu ? "rg-nav is-open" : "rg-nav"}
            aria-label="Main navigation"
          >
            <a href="#operations" onClick={() => setMenu(false)}>
              Product
            </a>
            <a href="#partners" onClick={() => setMenu(false)}>
              Streambased partnership
            </a>
            <a href="#community" onClick={() => setMenu(false)}>
              Community
            </a>
            <a href="#request-review" onClick={() => setMenu(false)}>
              Request a demo
            </a>
          </nav>
          <div className="rg-header-install">
            <Install placement="header" />
          </div>
        </div>
      </header>
      {legal ? (
        <main id="main-content" className="rg-container rg-legal">
          <a href="#top" className="rg-text-link">
            Back to ReplayGuard <ArrowRight size={16} />
          </a>
          <p className="rg-eyebrow">{legal.eyebrow}</p>
          <h1>{legal.title}</h1>
          {legal.body.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <a href="mailto:ravitheja.vkota@replayguard.in">
            ravitheja.vkota@replayguard.in
          </a>
        </main>
      ) : (
        <main id="main-content">
          <section id="top" className="rg-hero">
            <div className="rg-container">
              <a className="rg-announcement" href="#community">
                <span /> Free Community edition is available{" "}
                <ArrowRight size={15} />
              </a>
              <p className="rg-eyebrow">
                Your events. Your infrastructure. Your recovery.
              </p>
              <h1>ReplayGuard</h1>
              <h2>
                Governed Kafka recovery.
                <br />
                <span>With control built in.</span>
              </h2>
              <p className="rg-hero-copy">
                Recover the right events after a processing failure.
                <br className="rg-desktop-break" /> Preview downstream impact,
                apply approval policies, control execution and retain a
                traceable recovery record.
              </p>
              <div className="rg-actions">
                <Install placement="hero" />
                <a className="rg-button rg-secondary" href="#request-review">
                  Request a demo <ArrowRight size={17} />
                </a>
              </div>
              <p className="rg-micro">
                Self-hosted <span>/</span> Free to start <span>/</span> Your
                Kafka data stays under your control
              </p>
              <ProductShowcase onOpen={setPreview} />
            </div>
          </section>
          <section id="problem" className="rg-section rg-container">
            <p className="rg-eyebrow">
              Recovery is more than reading events again
            </p>
            <div className="rg-section-heading">
              <h2>
                A fix is only half
                <br />
                the recovery.
              </h2>
              <p>
                Incorrectly processed events, growing dead-letter queues and
                offset mistakes still need a deliberate response. An ad hoc
                replay can repeat the original damage or overwhelm a downstream
                service.
              </p>
            </div>
            <div className="rg-principles">
              {[
                [
                  "Bound the impact",
                  "Choose which records to recover, not an unbounded stream.",
                ],
                [
                  "Control the change",
                  "Use policy checks, approvals and a deliberate execution rate.",
                ],
                [
                  "Keep the record",
                  "See what was replayed, who requested it, who approved it and the recorded outcome.",
                ],
              ].map(([title, text], index) => (
                <article key={title}>
                  <span className="rg-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
          <Workflow />
          <RecoveryScenarios />
          <section id="operations" className="rg-section rg-container">
            <p className="rg-eyebrow">One recovery workspace</p>
            <div className="rg-section-heading">
              <h2>
                The right operation.
                <br />
                The same discipline.
              </h2>
              <p>
                Start with precise offset-range replay. Evaluate the broader
                recovery workflows when your team needs them.
              </p>
            </div>
            <Operations />
          </section>
          <section id="product" className="rg-section rg-video-band">
            <div className="rg-container">
              <div className="rg-section-heading">
                <div>
                  <p className="rg-eyebrow">Audit evidence</p>
                  <h2>
                    Every recovery
                    <br />
                    has a record.
                  </h2>
                </div>
                <p>
                  Know what was replayed, who requested it, who approved it
                  and how execution completed. Keep evidence for operational
                  review without relying on someone's memory of the incident.
                </p>
              </div>
              <div className="rg-principles">
                {[
                  ["Scope and ownership", "Review the selected source, destination and ranges alongside the requester and approval record."],
                  ["Execution and outcome", "Follow recorded actions, checkpointed progress and the final recovery outcome."],
                  ["Provenance and review", "Trace recovered records back to their recovery operation and export evidence for your team's review."],
                ].map(([title, description]) => (
                  <article key={title}>
                    <FileCheck2 size={24} />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
              <h3 className="rg-demo-heading">Watch the governed recovery walkthrough</h3>
              <p className="rg-demo-description">
                Follow the workflow from inspection to recovery evidence.
                This demonstration includes licensed capabilities;
                Community limits are listed below.
              </p>
              <video
                aria-label="ReplayGuard governed recovery walkthrough"
                controls
                playsInline
                preload="none"
                poster={asset("demo/replayguard-governed-recovery-cover.png")}
                onPlay={() => track("demo_video_play", { source: "homepage" })}
              >
                <source
                  src={asset("demo/replayguard-governed-recovery-redacted-v2.mp4")}
                  type="video/mp4"
                />
                Your browser cannot play this video.{" "}
                <a href={asset("demo/replayguard-governed-recovery-redacted-v2.mp4")}>
                  Open the walkthrough
                </a>.
              </video>
            </div>
          </section>
          <section id="partners" className="rg-partner rg-section">
            <div className="rg-container">
              <p className="rg-eyebrow">Technology partnership</p>
              <div className="rg-partner-logos">
                <span>ReplayGuard</span>
                <span className="rg-times">+</span>
                <img
                  src={asset("assets/RGB Streambased Logos-02.png")}
                  alt="Streambased"
                  loading="lazy"
                />
              </div>
              <div className="rg-section-heading">
                <h2>
                  Beyond Kafka retention.
                  <br />
                  Back into your workflow.
                </h2>
                <p>
                  A producer bug affected a batch of events. The fix is
                  deployed, but those events have aged out of live Kafka.
                  Historical data does not have to mean the end of recovery.
                </p>
              </div>
              <ol className="rg-partner-flow">
                <li>
                  <span>01 / DISCOVER</span>
                  <h3>Find historical events</h3>
                  <p>
                    Query the retained Iceberg data to identify the affected
                    events and source ranges.
                  </p>
                </li>
                <li>
                  <span>02 / ACCESS</span>
                  <h3>Read through K.S.I.</h3>
                  <p>
                    Streambased exposes available historical events through its
                    Kafka-compatible interface.
                  </p>
                </li>
                <li>
                  <span>03 / RECOVER</span>
                  <h3>Reprocess with ReplayGuard</h3>
                  <p>
                    Review the scope and recover into an approved Kafka topic,
                    with governance and rate limits.
                  </p>
                </li>
              </ol>
              <div className="rg-partner-bottom">
                <p>
                  Requires available historical data and verified offset
                  mapping. This cross-profile workflow requires an appropriate
                  evaluation or paid license.
                </p>
                <a className="rg-text-link" href="#request-review">
                  Discuss the joint use case <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </section>
          <section id="security" className="rg-section rg-container">
            <p className="rg-eyebrow">Customer-controlled deployment</p>
            <div className="rg-section-heading">
              <h2>
                Your environment.
                <br />
                Your operational boundaries.
              </h2>
              <p>
                ReplayGuard complements your Kafka platform. You control
                connectivity, application access and the destinations that
                recovery is allowed to reach.
              </p>
            </div>
            <div id="deployment" className="rg-principles">
              {[
                [
                  "Self-hosted",
                  "Run inside your environment. Start with the public Docker Compose installation guide.",
                ],
                [
                  "Governed access",
                  "Use role-based permissions, configured policies and approval requirements. Advanced capabilities depend on your plan.",
                ],
                [
                  "Auditable recovery",
                  "Review what replayed, the requester and approver, execution history and provenance. Your application team can then validate downstream business results.",
                ],
              ].map(([title, text]) => (
                <article key={title}>
                  <ShieldCheck size={24} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="community" className="rg-section rg-community">
            <div className="rg-container rg-community-grid">
              <div>
                <p className="rg-eyebrow">Free Community edition</p>
                <h2>
                  Start with one
                  <br />
                  real recovery.
                </h2>
                <p>
                  Install ReplayGuard, connect a test Kafka profile and walk
                  through an offset-range recovery on your own infrastructure.
                </p>
                <Install placement="community" />
                <a className="rg-text-link" href={`${repo}#readme`}>
                  Read the installation guide <ArrowUpRight size={17} />
                </a>
                <small>
                  Free proprietary software. Usage terms apply.
                  <br />
                  No paid license needed for Community.
                </small>
              </div>
              <div className="rg-limits">
                <h3>Included in Community</h3>
                <ul>
                  {[
                    "2 active users / 1 enabled Kafka profile",
                    "1 enabled policy / 1 concurrent job",
                    "Offset-range replay between different topics",
                    "Up to 1,000 records and aggregate offset span per job",
                    "Up to 25 records/sec / 10 MiB output per job",
                    "5 actual executions / UTC month",
                    "Dry runs without monthly execution credit charges",
                  ].map((text) => (
                    <li key={text}>
                      <Check size={17} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Dry runs still follow the other Community limits. Same-topic
                  replay, cross-profile recovery, timestamp recovery, DLQ
                  redrive, offset reset and service accounts require an
                  appropriate license.
                </p>
              </div>
            </div>
          </section>
          <section id="faq" className="rg-section rg-container rg-faq">
            <div>
              <p className="rg-eyebrow">Before you start</p>
              <h2>A few useful answers.</h2>
            </div>
            <div>
              {questions.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section id="evaluation" className="rg-section rg-contact-band">
            <div id="request-review" className="rg-container rg-contact">
              <div>
                <p className="rg-eyebrow">Go further with ReplayGuard</p>
                <h2>
                  Bring us your
                  <br />
                  recovery scenario.
                </h2>
                <p>
                  Need a broader recovery workflow, a Streambased evaluation or
                  a deployment review? Tell us what your team needs to recover.
                </p>
                <a
                  className="rg-text-link"
                  href="mailto:ravitheja.vkota@replayguard.in"
                >
                  ravitheja.vkota@replayguard.in <ArrowUpRight size={17} />
                </a>
                <p className="rg-micro">
                  Please do not send credentials, message payloads or
                  confidential incident data.
                </p>
              </div>
              <LeadCaptureForm />
            </div>
          </section>
        </main>
      )}
      <footer className="rg-footer rg-container">
        <a className="brand" href="#top">
          <BrandLogo />
        </a>
        <p>Recover deliberately.</p>
        <div>
          <a href={repo}>Community</a>
          {(["privacy", "terms", "security", "contact"] as const).map(
            (name) => (
              <a key={name} href={`#/${name}`}>
                {name[0].toUpperCase() + name.slice(1)}
              </a>
            ),
          )}
        </div>
        <small>© {new Date().getFullYear()} ReplayGuard</small>
      </footer>
      {preview && <Preview view={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

function ProductShowcase({ onOpen }: { onOpen: (view: ProductView) => void }) {
  const [selected, setSelected] = useState(0);
  const view = productViews[selected];
  return (
    <div className="rg-showcase">
      <div className="rg-product-bar">
        <span>
          <ShieldCheck size={16} /> RECOVERY YOU CAN CONTROL AND TRACE
        </span>
        <span>Inside ReplayGuard</span>
      </div>
      <div
        className="rg-showcase-options"
        role="group"
        aria-label="Product views"
      >
        {productViews.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <Icon size={17} />
              {item.title}
            </button>
          );
        })}
      </div>
      <button
        className="rg-product-image"
        aria-label={`Expand ${view.title} screenshot`}
        onClick={() => {
          onOpen(view);
          track("screenshot_open", { title: view.title });
        }}
      >
        <img
          src={asset(view.path)}
          alt={`ReplayGuard ${view.title}: ${view.description}`}
        />
        <span className="rg-expand">
          <ZoomIn size={18} /> View product
        </span>
      </button>
      <p className="rg-showcase-caption">{view.description}</p>
      <p className="rg-showcase-note">
        Product demonstration. Screens show an evaluation environment;
        availability depends on your plan.
      </p>
    </div>
  );
}

function RecoveryScenarios() {
  const scenarios = [
    {
      number: "01",
      tag: "PROCESSING BUG",
      title: "The fix is deployed. The affected events remain.",
      problem:
        "A faulty producer or consumer version caused a known set of events to be processed incorrectly.",
      risk: "A broad replay can repeat unaffected work and add load to downstream consumers.",
      solution:
        "Select the affected range, preview downstream impact, dry-run the request and execute with a rate limit. Retain the recovery and approval history.",
      availability:
        "Start with offset-range replay in Community. Timestamp and same-topic recovery require a license.",
      href: "#community",
      action: "Start with Community",
    },
    {
      number: "02",
      tag: "DEAD-LETTER BACKLOG",
      title: "The failure is understood. The backlog needs a plan.",
      problem:
        "Failed events have accumulated in a dead-letter topic after an application or dependency problem.",
      risk: "Redriving the entire backlog blindly can repeat failures or send records to the wrong destination.",
      solution:
        "Inspect the DLQ, review the selected scope and approved destination, then redrive at a controlled rate with execution history and audit evidence.",
      availability:
        "DLQ redrive requires an appropriate evaluation or paid license.",
      href: "#request-review",
      action: "Evaluate DLQ redrive",
    },
    {
      number: "03",
      tag: "BEYOND LIVE RETENTION",
      title: "Kafka no longer has the events. Your archive does.",
      problem:
        "An incident is discovered after the affected events have expired from live Kafka retention.",
      risk: "Finding historical records alone does not provide a governed path back into the processing pipeline.",
      solution:
        "Identify the historical range in Iceberg, access it through Streambased K.S.I., then use ReplayGuard to recover into an approved Kafka topic.",
      availability:
        "Requires available historical data, verified offset mapping and a license for cross-profile recovery.",
      href: "#partners",
      action: "Explore the joint use case",
    },
  ];
  return (
    <section id="scenarios" className="rg-section rg-container rg-scenarios">
      <p className="rg-eyebrow">Built for the work after an incident</p>
      <div className="rg-section-heading">
        <h2>
          Three recovery problems.
          <br />
          One governed approach.
        </h2>
        <p>
          Recovery is a production change. Make its scope, downstream impact,
          execution controls and ownership explicit.
        </p>
      </div>
      {scenarios.map((scenario) => (
        <article className="rg-scenario" key={scenario.number}>
          <div className="rg-scenario-title">
            <span className="rg-eyebrow">
              {scenario.number} / {scenario.tag}
            </span>
            <h3>{scenario.title}</h3>
            <p>{scenario.problem}</p>
          </div>
          <div className="rg-scenario-detail">
            <h4>The operational risk</h4>
            <p>{scenario.risk}</p>
            <h4>With ReplayGuard</h4>
            <p>{scenario.solution}</p>
            <small>{scenario.availability}</small>
            <a className="rg-text-link" href={scenario.href}>
              {scenario.action}
              <ArrowRight size={16} />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

function Workflow() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => setPlaying(!query.matches);
    changed();
    query.addEventListener("change", changed);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", changed);
    };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % steps.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [playing, visible]);
  const current = steps[step];
  const Icon = current[3];
  return (
    <section id="governance" className="rg-workflow rg-section" ref={root}>
      <div className="rg-container">
        <div className="rg-workflow-top">
          <div>
            <p className="rg-eyebrow">A deliberate path to recovery</p>
            <h2>From affected events to an auditable recovery.</h2>
          </div>
          <label className="rg-motion-toggle">
            <input
              type="checkbox"
              checked={!playing}
              onChange={(event) => setPlaying(!event.target.checked)}
            />
            Pause progression
          </label>
        </div>
        <div
          className="rg-steps"
          role="group"
          aria-label="Recovery workflow"
          onFocus={() => setPlaying(false)}
        >
          {steps.map(([title], index) => (
            <button
              key={title}
              id={`step-${index}`}
              aria-pressed={step === index}
              aria-controls="workflow-panel"
              onClick={() => {
                setStep(index);
                setPlaying(false);
              }}
            >
              <span>0{index + 1}</span>
              {title}
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div
          id="workflow-panel"
          className="rg-workflow-panel"
          role="region"
          aria-labelledby={`step-${step}`}
        >
          <Icon size={36} />
          <h3>{current[1]}</h3>
          <p>{current[2]}</p>
        </div>
      </div>
    </section>
  );
}

function Operations() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="rg-operations">
      <div className="rg-operation-tabs" aria-label="Recovery operations">
        {operations.map(([title], index) => (
          <button
            aria-pressed={index === selected}
            onClick={() => setSelected(index)}
            key={title}
          >
            <span>0{index + 1}</span>
            {title}
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      <article>
        <span className="rg-plan-label">{operations[selected][3]}</span>
        <h3>{operations[selected][1]}</h3>
        <p>{operations[selected][2]}</p>
        <a
          className="rg-text-link"
          href={selected === 0 ? "#community" : "#request-review"}
        >
          {selected === 0 ? "Start with Community" : "Discuss an evaluation"}
          <ArrowRight size={17} />
        </a>
      </article>
    </div>
  );
}

function Preview({
  view,
  onClose,
}: {
  view: ProductView;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="rg-dialog"
      aria-label={`${view.title} screenshot`}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div>
        <header>
          <h2>{view.title}</h2>
          <button
            className="rg-icon-button"
            aria-label="Close screenshot"
            onClick={onClose}
          >
            <X />
          </button>
        </header>
        <img
          src={asset(view.path)}
          alt={`Expanded ReplayGuard ${view.title} product view`}
        />
        <p>
          Product demonstration. Interface and capabilities can vary by release
          and plan.
        </p>
      </div>
    </dialog>
  );
}
