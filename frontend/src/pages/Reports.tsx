import React, { useState } from 'react';
import { DocumentArrowDownIcon, DocumentChartBarIcon, FunnelIcon, XMarkIcon, ChartBarIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface Report {
  id: number;
  title: string;
  target: string;
  date: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  findings: number;
  status: string;
  techniques: string[];
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [downloadReady, setDownloadReady] = useState(false);
  
  const reports: Report[] = [
    {
      id: 1,
      title: 'APT Simulation Campaign',
      target: 'Corporate Infrastructure',
      date: '2024-03-15',
      severity: 'Critical',
      findings: 24,
      status: 'Completed',
      techniques: ['T1566', 'T1078', 'T1486', 'T1082'],
    },
    {
      id: 2,
      title: 'Web Application Assessment',
      target: 'Customer Portal',
      date: '2024-03-12',
      severity: 'High',
      findings: 18,
      status: 'Completed',
      techniques: ['T1190', 'T1213', 'T1059', 'T1505'],
    },
    {
      id: 3,
      title: 'Internal Network Scan',
      target: 'Core Network',
      date: '2024-03-10',
      severity: 'Medium',
      findings: 31,
      status: 'Completed',
      techniques: ['T1046', 'T1018', 'T1016', 'T1049'],
    },
    {
      id: 4,
      title: 'Cloud Infrastructure Review',
      target: 'AWS Environment',
      date: '2024-03-08',
      severity: 'High',
      findings: 15,
      status: 'Completed',
      techniques: ['T1078', 'T1530', 'T1526', 'T1136'],
    },
    {
      id: 5,
      title: 'Endpoint Security Assessment',
      target: 'Corporate Workstations',
      date: '2024-03-05',
      severity: 'Medium',
      findings: 22,
      status: 'Completed',
      techniques: ['T1547', 'T1553', 'T1543', 'T1569'],
    },
  ];

  const renderSeverityBadge = (severity: string) => {
    const colors = {
      Critical: 'bg-red-900 text-red-200',
      High: 'bg-orange-900 text-orange-200',
      Medium: 'bg-yellow-900 text-yellow-200',
      Low: 'bg-blue-900 text-blue-200',
    };
    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          colors[severity as keyof typeof colors]
        }`}
      >
        {severity}
      </span>
    );
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const handleDownloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`);
    // Simulate download preparation
    setDownloadReady(false);
    setTimeout(() => {
      setDownloadReady(true);
      // In a real app, this would trigger a file download
      alert(`Report ${reportId} download ready!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-white">Security Reports</h1>
        <div className="flex items-center space-x-3">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="block w-full rounded-md border-0 bg-dark-700 py-1.5 pl-3 pr-10 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-primary-500"
              placeholder="Search reports..."
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FunnelIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <button
            onClick={() => alert('Generate Report feature will be available soon!')}
            className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
          >
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-dark-700">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('recent')}
            className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'recent'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            Recent Reports
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'archived'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            Archived Reports
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'templates'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300'
            }`}
          >
            Report Templates
          </button>
        </nav>
      </div>

      {/* Reports table */}
      <div className="overflow-hidden rounded-lg bg-dark-800 shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-dark-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Target
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Findings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  MITRE ATT&CK
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-dark-700">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <DocumentChartBarIcon className="mr-3 h-5 w-5 text-primary-500" />
                      <span 
                        className="font-medium text-white cursor-pointer hover:text-primary-300"
                        onClick={() => handleViewReport(report)}
                      >
                        {report.title}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {report.target}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {report.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {renderSeverityBadge(report.severity)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {report.findings}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    <div className="flex flex-wrap gap-1">
                      {report.techniques.map((technique) => (
                        <span
                          key={technique}
                          className="rounded bg-dark-600 px-1.5 py-0.5 text-xs"
                        >
                          {technique}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <button 
                      onClick={() => handleViewReport(report)}
                      className="mr-2 rounded-md bg-dark-700 p-2 text-gray-300 hover:bg-dark-600 hover:text-white"
                      title="View Report"
                    >
                      <DocumentChartBarIcon className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(report.id)}
                      className="rounded-md bg-dark-700 p-2 text-gray-300 hover:bg-dark-600 hover:text-white"
                      title="Download Report"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-dark-700 bg-dark-800 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">5</span> of{' '}
              <span className="font-medium text-white">12</span> reports
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => alert('Previous page')}
                className="rounded-md bg-dark-700 px-3 py-1 text-sm text-gray-300 hover:bg-dark-600 hover:text-white"
              >
                Previous
              </button>
              <button
                onClick={() => alert('Next page')}
                className="rounded-md bg-primary-600 px-3 py-1 text-sm text-white hover:bg-primary-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowReportModal(false)}></div>
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-dark-800 shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-dark-800 px-6 py-4 border-b border-dark-700">
              <h2 className="text-xl font-semibold text-white">Report: {selectedReport.title}</h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-dark-700 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Report header */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-dark-700 p-4">
                  <div className="flex items-center">
                    <div className="rounded-md bg-primary-900 p-2">
                      <DocumentChartBarIcon className="h-6 w-6 text-primary-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-xs text-gray-400">Target</div>
                      <div className="text-sm font-medium text-white">{selectedReport.target}</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-dark-700 p-4">
                  <div className="flex items-center">
                    <div className="rounded-md bg-yellow-900 p-2">
                      <ShieldExclamationIcon className="h-6 w-6 text-yellow-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-xs text-gray-400">Severity</div>
                      <div className="text-sm font-medium text-white">{selectedReport.severity}</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-dark-700 p-4">
                  <div className="flex items-center">
                    <div className="rounded-md bg-red-900 p-2">
                      <ChartBarIcon className="h-6 w-6 text-red-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-xs text-gray-400">Findings</div>
                      <div className="text-sm font-medium text-white">{selectedReport.findings}</div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-dark-700 p-4">
                  <div className="flex items-center">
                    <div className="rounded-md bg-blue-900 p-2">
                      <DocumentChartBarIcon className="h-6 w-6 text-blue-300" />
                    </div>
                    <div className="ml-4">
                      <div className="text-xs text-gray-400">Generated</div>
                      <div className="text-sm font-medium text-white">{selectedReport.date}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Report sections */}
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white">Executive Summary</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    This security assessment was conducted on {selectedReport.target} with the aim of identifying potential security vulnerabilities.
                    The assessment revealed {selectedReport.findings} findings with an overall severity rating of {selectedReport.severity.toLowerCase()}.
                    The report provides detailed recommendations for remediation and improving security posture.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white">Key Findings</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>Identified {selectedReport.findings} potential vulnerabilities</li>
                    <li>Critical issues were found in authentication mechanisms</li>
                    <li>Detected insecure data handling practices</li>
                    <li>Found potential for privilege escalation</li>
                    <li>Network segmentation issues discovered</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white">MITRE ATT&CK Techniques</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {selectedReport.techniques.map((technique) => (
                      <div key={technique} className="rounded-lg bg-dark-700 p-3">
                        <div className="font-mono text-sm font-medium text-primary-400">{technique}</div>
                        <div className="mt-1 text-xs text-gray-400">
                          {technique === 'T1566' && 'Phishing'}
                          {technique === 'T1078' && 'Valid Accounts'}
                          {technique === 'T1486' && 'Data Encryption for Impact'}
                          {technique === 'T1082' && 'System Information Discovery'}
                          {technique === 'T1190' && 'Exploit Public-Facing Application'}
                          {technique === 'T1213' && 'Data from Information Repositories'}
                          {technique === 'T1059' && 'Command and Scripting Interpreter'}
                          {technique === 'T1505' && 'Server Software Component'}
                          {technique === 'T1046' && 'Network Service Scanning'}
                          {technique === 'T1018' && 'Remote System Discovery'}
                          {technique === 'T1016' && 'System Network Configuration Discovery'}
                          {technique === 'T1049' && 'System Network Connections Discovery'}
                          {technique === 'T1530' && 'Data from Cloud Storage'}
                          {technique === 'T1526' && 'Cloud Service Discovery'}
                          {technique === 'T1136' && 'Create Account'}
                          {technique === 'T1547' && 'Boot or Logon Autostart Execution'}
                          {technique === 'T1553' && 'Subvert Trust Controls'}
                          {technique === 'T1543' && 'Create or Modify System Process'}
                          {technique === 'T1569' && 'System Services'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white">Recommendations</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>Implement multi-factor authentication across all systems</li>
                    <li>Enhance network segmentation to limit lateral movement</li>
                    <li>Update vulnerable software and apply security patches</li>
                    <li>Improve logging and monitoring capabilities</li>
                    <li>Conduct regular security awareness training for employees</li>
                  </ul>
                </div>
              </div>
              
              {/* Report actions */}
              <div className="mt-8 flex justify-end space-x-4">
                <button 
                  onClick={() => alert('Generating report in PDF format...')}
                  className="rounded-md border border-dark-600 bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
                >
                  Export as PDF
                </button>
                <button 
                  onClick={() => handleDownloadReport(selectedReport.id)}
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports; 