import React from 'react';
import ProductLayout from '../../components/ProductLayout';
import {
  DocumentMagnifyingGlassIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Intelligent Review Workflow",
    description: "AI-powered review process that automatically identifies critical parameters, deviations, and potential compliance issues."
  },
  {
    title: "Real-time Collaboration",
    description: "Enable multiple reviewers to work simultaneously with real-time comments, annotations, and status tracking."
  },
  {
    title: "Compliance Tracking",
    description: "Automated compliance checks against predefined rules and regulatory requirements with detailed audit trails."
  },
  {
    title: "Smart Deviation Management",
    description: "Automated detection and categorization of deviations with risk assessment and CAPA integration."
  },
  {
    title: "Review Analytics",
    description: "Comprehensive analytics dashboard showing review metrics, trends, and bottlenecks."
  },
  {
    title: "Electronic Signatures",
    description: "21 CFR Part 11 compliant electronic signatures with role-based access control."
  }
];

const benefits = [
  {
    title: "Accelerated Review Process",
    description: "Reduce batch record review time while improving accuracy and compliance.",
    metrics: [
      "70% reduction in review time",
      "99.9% accuracy in deviation detection",
      "Zero compliance gaps"
    ]
  },
  {
    title: "Enhanced Quality Control",
    description: "Improve quality oversight with intelligent deviation detection and risk assessment.",
    metrics: [
      "85% reduction in quality events",
      "100% traceability",
      "Real-time quality metrics"
    ]
  },
  {
    title: "Regulatory Compliance",
    description: "Ensure compliance with automated checks and comprehensive audit trails.",
    metrics: [
      "100% compliance with 21 CFR Part 11",
      "Zero regulatory findings",
      "Complete audit readiness"
    ]
  },
  {
    title: "Operational Efficiency",
    description: "Streamline operations with automated workflows and real-time collaboration.",
    metrics: [
      "50% reduction in review cycles",
      "90% faster deviation resolution",
      "24/7 global accessibility"
    ]
  }
];

const workflow = [
  {
    title: "Batch Record Upload",
    description: "Seamlessly upload batch records from multiple sources with automated data extraction and validation."
  },
  {
    title: "AI-Powered Analysis",
    description: "Intelligent analysis of batch records to identify critical parameters, deviations, and compliance issues."
  },
  {
    title: "Collaborative Review",
    description: "Multiple reviewers work simultaneously with real-time comments, annotations, and status tracking."
  },
  {
    title: "Deviation Management",
    description: "Automated detection and categorization of deviations with integrated risk assessment and CAPA management."
  },
  {
    title: "Quality Approval",
    description: "Electronic signature-based approval workflow with role-based access control and audit trails."
  },
  {
    title: "Analytics & Reporting",
    description: "Comprehensive analytics and reporting for continuous process improvement and regulatory compliance."
  }
];

const integrations = [
  {
    name: "ERP Systems",
    description: "Seamless integration with leading ERP systems for master data and transaction management."
  },
  {
    name: "LIMS",
    description: "Direct integration with Laboratory Information Management Systems for test results and specifications."
  },
  {
    name: "Document Management",
    description: "Connect with enterprise document management systems for SOPs and specifications."
  },
  {
    name: "Quality Management",
    description: "Integration with quality management systems for deviation and CAPA management."
  },
  {
    name: "Manufacturing Execution",
    description: "Real-time integration with MES for production data and batch records."
  },
  {
    name: "Data Historians",
    description: "Connect with process historians for automated data collection and validation."
  }
];

export default function BatchRecordReviewerPage() {
  return (
    <ProductLayout
      title="Batch Record Reviewer"
      description="Transform your batch record review process with AI-powered intelligence and automated compliance checks"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <DocumentMagnifyingGlassIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Intelligent Review</h3>
            <p className="text-gray-400">AI-powered review process</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">70% Faster</h3>
            <p className="text-gray-400">Review time reduction</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Compliant</h3>
            <p className="text-gray-400">Regulatory compliance</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">Performance monitoring</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}