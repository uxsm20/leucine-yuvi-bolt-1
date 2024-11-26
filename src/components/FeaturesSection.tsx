import React from 'react';
import { BeakerIcon, CpuChipIcon, ClockIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: BeakerIcon,
    title: 'Multi-Agent Intelligence',
    description: 'Harness multiple AI models working in parallel to analyze data, detect patterns, and generate insights with unprecedented accuracy.'
  },
  {
    icon: CpuChipIcon,
    title: 'Dynamic Ontology',
    description: 'Build and evolve comprehensive data models that capture complex relationships and business rules across your organization.'
  },
  {
    icon: ChartBarIcon,
    title: 'Advanced Analytics',
    description: 'Create sophisticated analytics dashboards with what-if scenarios and predictive modeling capabilities.'
  },
  {
    icon: DocumentTextIcon,
    title: 'Application Generation',
    description: 'Automatically generate full-featured applications based on your ontology and business requirements.'
  },
  {
    icon: ClockIcon,
    title: 'Real-time Processing',
    description: 'Process and analyze streaming data in real-time with automated decision-making capabilities.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Integration',
    description: 'Seamlessly integrate with existing systems while maintaining enterprise-grade security and compliance.'
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Intelligence at Scale
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            A comprehensive platform that combines data integration, analytics, and application development
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;