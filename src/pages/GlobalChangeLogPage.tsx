import { useState } from 'react';
import { 
  DocumentTextIcon, 
  DocumentArrowDownIcon,
  BellIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface ChangeLogEntry {
  id: string;
  version: string;
  date: string;
  type: 'feature' | 'improvement' | 'bugfix';
  title: string;
  description: string;
  changes: {
    category: 'new' | 'update' | 'fix';
    items: string[];
  }[];
}

const mockChangeLogs: ChangeLogEntry[] = [
  {
    id: '1',
    version: 'v1.19.0',
    date: '06 August, 2024',
    type: 'feature',
    title: 'Aion Release',
    description: 'Major feature release with new UI components and workflow improvements',
    changes: [
      {
        category: 'new',
        items: [
          'public/apps/gallery/album.html',
          'public/apps/gallery/gallery-column.html',
          'public/apps/gallery/gallery-grid.html',
          'public/apps/gallery/grid-with-title.html',
          'public/apps/gallery/gallery-masonry.html',
          'public/apps/gallery/gallery-slider.html'
        ]
      },
      {
        category: 'update',
        items: [
          'Change Friday and Saturday\'s holidays to Saturday and Sunday in the calendar'
        ]
      },
      {
        category: 'fix',
        items: [
          'Fix Query parameter removal issue',
          'Advance table tooltip',
          'Other minor issues'
        ]
      }
    ]
  },
  {
    id: '2',
    version: 'v1.18.1',
    date: '30 June, 2024',
    type: 'bugfix',
    title: 'Hera Release',
    description: 'Bug fixes and performance improvements',
    changes: [
      {
        category: 'update',
        items: [
          'Removed polyfill.io'
        ]
      }
    ]
  }
];

const typeColors = {
  feature: 'bg-green-500/10 text-green-400',
  improvement: 'bg-blue-500/10 text-blue-400',
  bugfix: 'bg-red-500/10 text-red-400'
};

const categoryIcons = {
  new: TagIcon,
  update: DocumentTextIcon,
  fix: DocumentArrowDownIcon
};

export default function GlobalChangeLogPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredLogs = selectedType 
    ? mockChangeLogs.filter(log => log.type === selectedType)
    : mockChangeLogs;

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Change Log</h1>
            <p className="text-gray-400 mt-1">Track system updates and improvements</p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              <BellIcon className="h-5 w-5 mr-2" />
              Subscribe
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-8">
          {['feature', 'improvement', 'bugfix'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? null : type)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedType === type
                  ? typeColors[type as keyof typeof typeColors]
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {type}s
            </button>
          ))}
        </div>

        {/* Change Log List */}
        <div className="space-y-8">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <h2 className="text-xl font-bold text-white">{log.version}</h2>
                    <span className={`px-3 py-1 rounded-full text-sm ${typeColors[log.type]}`}>
                      {log.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-medium text-white">{log.title}</h3>
                    <span className="text-sm text-gray-400">{log.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{log.description}</p>

              <div className="space-y-6">
                {log.changes.map((change, index) => {
                  const Icon = categoryIcons[change.category];
                  return (
                    <div key={index}>
                      <h4 className="text-sm font-medium text-gray-300 capitalize mb-3">
                        {change.category}
                      </h4>
                      <div className="space-y-2">
                        {change.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-start space-x-3 text-gray-300"
                          >
                            <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}