import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BeakerIcon, 
  CpuChipIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <main className="bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-base text-indigo-400 font-semibold tracking-wide uppercase mb-4">
            Your Vision, Our Mission
          </p>
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Enterprise</span>
            <span className="block text-indigo-400">With Intelligent Automation</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-base text-gray-300 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            Accelerate digital transformation with our AI-powered platform. Build, validate, and deploy enterprise applications with unprecedented speed and precision.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Link
                to="/solutions"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/use-cases"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                View Use Cases
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Enterprise-Grade Intelligence
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              A comprehensive platform that combines data integration, analytics, and application development
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <BeakerIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Multi-Agent Intelligence</h3>
              </div>
              <p className="text-gray-400">
                Leverage multiple AI models working in parallel to analyze data, detect patterns, and generate insights with unprecedented accuracy.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <CpuChipIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Dynamic Ontology</h3>
              </div>
              <p className="text-gray-400">
                Build and evolve comprehensive data models that capture complex relationships and business rules across your organization.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
              </div>
              <p className="text-gray-400">
                Create sophisticated analytics dashboards with what-if scenarios and predictive modeling capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Transform Your Business
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Accelerate digital transformation while ensuring compliance and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">70% Faster</h3>
                  <p className="text-gray-400">Development Time</p>
                </div>
              </div>
              <p className="text-gray-300">
                Accelerate application development with AI-powered automation and pre-built components.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">100%</h3>
                  <p className="text-gray-400">Compliance</p>
                </div>
              </div>
              <p className="text-gray-300">
                Built-in compliance with industry regulations including 21 CFR Part 11, HIPAA, and GDPR.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">85%</h3>
                  <p className="text-gray-400">Process Efficiency</p>
                </div>
              </div>
              <p className="text-gray-300">
                Optimize operations with intelligent automation and real-time analytics.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <BuildingOfficeIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">3 Months</h3>
                  <p className="text-gray-400">Time to Value</p>
                </div>
              </div>
              <p className="text-gray-300">
                Achieve rapid ROI with quick implementation and measurable business impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-500/10 rounded-2xl p-8 md:p-12 lg:p-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to Transform Your Enterprise?
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Join leading pharmaceutical and manufacturing companies in their digital transformation journey.
              </p>
              <div className="mt-8">
                <Link
                  to="/success-stories"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
                >
                  View Success Stories
                  <ArrowTrendingUpIcon className="ml-2 -mr-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;