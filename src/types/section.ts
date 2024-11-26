export interface Section {
  id: number;
  name: string;
  description: string;
  type: 'FORM' | 'TABLE' | 'CHART' | 'CUSTOM';
  sequence: number;
  pageId: number;
  applicationId: number;
  htmlContent: string | null;
  size: string;
  helpText: string | null;
  sectionSize: string;
  displayName: string | null;
}