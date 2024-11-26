import { DocumentIcon, ArrowPathIcon, CubeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const prdElements = [
  {
    title: 'Pages & Sections',
    icon: DocumentIcon,
    description: 'Detailed layout specifications for each page and section'
  },
  {
    title: 'Workflows',
    icon: ArrowPathIcon,
    description: 'Step-by-step process flows and user journeys'
  },
  {
    title: 'Entity Actions',
    icon: CubeIcon,
    description: 'Core data entities and their associated operations'
  },
  {
    title: 'Metrics',
    icon: ChartBarIcon,
    description: 'Key performance indicators and success metrics'
  }
];

const PRDSection = () => {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Visual PRD Generation
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Comprehensive project requirements automatically generated from your feedback
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {prdElements.map((element) => (
            <div key={element.title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <element.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{element.title}</h3>
              <p className="text-gray-400">{element.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PRDSection;