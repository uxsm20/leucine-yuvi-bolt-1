import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ArrowPathIcon, DocumentTextIcon, CubeIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface Workflow {
  id: string;
  name: string;
  steps: {
    id: string;
    name: string;
    description: string;
    page: {
      id: string;
      name: string;
      sections: Array<{
        id: string;
        name: string;
        description: string;
      }>;
    };
  }[];
}

interface Entity {
  name: string;
  description: string;
  attributes: string[];
}

interface ResearchData {
  useCaseDefinition: string;
  entities: Entity[];
  workflows: Workflow[];
}

interface Feedback {
  id: string;
  type: 'section' | 'page' | 'workflow' | 'workflow-step';
  targetId: string;
  content: string;
  impacts: string[];
}

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (application: { name: string; description: string }) => void;
}

const CreateApplicationModal: React.FC<CreateApplicationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState<'input' | 'research' | 'feedback' | 'impact' | 'confirm'>('input');
  const [description, setDescription] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [selectedElement, setSelectedElement] = useState<{type: string; id: string} | null>(null);

  const simulateResearch = async () => {
    setIsResearching(true);
    // Simulate API call to AI research service
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock research data
    setResearchData({
      useCaseDefinition: "A comprehensive clinical trial management system that streamlines the process of planning, conducting, and analyzing clinical trials...",
      entities: [
        {
          name: "Clinical Trial",
          description: "Represents a medical research study",
          attributes: ["protocol", "phase", "status", "start_date", "end_date"]
        }
      ],
      workflows: [
        {
          id: "w1",
          name: "Trial Setup",
          steps: [
            {
              id: "s1",
              name: "Protocol Definition",
              description: "Define trial protocol and parameters",
              page: {
                id: "p1",
                name: "Protocol Setup",
                sections: [
                  {
                    id: "sec1",
                    name: "Basic Information",
                    description: "Trial identification and basic parameters"
                  }
                ]
              }
            }
          ]
        }
      ]
    });
    
    setIsResearching(false);
    setStep('research');
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateResearch();
  };

  const handleFeedbackSubmit = () => {
    if (!selectedElement || !currentFeedback) return;

    const newFeedback: Feedback = {
      id: `f${feedbacks.length + 1}`,
      type: selectedElement.type as 'section' | 'page' | 'workflow' | 'workflow-step',
      targetId: selectedElement.id,
      content: currentFeedback,
      impacts: ['Workflow structure may change', 'Additional entities might be required']
    };

    setFeedbacks([...feedbacks, newFeedback]);
    setCurrentFeedback('');
    setSelectedElement(null);
    setStep('impact');
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
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
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Create New Application</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                {step === 'input' && (
                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Describe Your Application
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                        placeholder="Describe your application in 2-4 sentences..."
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors inline-flex items-center"
                        disabled={isResearching}
                      >
                        {isResearching ? (
                          <>
                            <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Start Research'
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {step === 'research' && researchData && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Use Case Definition</h4>
                      <p className="text-gray-300 text-sm">{researchData.useCaseDefinition}</p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Entities</h4>
                      <div className="space-y-2">
                        {researchData.entities.map(entity => (
                          <div key={entity.name} className="border border-gray-700 p-3 rounded-lg">
                            <h5 className="text-indigo-400 font-medium">{entity.name}</h5>
                            <p className="text-gray-300 text-sm mt-1">{entity.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Workflows</h4>
                      <div className="space-y-2">
                        {researchData.workflows.map(workflow => (
                          <div key={workflow.id} className="border border-gray-700 p-3 rounded-lg">
                            <h5 className="text-indigo-400 font-medium">{workflow.name}</h5>
                            <div className="mt-2 space-y-2">
                              {workflow.steps.map(step => (
                                <div key={step.id} className="pl-4 border-l border-gray-700">
                                  <h6 className="text-white">{step.name}</h6>
                                  <p className="text-gray-400 text-sm">{step.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setStep('feedback')}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                      >
                        Provide Feedback
                      </button>
                    </div>
                  </div>
                )}

                {step === 'feedback' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Select Element to Provide Feedback
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={selectedElement?.id || ''}
                        onChange={(e) => {
                          const [type, id] = e.target.value.split('|');
                          setSelectedElement({ type, id });
                        }}
                      >
                        <option value="">Select an element...</option>
                        <option value="workflow|w1">Trial Setup Workflow</option>
                        <option value="page|p1">Protocol Setup Page</option>
                        <option value="section|sec1">Basic Information Section</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Feedback
                      </label>
                      <textarea
                        value={currentFeedback}
                        onChange={(e) => setCurrentFeedback(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                        placeholder="Provide your feedback..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={handleFeedbackSubmit}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                        disabled={!selectedElement || !currentFeedback}
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                )}

                {step === 'impact' && (
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-4">Impact Analysis</h4>
                      <div className="space-y-2">
                        {feedbacks[feedbacks.length - 1]?.impacts.map((impact, index) => (
                          <div key={index} className="flex items-center space-x-2 text-gray-300">
                            <ArrowsPointingOutIcon className="h-4 w-4 text-indigo-400" />
                            <span>{impact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setStep('feedback')}
                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                      >
                        Add More Feedback
                      </button>
                      <button
                        onClick={() => setStep('confirm')}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                      >
                        Accept & Continue
                      </button>
                    </div>
                  </div>
                )}

                {step === 'confirm' && (
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Ready to Begin Planning</h4>
                      <p className="text-gray-300">
                        Research phase complete. All feedback has been processed and incorporated.
                        Ready to move to the planning phase?
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => onSubmit({ name: "Clinical Trial Management", description })}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                      >
                        Start Planning Phase
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateApplicationModal;