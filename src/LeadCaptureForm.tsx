import { cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, ReactElement } from 'react';
import { track } from './analytics';
import { submitLeadForm } from './leadFormService';
import { initialLeadForm, toLeadFormPayload } from './leadFormTypes';
import type { LeadFormPayload, LeadFormState } from './leadFormTypes';
import { validateLeadForm } from './leadFormValidation';
import type { LeadFormFieldErrors } from './leadFormValidation';

type FormStatus = 'idle' | 'submitting' | 'succeeded' | 'failed' | 'configuration-missing';

const fallbackContactEmail = 'ravithejatech714@gmail.com';

const stateToPayloadField: Record<keyof LeadFormState, keyof LeadFormPayload | undefined> = {
  fullName: 'name',
  workEmail: 'email',
  company: 'company',
  role: 'role',
  kafkaEnvironment: 'kafkaEnvironment',
  currentReplayMethod: 'currentReplayMethod',
  primaryReplayConcern: 'primaryReplayConcern',
  preferredTimeZone: 'preferredTimeZone',
  interestedInSelfHostedEvaluation: 'interestedInSelfHostedEvaluation',
  companyWebsite: undefined,
};

export function LeadCaptureForm() {
  const endpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT;
  const [form, setForm] = useState<LeadFormState>(initialLeadForm);
  const [errors, setErrors] = useState<LeadFormFieldErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');
  const [started, setStarted] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);
  const fieldRefs = useRef<Partial<Record<keyof LeadFormPayload, HTMLElement>>>({});

  const configMissing = !endpoint;
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent('ReplayGuard Kafka Replay Safety Review');
    const body = encodeURIComponent('Hi Ravitheja,\n\nI would like to discuss a ReplayGuard Kafka Replay Safety Review.\n\nCompany:\nCurrent replay method:\nPrimary replay concern:\n');
    return `mailto:${fallbackContactEmail}?subject=${subject}&body=${body}`;
  }, []);

  useEffect(() => {
    if (configMissing) {
      console.error('VITE_LEAD_FORM_ENDPOINT is not configured.');
    }
  }, [configMissing]);

  function updateField<K extends keyof LeadFormState>(key: K, value: LeadFormState[K]) {
    if (!started) {
      track('lead_form_start', { form: 'replay_safety_review' });
      setStarted(true);
    }
    setForm((current) => ({ ...current, [key]: value }));
    const payloadField = stateToPayloadField[key];
    if (payloadField) {
      setErrors((current) => ({ ...current, [payloadField]: undefined }));
    }
    setFormError('');
    if (status !== 'submitting') {
      setStatus('idle');
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.companyWebsite.trim()) {
      return;
    }

    const payload = toLeadFormPayload(form);
    const validationErrors = validateLeadForm(payload);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setStatus('failed');
      setFormError('Please correct the highlighted fields and submit again.');
      focusFirstError(validationErrors);
      track('lead_form_error', { category: 'validation', form: 'replay_safety_review' });
      return;
    }

    if (configMissing) {
      setStatus('configuration-missing');
      setFormError('Online request submission is temporarily unavailable. Please use the contact option below.');
      track('lead_form_error', { category: 'configuration', form: 'replay_safety_review' });
      console.error('VITE_LEAD_FORM_ENDPOINT is not configured.');
      return;
    }

    setStatus('submitting');
    setFormError('');
    const result = await submitLeadForm(endpoint, payload);

    if (result.ok) {
      setStatus('succeeded');
      setForm(initialLeadForm);
      setErrors({});
      setTimeout(() => successRef.current?.focus(), 0);
      track('lead_form_submit', { form: 'replay_safety_review' });
      return;
    }

    setStatus(result.type === 'configuration' ? 'configuration-missing' : 'failed');
    setFormError(result.message);
    setErrors(result.fieldErrors || {});
    if (result.fieldErrors) {
      focusFirstError(result.fieldErrors);
    }
    track('lead_form_error', { category: result.type, form: 'replay_safety_review' });
  }

  function focusFirstError(fieldErrors: LeadFormFieldErrors) {
    const firstField = Object.keys(fieldErrors)[0] as keyof LeadFormPayload | undefined;
    if (firstField) {
      fieldRefs.current[firstField]?.focus();
    }
  }

  const submitting = status === 'submitting';

  return (
    <form className="lead-form" onSubmit={submit} noValidate aria-busy={submitting}>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="_company_website"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(event) => updateField('companyWebsite', event.target.value)}
        />
      </div>

      <FormField label="Full name" field="name" error={errors.name} required register={fieldRefs}>
        <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} maxLength={120} />
      </FormField>
      <FormField label="Work email" field="email" error={errors.email} required register={fieldRefs}>
        <input type="email" value={form.workEmail} onChange={(event) => updateField('workEmail', event.target.value)} maxLength={160} />
      </FormField>
      <FormField label="Company" field="company" error={errors.company} required register={fieldRefs}>
        <input value={form.company} onChange={(event) => updateField('company', event.target.value)} maxLength={140} />
      </FormField>
      <FormField label="Role" field="role" error={errors.role} register={fieldRefs}>
        <input value={form.role} onChange={(event) => updateField('role', event.target.value)} maxLength={120} />
      </FormField>
      <FormField label="Kafka environment" field="kafkaEnvironment" error={errors.kafkaEnvironment} register={fieldRefs}>
        <input value={form.kafkaEnvironment} placeholder="Self-managed Kafka, MSK, Confluent, other" onChange={(event) => updateField('kafkaEnvironment', event.target.value)} maxLength={220} />
      </FormField>
      <FormField label="Preferred time zone" field="preferredTimeZone" error={errors.preferredTimeZone} register={fieldRefs}>
        <input value={form.preferredTimeZone} placeholder="IST, UTC, EST..." onChange={(event) => updateField('preferredTimeZone', event.target.value)} maxLength={80} />
      </FormField>
      <FormField label="Current replay method" field="currentReplayMethod" error={errors.currentReplayMethod} required full register={fieldRefs}>
        <textarea value={form.currentReplayMethod} onChange={(event) => updateField('currentReplayMethod', event.target.value)} maxLength={1200} />
      </FormField>
      <FormField label="Primary replay concern" field="primaryReplayConcern" error={errors.primaryReplayConcern} full register={fieldRefs}>
        <textarea value={form.primaryReplayConcern} onChange={(event) => updateField('primaryReplayConcern', event.target.value)} maxLength={1200} />
      </FormField>
      <label className="checkbox-field">
        <input
          type="checkbox"
          checked={form.interestedInSelfHostedEvaluation}
          onChange={(event) => updateField('interestedInSelfHostedEvaluation', event.target.checked)}
        />
        <span>Interested in a self-hosted technical evaluation</span>
      </label>

      {(formError || configMissing) && (
        <div className="form-error-panel" role="alert" aria-live="assertive">
          <strong>Submission issue</strong>
          <p>{formError || 'Online request submission is temporarily unavailable. Please use the contact option below.'}</p>
          {(status === 'configuration-missing' || configMissing) && (
            <a className="text-link" href={mailtoHref}>Contact ReplayGuard by email</a>
          )}
        </div>
      )}

      {status === 'succeeded' && (
        <div className="form-success-panel" role="status" aria-live="polite" tabIndex={-1} ref={successRef}>
          <h3>Request received</h3>
          <p>
            Thank you. Your Kafka Replay Safety Review request has been submitted successfully.
            We will review the details and contact you using the work email provided.
          </p>
          <small>For urgent enquiries, use the contact details provided on the ReplayGuard website.</small>
        </div>
      )}

      <button className="button primary" type="submit" disabled={submitting || configMissing}>
        {submitting ? 'Submitting...' : 'Book a Replay Safety Review'}
      </button>
    </form>
  );
}

function FormField({
  label,
  field,
  error,
  required = false,
  full = false,
  children,
  register,
}: {
  label: string;
  field: keyof LeadFormPayload;
  error?: string;
  required?: boolean;
  full?: boolean;
  children: ReactElement;
  register: React.MutableRefObject<Partial<Record<keyof LeadFormPayload, HTMLElement>>>;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <label className={`form-field ${full ? 'full' : ''}`} htmlFor={id}>
      <span>{label}{required && <em> required</em>}</span>
      {cloneElement(children, {
        id,
        name: field,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${id}-error` : undefined,
        ref: (element: HTMLElement | null) => {
          if (element) {
            register.current[field] = element;
          }
        },
      })}
      {error && <small id={`${id}-error`}>{error}</small>}
    </label>
  );
}
