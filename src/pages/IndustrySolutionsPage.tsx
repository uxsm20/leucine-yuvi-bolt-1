import React from 'react';
import { 
  BeakerIcon, 
  BuildingOfficeIcon, 
  CubeIcon, 
  DocumentChartBarIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const industries = [
  {
    name: "Pharmaceutical",
    icon: BeakerIcon,
    description: "Transform pharmaceutical operations with AI-powered solutions",
    solutions: [
      {
        title: "Clinical Trial Management",
        description: "Streamline trial management with automated workflows and real-time monitoring",
        features: [
          "Protocol management and compliance tracking",
          "Patient enrollment and scheduling",
          "Data collection and validation",
          "Real-time trial analytics"
        ]
      },
      {
        title: "Quality Management System",
        description: "Ensure compliance and maintain quality standards across operations",
        features: [
          "Document control and versioning",
          "Audit trail management",
          "CAPA tracking",
          "Quality metrics dashboard"
        ]
      },
      {
        title: "Laboratory Information System",
        description: "Modernize lab operations with intelligent automation",
        features: [
          "Sample tracking and management",
          "Instrument integration",
          "Results analysis and reporting",
          "Compliance documentation"
        ]
      }
    ]
  },
  {
    name: "Manufacturing",
    icon: BuildingOfficeIcon,
    description: "Optimize manufacturing processes with intelligent automation",
    solutions: [
      {
        title: "Production Planning",
        description: "Optimize production schedules and resource allocation",
        features: [
          "Demand forecasting",
          "Resource optimization",
          "Capacity planning",
          "Production scheduling"
        ]
      },
      {
        title: "Equipment Management",
        description: "Maximize equipment efficiency and reduce downtime",
        features: [
          "Predictive maintenance",
          "Performance monitoring",
          "Maintenance scheduling",
          "Asset lifecycle tracking"
        ]
      },
      {
        title: "Quality Control",
        description: "Maintain product quality with automated inspection and tracking",
        features: [
          "Quality inspection workflows",
          "Defect tracking",
          "Statistical process control",
          "Quality reporting"
        ]
      }
    ]
  }
];

export default function IndustrySolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Industry-Specific Solutions
          </h1>
          <p className="text-xl text-gray-300">
            Tailored solutions for pharmaceutical and manufacturing industries
          </p>
        </div>

        <div className="space-y-24">
          {industries.map((industry) => (
            <div key={industry.name}>
              <div className="flex items-center space-x-4 mb-12">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <industry.icon className="h-8 w-8 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{industry.name}</h2>
                  <p className="text-xl text-gray-400 mt-2">{industry.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {industry.solutions.map((solution) => (
                  <div
                    key={solution.title}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">{solution.title}</h3>
                    <p className="text-gray-400 mb-6">{solution.description}</p>
                    <ul className="space-y-3">
                      {solution.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <CubeIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Modular Architecture</h3>
              <p className="text-gray-400">Flexible and scalable solutions that grow with your needs</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <DocumentChartBarIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Compliance Ready</h3>
              <p className="text-gray-400">Built-in compliance with industry regulations and standards</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                <ArrowTrendingUpIcon className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rapid ROI</h3>
              <p className="text-gray-400">Quick implementation and measurable business impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}