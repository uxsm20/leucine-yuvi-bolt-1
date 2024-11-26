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
    title: "Digital Records",
    description: "Replace paper logbooks with intelligent digital records"
  },
  {
    title: "Automated Data Collection",
    description: "Automatically collect data from equipment and processes"
  },
  {
    title: "Compliance Documentation",
    description: "Generate compliant documentation with electronic signatures"
  },
  {
    title: "Real-time Monitoring",
    description: "Monitor activities and entries in real-time"
  },
  {
    title: "Advanced Analytics",
    description: "Analyze trends and patterns in logbook data"
  },
  {
    title: "Mobile Access",
    description: "Access and update logbooks from any device"
  }
];

const benefits = [
  {
    title: "Paperless Operations",
    description: "Eliminate paper-based logbooks and records",
    metrics: [
      "100% paperless records",
      "90% time savings",
      "Zero transcription errors"
    ]
  },
  {
    title: "Compliance Assurance",
    description: "Ensure regulatory compliance with automated documentation",
    metrics: [
      "100% compliant records",
      "Complete audit trails",
      "Electronic signatures"
    ]
  },
  {
    title: "Operational Efficiency",
    description: "Streamline logbook management and reporting",
    metrics: [
      "75% faster record creation",
      "Real-time visibility",
      "Automated reporting"
    ]
  },
  {
    title: "Data Integrity",
    description: "Maintain data integrity with automated controls",
    metrics: [
      "100% data accuracy",
      "Zero missing entries",
      "Complete traceability"
    ]
  }
];

const workflow = [
  {
    title: "Logbook Setup",
    description: "Configure digital logbooks with templates and rules"
  },
  {
    title: "Data Entry",
    description: "Enter or automatically collect logbook data"
  },
  {
    title: "Review & Verification",
    description: "Review and verify entries with electronic signatures"
  },
  {
    title: "Monitoring & Alerts",
    description: "Monitor entries and receive alerts for issues"
  },
  {
    title: "Analysis & Reporting",
    description: "Analyze logbook data and generate reports"
  },
  {
    title: "Archive & Retrieval",
    description: "Securely archive and retrieve historical records"
  }
];

const integrations = [
  {
    name: "Equipment Systems",
    description: "Integration with manufacturing equipment"
  },
  {
    name: "SCADA",
    description: "Connect with process control systems"
  },
  {
    name: "Quality Systems",
    description: "Integration with quality management"
  },
  {
    name: "Document Management",
    description: "Connect with document control systems"
  },
  {
    name: "ERP Systems",
    description: "Integration with enterprise systems"
  },
  {
    name: "Mobile Devices",
    description: "Access from tablets and mobile devices"
  }
];

export default function ELogbookPage() {
  return (
    <ProductLayout
      title="Electronic Logbook"
      description="Transform paper-based records into intelligent digital logbooks"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <DocumentTextIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Digital</h3>
            <p className="text-gray-400">Record Management</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">90% Faster</h3>
            <p className="text-gray-400">Record Creation</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">GMP Compliant</h3>
            <p className="text-gray-400">Documentation</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time</h3>
            <p className="text-gray-400">Data Analysis</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}