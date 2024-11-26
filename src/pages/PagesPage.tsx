import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  DocumentPlusIcon,
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import CreatePageModal from '../components/pages/CreatePageModal';

interface Section {
  id: number;
  name: string;
  description: string;
  type: 'FORM' | 'TABLE' | 'CHART' | 'CUSTOM';
  sequence: number;
  displayName: string | null;
}

interface Page {
  id: number;
  name: string;
  description: string;
  orderId: number;
  entityName: string | null;
  parentPage: number | null;
  feedback: string | null;
  isMenuPage: boolean;
  pageType: 'LIST' | 'DETAIL' | 'FORM' | 'DASHBOARD';
  readOnlyPage: boolean;
  viewType: 'DEFAULT_VIEW' | 'CUSTOM_VIEW';
  customSecondaryPage: boolean;
  sections: Section[];
  children?: Page[];
}

const mockPages: Page[] = [
  {
    id: 1,
    name: "Equipment Dashboard",
    description: "Main dashboard showing equipment statistics and status",
    orderId: 1,
    entityName: "Equipment",
    parentPage: null,
    feedback: null,
    isMenuPage: true,
    pageType: "DASHBOARD",
    readOnlyPage: true,
    viewType: "DEFAULT_VIEW",
    customSecondaryPage: false,
    sections: [
      {
        id: 1,
        name: "Equipment Status Overview",
        description: "Shows current status of all equipment",
        type: "CHART",
        sequence: 1,
        displayName: "Status Overview"
      },
      {
        id: 2,
        name: "Recent Activities",
        description: "List of recent equipment activities",
        type: "TABLE",
        sequence: 2,
        displayName: "Activities"
      }
    ]
  },
  {
    id: 2,
    name: "Equipment List",
    description: "List of all equipment with filtering and sorting",
    orderId: 2,
    entityName: "Equipment",
    parentPage: null,
    feedback: null,
    isMenuPage: true,
    pageType: "LIST",
    readOnlyPage: false,
    viewType: "DEFAULT_VIEW",
    customSecondaryPage: false,
    sections: [
      {
        id: 3,
        name: "Equipment Table",
        description: "Table showing all equipment",
        type: "TABLE",
        sequence: 1,
        displayName: "Equipment"
      }
    ],
    children: [
      {
        id: 3,
        name: "Equipment Details",
        description: "Detailed view of equipment information",
        orderId: 1,
        entityName: "Equipment",
        parentPage: 2,
        feedback: null,
        isMenuPage: false,
        pageType: "DETAIL",
        readOnlyPage: false,
        viewType: "DEFAULT_VIEW",
        customSecondaryPage: false,
        sections: [
          {
            id: 4,
            name: "Basic Information",
            description: "Basic equipment details",
            type: "FORM",
            sequence: 1,
            displayName: "Details"
          }
        ]
      }
    ]
  }
];

const pageTypeColors = {
  LIST: 'bg-blue-500/10 text-blue-400',
  DETAIL: 'bg-purple-500/10 text-purple-400',
  FORM: 'bg-green-500/10 text-green-400',
  DASHBOARD: 'bg-orange-500/10 text-orange-400'
};

const sectionTypeColors = {
  FORM: 'bg-green-500/10 text-green-400',
  TABLE: 'bg-blue-500/10 text-blue-400',
  CHART: 'bg-purple-500/10 text-purple-400',
  CUSTOM: 'bg-orange-500/10 text-orange-400'
};

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreatePage = (pageData: any) => {
    const newPage: Page = {
      ...pageData,
      id: Math.max(...pages.map(p => p.id)) + 1,
      sections: [],
      children: []
    };
    setPages([...pages, newPage]);
    setIsCreateModalOpen(false);
  };

  const renderPageTree = (pages: Page[], level = 0) => {
    return pages.map((page) => (
      <div key={page.id} style={{ marginLeft: `${level * 1.5}rem` }}>
        <Link
          to={`${page.id}`}
          className="block bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-semibold text-white">{page.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${pageTypeColors[page.pageType]}`}>
                {page.pageType}
              </span>
              {page.isMenuPage && (
                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-medium">
                  Menu Page
                </span>
              )}
            </div>
            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <p className="text-gray-400 mb-4">{page.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Entity</h4>
              <p className="text-white bg-gray-900 px-3 py-2 rounded-lg">
                {page.entityName || 'N/A'}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Sections</h4>
              <p className="text-white bg-gray-900 px-3 py-2 rounded-lg">
                {page.sections.length} sections
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Order: {page.orderId}</span>
            <span>•</span>
            <span>View Type: {page.viewType}</span>
            {page.readOnlyPage && (
              <>
                <span>•</span>
                <span className="text-yellow-400">Read Only</span>
              </>
            )}
          </div>
        </Link>
        {page.children && renderPageTree(page.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Pages</h1>
            <p className="text-gray-400 mt-1">Manage application pages and sections</p>
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <DocumentPlusIcon className="h-5 w-5 mr-2" />
              Import Template
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Page
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {renderPageTree(pages)}
        </div>
      </div>

      <CreatePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePage}
      />
    </div>
  );
}