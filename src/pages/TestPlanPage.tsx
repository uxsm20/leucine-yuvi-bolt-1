import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  BeakerIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface TestStep {
  step: number;
  description: string;
  expectedResult: string;
}

interface TestCase {
  id: string;
  name: string;
  scenarioId: string;
  testPlanId: string;
  objective: string;
  preconditions: string[];
  steps: TestStep[];
  expectedResults: string[];
  status: 'passed' | 'failed' | 'pending';
  lastExecuted: string | null;
}

interface TestScenario {
  id: string;
  description: string;
  testCases: TestCase[];
}

interface TestPlan {
  id: string;
  name: string;
  description: string;
  scenarios: TestScenario[];
  status: 'active' | 'draft' | 'archived';
  coverage: number;
  lastRegenerated: string;
  lastExecuted: string;
}

const mockTestPlans: TestPlan[] = [
  {
    id: '1',
    name: 'Activity Log Creation and Completion Test Plan',
    description: 'Tests the correct creation and completion of activity logs with business rules validation.',
    scenarios: [
      {
        id: '1',
        description: 'Create a new activity log and check automatic population of start time and starting remarks',
        testCases: [
          {
            id: 'TC1',
            name: 'Verify Automatic Population of Start Time and Starting Remarks',
            scenarioId: '1',
            testPlanId: '1',
            objective: 'To ensure that the system correctly auto-populates the start time and starting remarks during activity log creation',
            preconditions: [
              'User has sufficient permissions to create activity logs',
              'Equipment is available and operational for logging'
            ],
            steps: [
              {
                step: 1,
                description: 'Navigate to the Equipment Details page for the target equipment',
                expectedResult: 'Successfully navigated to the Equipment Details page'
              },
              {
                step: 2,
                description: 'Click on Create Activity Log button to open the activity log creation form',
                expectedResult: 'The Create Activity Log page opens with the relevant form displayed'
              },
              {
                step: 3,
                description: 'Enter the necessary details for the new activity log such as activity type, and any optional remarks',
                expectedResult: 'Details are entered, and the form is ready for submission'
              }
            ],
            expectedResults: [
              'The new activity log is created with the start time auto-populated with the current timestamp',
              'Default starting remarks are added to the activity log if none are provided'
            ],
            status: 'passed',
            lastExecuted: '2024-01-15T10:00:00Z'
          }
        ]
      }
    ],
    status: 'active',
    coverage: 85,
    lastRegenerated: '2024-01-15T10:00:00Z',
    lastExecuted: '2024-01-15T10:00:00Z'
  }
];

const statusColors = {
  active: 'bg-green-500/10 text-green-400',
  draft: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-gray-500/10 text-gray-400'
};

const testStatusColors = {
  passed: 'bg-green-500/10 text-green-400',
  failed: 'bg-red-500/10 text-red-400',
  pending: 'bg-yellow-500/10 text-yellow-400'
};

const TestPlanPage: React.FC = () => {
  const [testPlans] = useState<TestPlan[]>(mockTestPlans);
  const [selectedTestCase, setSelectedTestCase] = useState<TestCase | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegenerateTestPlan = () => {
    // Handle test plan regeneration
    console.log('Regenerating test plan...');
  };

  const handleViewTestCase = (testCase: TestCase) => {
    setSelectedTestCase(testCase);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Test Plans</h1>
            <p className="text-gray-400 mt-1">Manage and execute test plans</p>
          </div>
          <button
            onClick={handleRegenerateTestPlan}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Regenerate Test Plan
          </button>
        </div>

        <div className="space-y-8">
          {testPlans.map((testPlan) => (
            <div key={testPlan.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <h2 className="text-2xl font-bold text-white">{testPlan.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[testPlan.status]}`}>
                      {testPlan.status}
                    </span>
                  </div>
                  <p className="text-gray-400">{testPlan.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Coverage</p>
                    <p className="text-2xl font-bold text-white">{testPlan.coverage}%</p>
                  </div>
                </div>
              </div>

              {testPlan.scenarios.map((scenario) => (
                <div key={scenario.id} className="mt-6">
                  <h3 className="text-lg font-medium text-white mb-4">{scenario.description}</h3>
                  <div className="space-y-4">
                    {scenario.testCases.map((testCase) => (
                      <div
                        key={testCase.id}
                        className="bg-gray-900 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
                        onClick={() => handleViewTestCase(testCase)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-white">{testCase.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${testStatusColors[testCase.status]}`}>
                              {testCase.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {testCase.lastExecuted ? `Last executed: ${new Date(testCase.lastExecuted).toLocaleString()}` : 'Not executed'}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">{testCase.objective}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  {selectedTestCase && (
                    <>
                      <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-medium text-white">{selectedTestCase.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">{selectedTestCase.objective}</p>
                        </div>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </Dialog.Title>

                      <div className="space-y-6">
                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Preconditions</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedTestCase.preconditions.map((condition, index) => (
                              <li key={index} className="text-gray-300">{condition}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-4">Test Steps</h4>
                          <div className="space-y-4">
                            {selectedTestCase.steps.map((step) => (
                              <div key={step.step} className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-sm">
                                    {step.step}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-white">{step.description}</p>
                                  <p className="text-sm text-gray-400 mt-1">Expected: {step.expectedResult}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Expected Results</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedTestCase.expectedResults.map((result, index) => (
                              <li key={index} className="text-gray-300">{result}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <ClockIcon className="h-4 w-4" />
                            <span>
                              {selectedTestCase.lastExecuted
                                ? `Last executed: ${new Date(selectedTestCase.lastExecuted).toLocaleString()}`
                                : 'Not executed'}
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${testStatusColors[selectedTestCase.status]}`}>
                            {selectedTestCase.status}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TestPlanPage;