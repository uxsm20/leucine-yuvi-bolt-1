import React from 'react';
import { motion } from 'framer-motion';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface DescriptionStageProps {
  description: string;
  isAnalyzing: boolean;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function DescriptionStage({
  description,
  isAnalyzing,
  onDescriptionChange,
  onSubmit
}: DescriptionStageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Describe Your Application</h2>
      <form onSubmit={onSubmit}>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full h-64 px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="Describe your application in detail. Include key features, workflows, and any specific requirements..."
          disabled={isAnalyzing}
        />
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isAnalyzing || !description.trim()}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Start Analysis'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}