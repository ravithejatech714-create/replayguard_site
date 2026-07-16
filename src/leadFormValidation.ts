import type { LeadFormPayload } from './leadFormTypes';

export type LeadFormFieldErrors = Partial<Record<keyof LeadFormPayload, string>>;

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validateLength(value: string, label: string, min: number, max: number) {
  const trimmed = value.trim();
  if (trimmed.length < min) {
    return `${label} must be at least ${min} characters.`;
  }
  if (trimmed.length > max) {
    return `${label} must be ${max} characters or less.`;
  }
  return undefined;
}

function validateOptionalLength(value: string | undefined, label: string, max: number) {
  if (!value) {
    return undefined;
  }
  if (value.trim().length > max) {
    return `${label} must be ${max} characters or less.`;
  }
  return undefined;
}

export function validateLeadForm(payload: LeadFormPayload): LeadFormFieldErrors {
  const errors: LeadFormFieldErrors = {};

  const nameError = validateLength(payload.name, 'Full name', 2, 120);
  if (nameError) {
    errors.name = nameError;
  }

  const email = payload.email.trim();
  if (!email) {
    errors.email = 'Work email is required.';
  } else if (email.length > 160) {
    errors.email = 'Work email must be 160 characters or less.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid work email address.';
  }

  const companyError = validateLength(payload.company, 'Company', 2, 140);
  if (companyError) {
    errors.company = companyError;
  }

  const replayMethodError = validateLength(payload.currentReplayMethod, 'Current replay method', 12, 1200);
  if (replayMethodError) {
    errors.currentReplayMethod = replayMethodError;
  }

  const roleError = validateOptionalLength(payload.role, 'Role', 120);
  if (roleError) {
    errors.role = roleError;
  }

  const kafkaError = validateOptionalLength(payload.kafkaEnvironment, 'Kafka environment', 220);
  if (kafkaError) {
    errors.kafkaEnvironment = kafkaError;
  }

  const timezoneError = validateOptionalLength(payload.preferredTimeZone, 'Preferred time zone', 80);
  if (timezoneError) {
    errors.preferredTimeZone = timezoneError;
  }

  const concernError = validateOptionalLength(payload.primaryReplayConcern, 'Primary replay concern', 1200);
  if (concernError) {
    errors.primaryReplayConcern = concernError;
  }

  return errors;
}

