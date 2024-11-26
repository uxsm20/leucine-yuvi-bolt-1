import { useState } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';

interface ChangeLogEntry {
  id: string;
  version: string;
  date: string;
  type: 'feature' | 'improvement' | 'bugfix';
  title: string;
  description: string;
  details: string[];
}

const initialChanges: ChangeLogEntry[] = [
  {
    id: "1",
    version: "2.1.0",
    date: "2023-11-15",
    type: "feature",
    title: "Multi-Agent Research System",
    description: "Introduced parallel AI research processing capabilities",
    details: [
      "Support for concurrent AI model execution",
      "Enhanced research accuracy through cross-validation",
      "Automated knowledge synthesis from multiple sources",
      "Real-time research adaptation based on context"
    ]
  },
  {
    id: "2",
    version: "2.0.1",
    date: "2023-11-10",
    type: "improvement",
    title: "Performance Optimization",
    description: "Significant improvements to system performance and resource utilization",
    details: [
      "Reduced API response times by 40%",
      "Optimized database queries for better scalability",
      "Improved caching mechanisms",
      "Enhanced memory management"
    ]
  },
  {
    id: "3",
    version: "2.0.0",
    date: "2023-11-01",
    type: "bugfix",
    title: "Critical Security Updates",
    description: "Addressed several security vulnerabilities and improved system stability",
    details: [
      "Fixed authentication bypass vulnerability",
      "Updated dependency versions",
      "Improved error handling",
      "Enhanced logging mechanisms"
    ]
  }
];

export default function ChangeLogPage() {
  const [changes] = useState<ChangeLogEntry[]>(initialChanges);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature': return 'bg-green-500/10 text-green-400';
      case 'improvement': return 'bg-blue-500/10 text-blue-400';
      case 'bugfix': return 'bg-red-500/10 text-red-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Change Log</h1>
            <p className="text-gray-400 mt-1">Track system updates and improvements</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            <DocumentDuplicateIcon className="h-5 w-5 mr-2" />
            Subscribe
          </button>
        </div>

        <div className="space-y-6">
          {changes.map((change) => (
            <div key={change.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-white">{change.version}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(change.type)}`}>
                    {change.type.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-400">{change.date}</span>
              </div>

              <h2 className="text-lg font-medium text-white mb-2">{change.title}</h2>
              <p className="text-gray-400 mb-4">{change.description}</p>

              <div className="bg-gray-900 rounded-lg p-4">
                <ul className="space-y-2">
                  {change.details.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}