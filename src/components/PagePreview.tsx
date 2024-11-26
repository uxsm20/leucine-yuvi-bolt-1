import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Section {
  id: number;
  name: string;
  description: string;
  type: 'FORM' | 'TABLE' | 'CHART' | 'CUSTOM';
  sequence: number;
  displayName: string | null;
}

interface Page {
  id: number;
  name: string;
  sections: Section[];
}

interface PagePreviewProps {
  page: Page;
  onClose: () => void;
  onSectionFeedback: (sectionId: number, feedback: string) => void;
}

export default function PagePreview({ page, onClose, onSectionFeedback }: PagePreviewProps) {
  const [activeSectionId, setActiveSectionId] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState('');

  const handleSubmitFeedback = () => {
    if (activeSectionId && feedback) {
      onSectionFeedback(activeSectionId, feedback);
      setFeedback('');
      setActiveSectionId(null);
    }
  };

  return (
    <Transition appear show={true} as={React.Fragment}>
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all border border-gray-700">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">{page.name}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="space-y-8">
                  {page.sections.map((section) => (
                    <div key={section.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">
                          {section.displayName || section.name}
                        </h3>
                        <button
                          onClick={() => setActiveSectionId(section.id)}
                          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Provide Feedback
                        </button>
                      </div>
                      
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <p className="text-gray-300">{section.description}</p>
                      </div>

                      {activeSectionId === section.id && (
                        <div className="space-y-4">
                          <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Enter your feedback for this section..."
                            className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows={4}
                          />
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => setActiveSectionId(null)}
                              className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSubmitFeedback}
                              className="px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                            >
                              Submit Feedback
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}