export interface Section {
  id: number;
  name: string;
  description: string;
  type: 'FORM' | 'TABLE' | 'CHART' | 'CUSTOM';
  sequence: number;
  pageId: number;
  applicationId: number;
  htmlContent: string | null;
  size: 'col-12' | 'col-6' | 'col-4' | 'col-3';
  helpText: string | null;
  sectionSize: string;
  displayName: string | null;
  isVisible: boolean;
  isEditable: boolean;
  isRequired: boolean;
  validations: {
    type: string;
    config: Record<string, any>;
  }[];
  dataSource?: {
    type: string;
    config: Record<string, any>;
  };
  permissions: string[];
}

export interface Page {
  id: number;
  applicationId: number;
  name: string;
  slug: string;
  description: string;
  orderId: number;
  entityName: string | null;
  parentPage: number | null;
  feedback: string | null;
  isMenuPage: boolean;
  pageType: 'LIST' | 'DETAIL' | 'FORM' | 'DASHBOARD';
  readOnlyPage: boolean;
  viewType: 'DEFAULT_VIEW' | 'CUSTOM_VIEW';
  customSecondaryPage: boolean;
  sections: Section[];
  permissions: string[];
  breadcrumbs: {
    id: number;
    name: string;
    path: string;
  }[];
  layout: {
    type: 'fixed' | 'fluid';
    maxWidth: string;
    padding: string;
  };
  theme: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
}