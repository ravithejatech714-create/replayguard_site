/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_FORM_ENDPOINT?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
