import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 px-4 py-3 text-center text-xs text-gray-500">
      <div className="flex items-center justify-between">
        <div>© {currentYear} AI Red Team Security. All rights reserved.</div>
        <div className="flex space-x-4">
          <span>All systems operational</span>
          <span className="flex items-center">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
            Online
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 