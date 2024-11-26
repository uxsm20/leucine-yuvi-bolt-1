import React, { useState } from 'react';
import { 
  PlusIcon, 
  ArrowPathIcon,
  ServerIcon,
  CloudIcon,
  DocumentIcon,
  BeakerIcon,
  TableCellsIcon,
  ChartBarIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';
import DataSourceFormModal from '../components/data/DataSourceFormModal';
import ConnectorConfigModal from '../components/data/ConnectorConfigModal';
import DataPreviewModal from '../components/data/DataPreviewModal';
import ETLWorkflowBuilder from '../components/data/ETLWorkflowBuilder';

interface DataSource {
  id: string;
  name: string;
  type: string;
  system: string;
  status: 'connected' | 'analyzing' | 'ready' | 'error';
  lastSync?: string;
  tables?: number;
  records?: number;
}

// Mock initial data sources
const initialSources: DataSource[] = [
  {
    id: "1",
    name: "SAP Production",
    type: "erp",
    system: "SAP ECC",
    status: "connected",
    lastSync: "2024-01-20 14:30",
    tables: 156,
    records: 1250000
  },
  {
    id: "2",
    name: "Quality LIMS",
    type: "lims",
    system: "LabWare LIMS",
    status: "ready",
    lastSync: "2024-01-20 15:45",
    tables: 89,
    records: 450000
  },
  {
    id: "3",
    name: "Salesforce CRM",
    type: "crm",
    system: "Salesforce",
    status: "analyzing",
    lastSync: "2024-01-20 16:00",
    tables: 45,
    records: 280000
  }
];

export default function DataSourcesPage() {
  const [sources, setSources] = useState<DataSource[]>(initialSources);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  const handleAddSource = (source: DataSource) => {
    setSources([...sources, source]);
    setIsFormModalOpen(false);
  };

  const handleConfigureSource = (source: DataSource) => {
    setSelectedSource(source);
    setIsConfigModalOpen(true);
  };

  const handlePreviewData = (source: DataSource) => {
    setSelectedSource(source);
    setIsPreviewModalOpen(true);
  };

  const handleBuildWorkflow = (source: DataSource) => {
    setSelectedSource(source);
    setIsWorkflowModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Data Sources</h1>
            <p className="text-gray-400 mt-1">Connect and manage your data sources</p>
          </div>
          <button
            onClick={() => setIsFormModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Data Source
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((source) => (
            <div
              key={source.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <CircleStackIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{source.name}</h3>
                  <p className="text-sm text-gray-400">{source.system}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-1 rounded-full ${
                    source.status === 'connected' ? 'bg-green-500/10 text-green-400' :
                    source.status === 'analyzing' ? 'bg-yellow-500/10 text-yellow-400' :
                    source.status === 'ready' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {source.status}
                  </span>
                </div>

                {source.lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Last Sync</span>
                    <span className="text-gray-300">{source.lastSync}</span>
                  </div>
                )}

                {source.tables && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Tables</span>
                    <span className="text-gray-300">{source.tables}</span>
                  </div>
                )}

                {source.records && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Records</span>
                    <span className="text-gray-300">{source.records.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleConfigureSource(source)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Configure
                </button>
                <button
                  onClick={() => handlePreviewData(source)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleBuildWorkflow(source)}
                  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Build Workflow
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DataSourceFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleAddSource}
      />

      {selectedSource && (
        <>
          <ConnectorConfigModal
            isOpen={isConfigModalOpen}
            onClose={() => {
              setIsConfigModalOpen(false);
              setSelectedSource(null);
            }}
            source={selectedSource}
          />

          <DataPreviewModal
            isOpen={isPreviewModalOpen}
            onClose={() => {
              setIsPreviewModalOpen(false);
              setSelectedSource(null);
            }}
            source={selectedSource}
          />

          <ETLWorkflowBuilder
            isOpen={isWorkflowModalOpen}
            onClose={() => {
              setIsWorkflowModalOpen(false);
              setSelectedSource(null);
            }}
            sourceId={selectedSource.id}
          />
        </>
      )}
    </div>
  );
}