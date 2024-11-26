import { useState } from 'react';
import { ShieldCheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import CreateRoleModal from '../components/CreateRoleModal';
import EditRoleModal from '../components/EditRoleModal';

interface Permission {
  id: string;
  name: string;
  description: string;
  entityId: string;
  actionType: 'create' | 'read' | 'update' | 'delete';
  pageId?: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  applicationId: string;
}

interface Page {
  id: string;
  name: string;
  applicationId: string;
  requiredPermissions: string[];
}

interface Application {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

// Mock data
const mockApplications: Application[] = [
  { id: "1", name: "Clinical Trial Management" },
  { id: "2", name: "Drug Safety Platform" }
];

const mockEntities: Entity[] = [
  {
    id: "e1",
    name: "Clinical Trial",
    description: "Clinical trial entity",
    applicationId: "1"
  },
  {
    id: "e2",
    name: "Patient",
    description: "Patient entity",
    applicationId: "1"
  }
];

const mockPages: Page[] = [
  {
    id: "p1",
    name: "Trial Dashboard",
    applicationId: "1",
    requiredPermissions: ["view_trial"]
  },
  {
    id: "p2",
    name: "Patient List",
    applicationId: "1",
    requiredPermissions: ["view_patients"]
  }
];

const mockPermissions: Permission[] = [
  {
    id: "perm1",
    name: "Create Trial",
    description: "Create new clinical trials",
    entityId: "e1",
    actionType: "create"
  },
  {
    id: "perm2",
    name: "View Trial",
    description: "View clinical trials",
    entityId: "e1",
    actionType: "read"
  },
  {
    id: "perm3",
    name: "View Patients",
    description: "View patient list",
    entityId: "e2",
    actionType: "read"
  }
];

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    permissions: ["perm1", "perm2", "perm3"],
    usersCount: 5
  },
  {
    id: "2",
    name: "Clinical Manager",
    description: "Manage clinical trials",
    permissions: ["perm2"],
    usersCount: 12
  }
];

export default function RoleManagementPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleCreateRole = (newRole: { name: string; description: string; permissions: string[] }) => {
    const role: Role = {
      id: String(roles.length + 1),
      ...newRole,
      usersCount: 0
    };
    setRoles([...roles, role]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles(roles.map(role => 
      role.id === updatedRole.id ? updatedRole : role
    ));
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const getPermissionNames = (permissionIds: string[]) => {
    return permissionIds
      .map(id => mockPermissions.find(p => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Role Management</h1>
            <p className="text-gray-400 mt-1">Manage roles and their permissions</p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            Create Role
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{role.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                </div>
                <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-sm rounded-full">
                  {role.usersCount} users
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Permissions</h4>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-300">
                    {getPermissionNames(role.permissions)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleEditClick(role)}
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <PencilIcon className="h-5 w-5 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="inline-flex items-center text-red-400 hover:text-red-300 transition-colors"
                >
                  <TrashIcon className="h-5 w-5 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRole}
        applications={mockApplications}
        entities={mockEntities}
        permissions={mockPermissions}
        pages={mockPages}
      />

      {selectedRole && (
        <EditRoleModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedRole(null);
          }}
          onSubmit={handleUpdateRole}
          role={selectedRole}
          applications={mockApplications}
          entities={mockEntities}
          permissions={mockPermissions}
          pages={mockPages}
        />
      )}
    </div>
  );
}