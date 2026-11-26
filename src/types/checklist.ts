import { FormTemplateId } from '../utils/formDownloader';

export type LandOwnership = 'self' | 'other';
export type ReportType = 'new' | 'extension';
export type ApplicantType = 'self' | 'agent';
export type OwnerEntityType = 'individual' | 'corporation';

export interface IntakeScenario {
  landOwnership: LandOwnership;
  reportType: ReportType;
  applicantType: ApplicantType;
  ownerEntityType: OwnerEntityType;
}

export interface OfficialFormFiles {
  hwpUrl: string;
  hwpFilename: string;
  pdfUrl: string;
  pdfFilename: string;
  versionNote: string;
}

export interface ChecklistDocument {
  id: string;
  title: string;
  legalBasis: string;
  description: string;
  importantNotice?: string;
  officialFormFiles?: OfficialFormFiles;
  formTemplateId?: FormTemplateId;
  formDownloadLabel?: string;
  isApplicable: (scenario: IntakeScenario) => boolean;
}

export interface LegalArticle {
  law: string;
  article: string;
  summary: string;
}
