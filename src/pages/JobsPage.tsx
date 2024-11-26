import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import JobsTable from '../components/data/JobsTable';
import JobLogs from '../components/data/JobLogs';

interface Job {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  startTime: string;
  endTime?: string;
  progress?: number;
  error?: string;
}

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, any>;
}

// Mock jobs data
const mockJobs: Job[] = [
  {
    id: '1',
    name: 'SAP Data Import',
    type: 'ETL',
    status: 'running',
    startTime: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'LIMS Data Sync',
    type: 'Sync',
    status: 'completed',
    startTime: '2024-01-20T14:00:00Z',
    endTime: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    name: 'Sales Data Transform',
    type: 'Transform',
    status: 'failed',
    startTime: '2024-01-20T13:45:00Z',
    endTime: '2024-01-20T13:50:00Z',
    error: 'Invalid data format'
  }
];

// Mock logs data
const mockLogs: Record<string, LogEntry[]> = {
  '1': [
    {
      timestamp: '2024-01-20T14:30:00Z',
      level: 'info',
      message: 'Starting SAP data import'
    },
    {
      timestamp: '2024-01-20T14:30:01Z',
      level: 'info',
      message: 'Connected to SAP system'
    },
    {
      timestamp: '2024-01-20T14:30:02Z',
      level: 'warning',
      message: 'Slow network connection detected',
      details: { latency: '500ms' }
    }
  ],
  '2': [
    {
      timestamp: '2024-01-20T14:00:00Z',
      level: 'info',
      message: 'Starting LIMS sync'
    },
    {
      timestamp: '2024-01-20T14:15:00Z',
      level: 'info',
      message: 'Sync completed successfully',
      details: { records: 1500 }
    }
  ],
  '3': [
    {
      timestamp: '2024-01-20T13:45:00Z',
      level: 'info',
      message: 'Starting sales data transformation'
    },
    {
      timestamp: '2024-01-20T13:50:00Z',
      level: 'error',
      message: 'Transform failed: Invalid data format',
      details: { error: 'Column "price" contains non-numeric values' }
    }
  ]
};

export default function JobsPage() {
  const [jobs] = useState<Job[]>(mockJobs);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  const handleViewLogs = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsLogsModalOpen(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Jobs</h1>
            <p className="text-gray-400 mt-1">Monitor and manage data processing jobs</p>
          </div>
        </div>

        <JobsTable jobs={jobs} onViewLogs={handleViewLogs} />
      </div>

      <Transition appear show={isLogsModalOpen} as={React.Fragment}>
        <Dialog 
          as="div" 
          className="relative z-10" 
          onClose={() => setIsLogsModalOpen(false)}
        >
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
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Job Logs
                      </h3>
                      <p className="text-sm text-gray-400">
                        {jobs.find(j => j.id === selectedJobId)?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLogsModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </Dialog.Title>

                  {selectedJobId && (
                    <JobLogs 
                      jobId={selectedJobId} 
                      logs={mockLogs[selectedJobId]} 
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}