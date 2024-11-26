import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Feedback } from '../../types/application';

interface FeedbackPanelProps {
  feedbacks: Feedback[];
  onSubmit: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'status'>) => void;
}

export default function FeedbackPanel({ feedbacks, onSubmit }: FeedbackPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<Feedback['type']>('workflow');
  const [selectedTargetId, setSelectedTargetId] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: selectedType,
      targetId: selectedTargetId,
      content,
      impacts: [] // This would be determined by AI in a real implementation
    });
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedType('workflow');
    setSelectedTargetId('');
    setContent('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Feedback History</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-2" />
          Add Feedback
        </button>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-gray-900 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-medium text-white capitalize">
                  {feedback.type}
                </span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-sm text-gray-400">
                  {new Date(feedback.createdAt).toLocaleString()}
                </span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                feedback.status === 'applied' 
                  ? 'bg-green-500/10 text-green-400'
                  : feedback.status === 'rejected'
                  ? 'bg-red-500/10 text-red-400'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}>
                {feedback.status}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{feedback.content}</p>
            {feedback.impacts.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Impacts</h4>
                <div className="space-y-2">
                  {feedback.impacts.map((impact, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-300">{impact.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => setIsModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/75" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Add Feedback</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Feedback Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as Feedback['type'])}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="workflow">Workflow</option>
                      <option value="step">Workflow Step</option>
                      <option value="section">Page Section</option>
                      <option value="metric">Metric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Target ID
                    </label>
                    <input
                      type="text"
                      value={selectedTargetId}
                      onChange={(e) => setSelectedTargetId(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Feedback
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}