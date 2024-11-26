import { useState } from 'react';
import { 
  DocumentTextIcon, 
  BuildingOfficeIcon, 
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

interface AuditEvent {
  id: string;
  type: 'system' | 'form' | 'company' | 'workflow';
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  user: {
    name: string;
    company: string;
  };
  timestamp: string;
  status: 'validated' | 'pending_review';
}

const mockEvents: AuditEvent[] = [
  {
    id: '1',
    type: 'system',
    severity: 'critical',
    title: 'Role Permission Updated',
    description: "Modified permissions for 'Department Manager' role",
    user: {
      name: 'John Doe',
      company: 'Acme Corp'
    },
    timestamp: '2 mins ago',
    status: 'validated'
  },
  {
    id: '2',
    type: 'form',
    severity: 'major',
    title: 'Form Submission',
    description: 'Employee Onboarding Form submitted for review',
    user: {
      name: 'Sarah Wilson',
      company: 'TechCorp'
    },
    timestamp: '15 mins ago',
    status: 'validated'
  },
  {
    id: '3',
    type: 'company',
    severity: 'major',
    title: 'Department Created',
    description: "New department 'Quality Assurance' created",
    user: {
      name: 'Mike Johnson',
      company: 'Acme Corp'
    },
    timestamp: '1 hour ago',
    status: 'pending_review'
  }
];

const eventTypeIcons = {
  system: DocumentTextIcon,
  form: ClipboardDocumentListIcon,
  company: BuildingOfficeIcon,
  workflow: ArrowPathIcon
};

const severityColors = {
  critical: 'bg-red-500/10 text-red-400',
  major: 'bg-orange-500/10 text-orange-400',
  minor: 'bg-blue-500/10 text-blue-400'
};

const statusColors = {
  validated: 'bg-green-500/10 text-green-400',
  pending_review: 'bg-yellow-500/10 text-yellow-400'
};

export default function GlobalAuditLogPage() {
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(['system', 'form', 'company', 'workflow']));
  const [dateRange, setDateRange] = useState('7');

  const toggleEventType = (type: string) => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  const filteredEvents = mockEvents.filter(event => selectedTypes.has(event.type));

  const stats = {
    system: mockEvents.filter(e => e.type === 'system').length,
    form: mockEvents.filter(e => e.type === 'form').length,
    critical: mockEvents.filter(e => e.severity === 'critical').length,
    pending: mockEvents.filter(e => e.status === 'pending_review').length
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Audit Log</h1>
            <p className="text-gray-400 mt-1">Track and monitor system activities</p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <DocumentChartBarIcon className="h-5 w-5 mr-2" />
              Generate Report
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">System Changes</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.system}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Form Activities</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.form}</p>
              </div>
              <ClipboardDocumentListIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Critical Changes</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.critical}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Validation</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.pending}</p>
              </div>
              <FunnelIcon className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
              <div className="flex items-center space-x-2">
                {Object.entries(eventTypeIcons).map(([type, Icon]) => (
                  <button
                    key={type}
                    onClick={() => toggleEventType(type)}
                    className={`px-3 py-2 rounded-lg flex items-center space-x-2 ${
                      selectedTypes.has(type)
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const Icon = eventTypeIcons[event.type];
            return (
              <div key={event.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${severityColors[event.severity]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">{event.title}</h3>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[event.status]}`}>
                      {event.status === 'validated' ? 'Validated' : 'Pending Review'}
                    </span>
                    <span className="text-sm text-gray-400">{event.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{event.user.name}</span>
                  <span>•</span>
                  <span>{event.user.company}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}