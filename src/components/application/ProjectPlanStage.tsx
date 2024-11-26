import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  ArrowPathIcon,
  CheckIcon,
  ClockIcon,
  BeakerIcon,
  CpuChipIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { ProjectTask } from '../../types/application';

interface ProjectPlanStageProps {
  tasks: ProjectTask[];
  onComplete: () => void;
}

const mockTasks: ProjectTask[] = [
  {
    id: '1',
    name: 'Initialize Project Structure',
    description: 'Set up the basic project structure and configuration',
    type: 'development',
    status: 'in_progress',
    assignedTo: 'Setup Droid',
    priority: 'high',
    dependencies: [],
    progress: 75,
    startTime: '2024-01-20T10:00:00Z',
    events: [
      {
        id: 'e1',
        type: 'start',
        description: 'Started project initialization',
        timestamp: '2024-01-20T10:00:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Generate Database Schema',
    description: 'Create database schema based on entity definitions',
    type: 'development',
    status: 'pending',
    assignedTo: 'Database Droid',
    priority: 'high',
    dependencies: ['1'],
    progress: 0,
    events: []
  },
  {
    id: '3',
    name: 'Generate API Endpoints',
    description: 'Create API endpoints for all entities',
    type: 'development',
    status: 'pending',
    assignedTo: 'API Droid',
    priority: 'high',
    dependencies: ['2'],
    progress: 0,
    events: []
  }
];

export default function ProjectPlanStage({ tasks = mockTasks, onComplete }: ProjectPlanStageProps) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceStatus = result.source.droppableId;
    const destinationStatus = result.destination.droppableId;

    if (sourceStatus === destinationStatus) {
      const items = Array.from(localTasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setLocalTasks(items);
    } else {
      const items = Array.from(localTasks);
      const task = items.find(t => t.id === result.draggableId);
      if (task) {
        task.status = destinationStatus as ProjectTask['status'];
        setLocalTasks(items);
      }
    }
  };

  const getTasksByStatus = (status: ProjectTask['status']) => 
    localTasks.filter(task => task.status === status);

  const getStatusColor = (status: ProjectTask['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-500/10 text-gray-400';
      case 'in_progress': return 'bg-blue-500/10 text-blue-400';
      case 'completed': return 'bg-green-500/10 text-green-400';
      case 'failed': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  const getPriorityColor = (priority: ProjectTask['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-400';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400';
      case 'low': return 'bg-blue-500/10 text-blue-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-8 shadow-xl"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Plan</h2>
          <p className="text-gray-400 mt-1">AI agents will execute these tasks to build your application</p>
        </div>
        <button
          onClick={onComplete}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <RocketLaunchIcon className="h-5 w-5 mr-2" />
          Start Development
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-6">
          {['pending', 'in_progress', 'completed', 'failed'].map((status) => (
            <div key={status} className="bg-gray-900 rounded-xl p-4">
              <h3 className="text-lg font-medium text-white mb-4 capitalize">
                {status.replace('_', ' ')}
              </h3>
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                  >
                    {getTasksByStatus(status as ProjectTask['status']).map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              setSelectedTask(task);
                              setIsModalOpen(true);
                            }}
                            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                            </div>
                            <h4 className="text-white font-medium mb-2">{task.name}</h4>
                            <p className="text-gray-400 text-sm">{task.description}</p>
                            {task.progress > 0 && (
                              <div className="mt-4">
                                <div className="flex justify-between text-xs text-gray-400 mb-1">
                                  <span>Progress</span>
                                  <span>{task.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className="bg-indigo-500 h-1.5 rounded-full"
                                    style={{ width: `${task.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => setIsModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/75" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                {selectedTask && (
                  <>
                    <Dialog.Title as="div" className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-medium text-white">{selectedTask.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{selectedTask.description}</p>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </Dialog.Title>

                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTask.priority)}`}>
                          {selectedTask.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTask.status)}`}>
                          {selectedTask.status}
                        </span>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-4">Timeline</h4>
                        <div className="space-y-4">
                          {selectedTask.events.map((event) => (
                            <div key={event.id} className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                  {event.type === 'start' && <ClockIcon className="h-4 w-4 text-indigo-400" />}
                                  {event.type === 'processing' && <CpuChipIcon className="h-4 w-4 text-indigo-400" />}
                                  {event.type === 'complete' && <CheckIcon className="h-4 w-4 text-indigo-400" />}
                                  {event.type === 'error' && <XMarkIcon className="h-4 w-4 text-indigo-400" />}
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-white text-sm">{event.description}</p>
                                <p className="text-gray-400 text-xs mt-1">
                                  {new Date(event.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedTask.dependencies.length > 0 && (
                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Dependencies</h4>
                          <div className="space-y-2">
                            {selectedTask.dependencies.map((depId) => {
                              const dep = localTasks.find(t => t.id === depId);
                              return dep ? (
                                <div key={depId} className="flex items-center justify-between">
                                  <span className="text-gray-300">{dep.name}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dep.status)}`}>
                                    {dep.status}
                                  </span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </motion.div>
  );
}