import { ClockIcon, SparklesIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: ClockIcon,
    title: "Accelerated Development",
    description: "Reduce development time by up to 70% with AI-powered automation",
    stats: "3x Faster",
    metrics: [
      "Automated code generation",
      "Parallel processing",
      "Instant deployment"
    ]
  },
  {
    icon: SparklesIcon,
    title: "Enhanced Quality",
    description: "Maintain exceptional code quality through AI-driven validation",
    stats: "99.9% Accuracy",
    metrics: [
      "Automated testing",
      "Continuous validation",
      "Smart error prevention"
    ]
  },
  {
    icon: CurrencyDollarIcon,
    title: "Cost Efficiency",
    description: "Significantly reduce development and maintenance costs",
    stats: "60% Savings",
    metrics: [
      "Reduced manual effort",
      "Optimized resources",
      "Automated maintenance"
    ]
  },
  {
    icon: ArrowTrendingUpIcon,
    title: "Scalable Solutions",
    description: "Build applications that grow with your business needs",
    stats: "Unlimited Scale",
    metrics: [
      "Cloud-native architecture",
      "Automatic scaling",
      "Performance optimization"
    ]
  },
  {
    icon: BeakerIcon,
    title: "Innovation Focus",
    description: "Free your team to focus on innovation rather than routine tasks",
    stats: "80% More Time",
    metrics: [
      "Automated workflows",
      "Smart suggestions",
      "Research automation"
    ]
  },
  {
    icon: ShieldCheckIcon,
    title: "Enterprise Ready",
    description: "Built for enterprise with industry-leading security standards",
    stats: "SOC2 Certified",
    metrics: [
      "Role-based access",
      "Data encryption",
      "Compliance ready"
    ]
  }
];

const BenefitsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Transform Your Development Process
          </h1>
          <p className="text-xl text-gray-400">
            Experience the advantages of AI-powered development with Yuvi Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                  <benefit.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-indigo-500/10 rounded-lg">
                  <span className="text-lg font-semibold text-indigo-400">{benefit.stats}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {benefit.metrics.map((metric, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    <span className="text-gray-300">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
          >
            Start Your Free Trial
            <ArrowTrendingUpIcon className="ml-2 -mr-1 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage;