import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  PlusIcon,
  XMarkIcon,
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

interface Workflow {
  id: string;
  name: string;
  description: string;
  primaryEntity: string;
  secondaryEntities: string[];
  status: 'active' | 'draft' | 'archived';
  steps: {
    id: string;
    name: string;
    type: string;
    roles: string[];
    actions: string[];
  }[];
  createdAt: string;
  updatedAt: string;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Equipment Usage Log',
    description: 'Workflow for tracking equipment usage and activity logs',
    primaryEntity: 'Equipment',
    secondaryEntities: ['Activity Logs', 'User Records'],
    status: 'active',
    steps: [
      {
        id: 's1',
        name: 'Create Activity Log',
        type: 'CREATE_ACTIVITY_LOG',
        roles: ['SUPERVISOR_ROLE', 'PRODUCTION_HEAD_ROLE'],
        actions: ['CREATE_ACTIVITY_LOGS']
      },
      {
        id: 's2',
        name: 'Archive Activity Log',
        type: 'ARCHIVE_ACTIVITY_LOG',
        roles: ['SUPERVISOR_ROLE'],
        actions: ['ARCHIVE_ACTIVITY_LOGS']
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Equipment Maintenance',
    description: 'Workflow for scheduling and tracking equipment maintenance',
    primaryEntity: 'Equipment',
    secondaryEntities: ['Maintenance Records', 'Technician Records'],
    status: 'draft',
    steps: [
      {
        id: 's1',
        name: 'Schedule Maintenance',
        type: 'SCHEDULE_MAINTENANCE',
        roles: ['MAINTENANCE_SUPERVISOR'],
        actions: ['CREATE_MAINTENANCE_SCHEDULE']
      }
    ],
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  }
];

const entities = [
  'Bulk Pos',
  'Business Unit',
  'Cost Center',
  'Role Activity Type Permissions',
  'User Area Permissions',
  'Equipment',
  'Sanitizing Agents',
  'Activity Types',
  'Activity Type Equipment Status',
  'Equipment Type',
  'Bulk Products',
  'Resource',
  'Cleaning Agents',
  'Equipment Cleaning Agents',
  'Area'
];

const statusColors = {
  active: 'bg-green-500/10 text-green-400',
  draft: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-gray-500/10 text-gray-400'
};

export default function WorkflowsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [workflows] = useState<Workflow[]>(mockWorkflows);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Create Workflow Form State
  const [workflowName, setWorkflowName] = useState('');
  const [description, setDescription] = useState('');
  const [primaryEntity, setPrimaryEntity] = useState('');
  const [selectedEntities, setSelectedEntities] = useState<Set<string>>(new Set());

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workflow creation
    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setWorkflowName('');
    setDescription('');
    setPrimaryEntity('');
    setSelectedEntities(new Set());
  };

  const toggleEntity = (entity: string) => {
    const newSelection = new Set(selectedEntities);
    if (newSelection.has(entity)) {
      newSelection.delete(entity);
    } else {
      newSelection.add(entity);
    }
    setSelectedEntities(newSelection);
  };

  const selectAllEntities = () => {
    if (selectedEntities.size === entities.length) {
      setSelectedEntities(new Set());
    } else {
      setSelectedEntities(new Set(entities));
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Workflows</h1>
            <p className="text-gray-400 mt-1">Manage and monitor workflow definitions</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Workflow
          </button>
        </div>

        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedWorkflow(workflow);
                setIsDetailsModalOpen(true);
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold text-white">{workflow.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[workflow.status]}`}>
                    {workflow.status}
                  </span>
                </div>
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              <p className="text-gray-400 mb-4">{workflow.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Primary Entity</h4>
                  <p className="text-white bg-gray-900 px-3 py-2 rounded-lg">{workflow.primaryEntity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Steps</h4>
                  <p className="text-white bg-gray-900 px-3 py-2 rounded-lg">{workflow.steps.length} steps defined</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>Created {new Date(workflow.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Updated {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayIcon className="h-4 w-4" />
                  <span>{workflow.steps.length} steps</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Workflow Modal */}
      <Transition appear show={isCreateModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsCreateModalOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-white">Create New Workflow</h3>
                    <button
                      onClick={() => setIsCreateModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </Dialog.Title>

                  <form onSubmit={handleCreateWorkflow} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Workflow Name
                      </label>
                      <input
                        type="text"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Primary Entity
                      </label>
                      <select
                        value={primaryEntity}
                        onChange={(e) => setPrimaryEntity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select primary entity</option>
                        {entities.map(entity => (
                          <option key={entity} value={entity}>{entity}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Secondary Entities
                      </label>
                      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedEntities.size === entities.length}
                              onChange={selectAllEntities}
                              className="rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-gray-300">Select All</span>
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {entities.map(entity => (
                            <label
                              key={entity}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={selectedEntities.has(entity)}
                                onChange={() => toggleEntity(entity)}
                                className="rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                              />
                              <span className="text-sm text-gray-300">{entity}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(false)}
                        className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                      >
                        Create Workflow
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Workflow Details Modal */}
      <Transition appear show={isDetailsModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsDetailsModalOpen(false)}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                  {selectedWorkflow && (
                    <>
                      <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-medium text-white">{selectedWorkflow.name}</h3>
                          <p className="text-sm text-gray-400 mt-1">{selectedWorkflow.description}</p>
                        </div>
                        <button
                          onClick={() => setIsDetailsModalOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </Dialog.Title>

                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Primary Entity</h4>
                            <p className="text-white">{selectedWorkflow.primaryEntity}</p>
                          </div>
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedWorkflow.status]}`}>
                              {selectedWorkflow.status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-4">Workflow Steps</h4>
                          <div className="space-y-4">
                            {selectedWorkflow.steps.map((step, index) => (
                              <div key={step.id} className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                    {index + 1}
                                  </div>
                                </div>
                                <div className="flex-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
                                  <h5 className="text-white font-medium mb-2">{step.name}</h5>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-400">Type</p>
                                      <p className="text-sm text-white">{step.type}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-400">Required Roles</p>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {step.roles.map(role => (
                                          <span
                                            key={role}
                                            className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full"
                                          >
                                            {role}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Secondary Entities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedWorkflow.secondaryEntities.map(entity => (
                              <span
                                key={entity}
                                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                              >
                                {entity}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="h-4 w-4" />
                            <span>Created {new Date(selectedWorkflow.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircleIcon className="h-4 w-4" />
                            <span>Last updated {new Date(selectedWorkflow.updatedAt).toLocaleString()}</span>
                          </div>
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
}