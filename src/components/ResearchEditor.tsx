import { useState } from 'react';
import { CheckIcon, PencilIcon } from '@heroicons/react/24/outline';

interface ResearchSection {
  id: string;
  title: string;
  content: string;
}

const initialSections: ResearchSection[] = [
  {
    id: '1',
    title: 'Overview',
    content: 'A comprehensive clinical trial management system designed to streamline the process of planning, conducting, and analyzing clinical trials while ensuring compliance with regulatory requirements.'
  },
  {
    id: '2',
    title: 'Core Features',
    content: 'The system will include trial setup, patient enrollment, data collection, monitoring, and reporting capabilities. It will support multiple trial types and phases while maintaining data integrity and security.'
  },
  {
    id: '3',
    title: 'Technical Requirements',
    content: 'The application requires a scalable architecture with real-time data synchronization, role-based access control, and compliance with healthcare data protection standards including HIPAA and GDPR.'
  }
];

export default function ResearchEditor() {
  const [sections, setSections] = useState<ResearchSection[]>(initialSections);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleEdit = (section: ResearchSection) => {
    setEditingId(section.id);
    setEditContent(section.content);
  };

  const handleSave = (id: string) => {
    setSections(sections.map(section => 
      section.id === id 
        ? { ...section, content: editContent }
        : section
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {sections.map(section => (
        <div 
          key={section.id}
          className="bg-gray-900 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">{section.title}</h3>
            {editingId !== section.id ? (
              <button
                onClick={() => handleEdit(section)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => handleSave(section.id)}
                className="p-1 text-green-400 hover:text-green-300 transition-colors"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {editingId === section.id ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          ) : (
            <p className="text-gray-300">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}