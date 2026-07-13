export const demoLinks = {
  requestDemo: '#demo',
  scheduleWalkthrough: 'mailto:ravithejatech714@gmail.com?subject=ReplayGuard%20Technical%20Walkthrough&body=Hi%20Ravitheja%2C%0A%0AI%20would%20like%20to%20schedule%20a%20ReplayGuard%20technical%20walkthrough.%0A%0ATeam%2FCompany%3A%0AKafka%20environment%3A%0AReplay%20or%20debugging%20use%20case%3A%0APreferred%20demo%20time%3A%0A',
  contact: 'mailto:ravithejatech714@gmail.com?subject=ReplayGuard%20Question&body=Hi%20Ravitheja%2C%0A%0AI%20have%20a%20question%20about%20ReplayGuard.%0A%0AQuestion%3A%0A',
  viewPlatform: '#screenshots',
};

export const demoVideo = {
  path: '/demo/replayguard-demo.mp4',
  poster: '/demo/replayguard-demo-cover.png',
  bullets: [
    'Create a secure Kafka profile with SASL/SCRAM and truststore configuration.',
    'Browse topics and validate offset ranges before replay.',
    'Run replay with worker progress, lifecycle controls, and audit history.',
  ],
};
export const pains = [
  'Kafka replay can cause duplicate writes, unexpected downstream load, or replaying the wrong range.',
  'Manual replay scripts are hard to approve, repeat, pause, and audit.',
  'Production-like incident debugging takes too long when engineers must jump between brokers, scripts, and logs.',
  'Message browsing can accidentally expose sensitive payloads without bounded inspection controls.',
  'Replay without RBAC, validation, and admission limits can turn a fix into a second incident.',
  'Teams often lack one view of replay status, worker progress, and historical operator actions.',
];

export const solutions = [
  'Create guided replay jobs with explicit source, destination, partition, offset range, and reason.',
  'Validate replay requests before execution so risky or unavailable ranges are caught early.',
  'Inspect Kafka topics with bounded browsing and payload-safe previews.',
  'Use RBAC so administrators, operators, viewers, and auditors get appropriate access.',
  'Track audit history and replay events as append-only operational records.',
  'Monitor worker claims, progress, lease recovery, pause, cancel, retry, and rerun behavior.',
  'Schedule replay windows and replay multiple partitions through controlled workflows.',
  'Deploy self-hosted with PostgreSQL metadata, Redis runtime controls, and your Kafka connectivity.',
];

export const metrics = [
  {
    value: 'Guided',
    label: 'replay preparation',
    text: 'Reduce replay preparation from manual scripts to structured workflows.',
  },
  {
    value: 'Auditable',
    label: 'operator actions',
    text: 'Centralize replay history across jobs, workers, and audit events.',
  },
  {
    value: 'Bounded',
    label: 'inspection and replay',
    text: 'Add guardrails before messages are browsed or replayed.',
  },
  {
    value: 'Self-hosted',
    label: 'deployment model',
    text: 'Keep metadata and Kafka access inside your environment.',
  },
];

export const costSavings = [
  {
    title: 'Less custom replay scripting',
    text: 'Engineers can use guided source, destination, partition, offset, rate, and schedule controls instead of repeatedly writing one-off replay scripts.',
  },
  {
    title: 'Faster incident recovery',
    text: 'Topic inspection, validation, replay execution, pause/resume controls, and worker progress live in one workflow, reducing coordination time during incidents.',
  },
  {
    title: 'Lower operational risk',
    text: 'RBAC, validation, admission limits, audit logs, and lifecycle events reduce the chance of replaying the wrong range or losing approval history.',
  },
  {
    title: 'Better audit readiness',
    text: 'ReplayGuard keeps a record of who created a replay, what was replayed, when it ran, and why, reducing manual evidence collection after production events.',
  },
];

export const features = [
  ['Kafka Profile Management', 'Create and test named Kafka connections with encrypted credentials.'],
  ['Topic Explorer', 'Browse topics, partitions, offsets, timestamps, keys, headers, and payload previews.'],
  ['Replay Validation', 'Check route safety, partition availability, offset boundaries, and replay limits.'],
  ['Replay Execution', 'Run dry-run or replay jobs through a worker-controlled lifecycle.'],
  ['Transactional Mode', 'Use Kafka transactional replay where supported by the target cluster and route.'],
  ['Multi-Partition Replay', 'Specify per-partition ranges for controlled batch replay.'],
  ['Scheduled Windows', 'Delay execution and limit jobs to a replay window.'],
  ['Lifecycle Controls', 'Pause, resume, cancel, retry, and rerun replay jobs.'],
  ['Operational Dashboard', 'See active jobs, recent failures, stale workers, and platform activity.'],
  ['Audit Logs', 'Review operator actions without exposing message payloads in logs.'],
  ['Self-Hosted Deployment', 'Run in your infrastructure with Docker, PostgreSQL, Redis, and Kafka.'],
];

export const safety = [
  ['RBAC', 'Separate permissions for administration, operation, viewing, and audit review.'],
  ['Session Security', 'HTTP-only application session cookies with CSRF protection.'],
  ['Credential Protection', 'Kafka profile credentials are encrypted at rest.'],
  ['Payload Discipline', 'Audit logs and application logs avoid storing Kafka message payloads.'],
  ['Bounded Browsing', 'Message inspection uses request limits and payload budgets.'],
  ['Admission Controls', 'Replay creation is constrained by active job and rate limits.'],
];

export const screenshots = [
  {
    title: 'Dashboard',
    path: '/screenshots/dashboard.png',
    text: 'A control-plane summary of replay status, worker health, recent failures, and audit activity.',
  },
  {
    title: 'Replay Creation',
    path: '/screenshots/replay-creation.png',
    text: 'Create a replay request with source and destination profiles, topics, offset ranges, execution mode, and validation.',
  },
  {
    title: 'Replay Detail',
    path: '/screenshots/replay-detail.png',
    text: 'Inspect replay progress, partitions, validation snapshots, idempotency metadata, and lifecycle events.',
  },
  {
    title: 'Topic Explorer',
    path: '/screenshots/topic-explorer.png',
    text: 'Browse topic metadata and message previews using bounded offset, timestamp, and key filters.',
  },
  {
    title: 'Kafka Profiles',
    path: '/screenshots/kafka-profiles.png',
    text: 'Manage reusable Kafka connections and validate broker access before replay workflows use them.',
  },
  {
    title: 'Audit Logs',
    path: '/screenshots/audit-logs.png',
    text: 'Review administrative, replay, browsing, and lifecycle actions with sanitized metadata.',
  },
];

export const pricing = [
  {
    name: 'Trial',
    badge: '14-day evaluation',
    description: 'Validate ReplayGuard with a small team before a paid self-hosted subscription.',
    india90: 'Free',
    indiaYear: 'Not applicable',
    global90: 'Free',
    globalYear: 'Not applicable',
    users: '3 users',
    profiles: '3 Kafka profiles',
    jobs: '25 replay jobs',
    support: 'Best-effort onboarding support',
  },
  {
    name: 'Plus',
    badge: 'Small teams',
    description: 'For teams moving from ad-hoc replay scripts to controlled replay workflows.',
    india90: 'INR 74,999',
    indiaYear: 'INR 2,49,999',
    global90: 'USD 2,499',
    globalYear: 'USD 7,999',
    users: '10 users',
    profiles: '10 Kafka profiles',
    jobs: '300 / 1,500 replay jobs',
    support: 'Email support, bug fixes, minor updates',
  },
  {
    name: 'Prime',
    badge: 'Recommended',
    description: 'For active platform teams running ReplayGuard across real operational workflows.',
    india90: 'INR 1,99,999',
    indiaYear: 'INR 6,99,999',
    global90: 'USD 6,999',
    globalYear: 'USD 19,999',
    users: '25 users',
    profiles: '25 Kafka profiles',
    jobs: '2,000 / 10,000 replay jobs',
    support: 'Priority support, upgrade help, feature-request consideration',
  },
  {
    name: 'Premium',
    badge: 'Larger organizations',
    description: 'For heavier replay usage, multiple Kafka environments, and higher-touch support.',
    india90: 'INR 4,99,999',
    indiaYear: 'INR 17,99,999',
    global90: 'USD 14,999',
    globalYear: 'USD 49,999',
    users: '75 users',
    profiles: '75 Kafka profiles',
    jobs: '10,000 / 60,000 replay jobs',
    support: 'Priority support, live troubleshooting, guided upgrades',
  },
];
export const faqs = [
  ['Is ReplayGuard self-hosted?', 'Yes. ReplayGuard is designed to run inside your environment so Kafka access, metadata, and operational controls stay under your infrastructure policies.'],
  ['Does ReplayGuard store Kafka messages?', 'ReplayGuard stores replay metadata, validation snapshots, progress, and audit events. The public product positioning avoids promising payload storage, and audit/logging flows are designed to avoid payload leakage.'],
  ['Does it support exactly-once replay?', 'Yes. ReplayGuard supports Kafka transactional replay for routes and clusters that support Kafka transactions, so records are produced to the destination topic exactly once during a healthy committed execution. ReplayGuard also records replay headers and checkpoint metadata for operational traceability. As with any system coordinating Kafka with an external control-plane database, customers should keep PostgreSQL highly available; if the database is unavailable during a critical checkpoint, ReplayGuard protects recovery with durable job state and replay metadata, but downstream consumers should still follow idempotent processing practices for maximum resilience.'],
  ['Can it replay multiple partitions?', 'Yes. Replay jobs can include per-partition ranges so operators can replay a controlled subset of a topic.'],
  ['Can jobs be scheduled?', 'Yes. Jobs can have scheduled starts and replay windows so operators can align replay work to controlled time periods.'],
  ['How is access controlled?', 'ReplayGuard uses role-based access controls for administration, replay operations, topic inspection, user management, and audit review.'],
  ['Can it connect to private Kafka clusters?', 'Yes. The platform is self-hosted and configured with Kafka profiles that point to broker endpoints reachable from your deployment.'],
  ['How is ReplayGuard delivered?', 'ReplayGuard is delivered as a self-hosted platform package for approved teams. Contact us for deployment, licensing, and installation details.'],
  ['How do I request a demo?', 'Use the Request Demo link and include a short note about your Kafka environment and replay/debugging needs.'],
];
