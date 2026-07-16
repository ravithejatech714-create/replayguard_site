export const site = {
  canonicalUrl: 'https://replayguard.in',
  productName: 'ReplayGuard',
  productVersion: 'Version 1',
  lastUpdated: 'July 2026',
  founderName: 'Ravitheja',
  linkedinUrl: 'https://www.linkedin.com/',
  reviewCta: 'Book a Replay Safety Review',
  evaluationCta: 'Discuss a Technical Evaluation',
};

export const demoVideo = {
  path: '/demo/replayguard-demo.mp4',
  poster: '/demo/replayguard-demo-cover.png',
  stages: ['Inspect', 'Validate', 'Execute', 'Monitor', 'Audit'],
};

export const diagnosticQuestions = [
  'Was the correct topic, partition and offset range selected?',
  'Has the estimated replay volume been reviewed?',
  'Can the replay be rate-limited?',
  'Can execution be paused or stopped safely?',
  'Can you identify who initiated the replay and why?',
  'Is there a complete audit trail after the incident?',
];

export const replayComparison = [
  ['Topic and offsets', 'Engineer selects manually', 'Structured replay request and validation'],
  ['Estimated volume', 'Calculated separately', 'Reviewed during replay validation'],
  ['Credentials', 'Often stored in scripts or local configuration', 'Managed through encrypted Kafka profiles'],
  ['Rate control', 'Requires custom implementation', 'Per-job replay rate control'],
  ['Progress', 'Logs and manual checks', 'Central job and partition progress'],
  ['Pause or stop', 'Depends on the implementation', 'Controlled lifecycle actions'],
  ['Operator reason', 'Usually maintained outside the replay operation', 'Recorded as part of the replay job'],
  ['Audit history', 'Manual or incomplete', 'Central audit trail'],
  ['Repeatability', 'Depends on the engineer and runbook', 'Standardized workflow'],
];

export const workflowSteps = [
  ['Connect', 'Configure a reusable Kafka profile.'],
  ['Inspect', 'Browse topics, partitions, offsets and selected message metadata.'],
  ['Select', 'Define the source, destination and exact replay ranges.'],
  ['Validate', 'Check connectivity, topic availability, offset boundaries, limits and replay configuration.'],
  ['Execute', 'Run a dry check or controlled replay through the replay worker.'],
  ['Control', 'Monitor progress and pause, resume, stop or cancel execution.'],
  ['Audit', 'Preserve the operator, business reason and replay lifecycle history.'],
];

export const operationalImpact = [
  ['Less manual preparation', 'Replace one-off scripts and repeated offset calculations with a structured replay request.'],
  ['Faster operational visibility', 'Follow execution, partition progress and lifecycle events from one interface.'],
  ['Stronger accountability', 'Preserve who initiated the replay, what was selected and why it was performed.'],
];

export const capabilityGroups = [
  {
    title: 'Inspect and prepare',
    items: [
      'Reusable Kafka profiles',
      'Topic Explorer',
      'Partition and offset boundaries',
      'Message metadata and bounded payload preview',
      'Multi-partition selection',
    ],
  },
  {
    title: 'Validate and execute',
    items: [
      'Replay validation',
      'Dry-run mode',
      'Per-job rate limits',
      'Scheduled execution',
      'Replay execution windows',
      'Kafka transactional producing where supported',
    ],
  },
  {
    title: 'Operate safely',
    items: [
      'Worker-controlled lifecycle',
      'Pause, resume, stop and cancel',
      'Worker leases and recovery',
      'Progress checkpoints',
      'Per-partition progress',
      'Operational dashboard',
    ],
  },
  {
    title: 'Govern and audit',
    items: [
      'Role-based access control',
      'Audit history',
      'User management',
      'Replay business reason',
      'Replay metadata headers',
      'Licence and subscription controls',
    ],
  },
];

export const screenshots = [
  {
    title: 'Topic Explorer',
    path: '/screenshots/topic-explorer.png',
    text: 'Inspect Kafka topics, partitions, offsets, keys and bounded message previews before selecting a replay range.',
  },
  {
    title: 'Replay Creation',
    path: '/screenshots/replay-creation.png',
    text: 'Create a structured replay request with route, partition ranges, rate limits, execution mode and validation.',
  },
  {
    title: 'Replay Execution Details',
    path: '/screenshots/replay-detail.png',
    text: 'Review execution status, per-partition progress, validation snapshots, idempotency metadata and lifecycle events.',
  },
  {
    title: 'Kafka Profiles',
    path: '/screenshots/kafka-profiles.png',
    text: 'Configure reusable Kafka connections and validate broker access before operators use them in replay workflows.',
  },
  {
    title: 'Audit History',
    path: '/screenshots/audit-logs.png',
    text: 'Review replay, browsing, administrative and lifecycle actions through a central audit trail.',
  },
  {
    title: 'Dashboard',
    path: '/screenshots/dashboard.png',
    text: 'Monitor replay status, worker health, recent failures, audit activity and subscription usage.',
  },
];

export const safetyGroups = [
  {
    title: 'Access',
    items: [
      'Role-based permissions',
      'Mandatory first-login password change',
      'Secure browser sessions',
      'Administrative user controls',
      'CSRF protection',
    ],
  },
  {
    title: 'Data and credentials',
    items: [
      'Encrypted Kafka credentials',
      'Customer-controlled infrastructure',
      'No message payloads in audit logs',
      'Bounded topic inspection',
      'Customer-controlled Kafka network access',
    ],
  },
  {
    title: 'Execution safety',
    items: [
      'Validation before execution',
      'Replay rate and admission limits',
      'Pause, resume, stop and cancel',
      'Scheduling and replay windows',
      'Append-only operational events',
      'Controlled rerun and recovery behavior',
    ],
  },
];

export const deploymentCallouts = [
  'Kafka records remain in the customer-controlled environment.',
  'Kafka credentials are configured within the customer deployment.',
  'ReplayGuard does not require direct vendor access to customer Kafka brokers.',
  'Customers control network routes and Kafka permissions.',
  'ReplayGuard images are delivered through a private registry workflow.',
];

export const audienceFit = {
  suitable: [
    'Platform engineering teams operating Kafka',
    'SRE teams responsible for incident recovery',
    'Data-platform teams managing event pipelines',
    'Backend teams handling reprocessing and backfills',
    'Regulated teams requiring operator accountability',
  ],
  notIntended: [
    'Teams requiring only basic topic browsing',
    'Companies that never perform message replay or reprocessing',
    'Teams seeking a hosted Kafka service',
    'Teams trying to replace their entire Kafka platform',
  ],
};

export const evaluationSteps = [
  ['Workflow review', 'Review the team’s current replay method, operational risks and technical requirements.'],
  ['Technical fit', 'Confirm deployment, networking and Kafka security prerequisites.'],
  ['Non-production installation', 'Deploy ReplayGuard in a selected customer-controlled environment.'],
  ['Controlled scenario', 'Inspect, validate and replay a defined test range.'],
  ['Success review', 'Assess safety, usability, auditability and operational fit.'],
];

export const successCriteria = [
  'Kafka connectivity verified',
  'Replay request validated',
  'Dry-run completed',
  'Controlled replay completed',
  'Rate controls tested',
  'Lifecycle actions verified',
  'Audit history reviewed',
  'Removal procedure documented',
];

export const fitComparisons = [
  ['Kafka scripts', 'Flexible and familiar', 'Safety and repeatability depend on implementation and operator discipline'],
  ['Consumer offset-reset tools', 'Useful for consumer-group repositioning', 'Not a complete selective replay validation, execution and audit workflow'],
  ['General Kafka UIs', 'Useful for topic browsing and administration', 'Controlled replay governance is not always their primary purpose'],
  ['Internal replay platforms', 'Fully customizable', 'Require engineering ownership, maintenance and ongoing support'],
  ['ReplayGuard', 'Purpose-built replay validation, execution control and audit workflow', 'Requires customer deployment and technical evaluation'],
];

export const faqs = [
  [
    'Is ReplayGuard a hosted SaaS product?',
    'No. ReplayGuard is deployed inside the customer’s own infrastructure using private container images and a signed subscription licence. Customers control Kafka connectivity, supporting infrastructure, networking and application access.',
  ],
  [
    'Does ReplayGuard store Kafka message payloads?',
    'ReplayGuard stores replay configuration, validation results, progress checkpoints and audit metadata required to operate replay jobs. Kafka message payloads are not written to audit logs or application logs. Topic Explorer displays bounded message previews retrieved from the customer’s Kafka environment.',
  ],
  [
    'What delivery guarantees does ReplayGuard support?',
    'ReplayGuard supports at-least-once replay and Kafka transactional producing where the selected Kafka route supports transactions. Kafka transactions help prevent partial production within a committed transaction. Because ReplayGuard also coordinates replay state and checkpoints outside Kafka, downstream consumers should remain idempotent for maximum end-to-end resilience.',
  ],
  [
    'How is ReplayGuard delivered?',
    'ReplayGuard is delivered through private container images, customer-facing deployment documentation and a signed subscription licence. Customers configure Kafka connectivity and supporting infrastructure inside their own environment.',
  ],
  [
    'Does ReplayGuard replace existing Kafka platforms?',
    'No. ReplayGuard is focused on controlled Kafka replay and debugging. It is designed to complement existing Kafka infrastructure, observability and administration tools.',
  ],
  [
    'Can ReplayGuard connect to secured Kafka clusters?',
    'ReplayGuard supports common Kafka security configurations, including SSL, SASL_PLAINTEXT, SASL_SSL, PLAIN, SCRAM-SHA-256 and SCRAM-SHA-512, subject to customer configuration and environment compatibility.',
  ],
  [
    'Can replay jobs be paused or stopped?',
    'Yes. ReplayGuard supports controlled lifecycle actions including pause, resume, stop and cancel, with execution state and audit history recorded by the platform.',
  ],
  [
    'How do we evaluate ReplayGuard?',
    'Evaluation begins with a replay workflow review, followed by technical fit confirmation and a scoped non-production deployment against a defined replay scenario.',
  ],
];

export const legalPages = {
  privacy: {
    title: 'Privacy',
    eyebrow: 'Website privacy',
    body: [
      'ReplayGuard’s public website is intended to explain the product and collect technical evaluation interest. Do not submit production secrets, Kafka credentials, customer payloads or confidential incident data through public website forms.',
      'If a lead-capture endpoint is configured, submitted contact details may be used to respond to product enquiries, schedule technical discussions and manage evaluation requests.',
      'ReplayGuard is self-hosted for customer deployments. Customer Kafka data and supporting infrastructure remain under customer control.',
    ],
  },
  terms: {
    title: 'Terms',
    eyebrow: 'Website terms',
    body: [
      'The information on this website is provided for product evaluation and discussion. Product capabilities may depend on customer environment, Kafka configuration and subscription terms.',
      'ReplayGuard is delivered through private container images, customer-facing documentation and signed subscription licensing.',
      'Commercial terms, support commitments and deployment scope should be confirmed in writing before production use.',
    ],
  },
  security: {
    title: 'Security',
    eyebrow: 'Security posture',
    body: [
      'ReplayGuard is designed for self-hosted deployment inside customer-controlled infrastructure. Customers control network routes, Kafka connectivity, credentials, PostgreSQL, Redis and application access.',
      'The platform supports role-based access, secure browser sessions, CSRF protection, encrypted Kafka profile credentials, bounded message inspection and replay lifecycle controls.',
      'ReplayGuard does not claim formal third-party certifications on this website. Customer security reviews should be performed during technical evaluation.',
    ],
  },
  contact: {
    title: 'Contact',
    eyebrow: 'Technical evaluation',
    body: [
      'Use the Replay Safety Review form on the homepage to request a technical discussion.',
      'A good first conversation covers your current replay method, Kafka security model, deployment requirements and one representative replay scenario.',
    ],
  },
};

