import { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import AddUserModal from '../components/AddUserModal';
import { useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  status: 'active' | 'inactive';
  facility: string;
  department: string;
  lastLogin: string;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    employeeId: "EMP001",
    role: "Admin",
    status: "active",
    facility: "Main Hospital",
    department: "Cardiology",
    lastLogin: "2023-11-15 14:30"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    employeeId: "EMP002",
    role: "Developer",
    status: "active",
    facility: "Research Center",
    department: "Clinical Trials",
    lastLogin: "2023-11-15 12:45"
  }
];

const roles = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Developer" },
  { id: "3", name: "Viewer" }
];

const facilities = [
  {
    id: "1",
    name: "Main Hospital",
    departments: [
      { id: "1", name: "Cardiology" },
      { id: "2", name: "Neurology" },
      { id: "3", name: "Oncology" }
    ]
  },
  {
    id: "2",
    name: "Research Center",
    departments: [
      { id: "4", name: "Clinical Trials" },
      { id: "5", name: "Drug Development" },
      { id: "6", name: "Data Analysis" }
    ]
  }
];

export default function UserManagementPage() {
  const { companyId } = useParams<{ companyId: string }>();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (userData: {
    name: string;
    email: string;
    employeeId: string;
    roleId: string;
    status: 'active' | 'inactive';
    facilityId: string;
    departmentId: string;
  }) => {
    const selectedRole = roles.find(r => r.id === userData.roleId);
    const selectedFacility = facilities.find(f => f.id === userData.facilityId);
    const selectedDepartment = selectedFacility?.departments.find(d => d.id === userData.departmentId);

    const newUser: User = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      employeeId: userData.employeeId,
      role: selectedRole?.name || '',
      status: userData.status,
      facility: selectedFacility?.name || '',
      department: selectedDepartment?.name || '',
      lastLogin: '-'
    };

    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Manage user access and permissions</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-500/10 text-indigo-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.facility}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-4">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUser}
        roles={roles}
        facilities={facilities}
      />
    </div>
  );
}