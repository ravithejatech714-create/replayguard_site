export type LeadFormPayload = {
  name: string;
  email: string;
  company: string;
  role?: string;
  kafkaEnvironment?: string;
  preferredTimeZone?: string;
  currentReplayMethod: string;
  primaryReplayConcern?: string;
  interestedInSelfHostedEvaluation: boolean;
};

export type LeadFormSubmissionResult =
  | { ok: true }
  | {
      ok: false;
      type: 'configuration' | 'validation' | 'network' | 'provider';
      message: string;
      fieldErrors?: Partial<Record<keyof LeadFormPayload, string>>;
    };

export type LeadFormState = {
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  kafkaEnvironment: string;
  currentReplayMethod: string;
  primaryReplayConcern: string;
  preferredTimeZone: string;
  interestedInSelfHostedEvaluation: boolean;
  companyWebsite: string;
};

export const initialLeadForm: LeadFormState = {
  fullName: '',
  workEmail: '',
  company: '',
  role: '',
  kafkaEnvironment: '',
  currentReplayMethod: '',
  primaryReplayConcern: '',
  preferredTimeZone: '',
  interestedInSelfHostedEvaluation: true,
  companyWebsite: '',
};

export function toLeadFormPayload(form: LeadFormState): LeadFormPayload {
  return {
    name: form.fullName.trim(),
    email: form.workEmail.trim(),
    company: form.company.trim(),
    role: form.role.trim() || undefined,
    kafkaEnvironment: form.kafkaEnvironment.trim() || undefined,
    preferredTimeZone: form.preferredTimeZone.trim() || undefined,
    currentReplayMethod: form.currentReplayMethod.trim(),
    primaryReplayConcern: form.primaryReplayConcern.trim() || undefined,
    interestedInSelfHostedEvaluation: form.interestedInSelfHostedEvaluation,
  };
}

