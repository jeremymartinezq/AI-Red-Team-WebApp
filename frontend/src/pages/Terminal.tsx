import React, { useState, useEffect, useRef } from 'react';
import { XMarkIcon, ArrowPathIcon, ServerIcon, CommandLineIcon } from '@heroicons/react/24/outline';

const Terminal: React.FC = () => {
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<Array<{ type: string; content: string }>>([
    { type: 'system', content: '🔒 AI Red Team Command Terminal v1.0' },
    { type: 'system', content: '🔄 Initializing secure connection...' },
    { type: 'success', content: '✅ Connection established to command server' },
    { type: 'info', content: '🖥️ Type "help" to see available commands' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  const sessions = [
    {
      id: 'session-1',
      name: 'Target-A Web Server',
      type: 'Web',
      status: 'Active',
      ip: '203.0.113.10',
      lastActivity: '2 min ago',
    },
    {
      id: 'session-2',
      name: 'Target-B Database',
      type: 'Database',
      status: 'Active',
      ip: '203.0.113.15',
      lastActivity: '5 min ago',
    },
  ];

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    // Add user input to console output
    setConsoleOutput((prev) => [...prev, { type: 'input', content: `> ${consoleInput}` }]);

    // Process command
    processCommand(consoleInput);

    // Clear input
    setConsoleInput('');
  };

  const processCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    
    if (cmd === 'help') {
      setConsoleOutput((prev) => [
        ...prev,
        { type: 'info', content: 'Available commands:' },
        { type: 'info', content: '  help - Show this help message' },
        { type: 'info', content: '  clear - Clear console output' },
        { type: 'info', content: '  sessions - List active sessions' },
        { type: 'info', content: '  connect <session-id> - Connect to a session' },
        { type: 'info', content: '  scan <ip/range> - Perform quick scan' },
        { type: 'info', content: '  exploit <target> <module> - Run exploit' },
      ]);
    } else if (cmd === 'clear') {
      setConsoleOutput([
        { type: 'system', content: '🔒 AI Red Team Command Terminal v1.0' },
        { type: 'info', content: 'Console cleared' },
      ]);
    } else if (cmd === 'sessions') {
      setConsoleOutput((prev) => [
        ...prev,
        { type: 'info', content: 'Active sessions:' },
        ...sessions.map((session) => ({
          type: 'info',
          content: `  ${session.id} - ${session.name} (${session.ip}) - ${session.status} - Last activity: ${session.lastActivity}`,
        })),
      ]);
    } else if (cmd.startsWith('connect')) {
      const sessionId = cmd.split(' ')[1];
      const session = sessions.find((s) => s.id === sessionId);
      
      if (session) {
        setConsoleOutput((prev) => [
          ...prev,
          { type: 'system', content: `Connecting to ${session.name} (${session.ip})...` },
          { type: 'success', content: `Connected to ${session.name}` },
          { type: 'info', content: 'Type "exit" to close this session' },
        ]);
      } else {
        setConsoleOutput((prev) => [
          ...prev,
          { type: 'error', content: `Session ${sessionId} not found` },
        ]);
      }
    } else if (cmd.startsWith('scan')) {
      const target = cmd.split(' ')[1] || '127.0.0.1';
      setConsoleOutput((prev) => [
        ...prev,
        { type: 'system', content: `Starting scan on ${target}...` },
        { type: 'info', content: 'Scanning ports 1-1000...' },
        { type: 'system', content: 'Found open ports: 22, 80, 443' },
        { type: 'success', content: 'Scan completed' },
      ]);
    } else if (cmd.startsWith('exploit')) {
      const args = cmd.split(' ');
      const target = args[1] || 'No target specified';
      const module = args[2] || 'default';
      
      setConsoleOutput((prev) => [
        ...prev,
        { type: 'system', content: `Launching exploit ${module} against ${target}...` },
        { type: 'warning', content: 'This is a simulated attack environment' },
        { type: 'system', content: 'Exploit running...' },
        { type: 'success', content: 'Exploit completed successfully!' },
      ]);
    } else {
      setConsoleOutput((prev) => [
        ...prev,
        { type: 'error', content: `Command not recognized: ${cmd}` },
        { type: 'info', content: 'Type "help" to see available commands' },
      ]);
    }
  };

  // Auto-scroll console to bottom when output changes
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  // Focus input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'input':
        return 'text-white font-medium';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'success':
        return 'text-green-400';
      case 'info':
        return 'text-blue-400';
      case 'system':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="h-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">C2 Terminal</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white">
            <ServerIcon className="mr-2 h-5 w-5" />
            Sessions ({sessions.length})
          </button>
          <button 
            onClick={() => setConsoleOutput([
              { type: 'system', content: '🔒 AI Red Team Command Terminal v1.0' },
              { type: 'system', content: '🔄 Initializing secure connection...' },
              { type: 'success', content: '✅ Connection established to command server' },
              { type: 'info', content: '🖥️ Type "help" to see available commands' },
            ])}
            className="flex items-center rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
          >
            <ArrowPathIcon className="mr-2 h-5 w-5" />
            Reset
          </button>
          <button
            onClick={() => setConsoleOutput([])}
            className="flex items-center rounded-md bg-dark-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
          >
            <XMarkIcon className="mr-2 h-5 w-5" />
            Clear
          </button>
        </div>
      </div>

      {/* Terminal container */}
      <div className="flex h-[calc(100vh-200px)] flex-col rounded-lg bg-dark-800 shadow">
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b border-dark-700 px-4 py-2">
          <div className="flex items-center">
            <CommandLineIcon className="mr-2 h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-white">Command Console</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* Terminal output */}
        <div
          ref={consoleRef}
          className="flex-1 overflow-y-auto bg-dark-900 p-4 font-mono text-sm"
        >
          {consoleOutput.map((line, index) => (
            <div key={index} className={`mb-1 ${getLineColor(line.type)}`}>
              {line.content}
            </div>
          ))}
        </div>
        
        {/* Terminal input */}
        <div className="border-t border-dark-700 bg-dark-800 px-4 py-2">
          <form onSubmit={handleConsoleSubmit} className="flex items-center">
            <span className="mr-2 text-primary-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={consoleInput}
              onChange={(e) => setConsoleInput(e.target.value)}
              className="flex-1 bg-transparent py-1 text-sm text-white outline-none"
              placeholder="Type command..."
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        </div>
      </div>

      {/* Command help */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-dark-800 p-4 shadow">
          <h3 className="mb-2 font-medium text-white">Quick Commands</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="font-mono text-primary-400">help</span>
              <span className="text-gray-400">Show available commands</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-primary-400">sessions</span>
              <span className="text-gray-400">List active sessions</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-primary-400">scan &lt;target&gt;</span>
              <span className="text-gray-400">Scan target</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-primary-400">exploit &lt;target&gt;</span>
              <span className="text-gray-400">Run exploit</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-dark-800 p-4 shadow">
          <h3 className="mb-2 font-medium text-white">Active Sessions</h3>
          <div className="space-y-1 text-sm">
            {sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-white">{session.name}</span>
                </div>
                <span className="text-gray-400">{session.ip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 