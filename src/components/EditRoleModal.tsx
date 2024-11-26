import React, { useState, useEffect } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Permission {
  id: string;
  name: string;
  description: string;
  entityId: string;
  actionType: 'create' | 'read' | 'update' | 'delete';
  pageId?: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  applicationId: string;
}

interface Page {
  id: string;
  name: string;
  applicationId: string;
  requiredPermissions: string[];
}

interface Application {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (role: Role) => void;
  role: Role;
  applications: Application[];
  entities: Entity[];
  permissions: Permission[];
  pages: Page[];
}

const EditRoleModal: React.FC<EditRoleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  role,
  applications,
  entities,
  permissions,
  pages,
}) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set(role.permissions));

  useEffect(() => {
    setName(role.name);
    setDescription(role.description);
    setSelectedPermissions(new Set(role.permissions));
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...role,
      name,
      description,
      permissions: Array.from(selectedPermissions),
    });
  };

  const togglePermission = (permissionId: string) => {
    const newPermissions = new Set(selectedPermissions);
    if (newPermissions.has(permissionId)) {
      newPermissions.delete(permissionId);
    } else {
      newPermissions.add(permissionId);
    }
    setSelectedPermissions(newPermissions);
  };

  const getEntityPermissions = (entityId: string) => {
    return permissions.filter(p => p.entityId === entityId);
  };

  const getPagePermissions = (pageId: string) => {
    return permissions.filter(p => p.pageId === pageId);
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-700">
                <Dialog.Title as="div" className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-white">Edit Role</h3>
                  <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Role Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-white">Permissions</h4>
                    
                    {applications.map(app => (
                      <Disclosure key={app.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-700 px-4 py-2 text-left text-sm font-medium text-white hover:bg-gray-600">
                              <span>{app.name}</span>
                              <ChevronRightIcon
                                className={`${
                                  open ? 'rotate-90 transform' : ''
                                } h-5 w-5 text-white`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 space-y-4">
                              {/* Entity Permissions */}
                              <div className="space-y-3">
                                <h5 className="text-sm font-medium text-gray-300">Entity Permissions</h5>
                                {entities
                                  .filter(entity => entity.applicationId === app.id)
                                  .map(entity => (
                                    <div key={entity.id} className="bg-gray-900 rounded-lg p-4">
                                      <h6 className="text-sm font-medium text-white mb-2">{entity.name}</h6>
                                      <div className="grid grid-cols-2 gap-2">
                                        {getEntityPermissions(entity.id).map(permission => (
                                          <label
                                            key={permission.id}
                                            className="flex items-center space-x-2 text-sm text-gray-300"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={selectedPermissions.has(permission.id)}
                                              onChange={() => togglePermission(permission.id)}
                                              className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                                            />
                                            <span>{permission.name}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                              </div>

                              {/* Page Permissions */}
                              <div className="space-y-3">
                                <h5 className="text-sm font-medium text-gray-300">Page Permissions</h5>
                                {pages
                                  .filter(page => page.applicationId === app.id)
                                  .map(page => (
                                    <div key={page.id} className="bg-gray-900 rounded-lg p-4">
                                      <h6 className="text-sm font-medium text-white mb-2">{page.name}</h6>
                                      <div className="grid grid-cols-2 gap-2">
                                        {getPagePermissions(page.id).map(permission => (
                                          <label
                                            key={permission.id}
                                            className="flex items-center space-x-2 text-sm text-gray-300"
                                          >
                                            <input
                                              type="checkbox"
                                              checked={selectedPermissions.has(permission.id)}
                                              onChange={() => togglePermission(permission.id)}
                                              className="rounded border-gray-700 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
                                            />
                                            <span>{permission.name}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
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
};

export default EditRoleModal;