import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ApplicationDescription } from '../../types/application';

interface ReviewStageProps {
  description: ApplicationDescription;
  onComplete: () => void;
}

export default function ReviewStage({ description, onComplete }: ReviewStageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Review & Generate</h2>

      <div className="space-y-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Application Description</h3>
          <p className="text-gray-300">{description.text}</p>
        </div>

        {description.analysis && (
          <>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {description.analysis.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Entities & Workflows</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Entities</h4>
                  <div className="space-y-2">
                    {description.analysis.entities.map((entity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-300">{entity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Workflows</h4>
                  <div className="space-y-2">
                    {description.analysis.workflows.map((workflow, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-300">{workflow}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Success Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {description.analysis.metrics.map((metric, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onComplete}
          className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Generate Application
          <CheckIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}