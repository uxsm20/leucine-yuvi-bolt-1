import React from 'react';
import ProductLayout from '../../components/ProductLayout';
import {
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Real-time Monitoring",
    description: "Monitor production processes in real-time with automated data collection and visualization"
  },
  {
    title: "Performance Analytics",
    description: "Track OEE and other key performance indicators with advanced analytics"
  },
  {
    title: "Quality Control",
    description: "Integrated quality checks and controls with automated data validation"
  },
  {
    title: "Equipment Monitoring",
    description: "Real-time equipment status monitoring and predictive maintenance"
  },
  {
    title: "Process Control",
    description: "Automated process control with deviation detection and alerts"
  },
  {
    title: "Compliance Tracking",
    description: "Real-time compliance monitoring with automated documentation"
  }
];

const benefits = [
  {
    title: "Operational Excellence",
    description: "Improve operational efficiency and productivity",
    metrics: [
      "25% increase in OEE",
      "40% reduction in downtime",
      "Real-time visibility"
    ]
  },
  {
    title: "Quality Assurance",
    description: "Ensure consistent product quality with automated controls",
    metrics: [
      "85% reduction in quality incidents",
      "100% process compliance",
      "Real-time quality monitoring"
    ]
  },
  {
    title: "Cost Reduction",
    description: "Reduce operational costs through optimization",
    metrics: [
      "30% reduction in waste",
      "20% energy savings",
      "15% labor cost reduction"
    ]
  },
  {
    title: "Regulatory Compliance",
    description: "Maintain compliance with automated tracking",
    metrics: [
      "100% data integrity",
      "Zero compliance gaps",
      "Automated documentation"
    ]
  }
];

const workflow = [
  {
    title: "Data Collection",
    description: "Automated data collection from equipment and processes"
  },
  {
    title: "Real-time Analysis",
    description: "Continuous analysis of process parameters and performance"
  },
  {
    title: "Performance Monitoring",
    description: "Track KPIs and metrics in real-time with alerts"
  },
  {
    title: "Quality Checks",
    description: "Automated quality checks and validation"
  },
  {
    title: "Deviation Management",
    description: "Detect and manage process deviations"
  },
  {
    title: "Reporting & Analytics",
    description: "Generate reports and analyze trends"
  }
];

const integrations = [
  {
    name: "Equipment Systems",
    description: "Direct integration with manufacturing equipment"
  },
  {
    name: "MES",
    description: "Integration with manufacturing execution systems"
  },
  {
    name: "SCADA",
    description: "Connect with supervisory control systems"
  },
  {
    name: "Quality Systems",
    description: "Integration with quality management systems"
  },
  {
    name: "ERP Systems",
    description: "Connect with enterprise resource planning"
  },
  {
    name: "Maintenance Systems",
    description: "Integration with maintenance management"
  }
];

export default function ShopFloorMonitoringPage() {
  return (
    <ProductLayout
      title="Shop Floor Monitoring"
      description="Transform your manufacturing operations with real-time monitoring and intelligent analytics"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time</h3>
            <p className="text-gray-400">Process Monitoring</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">40% Less</h3>
            <p className="text-gray-400">Equipment Downtime</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Compliant</h3>
            <p className="text-gray-400">Process Control</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ArrowTrendingUpIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">25% Higher</h3>
            <p className="text-gray-400">OEE Performance</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}