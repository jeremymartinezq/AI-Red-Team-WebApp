import React, { useState } from 'react';
import {
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  ServerIcon,
  CogIcon,
  WifiIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const Scanner: React.FC = () => {
  const [scanStatus, setScanStatus] = useState('idle'); // idle, scanning, completed
  const [networkRange, setNetworkRange] = useState('192.168.1.0/24');
  const [scanType, setScanType] = useState('discovery');
  const [scanSpeed, setScanSpeed] = useState('normal');
  
  const scanTypes = [
    { id: 'discovery', name: 'Network Discovery' },
    { id: 'full', name: 'Full Port Scan' },
    { id: 'vuln', name: 'Vulnerability Scan' },
    { id: 'stealth', name: 'Stealth Scan' },
  ];
  
  const scanSpeeds = [
    { id: 'slow', name: 'Slow (Stealthy)' },
    { id: 'normal', name: 'Normal' },
    { id: 'fast', name: 'Fast (Noisy)' },
  ];
  
  const hostTypes = {
    server: ServerIcon,
    desktop: ComputerDesktopIcon,
    iot: CpuChipIcon,
    router: WifiIcon,
  };
  
  const discoveredHosts = [
    {
      id: 1,
      ip: '192.168.1.1',
      hostname: 'gateway.local',
      ports: [80, 443, 53],
      os: 'Embedded Linux',
      type: 'router',
      status: 'online',
      vulnerabilities: 2,
    },
    {
      id: 2,
      ip: '192.168.1.10',
      hostname: 'ubuntu-server',
      ports: [22, 80, 443, 3306],
      os: 'Ubuntu 22.04 LTS',
      type: 'server',
      status: 'online',
      vulnerabilities: 1,
    },
    {
      id: 3,
      ip: '192.168.1.15',
      hostname: 'win-desktop01',
      ports: [139, 445, 3389],
      os: 'Windows 11',
      type: 'desktop',
      status: 'online',
      vulnerabilities: 3,
    },
    {
      id: 4,
      ip: '192.168.1.20',
      hostname: 'nas.local',
      ports: [22, 80, 443, 8080, 9000],
      os: 'TrueNAS',
      type: 'server',
      status: 'online',
      vulnerabilities: 0,
    },
    {
      id: 5,
      ip: '192.168.1.25',
      hostname: 'smarttv.local',
      ports: [8008, 8009],
      os: 'Android TV',
      type: 'iot',
      status: 'online',
      vulnerabilities: 5,
    },
  ];
  
  const handleStartScan = () => {
    setScanStatus('scanning');
    // Simulate scan completion after 3 seconds
    setTimeout(() => {
      setScanStatus('completed');
    }, 3000);
  };
  
  const handleStopScan = () => {
    setScanStatus('idle');
  };
  
  const getVulnerabilityClass = (count: number) => {
    if (count === 0) return 'bg-green-900 text-green-200';
    if (count <= 2) return 'bg-yellow-900 text-yellow-200';
    return 'bg-red-900 text-red-200';
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Network Scanner</h1>
        <div className="flex items-center space-x-2">
          {scanStatus === 'idle' || scanStatus === 'completed' ? (
            <button
              onClick={handleStartScan}
              className="flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              <PlayIcon className="mr-2 h-5 w-5" />
              Start Scan
            </button>
          ) : (
            <button
              onClick={handleStopScan}
              className="flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              <StopIcon className="mr-2 h-5 w-5" />
              Stop Scan
            </button>
          )}
          <button className="flex items-center rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white">
            <CogIcon className="mr-2 h-5 w-5" />
            Settings
          </button>
        </div>
      </div>

      {/* Scan configuration */}
      <div className="rounded-lg bg-dark-800 p-5 shadow">
        <h2 className="mb-4 text-lg font-medium text-white">Scan Configuration</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="network-range" className="block text-sm font-medium text-gray-400">
              Target Network Range
            </label>
            <input
              type="text"
              id="network-range"
              value={networkRange}
              onChange={(e) => setNetworkRange(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
              placeholder="e.g. 192.168.1.0/24"
            />
          </div>
          <div>
            <label htmlFor="scan-type" className="block text-sm font-medium text-gray-400">
              Scan Type
            </label>
            <select
              id="scan-type"
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
            >
              {scanTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="scan-speed" className="block text-sm font-medium text-gray-400">
              Scan Speed
            </label>
            <select
              id="scan-speed"
              value={scanSpeed}
              onChange={(e) => setScanSpeed(e.target.value)}
              className="mt-1 block w-full rounded-md border-0 bg-dark-700 py-1.5 text-white shadow-sm ring-1 ring-inset ring-dark-600 focus:ring-2 focus:ring-primary-500 sm:text-sm"
            >
              {scanSpeeds.map((speed) => (
                <option key={speed.id} value={speed.id}>
                  {speed.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scan status */}
      <div className="rounded-lg bg-dark-800 p-5 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Scan Status</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  scanStatus === 'scanning' ? 'animate-pulse bg-yellow-500' : 
                  scanStatus === 'completed' ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></span>
              <span className="text-sm font-medium capitalize text-gray-300">
                {scanStatus}
              </span>
            </div>
            {scanStatus === 'completed' && (
              <button className="flex items-center text-sm font-medium text-primary-400 hover:text-primary-300">
                <ArrowPathIcon className="mr-1 h-4 w-4" />
                Rescan
              </button>
            )}
          </div>
        </div>
        
        {scanStatus === 'scanning' && (
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span>Scanning {networkRange}...</span>
              <span>50% complete</span>
            </div>
            <div className="h-2 rounded-full bg-dark-700">
              <div className="h-2 w-1/2 rounded-full bg-primary-600"></div>
            </div>
          </div>
        )}
        
        {scanStatus === 'completed' && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-dark-700 p-3 text-center">
              <div className="text-2xl font-bold text-white">{discoveredHosts.length}</div>
              <div className="text-xs text-gray-400">Hosts Discovered</div>
            </div>
            <div className="rounded-lg bg-dark-700 p-3 text-center">
              <div className="text-2xl font-bold text-white">24</div>
              <div className="text-xs text-gray-400">Open Ports</div>
            </div>
            <div className="rounded-lg bg-dark-700 p-3 text-center">
              <div className="text-2xl font-bold text-white">11</div>
              <div className="text-xs text-gray-400">Vulnerabilities</div>
            </div>
            <div className="rounded-lg bg-dark-700 p-3 text-center">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-xs text-gray-400">Critical Issues</div>
            </div>
          </div>
        )}
      </div>

      {/* Discovered hosts */}
      {scanStatus === 'completed' && (
        <div className="rounded-lg bg-dark-800 shadow">
          <div className="border-b border-dark-700 px-5 py-4">
            <h2 className="text-lg font-medium text-white">Discovered Hosts</h2>
          </div>
          <ul className="divide-y divide-dark-700">
            {discoveredHosts.map((host) => {
              const HostIcon = hostTypes[host.type as keyof typeof hostTypes];
              return (
                <li key={host.id} className="hover:bg-dark-700">
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-dark-700">
                          <HostIcon className="h-6 w-6 text-primary-400" />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-white">{host.ip}</h3>
                            {host.hostname && (
                              <span className="ml-2 text-xs text-gray-400">({host.hostname})</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{host.os}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-xs text-gray-400">Open Ports</div>
                          <div className="text-sm text-white">{host.ports.length}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Vulnerabilities</div>
                          <div className="flex items-center">
                            <span
                              className={`mr-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getVulnerabilityClass(
                                host.vulnerabilities
                              )}`}
                            >
                              {host.vulnerabilities}
                            </span>
                          </div>
                        </div>
                        <button className="rounded-md bg-primary-600 p-2 text-white hover:bg-primary-700">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {host.ports.map((port) => (
                        <span key={port} className="rounded bg-dark-600 px-2 py-0.5 text-xs text-gray-300">
                          {port}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Scanner; 