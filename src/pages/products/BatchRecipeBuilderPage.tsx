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
    title: "Recipe Authoring",
    description: "Intuitive recipe authoring with version control and approval workflows"
  },
  {
    title: "Parameter Management",
    description: "Comprehensive parameter management with validation rules and limits"
  },
  {
    title: "Material Requirements",
    description: "Automated material requirement calculations and specifications"
  },
  {
    title: "Process Instructions",
    description: "Step-by-step process instructions with dynamic content"
  },
  {
    title: "Compliance Checks",
    description: "Built-in compliance checks and regulatory requirements validation"
  },
  {
    title: "Recipe Analytics",
    description: "Advanced analytics for recipe optimization and standardization"
  }
];

const benefits = [
  {
    title: "Accelerated Development",
    description: "Speed up recipe development and approval process",
    metrics: [
      "60% faster recipe development",
      "80% reduction in review cycles",
      "Zero compliance gaps"
    ]
  },
  {
    title: "Quality Assurance",
    description: "Ensure consistent product quality across batches",
    metrics: [
      "100% parameter validation",
      "Zero recipe-related deviations",
      "Full traceability"
    ]
  },
  {
    title: "Regulatory Compliance",
    description: "Meet regulatory requirements with built-in compliance checks",
    metrics: [
      "100% regulatory compliance",
      "Automated validation",
      "Complete audit trails"
    ]
  },
  {
    title: "Process Optimization",
    description: "Optimize recipes for efficiency and yield",
    metrics: [
      "15% yield improvement",
      "30% cost reduction",
      "Real-time optimization"
    ]
  }
];

const workflow = [
  {
    title: "Recipe Creation",
    description: "Create new recipes with standardized templates and building blocks"
  },
  {
    title: "Parameter Definition",
    description: "Define process parameters with validation rules and specifications"
  },
  {
    title: "Material Specification",
    description: "Specify materials and calculate requirements automatically"
  },
  {
    title: "Process Definition",
    description: "Define detailed process steps with instructions and controls"
  },
  {
    title: "Review & Approval",
    description: "Multi-level review and approval workflow with electronic signatures"
  },
  {
    title: "Recipe Release",
    description: "Controlled release of approved recipes to production"
  }
];

const integrations = [
  {
    name: "ERP Systems",
    description: "Integration with ERP for material and resource management"
  },
  {
    name: "MES",
    description: "Seamless transfer of recipes to manufacturing execution systems"
  },
  {
    name: "LIMS",
    description: "Integration with lab systems for specifications and testing"
  },
  {
    name: "PLM Systems",
    description: "Connect with product lifecycle management systems"
  },
  {
    name: "Document Management",
    description: "Integration with document control systems"
  },
  {
    name: "Quality Systems",
    description: "Connect with quality management systems"
  }
];

export default function BatchRecipeBuilderPage() {
  return (
    <ProductLayout
      title="Batch Recipe Builder"
      description="Build and manage manufacturing recipes with intelligent automation and compliance controls"
      features={features}
      benefits={benefits}
      workflow={workflow}
      integrations={integrations}
    >
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <DocumentTextIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Standardized</h3>
            <p className="text-gray-400">Recipe Management</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ClockIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">60% Faster</h3>
            <p className="text-gray-400">Development Time</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">100% Compliant</h3>
            <p className="text-gray-400">Recipe Validation</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <ChartBarIcon className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">15% Higher</h3>
            <p className="text-gray-400">Process Yield</p>
          </div>
        </div>
      </div>
    </ProductLayout>
  );
}