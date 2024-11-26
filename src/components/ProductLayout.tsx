import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  description: string;
}

interface Benefit {
  title: string;
  description: string;
  metrics?: string[];
}

interface WorkflowStep {
  title: string;
  description: string;
}

interface Integration {
  name: string;
  description: string;
}

interface ProductLayoutProps {
  title: string;
  description: string;
  features: Feature[];
  benefits: Benefit[];
  workflow: WorkflowStep[];
  integrations: Integration[];
  children?: React.ReactNode;
}

export default function ProductLayout({
  title,
  description,
  features,
  benefits,
  workflow,
  integrations,
  children
}: ProductLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{description}</p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
            >
              Request Demo
              <ArrowTrendingUpIcon className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Custom Content */}
        {children}

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Business Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-400 mb-4">{benefit.description}</p>
                {benefit.metrics && (
                  <div className="space-y-2">
                    {benefit.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2 text-sm text-indigo-400"
                      >
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            {workflow.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{integration.name}</h3>
                <p className="text-gray-400">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-500/10 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}