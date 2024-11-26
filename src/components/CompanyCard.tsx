import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, UserGroupIcon, CubeIcon, KeyIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

interface Application {
  name: string;
  status: 'Identified' | 'Live' | 'Development' | 'Testing' | 'Planning' | 'Review' | 'Paused' | 'Archived';
}

interface Company {
  id: number;
  name: string;
  description: string;
  applications: Application[];
  users: number;
}

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Identified':
        return 'bg-violet-500/10 text-violet-400';
      case 'Live':
        return 'bg-green-500/10 text-green-400';
      case 'Development':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'Testing':
        return 'bg-blue-500/10 text-blue-400';
      case 'Planning':
        return 'bg-purple-500/10 text-purple-400';
      case 'Review':
        return 'bg-orange-500/10 text-orange-400';
      case 'Paused':
        return 'bg-gray-500/10 text-gray-400';
      case 'Archived':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{company.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{company.description}</p>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-lg shadow-lg border border-gray-700 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-800' : ''
                      } flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg`}
                    >
                      <UserGroupIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Role Management
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-800' : ''
                      } flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg`}
                    >
                      <KeyIcon className="h-5 w-5 mr-3 text-gray-400" />
                      User Management
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/create-application')}
                      className={`${
                        active ? 'bg-gray-800' : ''
                      } flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg`}
                    >
                      <CubeIcon className="h-5 w-5 mr-3 text-gray-400" />
                      Create Application
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-800' : ''
                      } flex items-center w-full px-3 py-2 text-sm text-gray-300 rounded-lg`}
                    >
                      <DocumentChartBarIcon className="h-5 w-5 mr-3 text-gray-400" />
                      View Ontology
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Applications</h4>
        <div className="space-y-2">
          {company.applications.map((app) => (
            <div
              key={app.name}
              className="flex items-center justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <span className="text-sm text-gray-300">{app.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Active Users</span>
          <span className="text-gray-300">{company.users}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;