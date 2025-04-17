import React, { useState } from 'react';
import {
  UserIcon,
  ShieldCheckIcon,
  CogIcon,
  BellIcon,
  ServerIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    securityAlerts: true,
    scanCompletions: true,
    systemUpdates: false,
    newVulnerabilities: true,
  });
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_*******************',
    endpoint: 'https://api.redteam.security/v1',
    timeout: 30,
    retries: 3,
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">User Profile</h3>
              <p className="mt-1 text-sm text-gray-400">
                Manage your account information and preferences.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  defaultValue="admin"
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
                  defaultValue="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-400">
                Bio
              </label>
              <textarea
                id="bio"
                rows={3}
                className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                defaultValue="Senior Security Engineer with experience in offensive security."
              />
            </div>
            <div>
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Profile
              </button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-400">
                Manage your password and security preferences.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-400">
                  Current Password
                </label>
                <input
                  type="password"
                  id="current-password"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-400">
                  New Password
                </label>
                <input
                  type="password"
                  id="new-password"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-400">Two-Factor Authentication</h4>
              <div className="mt-2 flex items-center">
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Enable 2FA
                </button>
                <span className="ml-2 text-sm text-gray-400">
                  Protect your account with an additional layer of security.
                </span>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Security Settings
              </button>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Appearance Settings</h3>
              <p className="mt-1 text-sm text-gray-400">
                Customize how your dashboard looks.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Theme</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      id="dark-mode"
                      name="theme"
                      type="radio"
                      checked={darkMode}
                      onChange={() => setDarkMode(true)}
                      className="h-4 w-4 border-gray-500 bg-dark-800 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="dark-mode" className="ml-2 block text-sm text-white">
                      Dark Mode
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="light-mode"
                      name="theme"
                      type="radio"
                      checked={!darkMode}
                      onChange={() => setDarkMode(false)}
                      className="h-4 w-4 border-gray-500 bg-dark-800 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="light-mode" className="ml-2 block text-sm text-white">
                      Light Mode
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Color Scheme</h4>
                <div className="mt-2 flex items-center space-x-2">
                  {['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-indigo-500'].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full ${color}`}
                      aria-label={`Select ${color} theme`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Appearance Settings
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Notification Settings</h3>
              <p className="mt-1 text-sm text-gray-400">
                Manage what notifications you receive.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-900">
                    <ShieldCheckIcon className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="security-alerts" className="text-sm font-medium text-white">
                      Security Alerts
                    </label>
                    <p className="text-xs text-gray-400">Critical security notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={notifications.securityAlerts}
                    onChange={() => setNotifications({...notifications, securityAlerts: !notifications.securityAlerts})}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-dark-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-dark-500 after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-900">
                    <ServerIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="scan-completions" className="text-sm font-medium text-white">
                      Scan Completions
                    </label>
                    <p className="text-xs text-gray-400">Notifications when scans complete</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={notifications.scanCompletions}
                    onChange={() => setNotifications({...notifications, scanCompletions: !notifications.scanCompletions})}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-dark-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-dark-500 after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900">
                    <CogIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="system-updates" className="text-sm font-medium text-white">
                      System Updates
                    </label>
                    <p className="text-xs text-gray-400">Notifications about system updates</p>
                  </div>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={notifications.systemUpdates}
                    onChange={() => setNotifications({...notifications, systemUpdates: !notifications.systemUpdates})}
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-dark-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-dark-500 after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save Notification Settings
              </button>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">API Settings</h3>
              <p className="mt-1 text-sm text-gray-400">
                Manage your API keys and integration settings.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="api-key" className="block text-sm font-medium text-gray-400">
                  API Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="api-key"
                    value={apiSettings.apiKey}
                    onChange={(e) => setApiSettings({...apiSettings, apiKey: e.target.value})}
                    className="block w-full rounded-l-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  />
                  <button className="rounded-r-md border border-dark-600 bg-dark-800 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-dark-700 hover:text-white">
                    Regenerate
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-400">
                  API Endpoint
                </label>
                <input
                  type="text"
                  id="api-endpoint"
                  value={apiSettings.endpoint}
                  onChange={(e) => setApiSettings({...apiSettings, endpoint: e.target.value})}
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="api-timeout" className="block text-sm font-medium text-gray-400">
                    Request Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    id="api-timeout"
                    value={apiSettings.timeout}
                    onChange={(e) => setApiSettings({...apiSettings, timeout: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="api-retries" className="block text-sm font-medium text-gray-400">
                    Retry Attempts
                  </label>
                  <input
                    type="number"
                    id="api-retries"
                    value={apiSettings.retries}
                    onChange={(e) => setApiSettings({...apiSettings, retries: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="rounded-md bg-blue-900 bg-opacity-20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-400">
                    Keep your API key secure. Do not share it in public repositories or client-side code.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
                Save API Settings
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'api', name: 'API', icon: ServerIcon },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      
      <div className="mt-6 flex flex-col rounded-lg bg-dark-800 shadow md:flex-row">
        <div className="w-full shrink-0 border-b border-dark-700 p-0 md:w-64 md:border-b-0 md:border-r">
          <nav className="flex overflow-x-auto md:block md:space-y-1 md:p-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center px-5 py-3 text-left text-sm font-medium md:rounded-md md:px-3 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                <tab.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-400'
                  }`}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1 p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Settings; 