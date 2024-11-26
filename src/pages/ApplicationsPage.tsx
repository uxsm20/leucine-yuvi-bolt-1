import React from 'react';
import { Link } from 'react-router-dom';
import {
  BeakerIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CubeIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const applications = [
  {
    category: "Quality Management",
    icon: ClipboardDocumentListIcon,
    description: "Comprehensive quality management solutions for regulated industries",
    products: [
      {
        name: "Document Control",
        description: "Automated document management system with version control and approval workflows",
        features: [
          "21 CFR Part 11 compliant electronic signatures",
          "Automated document routing and approvals",
          "Change control management",
          "Training record management"
        ]
      },
      {
        name: "Quality Events",
        description: "End-to-end quality event management and CAPA tracking",
        features: [
          "Deviation management",
          "CAPA tracking and effectiveness",
          "Complaint handling",
          "Quality metrics dashboard"
        ]
      },
      {
        name: "Audit Management",
        description: "Comprehensive audit planning and execution platform",
        features: [
          "Audit schedule management",
          "Finding tracking and resolution",
          "Automated audit reports",
          "Compliance monitoring"
        ]
      }
    ]
  },
  {
    category: "Manufacturing Excellence",
    icon: BuildingOfficeIcon,
    description: "Intelligent solutions for manufacturing operations",
    products: [
      {
        name: "Equipment Management",
        description: "Complete equipment lifecycle and maintenance management",
        features: [
          "Preventive maintenance scheduling",
          "Calibration management",
          "Equipment qualification",
          "Usage tracking and logs"
        ]
      },
      {
        name: "Production Management",
        description: "End-to-end production planning and execution",
        features: [
          "Batch record management",
          "Production scheduling",
          "Material management",
          "Yield tracking"
        ]
      },
      {
        name: "Environmental Monitoring",
        description: "Comprehensive environmental monitoring system",
        features: [
          "Sample scheduling",
          "Result trending",
          "Alert management",
          "Compliance reporting"
        ]
      }
    ]
  },
  {
    category: "Laboratory Solutions",
    icon: BeakerIcon,
    description: "Integrated laboratory information management",
    products: [
      {
        name: "Sample Management",
        description: "Complete sample lifecycle management system",
        features: [
          "Sample registration and tracking",
          "Test assignment and scheduling",
          "Result management",
          "Certificate of analysis"
        ]
      },
      {
        name: "Stability Studies",
        description: "Comprehensive stability study management",
        features: [
          "Protocol management",
          "Schedule management",
          "Condition monitoring",
          "Trend analysis"
        ]
      },
      {
        name: "Method Management",
        description: "Test method and specification management",
        features: [
          "Method version control",
          "Specification management",
          "Method validation",
          "Method transfer"
        ]
      }
    ]
  },
  {
    category: "Validation Management",
    icon: ShieldCheckIcon,
    description: "Automated validation and qualification management",
    products: [
      {
        name: "Computer System Validation",
        description: "Streamlined computer system validation process",
        features: [
          "Risk assessment",
          "Validation planning",
          "Test execution",
          "Validation documentation"
        ]
      },
      {
        name: "Equipment Qualification",
        description: "End-to-end equipment qualification management",
        features: [
          "IQ/OQ/PQ management",
          "Protocol generation",
          "Test execution tracking",
          "Requalification management"
        ]
      },
      {
        name: "Cleaning Validation",
        description: "Comprehensive cleaning validation management",
        features: [
          "Protocol management",
          "Sampling plans",
          "Result trending",
          "Report generation"
        ]
      }
    ]
  },
  {
    category: "Analytics & Insights",
    icon: ChartBarIcon,
    description: "Advanced analytics and business intelligence",
    products: [
      {
        name: "Quality Analytics",
        description: "Real-time quality metrics and trending",
        features: [
          "Quality KPIs",
          "Trend analysis",
          "Predictive analytics",
          "Custom dashboards"
        ]
      },
      {
        name: "Operational Intelligence",
        description: "Manufacturing operations analytics",
        features: [
          "OEE tracking",
          "Production analytics",
          "Resource utilization",
          "Cost analysis"
        ]
      },
      {
        name: "Compliance Dashboard",
        description: "Comprehensive compliance monitoring",
        features: [
          "Compliance metrics",
          "Risk indicators",
          "Audit readiness",
          "Regulatory reporting"
        ]
      }
    ]
  }
];

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Enterprise Applications
          </h1>
          <p className="text-xl text-gray-300">
            Discover our suite of industry-leading applications built for regulated industries
          </p>
        </div>

        <div className="space-y-24">
          {applications.map((category) => (
            <div key={category.category}>
              <div className="flex items-center space-x-4 mb-12">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <category.icon className="h-8 w-8 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.category}</h2>
                  <p className="text-xl text-gray-400 mt-2">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.products.map((product) => (
                  <div
                    key={product.name}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">{product.name}</h3>
                    <p className="text-gray-400 mb-6">{product.description}</p>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
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
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-gray-300 mb-8">
              Join leading pharmaceutical and manufacturing companies in their digital transformation journey
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
              >
                Request Demo
                <ArrowTrendingUpIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
              <Link
                to="/success-stories"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                View Success Stories
                <CubeIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}