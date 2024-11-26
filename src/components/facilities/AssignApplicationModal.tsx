import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Application {
  id: number;
  name: string;
  formNumber?: string;
  metadata?: Record<string, string>;
}

interface AssignApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: Application) => void;
  existingApplications: Application[];
}

const availableApplications = [
  { id: 1, name: "Equipment Management" },
  { id: 2, name: "Quality Control" },
  { id: 3, name: "Lab Management" },
  { id: 4, name: "Document Control" },
  { id: 5, name: "Inventory Management" }
];

export default function AssignApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  existingApplications
}: AssignApplicationModalProps) {
  const [selectedAppId, setSelectedAppId] = useState<number | ''>('');
  const [formNumber, setFormNumber] = useState('');
  const [metadata, setMetadata] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;

    const selectedApp = availableApplications.find(app => app.id === selectedAppId);
    if (!selectedApp) return;

    onSubmit({
      ...selectedApp,
      formNumber,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined
    });

    setSelectedAppId('');
    setFormNumber('');
    setMetadata({});
  };

  const addMetadataField = () => {
    setMetadata({ ...metadata, '': '' });
  };

  const updateMetadataKey = (oldKey: string, newKey: string) => {
    const { [oldKey]: value, ...rest } = metadata;
    setMetadata({ ...rest, [newKey]: value || '' });
  };

  const updateMetadataValue = (key: string, value: string) => {
    setMetadata({ ...metadata, [key]: value });
  };

  const removeMetadataField = (key: string) => {
    const { [key]: _, ...rest } = metadata;
    setMetadata(rest);
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Assign Application</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Application
                    </label>
                    <select
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select an application</option>
                      {availableApplications
                        .filter(app => !existingApplications.some(existing => existing.id === app.id))
                        .map(app => (
                          <option key={app.id} value={app.id}>{app.name}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Form Number
                    </label>
                    <input
                      type="text"
                      value={formNumber}
                      onChange={(e) => setFormNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., EQ-001"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Additional Metadata
                      </label>
                      <button
                        type="button"
                        onClick={addMetadataField}
                        className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Add Field
                      </button>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(metadata).map(([key, value], index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={key}
                            onChange={(e) => updateMetadataKey(key, e.target.value)}
                            placeholder="Key"
                            className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateMetadataValue(key, e.target.value)}
                            placeholder="Value"
                            className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeMetadataField(key)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Assign Application
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}