import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BeakerIcon, 
  BuildingOfficeIcon, 
  CubeIcon, 
  DocumentChartBarIcon,
  ClipboardDocumentListIcon,
  ArrowTrendingUpIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Organizations', value: '12', change: '+2', changeType: 'increase' },
  { name: 'Active Applications', value: '45', change: '+5', changeType: 'increase' },
  { name: 'Running Jobs', value: '8', change: '-2', changeType: 'decrease' },
  { name: 'API Calls Today', value: '2.4k', change: '+15%', changeType: 'increase' },
];

const quickActions = [
  {
    name: 'Create Application',
    description: 'Start building a new application',
    icon: PlusIcon,
    to: '/create-application'
  },
  {
    name: 'View Organizations',
    description: 'Manage your organizations',
    icon: BuildingOfficeIcon,
    to: '/companies'
  },
  {
    name: 'Monitor Jobs',
    description: 'Check running jobs status',
    icon: ClipboardDocumentListIcon,
    to: '/jobs'
  },
  {
    name: 'Build Ontology',
    description: 'Define your data model',
    icon: CubeIcon,
    to: '/build-ontology'
  }
];

const recentActivities = [
  {
    id: 1,
    type: 'application',
    name: 'Clinical Trial Management',
    action: 'created',
    timestamp: '30 minutes ago'
  },
  {
    id: 2,
    type: 'job',
    name: 'Data Import Job',
    action: 'completed',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    type: 'ontology',
    name: 'Patient Schema',
    action: 'updated',
    timestamp: '2 hours ago'
  }
];

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome to your Yuvi Platform dashboard</p>
          </div>
          <Link
            to="/create-application"
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Application
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <p className="text-sm font-medium text-gray-400">{stat.name}</p>
              <p className="mt-2 flex items-baseline">
                <span className="text-3xl font-semibold text-white">{stat.value}</span>
                <span className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.to}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 p-3 bg-indigo-500/10 rounded-lg">
                    <action.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{action.name}</h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="divide-y divide-gray-700">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{activity.name}</span>
                      <span className="text-gray-400">was</span>
                      <span className="text-indigo-400">{activity.action}</span>
                    </div>
                    <span className="text-sm text-gray-400">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}