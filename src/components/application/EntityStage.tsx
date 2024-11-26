import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import EntityDiagram from '../EntityDiagram';

interface EntityStageProps {
  entities: string[];
  onContinue: () => void;
}

export default function EntityStage({ entities, onContinue }: EntityStageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Entity Design</h2>
      
      <div className="mb-8">
        <EntityDiagram />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onContinue}
          className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Continue to Workflow Design
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}