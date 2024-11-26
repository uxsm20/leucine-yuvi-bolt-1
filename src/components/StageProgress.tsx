import React from 'react';
import { 
  DocumentTextIcon, 
  BeakerIcon, 
  DocumentChartBarIcon, 
  RocketLaunchIcon 
} from '@heroicons/react/24/outline';

const stages = [
  { id: 'description', name: 'Description', icon: DocumentTextIcon },
  { id: 'research', name: 'Research', icon: BeakerIcon },
  { id: 'visual-prd', name: 'Visual PRD', icon: DocumentChartBarIcon },
  { id: 'project-plan', name: 'Project Plan', icon: RocketLaunchIcon }
];

interface StageProgressProps {
  currentStage: string;
}

export default function StageProgress({ currentStage }: StageProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center">
            {stages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`flex items-center ${
                  index < stages.findIndex(s => s.id === currentStage) 
                    ? 'text-indigo-400' 
                    : index === stages.findIndex(s => s.id === currentStage)
                    ? 'text-white'
                    : 'text-gray-500'
                }`}
              >
                <stage.icon className="h-6 w-6 mr-2" />
                <span className="text-sm font-medium">{stage.name}</span>
                {index < stages.length - 1 && (
                  <div className="mx-4 h-0.5 w-16 bg-gray-700">
                    <div 
                      className={`h-full bg-indigo-500 transition-all duration-500 ${
                        index < stages.findIndex(s => s.id === currentStage) ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}