import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { 
  BeakerIcon, 
  CubeIcon, 
  ArrowPathIcon, 
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface ResearchStageProps {
  analysis?: {
    features: string[];
    entities: string[];
    workflows: string[];
    metrics: string[];
  };
  onContinue: () => void;
}

export default function ResearchStage({ analysis, onContinue }: ResearchStageProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  if (!analysis) return null;

  const tabs = [
    {
      name: 'Features',
      icon: BeakerIcon,
      content: analysis.features
    },
    {
      name: 'Entities',
      icon: CubeIcon,
      content: analysis.entities
    },
    {
      name: 'Workflows',
      icon: ArrowPathIcon,
      content: analysis.workflows
    },
    {
      name: 'Metrics',
      icon: ChartBarIcon,
      content: analysis.metrics
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">AI Research Analysis</h2>
      
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 rounded-xl bg-gray-900 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-colors
                ${selected 
                  ? 'bg-indigo-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'}`
              }
            >
              <div className="flex items-center justify-center">
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </div>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={`rounded-xl bg-gray-900 p-6 ${
                selectedTab === idx ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <h3 className="text-lg font-medium text-white mb-4">
                Identified {tab.name}
              </h3>
              <div className="space-y-3">
                {tab.content.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onContinue}
          className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Continue to Entity Design
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}