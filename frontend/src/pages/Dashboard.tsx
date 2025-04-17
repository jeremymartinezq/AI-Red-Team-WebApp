import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ShieldExclamationIcon,
  CommandLineIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Dashboard widgets
  const widgets = [
    {
      title: 'Attack Scenarios',
      icon: BriefcaseIcon,
      description: 'Create, manage and run AI-powered attack scenarios.',
      stat: '8',
      statLabel: 'Active Scenarios',
      color: 'bg-blue-600',
      link: '/scenarios',
    },
    {
      title: 'Payload Library',
      icon: CodeBracketIcon,
      description: 'Browse and generate offensive security payloads.',
      stat: '35',
      statLabel: 'Payloads Ready',
      color: 'bg-purple-600',
      link: '/payloads',
    },
    {
      title: 'Network Scanner',
      icon: ShieldExclamationIcon,
      description: 'Discover and map network assets with AI-assisted scanning.',
      stat: '4',
      statLabel: 'Recent Scans',
      color: 'bg-green-600',
      link: '/scanner',
    },
    {
      title: 'Reports',
      icon: DocumentTextIcon,
      description: 'View detailed reports with MITRE ATT&CK mapping.',
      stat: '12',
      statLabel: 'Generated Reports',
      color: 'bg-yellow-600',
      link: '/reports',
    },
    {
      title: 'C2 Terminal',
      icon: CommandLineIcon,
      description: 'Command & control interface for simulated operations.',
      stat: '2',
      statLabel: 'Active Sessions',
      color: 'bg-red-600',
      link: '/terminal',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <motion.div
        className="rounded-lg bg-dark-800 p-6 shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white">
          Welcome, {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
        </h2>
        <p className="mt-1 text-gray-300">
          AI-powered red team security operations platform.
        </p>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="rounded-lg bg-dark-800 p-4 shadow"
          variants={itemVariants}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Scenarios</p>
              <p className="text-2xl font-semibold text-white">8</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 bg-opacity-20">
              <BriefcaseIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-dark-800 p-4 shadow"
          variants={itemVariants}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Payloads Created</p>
              <p className="text-2xl font-semibold text-white">35</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 bg-opacity-20">
              <CodeBracketIcon className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-dark-800 p-4 shadow"
          variants={itemVariants}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Vulnerabilities Found</p>
              <p className="text-2xl font-semibold text-white">124</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600 bg-opacity-20">
              <ShieldExclamationIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-lg bg-dark-800 p-4 shadow"
          variants={itemVariants}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Success Rate</p>
              <p className="text-2xl font-semibold text-white">78%</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 bg-opacity-20">
              <DocumentTextIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main widgets */}
      <motion.div
        className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delayChildren: 0.3 }}
      >
        {widgets.map((widget, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg bg-dark-800 shadow transition-all duration-300 hover:shadow-lg hover:shadow-primary-900/20"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            onClick={() => navigate(widget.link)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`h-2 ${widget.color}`}></div>
            <div className="p-6">
              <div className="flex items-center">
                <div
                  className={`mr-4 flex h-12 w-12 items-center justify-center rounded-lg ${widget.color} bg-opacity-20`}
                >
                  <widget.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {widget.title}
                </h3>
              </div>
              <p className="mt-3 text-gray-400">{widget.description}</p>
              <div className="mt-4 flex items-center">
                <span className="text-2xl font-bold text-white">
                  {widget.stat}
                </span>
                <span className="ml-2 text-sm text-gray-400">
                  {widget.statLabel}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent activity */}
      <motion.div
        className="rounded-lg bg-dark-800 p-6 shadow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            {
              action: 'Scenario Completed',
              target: 'Phishing Simulation',
              time: '10 minutes ago',
              status: 'success',
            },
            {
              action: 'Payload Generated',
              target: 'Reverse Shell',
              time: '1 hour ago',
              status: 'info',
            },
            {
              action: 'Network Scan',
              target: '192.168.1.0/24',
              time: '3 hours ago',
              status: 'info',
            },
            {
              action: 'Report Generated',
              target: 'APT Simulation',
              time: '1 day ago',
              status: 'info',
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center border-b border-dark-700 pb-2 last:border-0"
            >
              <div
                className={`mr-3 h-2 w-2 rounded-full ${
                  activity.status === 'success'
                    ? 'bg-green-500'
                    : activity.status === 'error'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {activity.action}:{' '}
                  <span className="text-gray-400">{activity.target}</span>
                </p>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 