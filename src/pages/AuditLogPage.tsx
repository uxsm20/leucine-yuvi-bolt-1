import { useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  user: string;
  timestamp: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
}

const initialLogs: AuditLog[] = [
  {
    id: "1",
    action: "update",
    entity: "User",
    entityId: "123",
    user: "john.doe@example.com",
    timestamp: "2023-11-15 14:30:00",
    changes: [
      { field: "role", oldValue: "Developer", newValue: "Admin" },
      { field: "status", oldValue: "active", newValue: "inactive" }
    ]
  },
  {
    id: "2",
    action: "create",
    entity: "Company",
    entityId: "456",
    user: "jane.smith@example.com",
    timestamp: "2023-11-15 14:29:00",
    changes: [
      { field: "name", oldValue: "", newValue: "New Company" },
      { field: "industry", oldValue: "", newValue: "Technology" }
    ]
  },
  {
    id: "3",
    action: "delete",
    entity: "Project",
    entityId: "789",
    user: "mike.johnson@example.com",
    timestamp: "2023-11-15 14:28:00",
    changes: []
  }
];

export default function AuditLogPage() {
  const [logs] = useState<AuditLog[]>(initialLogs);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'bg-green-500/10 text-green-400';
      case 'update': return 'bg-yellow-500/10 text-yellow-400';
      case 'delete': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Audit Log</h1>
            <p className="text-gray-400 mt-1">Track system changes and user actions</p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              <ClockIcon className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-700">
            {logs.map((log) => (
              <div key={log.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action.toUpperCase()}
                    </span>
                    <span className="text-white font-medium">{log.entity}</span>
                    <span className="text-gray-400">#{log.entityId}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {log.timestamp}
                  </div>
                </div>

                <div className="text-sm text-gray-400 mb-4">
                  Action performed by <span className="text-white">{log.user}</span>
                </div>

                {log.changes.length > 0 && (
                  <div className="bg-gray-900 rounded-lg p-4">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase">Field</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase">Old Value</th>
                          <th className="text-left text-xs font-medium text-gray-400 uppercase">New Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {log.changes.map((change, index) => (
                          <tr key={index}>
                            <td className="py-2 text-white">{change.field}</td>
                            <td className="py-2 text-red-400">{change.oldValue || '-'}</td>
                            <td className="py-2 text-green-400">{change.newValue || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}