import { defineConfig } from '@playwright/test';

export default defineConfig({
  testMatch: 'homepage.spec.ts',
  timeout: 45000,
  workers: 1,
  use: { channel: 'chrome', screenshot: 'only-on-failure' },
  webServer: [
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 5187 --strictPort',
      url: 'http://localhost:5187',
      reuseExistingServer: !process.env.CI,
      env: { VITE_LEAD_FORM_ENDPOINT: '', VITE_ANALYTICS_ENDPOINT: '' },
    },
    {
      command: 'npm run dev -- --host 127.0.0.1 --port 5188 --strictPort',
      url: 'http://localhost:5188',
      reuseExistingServer: !process.env.CI,
      env: { VITE_LEAD_FORM_ENDPOINT: 'https://formspree.io/f/replayguard-browser-test', VITE_ANALYTICS_ENDPOINT: '' },
    },
  ],
});
