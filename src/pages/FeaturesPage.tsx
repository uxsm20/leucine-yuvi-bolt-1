import React from 'react';
import { BeakerIcon, CpuChipIcon, ClockIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: BeakerIcon,
    title: 'Multi-Agent AI Research',
    description: 'Parallel research processing using GPT-4, Claude, and Gemini for comprehensive analysis and insights.',
    details: [
      'Concurrent AI model processing',
      'Cross-validation of research findings',
      'Automated knowledge synthesis',
      'Context-aware research adaptation'
    ]
  },
  {
    icon: CpuChipIcon,
    title: 'Autonomous Development',
    description: 'AI-driven development lifecycle with automated coding, testing, and deployment processes.',
    details: [
      'Automated code generation',
      'Intelligent test creation',
      'Self-healing systems',
      'Continuous optimization'
    ]
  },
  {
    icon: ClockIcon,
    title: 'Rapid Iteration',
    description: 'Accelerated development cycles with real-time feedback integration and automated updates.',
    details: [
      '3x faster development speed',
      'Automated feedback processing',
      'Real-time adaptation',
      'Continuous deployment'
    ]
  },
  {
    icon: DocumentTextIcon,
    title: 'Smart Documentation',
    description: 'Auto-generated, comprehensive documentation that evolves with your project.',
    details: [
      'Dynamic documentation updates',
      'Context-aware content',
      'API documentation',
      'Usage examples'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Analytics & Insights',
    description: 'Real-time performance metrics and actionable insights for continuous improvement.',
    details: [
      'Performance monitoring',
      'Resource utilization tracking',
      'Development metrics',
      'Trend analysis'
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Integration',
    description: 'Seamless integration with existing enterprise systems and workflows.',
    details: [
      'API compatibility',
      'Custom workflow support',
      'Legacy system integration',
      'Scalable architecture'
    ]
  }
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Platform Features</h1>
          <p className="text-xl text-gray-400">Discover the powerful capabilities that make Yuvi Platform unique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              
              <p className="text-gray-400 mb-6">{feature.description}</p>

              <ul className="space-y-3">
                {feature.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;