import { useState } from 'react';
import { CommandLineIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ApiLog {
  id: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  status: number;
  duration: number;
  timestamp: string;
  user: string;
  request: string;
  response: string;
}

const initialLogs: ApiLog[] = [
  {
    id: "1",
    endpoint: "/api/users",
    method: "GET",
    status: 200,
    duration: 123,
    timestamp: "2023-11-15 14:30:00",
    user: "john.doe@example.com",
    request: '{"page": 1, "limit": 10}',
    response: '{"users": [], "total": 0}'
  },
  {
    id: "2",
    endpoint: "/api/companies",
    method: "POST",
    status: 201,
    duration: 245,
    timestamp: "2023-11-15 14:29:00",
    user: "jane.smith@example.com",
    request: '{"name": "New Company", "industry": "Tech"}',
    response: '{"id": "123", "name": "New Company"}'
  },
  {
    id: "3",
    endpoint: "/api/projects/123",
    method: "PUT",
    status: 400,
    duration: 89,
    timestamp: "2023-11-15 14:28:00",
    user: "mike.johnson@example.com",
    request: '{"status": "invalid"}',
    response: '{"error": "Invalid status value"}'
  }
];

export default function ApiLogsPage() {
  const [logs] = useState<ApiLog[]>(initialLogs);
  const [selectedLog, setSelectedLog] = useState<ApiLog | null>(null);

  const getStatusColor = (status: number) => {
    if (status < 300) return 'bg-green-500/10 text-green-400';
    if (status < 400) return 'bg-yellow-500/10 text-yellow-400';
    return 'bg-red-500/10 text-red-400';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-500/10 text-blue-400';
      case 'POST': return 'bg-green-500/10 text-green-400';
      case 'PUT': return 'bg-yellow-500/10 text-yellow-400';
      case 'DELETE': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">API Logs</h1>
            <p className="text-gray-400 mt-1">Monitor API requests and responses</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-lg font-medium text-white">Recent Requests</h2>
            </div>
            <div className="divide-y divide-gray-700">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedLog?.id === log.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setSelectedLog(log)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(log.method)}`}>
                        {log.method}
                      </span>
                      <span className="text-white">{log.endpoint}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{log.user}</span>
                    <span>{log.duration}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700">
            {selectedLog ? (
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Request Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Request</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-indigo-400">{JSON.stringify(JSON.parse(selectedLog.request), null, 2)}</code>
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Response</h4>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <code className="text-indigo-400">{JSON.stringify(JSON.parse(selectedLog.response), null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex items-center justify-center h-full">
                <p className="text-gray-400">Select a request to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}