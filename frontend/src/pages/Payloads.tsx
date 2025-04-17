import React from 'react';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Payloads: React.FC = () => {
  const payloads = [
    {
      id: 1,
      name: 'Reverse Shell',
      type: 'Shell',
      platform: 'Linux',
      size: '4.2 KB',
      created: '2024-03-15',
      downloads: 156,
    },
    {
      id: 2,
      name: 'Keylogger',
      type: 'Spyware',
      platform: 'Windows',
      size: '8.7 KB',
      created: '2024-03-14',
      downloads: 89,
    },
    {
      id: 3,
      name: 'SQL Injection',
      type: 'Web',
      platform: 'Cross-platform',
      size: '2.1 KB',
      created: '2024-03-13',
      downloads: 234,
    },
    {
      id: 4,
      name: 'Ransomware Simulator',
      type: 'Malware',
      platform: 'Windows',
      size: '12.4 KB',
      created: '2024-03-12',
      downloads: 67,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Payload Library</h1>
        <button className="flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">
          <PlusIcon className="mr-2 h-5 w-5" />
          Create Payload
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-dark-800 shadow">
        <div className="p-6">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-dark-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Platform
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Size
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                        Downloads
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-700">
                    {payloads.map((payload) => (
                      <tr key={payload.id} className="hover:bg-dark-700">
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-white">
                          {payload.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {payload.type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {payload.platform}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {payload.size}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {payload.created}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-300">
                          {payload.downloads}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                          <button className="rounded bg-dark-600 p-2 text-gray-300 hover:bg-dark-500 hover:text-white">
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payloads; 