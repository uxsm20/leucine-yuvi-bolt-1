import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Page } from '../../types/page';

interface PageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  page: Page;
  onSave: (updatedPage: Partial<Page>) => void;
}

export default function PageSettingsModal({
  isOpen,
  onClose,
  page,
  onSave
}: PageSettingsModalProps) {
  const [formData, setFormData] = useState({
    name: page.name,
    slug: page.slug,
    description: page.description,
    isMenuPage: page.isMenuPage,
    pageType: page.pageType,
    readOnlyPage: page.readOnlyPage,
    viewType: page.viewType,
    customSecondaryPage: page.customSecondaryPage,
    entityName: page.entityName || '',
    layout: page.layout,
    theme: page.theme,
    metadata: page.metadata
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
                  <h3 className="text-lg font-medium text-white">Page Settings</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
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
                        Slug
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Page Type
                      </label>
                      <select
                        value={formData.pageType}
                        onChange={(e) => setFormData({ ...formData, pageType: e.target.value as Page['pageType'] })}
                        className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="LIST">List</option>
                        <option value="DETAIL">Detail</option>
                        <option value="FORM">Form</option>
                        <option value="DASHBOARD">Dashboard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        View Type
                      </label>
                      <select
                        value={formData.viewType}
                        onChange={(e) => setFormData({ ...formData, viewType: e.target.value as Page['viewType'] })}
                        className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="DEFAULT_VIEW">Default View</option>
                        <option value="CUSTOM_VIEW">Custom View</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isMenuPage}
                          onChange={(e) => setFormData({ ...formData, isMenuPage: e.target.checked })}
                          className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-300">Show in Menu</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.readOnlyPage}
                          onChange={(e) => setFormData({ ...formData, readOnlyPage: e.target.checked })}
                          className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-300">Read Only</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.customSecondaryPage}
                          onChange={(e) => setFormData({ ...formData, customSecondaryPage: e.target.checked })}
                          className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-300">Custom Secondary Page</span>
                      </label>
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