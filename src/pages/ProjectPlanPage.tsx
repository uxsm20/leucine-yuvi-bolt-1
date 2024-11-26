import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TaskTimeline from '../components/TaskTimeline';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ERROR';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  createdAt: string;
  startedAt: string;
  completedAt: string | null;
  events: {
    id: string;
    type: 'created' | 'started' | 'processing' | 'validation' | 'completed' | 'error' | 'retry' | 'system_check' | 'optimization';
    timestamp: string;
    description: string;
    details?: string;
  }[];
}

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Regenerating synthetic HTML",
    description: "Regenerating synthetic HTML for section 2980",
    status: "IN_PROGRESS",
    priority: "HIGH",
    type: "REGENERATE_SECTION_SYNTHETIC_HTML",
    createdAt: "2024-11-11T14:11:45.052Z",
    startedAt: "2024-11-11T14:11:45.055Z",
    completedAt: null,
    events: [
      {
        id: '1',
        type: 'created',
        timestamp: '2024-11-11T14:11:45.052Z',
        description: 'Task created',
        details: 'Initial task creation with parameters'
      },
      {
        id: '2',
        type: 'started',
        timestamp: '2024-11-11T14:11:45.055Z',
        description: 'Task execution started',
        details: 'Beginning HTML regeneration process'
      }
    ]
  },
  {
    id: "2",
    name: "Generating dynamic HTML",
    description: "Generating dynamic HTML for section 2932",
    status: "COMPLETED",
    priority: "MEDIUM",
    type: "GENERATE_DYNAMIC_SECTION",
    createdAt: "2024-11-11T14:16:23.223Z",
    startedAt: "2024-11-11T14:16:23.227Z",
    completedAt: "2024-11-11T14:20:23.227Z",
    events: [
      {
        id: '1',
        type: 'created',
        timestamp: '2024-11-11T14:16:23.223Z',
        description: 'Task created',
        details: 'Task initialized with section parameters'
      },
      {
        id: '2',
        type: 'completed',
        timestamp: '2024-11-11T14:20:23.227Z',
        description: 'Task completed successfully',
        details: 'All operations completed with optimized output'
      }
    ]
  }
];

const statusColors = {
  IN_PROGRESS: 'bg-blue-500/10 text-blue-400',
  COMPLETED: 'bg-green-500/10 text-green-400',
  ERROR: 'bg-red-500/10 text-red-400'
};

const priorityColors = {
  HIGH: 'bg-red-500/10 text-red-400',
  MEDIUM: 'bg-yellow-500/10 text-yellow-400',
  LOW: 'bg-blue-500/10 text-blue-400'
};

export default function ProjectPlanPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Project Plan</h1>
            <p className="text-gray-400 mt-1">Track AI agent tasks and progress</p>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-6">
            {['IN_PROGRESS', 'COMPLETED', 'ERROR'].map((status) => (
              <div key={status} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4 capitalize">
                  {status.toLowerCase().replace('_', ' ')}
                </h2>

                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-4"
                    >
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => handleTaskClick(task)}
                                className="bg-gray-900 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                                    {task.priority}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                                    {task.status}
                                  </span>
                                </div>
                                <h3 className="text-white font-medium mb-2">{task.name}</h3>
                                <p className="text-gray-400 text-sm">{task.description}</p>
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
                    {selectedTask && (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <Dialog.Title as="h3" className="text-lg font-medium text-white">
                            {selectedTask.name}
                          </Dialog.Title>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[selectedTask.priority]}`}>
                              {selectedTask.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedTask.status]}`}>
                              {selectedTask.status}
                            </span>
                          </div>

                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                            <p className="text-white">{selectedTask.description}</p>
                          </div>

                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-300 mb-4">Timeline</h4>
                            <TaskTimeline events={selectedTask.events} />
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
    </div>
  );
}