import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Import icons
import {
  HomeIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
  CommandLineIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Attack Scenarios', href: '/scenarios', icon: BriefcaseIcon },
    { name: 'Payload Library', href: '/payloads', icon: CodeBracketIcon },
    { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
    { name: 'Network Scanner', href: '/scanner', icon: ShieldExclamationIcon },
    { name: 'C2 Terminal', href: '/terminal', icon: CommandLineIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    // Admin-only routes
    {
      name: 'User Management',
      href: '/admin/users',
      icon: UserGroupIcon,
      adminOnly: true,
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-70 transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-dark-800 transition duration-300 ease-in-out md:relative md:translate-x-0 md:z-0 md:w-64 md:flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and close button */}
          <div className="flex h-16 items-center justify-between border-b border-dark-700 px-4">
            <div className="flex items-center space-x-2">
              <ShieldExclamationIcon className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">AI Red Team</span>
            </div>
            <button
              className="text-gray-400 hover:text-white focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              // Skip admin-only items for non-admin users
              if (item.adminOnly && user?.role !== 'admin') return null;

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className="mr-3 h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* User profile */}
          <div className="border-t border-dark-700 p-4">
            <div className="flex items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600">
                <span className="text-sm font-medium text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.email || 'User'}</p>
                <p className="text-xs text-gray-400">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 flex w-full items-center justify-center rounded-md bg-dark-700 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 