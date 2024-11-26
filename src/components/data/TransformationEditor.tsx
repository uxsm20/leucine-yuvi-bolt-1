import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Operation {
  type: 'filter' | 'map' | 'aggregate' | 'join';
  config: Record<string, any>;
}

interface TransformationEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (operations: Operation[]) => void;
  initialOperations?: Operation[];
}

export default function TransformationEditor({
  isOpen,
  onClose,
  onSave,
  initialOperations = []
}: TransformationEditorProps) {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);

  const addOperation = (type: Operation['type']) => {
    setOperations([...operations, { type, config: {} }]);
  };

  const updateOperation = (index: number, config: Record<string, any>) => {
    const newOperations = [...operations];
    newOperations[index] = { ...newOperations[index], config };
    setOperations(newOperations);
  };

  const removeOperation = (index: number) => {
    setOperations(operations.filter((_, i) => i !== index));
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Configure Transformation</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Add Operation</h4>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addOperation('filter')}
                        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Filter
                      </button>
                      <button
                        onClick={() => addOperation('map')}
                        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Map
                      </button>
                      <button
                        onClick={() => addOperation('aggregate')}
                        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Aggregate
                      </button>
                      <button
                        onClick={() => addOperation('join')}
                        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Join
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {operations.map((op, index) => (
                      <div key={index} className="bg-gray-900 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-sm font-medium text-white capitalize">{op.type}</h5>
                          <button
                            onClick={() => removeOperation(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Operation-specific configuration */}
                        {op.type === 'filter' && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Condition"
                              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                              value={op.config.condition || ''}
                              onChange={(e) => updateOperation(index, { condition: e.target.value })}
                            />
                          </div>
                        )}

                        {op.type === 'map' && (
                          <div className="space-y-2">
                            <textarea
                              placeholder="Transformation expression"
                              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                              value={op.config.expression || ''}
                              onChange={(e) => updateOperation(index, { expression: e.target.value })}
                              rows={3}
                            />
                          </div>
                        )}

                        {/* Add more operation-specific configurations */}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onSave(operations);
                      onClose();
                    }}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}