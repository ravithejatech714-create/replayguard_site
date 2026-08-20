export const site = {
  canonicalUrl: 'https://replayguard.in',
  productName: 'ReplayGuard',
  productVersion: 'Governed recovery release',
  lastUpdated: 'August 2026',
  founderName: 'Ravitheja',
  linkedinUrl: 'https://www.linkedin.com/',
  reviewCta: 'Book a Recovery Workflow Review',
  evaluationCta: 'Discuss a Technical Evaluation',
};

export const demoVideo = {
  path: '/demo/replayguard-governed-recovery-demo.mp4',
  poster: '/demo/replayguard-governed-recovery-cover.png',
  stages: ['Inspect', 'Preview', 'Approve', 'Execute', 'Control', 'Evidence'],
};

export const diagnosticQuestions = [
  'Can operators prove the selected topics, partitions, offsets and record volume before execution?',
  'Do high-impact recoveries require independent approval, or only operator judgement?',
  'Can policies restrict which topics, consumer groups, rates and offset movements are allowed?',
  'Will an approved operation be rejected if its resolved Kafka state changes before execution?',
  'Can incident automation submit a proposal without receiving unrestricted execution access?',
  'Can you produce a durable evidence record showing who requested, approved, executed and verified recovery?',
];

export const recoveryOperations = [
  {
    code: '01',
    title: 'Offset-range replay',
    text: 'Replay explicit, frozen partition ranges to a controlled destination with validation, rate limits and lifecycle controls.',
    detail: 'Supports multi-partition ranges, dry runs, scheduling and guarded same-topic routes.',
  },
  {
    code: '02',
    title: 'Timestamp-window recovery',
    text: 'Resolve a time window into concrete per-partition offsets before creating the governed recovery operation.',
    detail: 'The resolved scope is visible before execution and preserved with the operation record.',
  },
  {
    code: '03',
    title: 'DLQ redrive',
    text: 'Redrive failed records to an explicit destination or safely route them using original-topic metadata headers.',
    detail: 'Supports optional original-partition routing, bounded ranges and production verification.',
  },
  {
    code: '04',
    title: 'Consumer-group offset reset',
    text: 'Preview and apply earliest, latest, timestamp, absolute, relative or per-partition offset changes.',
    detail: 'Detects active groups and rejects stale approved state before changing committed offsets.',
  },
];

export const replayComparison = [
  ['Scope', 'Topics and offsets assembled by an operator', 'Structured requested scope plus resolved Kafka scope'],
  ['Policy', 'Runbook guidance or reviewer memory', 'Enforced topic, group, volume, rate and movement limits'],
  ['Approval', 'Chat, ticket or verbal confirmation', 'Maker-checker approval with an expiry window'],
  ['Change detection', 'Operator rechecks manually', 'Approved fingerprint is compared before execution'],
  ['Automation', 'Broad credentials embedded in scripts', 'Scoped, expiring service accounts and idempotent APIs'],
  ['Runtime control', 'Depends on custom script behavior', 'Rate limits, progress, pause, resume, stop and cancel'],
  ['Verification', 'Manual destination checks', 'Kafka production or recorded manual verification where applicable'],
  ['Evidence', 'Logs and incident notes assembled later', 'Central request, approval, execution and verification evidence'],
];

export const governanceSteps = [
  ['Define policy', 'Assign permitted operations, topic and group patterns, limits and approval rules to a Kafka profile.'],
  ['Preview scope', 'Resolve Kafka metadata into a concrete, reviewable recovery scope before execution.'],
  ['Fingerprint', 'Hash the canonical requested and resolved scope so later changes can be detected.'],
  ['Approve', 'Require an independent checker when the assigned policy marks the operation as approval-gated.'],
  ['Execute', 'A worker claims eligible jobs, enforces rate and lifecycle controls, and checkpoints progress.'],
  ['Verify and evidence', 'Record production or manual verification and export a focused recovery evidence record.'],
];

export const operationalImpact = [
  ['Shorter incident preparation', 'Replace offset spreadsheets, ad hoc commands and repeated peer checks with a reusable governed workflow.'],
  ['Lower operational uncertainty', 'Show the resolved scope, policy decision, approval state and execution progress in one control plane.'],
  ['Stronger accountability', 'Preserve the requester, checker, reason, execution history and verification result for later review.'],
];

export const capabilityGroups = [
  {
    title: 'Inspect and resolve',
    items: ['Reusable secured Kafka profiles', 'Topic, partition, offset and timestamp inspection', 'Bounded message previews', 'Multi-partition range selection', 'Timestamp-to-offset resolution'],
  },
  {
    title: 'Govern recovery',
    items: ['Profile-assigned recovery policies', 'Topic and consumer-group allow patterns', 'Volume, rate and offset-movement limits', 'Maker-checker approvals and validity windows', 'Canonical request fingerprints'],
  },
  {
    title: 'Execute and control',
    items: ['Dry-run and replay modes', 'Worker leases, recovery and checkpoints', 'Pause, resume, stop and cancel', 'Scheduled starts and execution windows', 'Kafka transactional producing where supported'],
  },
  {
    title: 'Automate and prove',
    items: ['Scoped service accounts with one-time tokens', 'Validation and proposal APIs for runbooks and agents', 'Idempotency and API rate limits', 'Append-only audit and lifecycle history', 'Verification and exportable recovery evidence'],
  },
];

export const automationControls = [
  ['Least-privilege identity', 'Admins issue an expiring service account with only the proposal, read or runtime-control scopes the integration needs.'],
  ['One-time secret delivery', 'The plaintext token is shown once. ReplayGuard stores its cryptographic hash, plus expiry, revocation and last-used metadata.'],
  ['Human governance remains', 'Incident agents and runbooks can validate and propose recovery. Policy-required approval is still performed by an authorized human checker.'],
  ['Repeat-safe requests', 'Idempotency keys prevent a retried integration call from silently creating duplicate operations.'],
];

export const sameTopicSafeguards = [
  'Disabled unless the assigned policy permits same-topic replay',
  'Explicit high-risk acknowledgement from the requester',
  'Successful matching dry run required before REPLAY mode',
  'Independent approval for the guarded replay operation',
  'Frozen source ranges prevent newly appended records entering the request',
  'ReplayGuard-produced records skipped by default, with explicit override required',
];

export const screenshots = [
  { title: 'Topic Explorer', path: '/screenshots/topic-explorer.png', text: 'Inspect Kafka topics, partitions, offsets, keys and bounded message previews before defining recovery scope.' },
  { title: 'Replay Creation', path: '/screenshots/replay-creation.png', text: 'Create a structured multi-partition replay with route, ranges, rate limits, execution mode and validation.' },
  { title: 'Execution Details', path: '/screenshots/replay-detail.png', text: 'Review execution state, per-partition progress, validation, idempotency metadata and lifecycle events.' },
  { title: 'Kafka Profiles', path: '/screenshots/kafka-profiles.png', text: 'Configure reusable Kafka connections and validate broker access before governed operations use them.' },
  { title: 'Audit History', path: '/screenshots/audit-logs.png', text: 'Review operator, automation, administrative and execution actions through a central audit history.' },
  { title: 'Operations Dashboard', path: '/screenshots/dashboard.png', text: 'Monitor recovery status, worker health, recent failures, audit activity and subscription usage.' },
];

export const safetyGroups = [
  {
    title: 'Identity and access',
    items: ['Role-based user permissions', 'Maker-checker separation', 'Scoped service-account permissions', 'Expiring and revocable automation credentials', 'Secure browser sessions and CSRF protection'],
  },
  {
    title: 'Data and credentials',
    items: ['Encrypted Kafka profile secrets', 'Customer-controlled infrastructure', 'No message payloads in audit logs', 'Bounded topic inspection', 'Customer-controlled Kafka network access'],
  },
  {
    title: 'Execution safeguards',
    items: ['Policy evaluation before execution', 'Frozen and fingerprinted recovery scope', 'Rate, volume and offset-movement limits', 'Active consumer-group protection', 'Stale approved-state rejection', 'Guarded same-topic replay'],
  },
];

export const deploymentCallouts = [
  'Kafka records remain in the customer-controlled environment.',
  'Docker Compose and Kubernetes with Helm are supported deployment paths.',
  'PostgreSQL stores control-plane state, audit history and coordination buckets.',
  'ReplayGuard does not require vendor access to customer Kafka brokers.',
  'Signed licences and private container delivery support self-hosted operation.',
];

export const audienceFit = {
  suitable: ['Platform and SRE teams operating production Kafka', 'Teams recovering from poisoned events, DLQ growth or incorrect offsets', 'Data-platform teams managing event reprocessing and backfills', 'Organizations requiring approval and evidence around production recovery', 'Teams integrating incident agents or runbooks without bypassing governance'],
  notIntended: ['Teams requiring only basic topic browsing', 'Companies that never perform Kafka recovery or reprocessing', 'Teams seeking a hosted Kafka service', 'Teams trying to replace their Kafka platform or observability stack'],
};

export const evaluationSteps = [
  ['Recovery review', 'Map one current replay, DLQ, timestamp or offset-reset runbook and identify its operational controls.'],
  ['Policy design', 'Define allowed scope, limits, approval rules and operator roles for the selected Kafka profile.'],
  ['Non-production deployment', 'Deploy with Docker Compose or Helm inside a customer-controlled evaluation environment.'],
  ['Controlled recovery', 'Preview, approve, execute and verify one representative operation against test topics and groups.'],
  ['Evidence review', 'Review lifecycle history, verification output and the exported evidence record with platform stakeholders.'],
];

export const successCriteria = ['Kafka security and connectivity verified', 'Recovery policy enforced against allowed and denied scope', 'Preview and resolved scope reviewed', 'Maker-checker approval tested', 'Replay or recovery operation completed', 'Pause, stop and recovery controls verified where applicable', 'Service-account proposal tested without bypassing approval', 'Verification and evidence record reviewed'];

export const fitComparisons = [
  ['Kafka scripts', 'Flexible and familiar', 'Central policy, approval, stale-state detection and evidence'],
  ['Consumer reset tools', 'Direct group repositioning', 'Governed preview, active-group protection and rollback evidence'],
  ['General Kafka UIs', 'Broad browsing and administration', 'Focused recovery workflows and execution controls'],
  ['Internal recovery platforms', 'Fully customizable', 'A maintained product workflow without building the control plane internally'],
  ['ReplayGuard', 'Governed recovery across replay, DLQ, timestamp and offset-reset operations', 'Requires self-hosted deployment and technical evaluation'],
];

export const faqs = [
  ['Which Kafka recovery operations are supported?', 'ReplayGuard supports offset-range replay, timestamp-window recovery, DLQ redrive and consumer-group offset reset. Each operation exposes a previewable scope and applies the policy assigned to the selected Kafka profile.'],
  ['Is ReplayGuard a hosted SaaS product?', 'No. ReplayGuard runs inside customer-controlled infrastructure. Customers control Kafka connectivity, PostgreSQL, networking, deployment access and application users.'],
  ['Can ReplayGuard replay records back into the same topic?', 'Yes, through a guarded workflow. The route must be allowed by policy, the requester must acknowledge the risk, a matching dry run is required, and the replay requires independent approval. Source ranges are frozen and records previously produced by ReplayGuard are skipped unless explicitly included.'],
  ['Can incident agents or runbooks create recoveries?', 'Authorized integrations can use scoped service accounts to validate requests and submit proposals. Tokens expire and can be revoked. Policy-required approval remains a human action, so automation does not receive unrestricted production recovery access.'],
  ['What delivery guarantees does ReplayGuard support?', 'ReplayGuard supports at-least-once processing and Kafka transactional producing where the selected Kafka route supports transactions. Kafka transactions prevent partial visibility within a committed Kafka transaction. Kafka production and PostgreSQL checkpointing are separate systems, so a crash after Kafka commit but before checkpoint persistence can replay a small range. Downstream consumers should remain idempotent.'],
  ['Does ReplayGuard store Kafka message payloads?', 'ReplayGuard stores operation configuration, resolved scope, approvals, progress checkpoints, verification and audit metadata. Kafka message payloads are not written to audit or application logs. Topic Explorer displays bounded previews retrieved from the customer Kafka environment.'],
  ['How is an approved recovery protected from later changes?', 'ReplayGuard canonicalizes and fingerprints the requested and resolved scope. Before execution it checks the approved state again. Consumer-group resets also compare current committed offsets with the approved before-state and reject stale proposals.'],
  ['How is ReplayGuard deployed?', 'ReplayGuard is delivered through private container images and a signed subscription licence. Customers can deploy with Docker Compose or Kubernetes using the provided Helm chart, then configure Kafka and PostgreSQL inside their environment.'],
  ['Does ReplayGuard replace existing Kafka platforms?', 'No. ReplayGuard is a focused recovery control plane that complements Kafka infrastructure, observability and administration tools.'],
  ['Can ReplayGuard connect to secured Kafka clusters?', 'ReplayGuard supports common Kafka security configurations including SSL, SASL_PLAINTEXT, SASL_SSL, PLAIN, SCRAM-SHA-256 and SCRAM-SHA-512, subject to customer configuration and environment compatibility.'],
];

export const legalPages = {
  privacy: {
    title: 'Privacy', eyebrow: 'Website privacy',
    body: ['ReplayGuard’s public website explains the product and collects technical evaluation interest. Do not submit production secrets, Kafka credentials, customer payloads or confidential incident data through public website forms.', 'If a lead-capture endpoint is configured, submitted contact details may be used to respond to product enquiries, schedule technical discussions and manage evaluation requests.', 'ReplayGuard is self-hosted for customer deployments. Customer Kafka data and supporting infrastructure remain under customer control.'],
  },
  terms: {
    title: 'Terms', eyebrow: 'Website terms',
    body: ['The information on this website is provided for product evaluation and discussion. Capabilities may depend on customer environment, Kafka configuration and subscription terms.', 'ReplayGuard is delivered through private container images, customer-facing documentation and signed subscription licensing.', 'Commercial terms, support commitments and deployment scope should be confirmed in writing before production use.'],
  },
  security: {
    title: 'Security', eyebrow: 'Security posture',
    body: ['ReplayGuard is designed for self-hosted deployment inside customer-controlled infrastructure. Customers control network routes, Kafka connectivity, credentials, PostgreSQL and application access.', 'The platform supports role-based access, maker-checker approvals, scoped service accounts, secure browser sessions, CSRF protection, encrypted Kafka profile credentials, bounded message inspection and recovery lifecycle controls.', 'ReplayGuard does not claim formal third-party certifications on this website. Customer security reviews should be performed during technical evaluation.'],
  },
  contact: {
    title: 'Contact', eyebrow: 'Technical evaluation',
    body: ['Use the Recovery Workflow Review form on the homepage to request a technical discussion.', 'A useful first conversation covers your current recovery method, Kafka security model, governance requirements and one representative replay, DLQ or offset-reset scenario.'],
  },
};
