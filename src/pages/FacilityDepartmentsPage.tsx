import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  UserGroupIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import DepartmentFormModal from '../components/facilities/DepartmentFormModal';

interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  managerId: number | null;
  managerName: string | null;
  employeeCount: number;
  createdAt: string;
}

interface Facility {
  id: number;
  name: string;
  code: string;
}

const mockFacility: Facility = {
  id: 1,
  name: "Main Manufacturing Plant",
  code: "MMP-001"
};

const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Quality Control",
    code: "QC",
    description: "Ensures product quality standards",
    managerId: 101,
    managerName: "John Doe",
    employeeCount: 15,
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Production",
    code: "PROD",
    description: "Manages manufacturing processes",
    managerId: 102,
    managerName: "Jane Smith",
    employeeCount: 50,
    createdAt: "2024-01-15T10:00:00Z"
  }
];

export default function FacilityDepartmentsPage() {
  const { facilityId } = useParams<{ facilityId: string }>();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDepartment = (department: Omit<Department, 'id' | 'employeeCount' | 'createdAt'>) => {
    const newDepartment: Department = {
      ...department,
      id: departments.length + 1,
      employeeCount: 0,
      createdAt: new Date().toISOString()
    };
    setDepartments([...departments, newDepartment]);
    setIsModalOpen(false);
  };

  const handleUpdateDepartment = (updatedDepartment: Department) => {
    setDepartments(departments.map(d => 
      d.id === updatedDepartment.id ? updatedDepartment : d
    ));
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartments(departments.filter(d => d.id !== departmentId));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <BuildingOfficeIcon className="h-6 w-6 text-indigo-400" />
              <h1 className="text-3xl font-bold text-white">{mockFacility.name}</h1>
            </div>
            <p className="text-gray-400">Manage departments for this facility</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Department
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="h-6 w-6 text-indigo-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{department.name}</h3>
                    <p className="text-sm text-gray-400">{department.code}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedDepartment(department);
                      setIsModalOpen(true);
                    }}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{department.description}</p>

              <div className="space-y-4">
                {department.managerName && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Manager</h4>
                    <p className="text-gray-400">{department.managerName}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-sm text-indigo-400">
                    {department.employeeCount} Employees
                  </span>
                  <span className="text-sm text-gray-400">
                    {new Date(department.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DepartmentFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDepartment(null);
        }}
        onSubmit={selectedDepartment ? handleUpdateDepartment : handleCreateDepartment}
        department={selectedDepartment}
      />
    </div>
  );
}