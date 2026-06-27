export const demoLinks = {
  requestDemo: 'mailto:ravithejatech714@gmail.com?subject=ReplayGuard%20Demo%20Request&body=Hi%20Ravitheja%2C%0A%0AI%20would%20like%20to%20request%20a%20ReplayGuard%20demo.%0A%0ATeam%2FCompany%3A%0AKafka%20environment%3A%0AReplay%20or%20debugging%20use%20case%3A%0APreferred%20demo%20time%3A%0A',
  contact: 'mailto:ravithejatech714@gmail.com?subject=ReplayGuard%20Question&body=Hi%20Ravitheja%2C%0A%0AI%20have%20a%20question%20about%20ReplayGuard.%0A%0AQuestion%3A%0A',
  viewPlatform: '#screenshots',
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

