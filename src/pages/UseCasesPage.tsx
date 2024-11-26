import React from 'react';
import { 
  BeakerIcon,
  DocumentChartBarIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const useCases = [
  {
    title: "SAP System Validation",
    icon: DocumentChartBarIcon,
    description: "Automated validation and testing for SAP implementations",
    benefits: [
      "Reduced validation time by 70%",
      "Automated test script generation",
      "Real-time compliance documentation",
      "Continuous validation framework"
    ],
    features: [
      {
        name: "Test Automation",
        description: "AI-powered test script generation and execution"
      },
      {
        name: "Compliance Documentation",
        description: "Automated generation of validation documents"
      },
      {
        name: "Change Management",
        description: "Integrated change tracking and impact analysis"
      }
    ]
  },
  {
    title: "Revenue Operations Platform",
    icon: CubeIcon,
    description: "End-to-end revenue management with predictive analytics",
    benefits: [
      "35% more accurate forecasting",
      "60% reduction in revenue leakage",
      "Automated revenue recognition",
      "Real-time financial insights"
    ],
    features: [
      {
        name: "Revenue Recognition",
        description: "Automated revenue calculation and booking"
      },
      {
        name: "Predictive Analytics",
        description: "AI-driven revenue forecasting"
      },
      {
        name: "Compliance Reporting",
        description: "Automated financial compliance reporting"
      }
    ]
  },
  {
    title: "Quality Management System",
    icon: ClipboardDocumentListIcon,
    description: "Comprehensive quality control and compliance management",
    benefits: [
      "85% reduction in quality incidents",
      "95% documentation compliance",
      "Automated quality checks",
      "Real-time monitoring"
    ],
    features: [
      {
        name: "Document Control",
        description: "Automated document management and versioning"
      },
      {
        name: "Quality Analytics",
        description: "Real-time quality metrics and trending"
      },
      {
        name: "Compliance Tracking",
        description: "Automated compliance monitoring and reporting"
      }
    ]
  },
  {
    title: "Laboratory Information System",
    icon: BeakerIcon,
    description: "Intelligent lab operations and data management",
    benefits: [
      "50% faster sample processing",
      "99.9% data accuracy",
      "Automated workflows",
      "Real-time analytics"
    ],
    features: [
      {
        name: "Sample Management",
        description: "End-to-end sample tracking and processing"
      },
      {
        name: "Data Analysis",
        description: "Automated data analysis and reporting"
      },
      {
        name: "Instrument Integration",
        description: "Seamless integration with lab instruments"
      }
    ]
  }
];

const capabilities = [
  {
    icon: ArrowPathIcon,
    title: "Rapid Implementation",
    description: "Get up and running in weeks, not months"
  },
  {
    icon: ShieldCheckIcon,
    title: "Compliance Built-in",
    description: "Meet regulatory requirements out of the box"
  },
  {
    icon: CubeIcon,
    title: "Seamless Integration",
    description: "Connect with existing systems effortlessly"
  }
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Industry Use Cases
          </h1>
          <p className="text-xl text-gray-300">
            Discover how Yuvi Platform transforms pharmaceutical and manufacturing operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <useCase.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">{useCase.title}</h2>
              </div>

              <p className="text-gray-300 mb-6">{useCase.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {useCase.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">Features</h3>
                <div className="space-y-4">
                  {useCase.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="bg-gray-900 rounded-lg p-4"
                    >
                      <h4 className="text-white font-medium mb-2">{feature.name}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Platform Capabilities
            </h2>
            <p className="text-gray-300">
              Built for enterprise-scale operations with security and compliance in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability) => (
              <div key={capability.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-500/10 rounded-xl mb-4">
                  <capability.icon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                <p className="text-gray-400">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}