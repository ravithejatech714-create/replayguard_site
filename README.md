# ReplayGuard Website

ReplayGuard is a self-hosted Kafka replay control plane for engineering teams that need controlled message inspection, replay validation, lifecycle controls, audit history, and operational visibility.

This repository contains the public website for ReplayGuard.

Production domain:

```text
https://replayguard.in
```

## Local Commands

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Optional Environment Variables

Lead form submissions require an external endpoint:

```env
VITE_LEAD_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

If this is not configured, the form renders but shows a friendly unavailable message instead of pretending submission succeeded.

Analytics can be enabled with a lightweight POST endpoint:

```env
VITE_ANALYTICS_ENDPOINT=https://example.com/replayguard-events
```

If this is not configured, analytics calls safely do nothing.

## Lead Form Setup

1. Create a Formspree account.
2. Create a form named `ReplayGuard Safety Review`.
3. Configure the recipient as `ravithejatech714@gmail.com`.
4. Verify the recipient email.
5. Copy the generated Formspree endpoint.
6. For local development, create `.env.local`:

```env
VITE_LEAD_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

7. For GitHub Pages deployment, open:

```text
Repository -> Settings -> Secrets and variables -> Actions -> Variables
```

8. Create the variable:

```text
Name:
VITE_LEAD_FORM_ENDPOINT

Value:
the Formspree form endpoint
```

9. Trigger or rerun the deployment workflow.
10. Submit a test request and confirm:

- the browser shows the ReplayGuard success message
- Formspree shows the submission
- the email notification reaches the configured inbox

The endpoint is public by design for browser form submissions. Do not add SMTP credentials, Gmail passwords, Gmail app passwords, private email API keys, or Formspree account credentials to this repository.

## Notes

Do not add secrets, private registry tokens, customer names, real Kafka hostnames, credentials, or sensitive payloads to this website.

## License

Copyright ReplayGuard. All rights reserved.
