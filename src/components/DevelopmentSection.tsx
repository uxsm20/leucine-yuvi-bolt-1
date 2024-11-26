import { CodeBracketIcon, BeakerIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const phases = [
  {
    title: 'Project Planning',
    icon: CodeBracketIcon,
    tasks: [
      'Database Schema Design',
      'API Endpoint Planning',
      'Component Architecture',
      'Form Specifications',
      'Section Layouts'
    ],
    status: 'In Progress'
  },
  {
    title: 'Development Phase',
    icon: BeakerIcon,
    tasks: [
      'Database Implementation',
      'API Development',
      'UI Component Building',
      'Form Creation',
      'Section Integration'
    ],
    status: 'Pending'
  },
  {
    title: 'Testing Cycle',
    icon: CheckCircleIcon,
    tasks: [
      'Test Case Generation',
      'Automated Testing',
      'Integration Testing',
      'Performance Testing',
      'Bug Reporting'
    ],
    status: 'Pending'
  },
  {
    title: 'Review & Iteration',
    icon: ArrowPathIcon,
    tasks: [
      'Builder Review',
      'Feedback Collection',
      'Change Implementation',
      'Final Testing',
      'Deployment'
    ],
    status: 'Pending'
  }
];

const DevelopmentSection = () => {
  return (
    <div className="bg-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            AI-Driven Development Lifecycle
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Automated development process with continuous testing and feedback integration
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase) => (
            <div 
              key={phase.title}
              className="bg-gray-900 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <phase.icon className="h-6 w-6 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'In Progress' 
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {phase.status}
                </span>
              </div>

              <ul className="space-y-3">
                {phase.tasks.map((task) => (
                  <li 
                    key={task}
                    className="flex items-start space-x-3 text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 mt-1.5 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Progress</span>
                  <span className="text-xs text-indigo-400">
                    {phase.status === 'In Progress' ? '45%' : '0%'}
                  </span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: phase.status === 'In Progress' ? '45%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-colors">
            View Development Status
            <CodeBracketIcon className="ml-2 -mr-1 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentSection;