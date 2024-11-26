import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  BeakerIcon, 
  CubeIcon, 
  ArrowPathIcon, 
  ChartBarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface ResearchStageProps {
  activeTab: number;
  onTabChange: (index: number) => void;
  onContinue: () => void;
}

const mockResearchData = {
  analysis: {
    features: [
      "User authentication and authorization",
      "Role-based access control",
      "Real-time data synchronization",
      "Automated workflow management",
      "Document version control",
      "Audit trail tracking",
      "Compliance reporting",
      "Analytics dashboard"
    ],
    entities: [
      "Users",
      "Roles",
      "Permissions",
      "Documents",
      "Workflows",
      "Audit Logs",
      "Reports",
      "Analytics"
    ],
    workflows: [
      "User onboarding process",
      "Document approval workflow",
      "Role assignment workflow",
      "Audit review process",
      "Report generation workflow",
      "Analytics data collection"
    ],
    metrics: [
      "User adoption rate",
      "Document processing time",
      "Workflow completion rate",
      "System response time",
      "Data accuracy rate",
      "Compliance score",
      "User satisfaction score"
    ]
  }
};

export default function ResearchStage({
  activeTab,
  onTabChange,
  onContinue
}: ResearchStageProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setShowConfirmation(true);
    await onContinue();
    setIsGenerating(false);
  };

  const renderContent = (items: string[]) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-3">
          <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
          <span className="text-gray-300">{item}</span>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <Tab.Group selectedIndex={activeTab} onChange={onTabChange}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-900 p-1 mb-6">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            Research Analysis
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            Entity Relationships
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            Workflows
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
            ${selected 
              ? 'bg-indigo-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
          }>
            Metrics
          </Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Identified Features</h3>
              {renderContent(mockResearchData.analysis.features)}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Core Entities</h3>
              {renderContent(mockResearchData.analysis.entities)}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Key Workflows</h3>
              {renderContent(mockResearchData.analysis.workflows)}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Success Metrics</h3>
              {renderContent(mockResearchData.analysis.metrics)}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <CheckIcon className="h-5 w-5 mr-2" />
              Generate Application
            </>
          )}
        </button>
      </div>

      <Transition show={showConfirmation} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => setShowConfirmation(false)}
        >
          <div className="fixed inset-0 bg-black/75" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium text-white mb-4">
                  Application Generated Successfully
                </Dialog.Title>
                <p className="text-gray-300">
                  Your application has been generated and is ready for development.
                </p>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    View Project Plan
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
}