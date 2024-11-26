import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  BuildingOfficeIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  DocumentPlusIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import AssignApplicationModal from '../components/facilities/AssignApplicationModal';
import FacilityFormModal from '../components/facilities/FacilityFormModal';

interface Application {
  id: number;
  name: string;
  formNumber?: string;
  metadata?: Record<string, string>;
}

interface Facility {
  id: number;
  name: string;
  code: string;
  address: string;
  timezone: string;
  applications: Application[];
  departmentsCount: number;
  createdAt: string;
}

const mockFacilities: Facility[] = [
  {
    id: 1,
    name: "Main Manufacturing Plant",
    code: "MMP-001",
    address: "123 Industrial Ave, Boston, MA",
    timezone: "America/New_York",
    applications: [
      { id: 1, name: "Equipment Management", formNumber: "EQ-001" },
      { id: 2, name: "Quality Control", formNumber: "QC-002" }
    ],
    departmentsCount: 5,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Research & Development Center",
    code: "RND-001",
    address: "456 Innovation Pkwy, Cambridge, MA",
    timezone: "America/New_York",
    applications: [
      { id: 3, name: "Lab Management", formNumber: "LM-001" }
    ],
    departmentsCount: 3,
    createdAt: "2024-01-16T10:00:00Z"
  }
];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignAppModalOpen, setIsAssignAppModalOpen] = useState(false);

  const handleCreateFacility = (facility: Omit<Facility, 'id' | 'applications' | 'departmentsCount' | 'createdAt'>) => {
    const newFacility: Facility = {
      ...facility,
      id: facilities.length + 1,
      applications: [],
      departmentsCount: 0,
      createdAt: new Date().toISOString()
    };
    setFacilities([...facilities, newFacility]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateFacility = (updatedFacility: Facility) => {
    setFacilities(facilities.map(f => 
      f.id === updatedFacility.id ? updatedFacility : f
    ));
    setIsEditModalOpen(false);
    setSelectedFacility(null);
  };

  const handleDeleteFacility = (facilityId: number) => {
    setFacilities(facilities.filter(f => f.id !== facilityId));
  };

  const handleAssignApplication = (application: Application) => {
    if (!selectedFacility) return;

    const updatedFacility = {
      ...selectedFacility,
      applications: [...selectedFacility.applications, application]
    };

    setFacilities(facilities.map(f => 
      f.id === selectedFacility.id ? updatedFacility : f
    ));
    setIsAssignAppModalOpen(false);
    setSelectedFacility(null);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Facilities</h1>
            <p className="text-gray-400 mt-1">Manage your organization's facilities</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Facility
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <BuildingOfficeIcon className="h-6 w-6 text-indigo-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{facility.name}</h3>
                    <p className="text-sm text-gray-400">{facility.code}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedFacility(facility);
                      setIsEditModalOpen(true);
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteFacility(facility.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Address</h4>
                  <p className="text-gray-400">{facility.address}</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-300">Applications</h4>
                    <button
                      onClick={() => {
                        setSelectedFacility(facility);
                        setIsAssignAppModalOpen(true);
                      }}
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <DocumentPlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {facility.applications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-gray-900 px-3 py-2 rounded-lg flex justify-between items-center"
                      >
                        <span className="text-gray-300">{app.name}</span>
                        {app.formNumber && (
                          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-full">
                            {app.formNumber}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                  <Link
                    to={`/facilities/${facility.id}/departments`}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
                  >
                    View {facility.departmentsCount} Departments
                  </Link>
                  <span className="text-sm text-gray-400">
                    {new Date(facility.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Facility Modal */}
      <FacilityFormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedFacility(null);
        }}
        onSubmit={isCreateModalOpen ? handleCreateFacility : handleUpdateFacility}
        facility={selectedFacility}
      />

      {/* Assign Application Modal */}
      {selectedFacility && (
        <AssignApplicationModal
          isOpen={isAssignAppModalOpen}
          onClose={() => {
            setIsAssignAppModalOpen(false);
            setSelectedFacility(null);
          }}
          onSubmit={handleAssignApplication}
          existingApplications={selectedFacility.applications}
        />
      )}
    </div>
  );
}