import React from 'react';
import { format } from 'date-fns';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

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

interface JobsTableProps {
  jobs: Job[];
  onViewLogs: (jobId: string) => void;
}

const statusColors = {
  running: 'text-blue-400',
  completed: 'text-green-400',
  failed: 'text-red-400',
  pending: 'text-yellow-400'
};

const statusIcons = {
  running: ArrowPathIcon,
  completed: CheckCircleIcon,
  failed: XCircleIcon,
  pending: ClockIcon
};

export default function JobsTable({ jobs, onViewLogs }: JobsTableProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Job
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Started
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Duration
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {jobs.map((job) => {
            const StatusIcon = statusIcons[job.status];
            const duration = job.endTime 
              ? new Date(job.endTime).getTime() - new Date(job.startTime).getTime()
              : new Date().getTime() - new Date(job.startTime).getTime();

            return (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{job.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{job.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <StatusIcon 
                      className={`h-5 w-5 mr-2 ${statusColors[job.status]} ${
                        job.status === 'running' ? 'animate-spin' : ''
                      }`} 
                    />
                    <span className={`text-sm ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {format(new Date(job.startTime), 'MMM d, yyyy HH:mm:ss')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {Math.floor(duration / 1000)}s
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewLogs(job.id)}
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    View Logs
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}