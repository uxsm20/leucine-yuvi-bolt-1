import React from 'react';
import ProductLayout from '../../components/ProductLayout';
import {
  CubeIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    title: "Material Tracking",
    description: "End-to-end material tracking with complete traceability and genealogy"
  },
  {
    title: "Inventory Management",
    description: "Real-time inventory management with automated replenishment and alerts"
  },
  {
    title: "Quality Control",
    description: "Integrated quality control with automated sampling and testing workflows"
  },
  {
    title: "Supplier Management",
    description: "Comprehensive supplier qualification and performance monitoring"
  },
  {
    title: "Compliance Documentation",
    description: "Automated compliance documentation with electronic signatures"
  },
  {
    title: "Analytics & Reporting",
    description: "Advanced analytics for inventory optimization and supplier performance"
  }
];

const benefits = [
  {
    title: "Inventory Optimization",
    description: "Optimize inventory levels and reduce carrying costs",
    metrics: [
      "30% reduction in inventory costs",
      "95% inventory accuracy",
      "Zero stockouts"
    ]
  },
  {
    title: "Quality Assurance",
    description: "Ensure material quality with automated controls",
    metrics: [
      "100% material traceability",
      "Zero quality incidents",
      "Real-time quality monitoring"
    ]
  },
  {
    title: "Regulatory Compliance",
    description: "Meet regulatory requirements with automated documentation",
    metrics: [
      "100% compliance documentation",
      "Complete audit trails",
      "Electronic signatures"
    ]
  },
  {
    title: "Operational Efficiency",
    description: "Streamline material management operations",
    metrics: [
      "75% reduction in processing time",
      "90% paperless operations",
      "24/7 visibility"
    ]
  }
];

const workflow = [
  {
    title: "Material Receipt",
    description: "Receive and verify materials with automated quality checks"
  },
  {
    title: "Quality Control",
    description: "Perform quality testing with automated workflows and approvals"
  },
  {
    title: "Storage Management",
    description: "Track material storage with environmental monitoring"
  },
  {
    title: "Inventory Control",
    description: "Manage inventory levels with automated replenishment"
  },
  {
    title: "Material Dispensing",
    description: "Control material dispensing with electronic verification"
  },
  {
    title: "Usage Tracking",
    description: "Track material usage with complete genealogy"
  }
];

const integrations = [
  {
    name: "ERP Systems",
    description: "Integration with ERP for material and inventory management"
  },
  {
    name: "LIMS",
    description: "Connect with LIMS for quality testing and specifications"
  },
  {
    name: "WMS",
    description: "Integration with warehouse management systems"
  },
  {
    name: "MES",
    description: "Connect with manufacturing execution systems"
  },
  {
    name: "Quality Systems",
    description: "Integration with quality management systems"
  },
  {
    name: "Supplier Portals",
    description: "Connect with supplier management systems"
  }
];

export default function MaterialManagementPage() {
  return (
    <ProductLayout
      title="Material Management"
      description="Transform your material management with intelligent automation and complete traceability"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <CubeIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Complete</h3>
            <p className="text-gray-400">Material Traceability</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">30% Lower</h3>
            <p className="text-gray-400">Inventory Costs</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Compliant</h3>
            <p className="text-gray-400">Documentation</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time</h3>
            <p className="text-gray-400">Inventory Analytics</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}