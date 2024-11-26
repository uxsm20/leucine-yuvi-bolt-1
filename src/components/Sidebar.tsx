import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  KeyIcon,
  CubeIcon,
  CommandLineIcon,
  ChevronRightIcon,
  BuildingLibraryIcon,
  RectangleGroupIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
  DocumentChartBarIcon,
  QueueListIcon,
  ListBulletIcon,
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// Mock data for companies and applications
const companies = [
  {
    id: 1,
    name: "Pfizer",
    applications: [
      { id: 1, name: "Clinical Trial Management" },
      { id: 2, name: "Drug Safety Platform" }
    ]
  },
  {
    id: 2,
    name: "Novartis",
    applications: [
      { id: 3, name: "Patient Registry" },
      { id: 4, name: "Research Analytics" }
    ]
  }
];

const Sidebar = () => {
  const location = useLocation();
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 border-r border-gray-700">
        <div className="flex h-16 shrink-0 items-center">
          <img
            className="h-8 w-auto"
            src="https://demo-app-builder.leucine.ai/assets/img/logos/yuvi-logo-dark.svg"
            alt="Yuvi"
          />
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-4">
            {/* Dashboard Link */}
            <li>
              <Link
                to="/dashboard"
                className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
            </li>

            {/* Create Application Link */}
            <li>
              <Link
                to="/create-application"
                className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Application
              </Link>
            </li>

            {/* Companies Section */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
                Organizations
              </div>
              {companies.map((company) => (
                <Disclosure key={company.id} defaultOpen={expandedCompany === company.id}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium ${
                          open ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                        onClick={() => setExpandedCompany(open ? null : company.id)}
                      >
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                          {company.name}
                        </div>
                        <ChevronRightIcon
                          className={`h-4 w-4 transition-transform ${
                            open ? 'rotate-90 transform' : ''
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-1">
                        {/* Company-wide features */}
                        <div className="pl-4 border-l border-gray-700 ml-4 mb-4">
                          <div className="space-y-1">
                            <Link
                              to={`/companies/${company.id}/ontology`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <CubeIcon className="h-5 w-5 mr-2" />
                              Ontology
                            </Link>
                            <Link
                              to={`/companies/${company.id}/build-ontology`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <SparklesIcon className="h-5 w-5 mr-2" />
                              Build Your Ontology
                            </Link>
                            <Link
                              to={`/companies/${company.id}/jobs`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <QueueListIcon className="h-5 w-5 mr-2" />
                              Jobs
                            </Link>
                            <Link
                              to={`/companies/${company.id}/job-logs`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <ListBulletIcon className="h-5 w-5 mr-2" />
                              Job Logs
                            </Link>
                            <Link
                              to={`/companies/${company.id}/api-logs`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <CommandLineIcon className="h-5 w-5 mr-2" />
                              API Logs
                            </Link>
                            <Link
                              to={`/companies/${company.id}/users`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <UserGroupIcon className="h-5 w-5 mr-2" />
                              User Management
                            </Link>
                            <Link
                              to={`/companies/${company.id}/roles`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <KeyIcon className="h-5 w-5 mr-2" />
                              Role Management
                            </Link>
                            <Link
                              to={`/companies/${company.id}/facilities`}
                              className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                              <BuildingLibraryIcon className="h-5 w-5 mr-2" />
                              Facility Management
                            </Link>
                          </div>
                        </div>

                        {/* Applications section */}
                        <div className="pl-4 border-l border-gray-700 ml-4">
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                            Applications
                          </div>
                          <div className="space-y-2">
                            {company.applications.map((app) => (
                              <Disclosure key={app.id}>
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium ${
                                      open ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}>
                                      <div className="flex items-center">
                                        <RectangleGroupIcon className="h-5 w-5 mr-2" />
                                        {app.name}
                                      </div>
                                      <ChevronRightIcon
                                        className={`h-4 w-4 transition-transform ${
                                          open ? 'rotate-90 transform' : ''
                                        }`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pl-4 border-l border-gray-700 ml-4 mt-1">
                                      <div className="space-y-1">
                                        <Link
                                          to={`/companies/${company.id}/applications/${app.id}/project-plan`}
                                          className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                                          Project Plan
                                        </Link>
                                        <Link
                                          to={`/companies/${company.id}/applications/${app.id}/test-plan`}
                                          className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                          <BeakerIcon className="h-5 w-5 mr-2" />
                                          Test Plan
                                        </Link>
                                        <Link
                                          to={`/companies/${company.id}/applications/${app.id}/pages`}
                                          className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                          <DocumentTextIcon className="h-5 w-5 mr-2" />
                                          Pages
                                        </Link>
                                        <Link
                                          to={`/companies/${company.id}/applications/${app.id}/workflows`}
                                          className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                          <ArrowPathIcon className="h-5 w-5 mr-2" />
                                          Workflows
                                        </Link>
                                      </div>
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            ))}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </li>

            {/* Global Monitoring Section */}
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wider mb-2">
                Global Monitoring
              </div>
              <div className="space-y-1">
                <Link
                  to="/audit-log"
                  className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Audit Log
                </Link>
                <Link
                  to="/change-log"
                  className="group flex items-center rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
                  Change Log
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;