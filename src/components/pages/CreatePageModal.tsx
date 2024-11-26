import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pageData: any) => void;
}

const mockPermissions: Permission[] = [
  {
    id: "view_page",
    name: "View Page",
    description: "Allow users to view this page"
  },
  {
    id: "edit_page",
    name: "Edit Page",
    description: "Allow users to edit page content"
  },
  {
    id: "manage_sections",
    name: "Manage Sections",
    description: "Allow users to add/edit/delete sections"
  },
  {
    id: "delete_page",
    name: "Delete Page",
    description: "Allow users to delete this page"
  }
];

const steps = [
  { id: 'basics', name: 'Basic Information' },
  { id: 'permissions', name: 'Permissions' },
  { id: 'preview', name: 'Preview' }
];

export default function CreatePageModal({ isOpen, onClose, onSubmit }: CreatePageModalProps) {
  const [currentStep, setCurrentStep] = useState('basics');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pageType: 'LIST',
    isMenuPage: false,
    permissions: new Set<string>(),
    sections: []
  });

  const handleNext = () => {
    switch (currentStep) {
      case 'basics':
        setCurrentStep('permissions');
        break;
      case 'permissions':
        setCurrentStep('preview');
        break;
      case 'preview':
        handleSubmit();
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'permissions':
        setCurrentStep('basics');
        break;
      case 'preview':
        setCurrentStep('permissions');
        break;
    }
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      permissions: Array.from(formData.permissions)
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pageType: 'LIST',
      isMenuPage: false,
      permissions: new Set<string>(),
      sections: []
    });
    setCurrentStep('basics');
    onClose();
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = new Set(formData.permissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setFormData({ ...formData, permissions: newPermissions });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Page Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Page Type
              </label>
              <select
                value={formData.pageType}
                onChange={(e) => setFormData({ ...formData, pageType: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="LIST">List</option>
                <option value="DETAIL">Detail</option>
                <option value="FORM">Form</option>
                <option value="DASHBOARD">Dashboard</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isMenuPage"
                checked={formData.isMenuPage}
                onChange={(e) => setFormData({ ...formData, isMenuPage: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
              />
              <label htmlFor="isMenuPage" className="text-sm text-gray-300">
                Show in menu
              </label>
            </div>
          </div>
        );

      case 'permissions':
        return (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Select the permissions required to access and manage this page
            </p>
            <div className="space-y-2">
              {mockPermissions.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-start space-x-3 p-3 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.permissions.has(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                    className="mt-1 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{permission.name}</div>
                    <div className="text-sm text-gray-400">{permission.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white ml-2">{formData.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white ml-2">{formData.pageType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Menu Page:</span>
                  <span className="text-white ml-2">{formData.isMenuPage ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Description:</span>
                  <p className="text-white mt-1">{formData.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Permissions</h4>
              <div className="space-y-1">
                {Array.from(formData.permissions).map((permId) => {
                  const permission = mockPermissions.find(p => p.id === permId);
                  return permission ? (
                    <div key={permId} className="text-white">
                      • {permission.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        );
    }
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
                  <div>
                    <h3 className="text-lg font-medium text-white">Create Page</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            step.id === currentStep
                              ? 'bg-indigo-500 text-white'
                              : steps.indexOf(steps.find(s => s.id === currentStep)!) > index
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          {index < steps.length - 1 && (
                            <div className="w-12 h-0.5 mx-2 bg-gray-700" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <div className="mt-4">
                  {renderStepContent()}
                </div>

                <div className="flex justify-between mt-8">
                  {currentStep !== 'basics' && (
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <div className="ml-auto">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors inline-flex items-center"
                    >
                      {currentStep === 'preview' ? 'Create Page' : 'Next'}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}