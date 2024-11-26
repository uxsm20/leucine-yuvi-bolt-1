import React from 'react';
import ProductLayout from '../../components/ProductLayout';
import {
  DocumentTextIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Dynamic eBR Generation",
    description: "Automatically generate electronic batch records based on master recipes and process parameters."
  },
  {
    title: "Real-time Data Collection",
    description: "Capture process data in real-time with automated validation and verification."
  },
  {
    title: "Automated Calculations",
    description: "Perform complex calculations automatically with built-in formula management."
  },
  {
    title: "Exception Management",
    description: "Intelligent detection and handling of process deviations and exceptions."
  },
  {
    title: "Electronic Signatures",
    description: "21 CFR Part 11 compliant electronic signatures with comprehensive audit trails."
  },
  {
    title: "Process Analytics",
    description: "Real-time analytics and insights for process optimization and compliance monitoring."
  }
];

const benefits = [
  {
    title: "Paperless Operations",
    description: "Transform paper-based processes into efficient digital workflows.",
    metrics: [
      "100% paperless operation",
      "90% reduction in documentation time",
      "Zero transcription errors"
    ]
  },
  {
    title: "Improved Compliance",
    description: "Ensure regulatory compliance with automated checks and validations.",
    metrics: [
      "100% compliance with GMP requirements",
      "Complete audit trails",
      "Real-time compliance monitoring"
    ]
  },
  {
    title: "Enhanced Efficiency",
    description: "Streamline batch record execution with automated workflows.",
    metrics: [
      "75% reduction in batch release time",
      "85% fewer documentation errors",
      "50% increase in operator efficiency"
    ]
  },
  {
    title: "Quality Assurance",
    description: "Improve product quality with real-time monitoring and controls.",
    metrics: [
      "99.9% right-first-time",
      "Zero quality incidents",
      "100% data integrity"
    ]
  }
];

const workflow = [
  {
    title: "Master Recipe Setup",
    description: "Create and manage master recipes with automated version control and approval workflows."
  },
  {
    title: "Batch Initiation",
    description: "Automatically generate batch records from approved master recipes with material verification."
  },
  {
    title: "Process Execution",
    description: "Guide operators through production steps with real-time data collection and validation."
  },
  {
    title: "In-Process Controls",
    description: "Monitor and record in-process controls with automated calculations and limit checks."
  },
  {
    title: "Exception Handling",
    description: "Detect and manage process deviations with integrated risk assessment."
  },
  {
    title: "Batch Release",
    description: "Streamlined review and approval process with electronic signatures."
  }
];

const integrations = [
  {
    name: "ERP Systems",
    description: "Seamless integration with ERP systems for material and resource management."
  },
  {
    name: "LIMS",
    description: "Direct integration with LIMS for test results and specifications."
  },
  {
    name: "MES",
    description: "Real-time integration with manufacturing execution systems."
  },
  {
    name: "Equipment Systems",
    description: "Connect with process equipment for automated data collection."
  },
  {
    name: "Warehouse Management",
    description: "Integration with warehouse systems for material tracking."
  },
  {
    name: "Quality Systems",
    description: "Connect with quality management systems for deviation handling."
  }
];

export default function ElectronicBatchRecordPage() {
  return (
    <ProductLayout
      title="Electronic Batch Record"
      description="Transform your manufacturing operations with intelligent electronic batch records"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <DocumentTextIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Paperless</h3>
            <p className="text-gray-400">100% Digital Operations</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">75% Faster</h3>
            <p className="text-gray-400">Batch Release Time</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">GMP Compliant</h3>
            <p className="text-gray-400">Regulatory Compliance</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Insights</h3>
            <p className="text-gray-400">Process Analytics</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}