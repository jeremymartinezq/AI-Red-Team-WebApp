import React, { useState } from 'react';
import {
  UserPlusIcon,
  TrashIcon,
  PencilIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'auditor' | 'viewer';
  status: 'active' | 'inactive';
  lastActive: string;
  dateCreated: string;
}

const UserManagement: React.FC = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const users: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-03-15 10:23 AM',
      dateCreated: '2023-10-01',
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'operator',
      status: 'active',
      lastActive: '2024-03-14 09:15 AM',
      dateCreated: '2023-11-12',
    },
    {
      id: '3',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'auditor',
      status: 'active',
      lastActive: '2024-03-12 02:45 PM',
      dateCreated: '2023-12-05',
    },
    {
      id: '4',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'viewer',
      status: 'inactive',
      lastActive: '2024-02-28 11:32 AM',
      dateCreated: '2024-01-10',
    },
    {
      id: '5',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'operator',
      status: 'active',
      lastActive: '2024-03-15 08:50 AM',
      dateCreated: '2024-02-15',
    },
  ];

  const roleColors = {
    admin: 'bg-purple-900 text-purple-200',
    operator: 'bg-blue-900 text-blue-200',
    auditor: 'bg-green-900 text-green-200',
    viewer: 'bg-gray-700 text-gray-200',
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
    setEditingUser(null);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowAddUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real application, this would call an API to delete the user
    console.log(`Delete user with ID: ${userId}`);
  };

  const filteredUsers = users.filter((user) => {
    // Apply search filter
    const matchesSearch =
      searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply role filter
    const matchesRole = filterRole === 'all' || user.role === filterRole;

    // Apply status filter
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <button
          onClick={handleAddUser}
          className="flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <UserPlusIcon className="mr-2 h-5 w-5" />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg bg-dark-800 p-4 md:flex-row">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-0 bg-dark-700 py-1.5 pl-10 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-primary-500 sm:text-sm"
            placeholder="Search users..."
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative inline-block text-left">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="block w-full rounded-md border-0 bg-dark-700 py-1.5 pl-3 pr-10 text-white shadow-sm focus:ring-1 focus:ring-primary-500 sm:text-sm"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="auditor">Auditor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="relative inline-block text-left">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-full rounded-md border-0 bg-dark-700 py-1.5 pl-3 pr-10 text-white shadow-sm focus:ring-1 focus:ring-primary-500 sm:text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-lg bg-dark-800 shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Name / Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Date Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-dark-700">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-dark-600 text-white">
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        roleColors[user.role as keyof typeof roleColors]
                      }`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      {user.status === 'active' ? (
                        <>
                          <div className="mr-1.5 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-300">Active</span>
                        </>
                      ) : (
                        <>
                          <div className="mr-1.5 h-2.5 w-2.5 rounded-full bg-gray-500"></div>
                          <span className="text-sm text-gray-400">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {user.lastActive}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {user.dateCreated}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="mr-2 rounded-md bg-dark-700 p-2 text-primary-400 hover:bg-dark-600 hover:text-primary-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded-md bg-dark-700 p-2 text-red-400 hover:bg-dark-600 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">{filteredUsers.length}</span> of{' '}
              <span className="font-medium text-white">{users.length}</span> users
            </div>
            <div className="flex space-x-2">
              <button className="rounded-md border border-dark-600 bg-dark-700 px-3 py-1 text-sm text-gray-300 hover:bg-dark-600 hover:text-white">
                Previous
              </button>
              <button className="rounded-md bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setShowAddUserModal(false)}
          ></div>
          <div className="relative z-10 w-full max-w-md rounded-lg bg-dark-800 p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-medium text-white">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  defaultValue={editingUser?.name || ''}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  defaultValue={editingUser?.email || ''}
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-400">
                  Role
                </label>
                <select
                  id="role"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  defaultValue={editingUser?.role || 'viewer'}
                >
                  <option value="admin">Admin</option>
                  <option value="operator">Operator</option>
                  <option value="auditor">Auditor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                  Status
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      id="active"
                      name="status"
                      type="radio"
                      className="h-4 w-4 border-gray-500 bg-dark-700 text-primary-600 focus:ring-primary-500"
                      defaultChecked={editingUser ? editingUser.status === 'active' : true}
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-white">
                      Active
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="inactive"
                      name="status"
                      type="radio"
                      className="h-4 w-4 border-gray-500 bg-dark-700 text-primary-600 focus:ring-primary-500"
                      defaultChecked={editingUser?.status === 'inactive'}
                    />
                    <label htmlFor="inactive" className="ml-2 block text-sm text-white">
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              {!editingUser && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="rounded-md border border-dark-600 bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  {editingUser ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement; 