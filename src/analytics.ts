type AnalyticsEvent =
  | 'hero_review_cta_click'
  | 'demo_video_play'
  | 'evaluation_cta_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'lead_form_error'
  | 'screenshot_open'
  | 'faq_expand';

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;

export function track(eventName: AnalyticsEvent, payload: Record<string, unknown> = {}) {
  if (!analyticsEndpoint) {
    return;
  }

  window
    .fetch(analyticsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        ...payload,
      }),
      keepalive: true,
    })
    .catch(() => {
      // Analytics must never interrupt the visitor experience.
    });
}

