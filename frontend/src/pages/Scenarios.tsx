import React, { useState } from 'react';
import { PlusIcon, XMarkIcon, PlayIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Scenario {
  id: number;
  name: string;
  status: 'Active' | 'Completed' | 'Planning' | 'Failed' | 'Paused';
  progress: number;
  target: string;
  lastRun: string;
  description?: string;
  techniques?: string[];
}

const Scenarios: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showNewScenarioModal, setShowNewScenarioModal] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      name: 'Phishing Campaign',
      status: 'Active',
      progress: 75,
      target: 'Corporate Email',
      lastRun: '2 hours ago',
      description: 'Email phishing campaign targeting corporate users with simulated malicious attachments and links.',
      techniques: ['T1566.001', 'T1566.002', 'T1204.001', 'T1078.004']
    },
    {
      id: 2,
      name: 'Network Penetration',
      status: 'Completed',
      progress: 100,
      target: 'Internal Network',
      lastRun: '1 day ago',
      description: 'Network penetration test focusing on lateral movement after initial access.',
      techniques: ['T1046', 'T1083', 'T1087', 'T1021.001', 'T1018']
    },
    {
      id: 3,
      name: 'Web Application Attack',
      status: 'Planning',
      progress: 25,
      target: 'Customer Portal',
      lastRun: 'Not started',
      description: 'Testing customer portal for SQL injection, XSS, and authentication bypass vulnerabilities.',
      techniques: ['T1190', 'T1212', 'T1059.007']
    },
    {
      id: 4,
      name: 'Ransomware Simulation',
      status: 'Paused',
      progress: 45,
      target: 'Finance Department',
      lastRun: '3 days ago',
      description: 'Simulated ransomware attack with file encryption capabilities (without actual data loss).',
      techniques: ['T1486', 'T1490', 'T1489', 'T1491.001']
    },
    {
      id: 5,
      name: 'Data Exfiltration Test',
      status: 'Completed',
      progress: 100,
      target: 'Customer Database',
      lastRun: '5 days ago',
      description: 'Testing data loss prevention controls by attempting various exfiltration techniques.',
      techniques: ['T1048', 'T1567', 'T1020', 'T1030', 'T1041']
    },
    {
      id: 6,
      name: 'Supply Chain Attack',
      status: 'Planning',
      progress: 10,
      target: 'Vendor Systems',
      lastRun: 'Not started',
      description: 'Simulating a supply chain compromise by targeting trusted vendor connections.',
      techniques: ['T1195.002', 'T1195.001', 'T1078.001', 'T1199']
    },
    {
      id: 7,
      name: 'Credential Harvesting',
      status: 'Active',
      progress: 60,
      target: 'All Departments',
      lastRun: '1 day ago',
      description: 'Testing password strength and using various credential theft techniques.',
      techniques: ['T1110.001', 'T1110.002', 'T1555', 'T1556', 'T1212']
    },
    {
      id: 8,
      name: 'IoT Device Exploitation',
      status: 'Failed',
      progress: 30,
      target: 'Smart Office Equipment',
      lastRun: '1 week ago',
      description: 'Testing security of connected IoT devices within the corporate environment.',
      techniques: ['T1200', 'T1040', 'T1201', 'T1505.001']
    }
  ];

  const handleViewDetails = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setShowModal(true);
  };

  const handleRunScenario = (scenarioId: number) => {
    console.log(`Running scenario ${scenarioId}`);
    // In a real app, this would call an API to start the scenario
    alert(`Scenario ${scenarioId} is now running.`);
  };

  const handleNewScenario = () => {
    setShowNewScenarioModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-900 text-green-300';
      case 'Completed':
        return 'bg-blue-900 text-blue-300';
      case 'Planning':
        return 'bg-yellow-900 text-yellow-300';
      case 'Failed':
        return 'bg-red-900 text-red-300';
      case 'Paused':
        return 'bg-purple-900 text-purple-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Attack Scenarios</h1>
        <button 
          onClick={handleNewScenario}
          className="flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          New Scenario
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="rounded-lg bg-dark-800 p-6 shadow-lg transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{scenario.name}</h3>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(scenario.status)}`}
              >
                {scenario.status}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="text-sm text-white">{scenario.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Progress</p>
                <div className="mt-1 h-2 rounded-full bg-dark-700">
                  <div
                    className="h-2 rounded-full bg-primary-600"
                    style={{ width: `${scenario.progress}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Run</p>
                <p className="text-sm text-white">{scenario.lastRun}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button 
                onClick={() => handleViewDetails(scenario)}
                className="flex-1 rounded bg-dark-700 px-3 py-2 text-sm font-medium text-white hover:bg-dark-600"
              >
                View Details
              </button>
              <button 
                onClick={() => handleRunScenario(scenario.id)}
                className="flex-1 flex items-center justify-center rounded bg-primary-600 px-3 py-2 text-sm font-medium text-white hover:bg-primary-700"
              >
                <PlayIcon className="mr-1 h-4 w-4" />
                Run Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scenario Details Modal */}
      {showModal && selectedScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-dark-800 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{selectedScenario.name}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-dark-700 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(selectedScenario.status)}`}>
                  {selectedScenario.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Target</p>
                <p className="text-sm text-white">{selectedScenario.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Progress</p>
                <div className="mt-1 flex items-center">
                  <div className="h-2 w-full rounded-full bg-dark-700">
                    <div
                      className="h-2 rounded-full bg-primary-600"
                      style={{ width: `${selectedScenario.progress}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm text-white">{selectedScenario.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Run</p>
                <div className="flex items-center">
                  <ClockIcon className="mr-1 h-4 w-4 text-gray-400" />
                  <p className="text-sm text-white">{selectedScenario.lastRun}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-400">Description</p>
              <p className="mt-1 text-sm text-white">{selectedScenario.description}</p>
            </div>
            
            {selectedScenario.techniques && (
              <div className="mt-4">
                <p className="text-sm text-gray-400">MITRE ATT&CK Techniques</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedScenario.techniques.map((technique) => (
                    <span
                      key={technique}
                      className="rounded bg-dark-700 px-2 py-1 text-xs text-primary-300"
                    >
                      {technique}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="rounded bg-dark-700 px-3 py-2 text-xs font-medium text-white hover:bg-dark-600">
                  <DocumentTextIcon className="mr-1 inline-block h-4 w-4" />
                  Export Report
                </button>
                <button className="rounded bg-dark-700 px-3 py-2 text-xs font-medium text-white hover:bg-dark-600">
                  View Log
                </button>
              </div>
              <div className="flex gap-2">
                <button className="rounded bg-dark-700 px-3 py-2 text-xs font-medium text-white hover:bg-dark-600">
                  Edit
                </button>
                <button 
                  onClick={() => handleRunScenario(selectedScenario.id)}
                  className="flex items-center rounded bg-primary-600 px-3 py-2 text-xs font-medium text-white hover:bg-primary-700"
                >
                  <PlayIcon className="mr-1 h-4 w-4" />
                  Run Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Scenario Modal */}
      {showNewScenarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowNewScenarioModal(false)}></div>
          <div className="relative w-full max-w-lg rounded-lg bg-dark-800 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Create New Attack Scenario</h2>
              <button
                onClick={() => setShowNewScenarioModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-dark-700 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <form className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Scenario Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  placeholder="Enter scenario name"
                />
              </div>
              
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-gray-400">
                  Target
                </label>
                <input
                  type="text"
                  id="target"
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  placeholder="Target system or department"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  placeholder="Describe the attack scenario"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="techniques" className="block text-sm font-medium text-gray-400">
                  MITRE ATT&CK Techniques
                </label>
                <select
                  id="techniques"
                  multiple
                  className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                >
                  <option value="T1566.001">Phishing: Spearphishing Attachment</option>
                  <option value="T1566.002">Phishing: Spearphishing Link</option>
                  <option value="T1110.001">Brute Force: Password Guessing</option>
                  <option value="T1110.002">Brute Force: Password Cracking</option>
                  <option value="T1059.001">Command and Scripting Interpreter: PowerShell</option>
                  <option value="T1486">Data Encrypted for Impact</option>
                  <option value="T1048">Exfiltration Over Alternative Protocol</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewScenarioModal(false)}
                  className="rounded-md border border-dark-600 bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('New scenario created!');
                    setShowNewScenarioModal(false);
                  }}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Create Scenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scenarios; 