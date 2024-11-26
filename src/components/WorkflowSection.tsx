import { BeakerIcon, DocumentTextIcon, CpuChipIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';

const workflowSteps = [
  {
    title: 'Data Integration',
    icon: BeakerIcon,
    description: 'Connect and analyze multiple data sources with automated schema detection and mapping'
  },
  {
    title: 'Ontology Building',
    icon: DocumentTextIcon,
    description: 'Create comprehensive data models that capture relationships and business rules'
  },
  {
    title: 'Analytics Generation',
    icon: CpuChipIcon,
    description: 'Generate sophisticated analytics dashboards with predictive capabilities'
  },
  {
    title: 'Application Development',
    icon: ChatBubbleBottomCenterTextIcon,
    description: 'Build and deploy full-featured applications based on your ontology'
  }
];

const WorkflowSection = () => {
  return (
    <div className="bg-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Unified Intelligence Workflow
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            From raw data to intelligent applications in one seamless process
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workflowSteps.map((step) => (
            <div key={step.title} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <step.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;