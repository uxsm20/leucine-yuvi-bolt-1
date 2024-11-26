import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { 
  ArrowPathIcon,
  DocumentTextIcon,
  CubeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { VisualPRD, Feedback } from '../../types/application';
import WorkflowDiagram from '../WorkflowDiagram';
import EntityDiagram from '../EntityDiagram';
import MetricsPanel from '../MetricsPanel';
import FeedbackPanel from './FeedbackPanel';

interface VisualPRDStageProps {
  prd: VisualPRD;
  onComplete: () => void;
}

export default function VisualPRDStage({ prd, onComplete }: VisualPRDStageProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleFeedbackSubmit = async (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => {
    const newFeedback: Feedback = {
      ...feedback,
      id: `f${feedbacks.length + 1}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setFeedbacks([...feedbacks, newFeedback]);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate regenerating PRD based on feedback
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRegenerating(false);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Visual PRD</h2>
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating || feedbacks.length === 0}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50"
        >
          {isRegenerating ? (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              Regenerating...
            </>
          ) : (
            'Apply Feedback & Continue'
          )}
        </button>
      </div>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-900 p-1 mb-6">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors flex items-center justify-center
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Workflows
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors flex items-center justify-center
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            <CubeIcon className="h-5 w-5 mr-2" />
            Entities
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors flex items-center justify-center
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Metrics
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <WorkflowDiagram />
          </Tab.Panel>
          <Tab.Panel>
            <EntityDiagram />
          </Tab.Panel>
          <Tab.Panel>
            <MetricsPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-8">
        <FeedbackPanel
          feedbacks={feedbacks}
          onSubmit={handleFeedbackSubmit}
        />
      </div>
    </motion.div>
  );
}