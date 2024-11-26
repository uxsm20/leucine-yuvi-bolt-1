import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DataSourceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (source: any) => void;
}

const sourceTypes = [
  {
    type: 'database',
    name: 'Databases',
    systems: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        connectors: [
          { id: 'postgresql-direct', name: 'Direct Connection' },
          { id: 'postgresql-ssl', name: 'SSL Connection' }
        ]
      },
      {
        id: 'mysql',
        name: 'MySQL',
        connectors: [
          { id: 'mysql-direct', name: 'Direct Connection' },
          { id: 'mysql-ssl', name: 'SSL Connection' }
        ]
      },
      {
        id: 'oracle',
        name: 'Oracle',
        connectors: [
          { id: 'oracle-direct', name: 'Direct Connection' },
          { id: 'oracle-wallet', name: 'Oracle Wallet' }
        ]
      }
    ]
  },
  {
    type: 'file',
    name: 'File Systems',
    systems: [
      {
        id: 's3',
        name: 'Amazon S3',
        connectors: [
          { id: 's3-direct', name: 'Direct Access' },
          { id: 's3-role', name: 'IAM Role' }
        ]
      },
      {
        id: 'sftp',
        name: 'SFTP',
        connectors: [
          { id: 'sftp-password', name: 'Password Authentication' },
          { id: 'sftp-key', name: 'SSH Key' }
        ]
      },
      {
        id: 'local',
        name: 'Local Files',
        connectors: [
          { id: 'local-csv', name: 'CSV Files' },
          { id: 'local-excel', name: 'Excel Files' },
          { id: 'local-json', name: 'JSON Files' }
        ]
      }
    ]
  },
  {
    type: 'erp',
    name: 'ERP Systems',
    systems: [
      {
        id: 'sap',
        name: 'SAP',
        connectors: [
          { id: 'sap-hana', name: 'SAP HANA' },
          { id: 'sap-ecc', name: 'SAP ECC' },
          { id: 'sap-s4', name: 'SAP S/4HANA' }
        ]
      },
      {
        id: 'oracle',
        name: 'Oracle ERP',
        connectors: [
          { id: 'oracle-ebs', name: 'Oracle E-Business Suite' },
          { id: 'oracle-fusion', name: 'Oracle Fusion' }
        ]
      }
    ]
  },
  {
    type: 'crm',
    name: 'CRM Systems',
    systems: [
      {
        id: 'salesforce',
        name: 'Salesforce',
        connectors: [
          { id: 'salesforce-api', name: 'Salesforce API' },
          { id: 'salesforce-bulk', name: 'Salesforce Bulk API' }
        ]
      },
      {
        id: 'dynamics',
        name: 'Microsoft Dynamics',
        connectors: [
          { id: 'dynamics-365', name: 'Dynamics 365' }
        ]
      }
    ]
  },
  {
    type: 'lims',
    name: 'LIMS Systems',
    systems: [
      {
        id: 'labware',
        name: 'LabWare LIMS',
        connectors: [
          { id: 'labware-api', name: 'REST API' },
          { id: 'labware-db', name: 'Direct Database' }
        ]
      },
      {
        id: 'labvantage',
        name: 'LabVantage',
        connectors: [
          { id: 'labvantage-api', name: 'Web Services' },
          { id: 'labvantage-db', name: 'Database Connection' }
        ]
      }
    ]
  }
];

export default function DataSourceFormModal({
  isOpen,
  onClose,
  onSubmit
}: DataSourceFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    system: '',
    connector: {
      type: '',
      config: {}
    }
  });

  const [selectedType, setSelectedType] = useState('');
  const [selectedSystem, setSelectedSystem] = useState('');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSelectedSystem('');
    setFormData({
      ...formData,
      type,
      system: '',
      connector: { type: '', config: {} }
    });
  };

  const handleSystemChange = (systemId: string) => {
    setSelectedSystem(systemId);
    setFormData({
      ...formData,
      system: systemId,
      connector: { type: '', config: {} }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedTypeConfig = sourceTypes.find(t => t.type === selectedType);
  const selectedSystemConfig = selectedTypeConfig?.systems.find(s => s.id === selectedSystem);

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
                  <h3 className="text-lg font-medium text-white">Add Data Source</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data Source Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter a name for this data source"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Source Type
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {sourceTypes.map((type) => (
                        <button
                          key={type.type}
                          type="button"
                          onClick={() => handleTypeChange(type.type)}
                          className={`p-4 rounded-lg border ${
                            selectedType === type.type
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                          } transition-colors text-left`}
                        >
                          <h4 className="text-sm font-medium text-white mb-1">{type.name}</h4>
                          <p className="text-xs text-gray-400">
                            {type.systems.length} available systems
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        System
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedTypeConfig?.systems.map((system) => (
                          <button
                            key={system.id}
                            type="button"
                            onClick={() => handleSystemChange(system.id)}
                            className={`p-4 rounded-lg border ${
                              selectedSystem === system.id
                                ? 'border-indigo-500 bg-indigo-500/10'
                                : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                            } transition-colors text-left`}
                          >
                            <h4 className="text-sm font-medium text-white mb-1">{system.name}</h4>
                            <p className="text-xs text-gray-400">
                              {system.connectors.length} available connectors
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSystem && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Connector Type
                      </label>
                      <select
                        value={formData.connector.type}
                        onChange={(e) => setFormData({
                          ...formData,
                          connector: { type: e.target.value, config: {} }
                        })}
                        className="w-full px-3 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Select a connector</option>
                        {selectedSystemConfig?.connectors.map((connector) => (
                          <option key={connector.id} value={connector.id}>
                            {connector.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

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
                      disabled={!formData.connector.type}
                    >
                      Continue
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