import React from 'react';
import { format } from 'date-fns';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, any>;
}

interface JobLogsProps {
  jobId: string;
  logs: LogEntry[];
}

const logLevelColors = {
  info: 'text-blue-400',
  warning: 'text-yellow-400',
  error: 'text-red-400'
};

export default function JobLogs({ jobId, logs }: JobLogsProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="flex">
            <span className="text-gray-500 mr-4">
              {format(new Date(log.timestamp), 'HH:mm:ss.SSS')}
            </span>
            <span className={`${logLevelColors[log.level]} uppercase mr-4 w-16`}>
              {log.level}
            </span>
            <span className="text-gray-300">{log.message}</span>
            {log.details && (
              <pre className="mt-1 text-gray-400 overflow-x-auto">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}