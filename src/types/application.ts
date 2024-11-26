export interface ApplicationDescription {
  text: string;
  analysis?: {
    features: string[];
    entities: string[];
    workflows: string[];
    metrics: string[];
  };
}

export interface ResearchPhase {
  description: string;
  analysis: {
    features: string[];
    entities: string[];
    workflows: string[];
    metrics: string[];
  };
}

export interface VisualPRD {
  workflows: any[]; // Replace with proper workflow type
  entities: any[]; // Replace with proper entity type
  metrics: any[]; // Replace with proper metric type
}

export interface ProjectTask {
  id: string;
  name: string;
  description: string;
  type: 'development' | 'testing' | 'deployment';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];
  progress: number;
  startTime?: string;
  events: {
    id: string;
    type: 'start' | 'processing' | 'complete' | 'error';
    description: string;
    timestamp: string;
  }[];
}

export interface Feedback {
  id: string;
  type: 'workflow' | 'step' | 'section' | 'metric';
  targetId: string;
  content: string;
  impacts: {
    type: string;
    description: string;
  }[];
  createdAt: string;
  status: 'pending' | 'applied' | 'rejected';
}