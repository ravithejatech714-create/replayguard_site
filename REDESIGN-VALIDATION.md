# Homepage review

## Local preview

Run `npm ci`, then `npm run dev -- --host 127.0.0.1` and open the printed local URL.
Run `npm run build` for the production build.

## Browser checks

Run `npx playwright test`. The configuration uses installed Google Chrome and starts two local-only previews when their ports are free. Ports 5187 and 5188 are reserved for these checks. Close unrelated servers on these ports first. Form-provider requests in the submission test are intercepted; no real enquiries are sent.

Tests cover Community links and limits, operation selection, mobile navigation, screenshot opening/Escape, legal navigation, reduced motion, image loading, overflow at 320/390/768/1440 pixels, missing form configuration, validation, and simulated provider failure/success. Review screenshots are generated under `test-results`.

## Owner review before publishing

- Confirm Community repository links and stated limits against the intended release.
- Review the Streambased partnership wording and licensed-workflow qualification.
- Confirm the three selected HD screenshots: execution controls, progress/downstream impact and governance. Audit evidence is described without publishing raw evidence JSON.
- The governed recovery walkthrough uses the owner's redacted version 2 recording. Spot checks at 2:25, 2:30 and 2:35 confirmed the known token display is covered at 2:30. This is not a frame-by-frame security audit. Confirm revocation of the previously exposed token. Original recordings and unused screenshots remain excluded.
- Try navigation, FAQ, workflow controls and the screenshot viewer on phone and desktop.
- Confirm the GitHub Pages `VITE_LEAD_FORM_ENDPOINT` variable is configured to your approved Formspree endpoint. Without it, the site honestly offers email contact and disables submission.
- Send one real enquiry after deployment and confirm delivery. Automated tests do not verify real provider delivery.
- Keep the existing analytics endpoint optional; do not place secrets in any `VITE_` variable.

No deployment, commit or push is performed by this redesign. Existing deployment workflow is unchanged. Installing the test/icon dependencies reported 7 dependency audit findings (2 moderate, 5 high); review the existing Vite toolchain separately before deployment. The static production site does not run the Vite development server.
