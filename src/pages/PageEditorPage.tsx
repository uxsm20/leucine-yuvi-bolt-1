import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  PlusIcon, 
  ArrowPathIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Page, Section } from '../types/page';
import SectionEditor from '../components/SectionEditor';
import PageSettingsModal from '../components/pages/PageSettingsModal';

const sectionTypeColors = {
  FORM: 'bg-green-500/10 text-green-400',
  TABLE: 'bg-blue-500/10 text-blue-400',
  CHART: 'bg-purple-500/10 text-purple-400',
  CUSTOM: 'bg-orange-500/10 text-orange-400'
};

const sectionSizes = {
  'col-12': 'Full Width',
  'col-6': 'Half Width',
  'col-4': 'One Third',
  'col-3': 'One Quarter'
};

export default function PageEditorPage() {
  const { pageId } = useParams();
  const [page, setPage] = useState<Page>({
    id: 1,
    applicationId: 1,
    name: "Equipment Dashboard",
    slug: "equipment-dashboard",
    description: "Main dashboard showing equipment statistics and status",
    orderId: 1,
    entityName: "Equipment",
    parentPage: null,
    feedback: null,
    isMenuPage: true,
    pageType: "DASHBOARD",
    readOnlyPage: false,
    viewType: "DEFAULT_VIEW",
    customSecondaryPage: false,
    sections: [
      {
        id: 1,
        name: "Equipment Status Overview",
        description: "Shows current status of all equipment",
        type: "CHART",
        sequence: 1,
        pageId: 1,
        applicationId: 1,
        htmlContent: null,
        size: "col-12",
        helpText: "View equipment status distribution",
        sectionSize: "col-12",
        displayName: "Status Overview",
        isVisible: true,
        isEditable: true,
        isRequired: true,
        validations: [],
        permissions: []
      }
    ],
    permissions: [],
    breadcrumbs: [],
    layout: {
      type: 'fluid',
      maxWidth: '7xl',
      padding: '8'
    },
    theme: {
      backgroundColor: 'gray-900',
      textColor: 'white',
      borderColor: 'gray-700'
    },
    metadata: {
      title: 'Equipment Dashboard',
      description: 'View and manage equipment status',
      keywords: ['equipment', 'dashboard', 'status']
    }
  });

  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSectionUpdate = (updatedSection: Section) => {
    setPage({
      ...page,
      sections: page.sections.map(s => 
        s.id === updatedSection.id ? updatedSection : s
      )
    });
    setIsEditorOpen(false);
    setSelectedSection(null);
  };

  const handleSectionDelete = (sectionId: number) => {
    setPage({
      ...page,
      sections: page.sections.filter(s => s.id !== sectionId)
    });
  };

  const handleSectionReorder = (dragIndex: number, dropIndex: number) => {
    const newSections = [...page.sections];
    const [draggedSection] = newSections.splice(dragIndex, 1);
    newSections.splice(dropIndex, 0, draggedSection);
    
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      sequence: index + 1
    }));

    setPage({ ...page, sections: updatedSections });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    handleSectionReorder(result.source.index, result.destination.index);
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: Math.max(...page.sections.map(s => s.id)) + 1,
      name: "New Section",
      description: "",
      type: "CUSTOM",
      sequence: page.sections.length + 1,
      pageId: page.id,
      applicationId: page.applicationId,
      htmlContent: null,
      size: "col-12",
      helpText: null,
      sectionSize: "col-12",
      displayName: null,
      isVisible: true,
      isEditable: true,
      isRequired: false,
      validations: [],
      permissions: []
    };
    setSelectedSection(newSection);
    setIsEditorOpen(true);
  };

  const handlePageSettingsUpdate = (updatedPage: Partial<Page>) => {
    setPage({ ...page, ...updatedPage });
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">{page.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${
                page.pageType === 'DASHBOARD' ? 'bg-blue-500/10 text-blue-400' :
                page.pageType === 'FORM' ? 'bg-green-500/10 text-green-400' :
                page.pageType === 'LIST' ? 'bg-purple-500/10 text-purple-400' :
                'bg-orange-500/10 text-orange-400'
              }`}>
                {page.pageType}
              </span>
            </div>
            <p className="text-gray-400 mt-1">{page.description}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <EyeIcon className="h-5 w-5 mr-2" />
              {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Page Settings
            </button>
            <button
              onClick={handleAddSection}
              className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Section
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-6"
              >
                {page.sections.map((section, index) => (
                  <Draggable 
                    key={section.id} 
                    draggableId={section.id.toString()} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${section.size}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div {...provided.dragHandleProps}>
                              <ArrowsUpDownIcon className="h-5 w-5 text-gray-400 cursor-move" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {section.displayName || section.name}
                              </h3>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sectionTypeColors[section.type]}`}>
                                  {section.type}
                                </span>
                                <span className="text-sm text-gray-400">
                                  {sectionSizes[section.size as keyof typeof sectionSizes]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const newSection = { ...section };
                                setSelectedSection(newSection);
                                setIsEditorOpen(true);
                              }}
                              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                            >
                              <DocumentDuplicateIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleSectionDelete(section.id)}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-gray-700"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-400">{section.description}</p>

                        {section.helpText && (
                          <div className="mt-4 bg-gray-900 rounded-lg p-4">
                            <p className="text-sm text-gray-300">{section.helpText}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {selectedSection && (
        <SectionEditor
          section={selectedSection}
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setSelectedSection(null);
          }}
          onSave={handleSectionUpdate}
        />
      )}

      <PageSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        page={page}
        onSave={handlePageSettingsUpdate}
      />
    </div>
  );
}