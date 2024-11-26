import React from 'react';
import { 
  ArrowTrendingUpIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const stories = [
  {
    company: "Leading Pharmaceutical Manufacturer",
    title: "SAP Activation & Integration",
    description: "Transformed SAP implementation with automated validation and testing",
    results: [
      { metric: "70%", label: "Reduction in validation time" },
      { metric: "90%", label: "Test automation coverage" },
      { metric: "$2.5M", label: "Annual cost savings" },
      { metric: "6 months", label: "Implementation time" }
    ],
    quote: {
      text: "Yuvi's platform revolutionized our SAP validation process, reducing time-to-market while ensuring compliance.",
      author: "Director of IT Operations"
    },
    improvements: [
      "Automated test script generation and execution",
      "Real-time compliance documentation",
      "Integrated change management",
      "Continuous validation framework"
    ]
  },
  {
    company: "Global Biotech Company",
    title: "Revenue Operations System",
    description: "Implemented end-to-end revenue operations platform with predictive analytics",
    results: [
      { metric: "35%", label: "Increase in revenue forecast accuracy" },
      { metric: "60%", label: "Reduction in revenue leakage" },
      { metric: "45%", label: "Improvement in cash flow" },
      { metric: "3 months", label: "ROI achievement" }
    ],
    quote: {
      text: "The AI-driven insights have transformed our revenue operations, providing unprecedented visibility and control.",
      author: "VP of Finance"
    },
    improvements: [
      "Automated revenue recognition",
      "Predictive forecasting",
      "Real-time financial analytics",
      "Integrated compliance reporting"
    ]
  },
  {
    company: "Manufacturing Excellence Corp",
    title: "Quality Management Transformation",
    description: "Modernized quality management system with AI-powered automation",
    results: [
      { metric: "85%", label: "Reduction in quality incidents" },
      { metric: "95%", label: "Documentation compliance" },
      { metric: "40%", label: "Efficiency improvement" },
      { metric: "4 months", label: "Full deployment time" }
    ],
    quote: {
      text: "Yuvi's platform has elevated our quality management to new heights, making us more competitive in the market.",
      author: "Head of Quality Assurance"
    },
    improvements: [
      "Automated quality checks",
      "Real-time deviation management",
      "Predictive quality analytics",
      "Digital quality documentation"
    ]
  }
];

const metrics = [
  { icon: ClockIcon, value: "60%", label: "Faster Implementation" },
  { icon: CurrencyDollarIcon, value: "40%", label: "Cost Reduction" },
  { icon: ArrowTrendingUpIcon, value: "85%", label: "Process Efficiency" },
  { icon: UserGroupIcon, value: "95%", label: "Customer Satisfaction" }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Customer Success Stories
          </h1>
          <p className="text-xl text-gray-300">
            Real results from industry leaders using Yuvi Platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <metric.icon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-20">
          {stories.map((story) => (
            <div
              key={story.title}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-indigo-400 mb-2">{story.company}</h3>
                  <h2 className="text-2xl font-bold text-white mb-4">{story.title}</h2>
                  <p className="text-xl text-gray-300">{story.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {story.results.map((result) => (
                    <div key={result.label}>
                      <div className="text-2xl font-bold text-white mb-1">{result.metric}</div>
                      <div className="text-sm text-gray-400">{result.label}</div>
                    </div>
                  ))}
                </div>

                <blockquote className="bg-gray-900 rounded-lg p-6 mb-8">
                  <p className="text-lg text-gray-300 italic mb-4">"{story.quote.text}"</p>
                  <footer className="text-sm text-gray-400">— {story.quote.author}</footer>
                </blockquote>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Key Improvements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.improvements.map((improvement, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3"
                      >
                        <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-300">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}