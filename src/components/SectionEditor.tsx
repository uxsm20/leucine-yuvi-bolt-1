import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Section } from '../types/section';

interface SectionEditorProps {
  section: Section;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedSection: Section) => void;
}

export default function SectionEditor({ section, isOpen, onClose, onSave }: SectionEditorProps) {
  const [editedSection, setEditedSection] = React.useState<Section>(section);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedSection);
    onClose();
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
                  <h3 className="text-lg font-medium text-white">Edit Section</h3>
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
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={editedSection.displayName || ''}
                      onChange={(e) => setEditedSection({
                        ...editedSection,
                        displayName: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Optional display name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editedSection.description}
                      onChange={(e) => setEditedSection({
                        ...editedSection,
                        description: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Section Type
                    </label>
                    <select
                      value={editedSection.type}
                      onChange={(e) => setEditedSection({
                        ...editedSection,
                        type: e.target.value as Section['type']
                      })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="FORM">Form</option>
                      <option value="TABLE">Table</option>
                      <option value="CHART">Chart</option>
                      <option value="CUSTOM">Custom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Size
                    </label>
                    <select
                      value={editedSection.size}
                      onChange={(e) => setEditedSection({
                        ...editedSection,
                        size: e.target.value
                      })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="col-12">Full Width</option>
                      <option value="col-6">Half Width</option>
                      <option value="col-4">One Third</option>
                      <option value="col-3">One Quarter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Sequence
                    </label>
                    <input
                      type="number"
                      value={editedSection.sequence}
                      onChange={(e) => setEditedSection({
                        ...editedSection,
                        sequence: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      min={1}
                      required
                    />
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
                      Save Changes
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