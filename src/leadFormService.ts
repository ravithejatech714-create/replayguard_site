import type { LeadFormPayload, LeadFormSubmissionResult } from './leadFormTypes';

type FormspreeError = {
  code?: string;
  field?: string;
  message?: string;
};

type FormspreeResponse = {
  ok?: boolean;
  errors?: FormspreeError[];
};

const providerMessage = 'We could not submit your request. Please check your connection and try again.';

export async function submitLeadForm(
  endpoint: string | undefined,
  payload: LeadFormPayload,
): Promise<LeadFormSubmissionResult> {
  if (!endpoint) {
    console.error('VITE_LEAD_FORM_ENDPOINT is not configured.');
    return {
      ok: false,
      type: 'configuration',
      message: 'Online request submission is temporarily unavailable. Please use the contact option below.',
    };
  }

  if (!endpoint.startsWith('https://formspree.io/')) {
    console.error('Lead form endpoint must be a Formspree HTTPS endpoint.');
    return {
      ok: false,
      type: 'configuration',
      message: 'Online request submission is temporarily unavailable. Please use the contact option below.',
    };
  }

  const formspreePayload = {
    name: payload.name,
    email: payload.email,
    company: payload.company,
    role: payload.role ?? '',
    kafkaEnvironment: payload.kafkaEnvironment ?? '',
    preferredTimeZone: payload.preferredTimeZone ?? '',
    currentReplayMethod: payload.currentReplayMethod,
    primaryReplayConcern: payload.primaryReplayConcern ?? '',
    interestedInSelfHostedEvaluation: payload.interestedInSelfHostedEvaluation,
    source: 'ReplayGuard landing page',
    pageUrl: window.location.href,
    submittedAt: new Date().toISOString(),
    _subject: `New ReplayGuard Safety Review Request - ${payload.company}`,
    _replyto: payload.email,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formspreePayload),
    });

    let providerBody: FormspreeResponse | undefined;
    try {
      providerBody = await response.json();
    } catch {
      providerBody = undefined;
    }

    if (response.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      type: 'provider',
      message: providerMessage,
      fieldErrors: mapFormspreeErrors(providerBody?.errors),
    };
  } catch (error) {
    console.error('Lead form submission failed.', error);
    return {
      ok: false,
      type: 'network',
      message: providerMessage,
    };
  }
}

function mapFormspreeErrors(errors: FormspreeError[] | undefined) {
  if (!errors || errors.length === 0) {
    return undefined;
  }

  const fieldErrors: Record<string, string> = {};
  errors.forEach((error) => {
    const field = error.field;
    if (!field) {
      return;
    }
    const mappedField = field === '_replyto' ? 'email' : field;
    fieldErrors[mappedField] = error.message || 'Please review this field.';
  });

  return fieldErrors;
}

