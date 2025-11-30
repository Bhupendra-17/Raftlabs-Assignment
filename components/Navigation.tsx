import React from 'react';
import { LayoutDashboard, Database, Code2, Settings, Cloud, LogOut, Search, User, Bell } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Sidebar: React.FC<NavigationProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: View.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: View.DATABASE, label: 'Firestore Database', icon: Database },
    { id: View.FUNCTIONS, label: 'Cloud Functions', icon: Code2 },
    { id: View.SETTINGS, label: 'Project Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-studio-900 text-gray-300 flex flex-col h-full border-r border-gray-800 flex-shrink-0">
      <div className="p-4 flex items-center space-x-3 border-b border-gray-800">
        <div className="bg-studio-500 p-2 rounded-lg text-white">
          <Cloud size={20} />
        </div>
        <span className="font-semibold text-white tracking-wide">Nebula Studio</span>
      </div>

      <div className="p-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Project: acme-production
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                currentView === item.id
                  ? 'bg-studio-800 text-white'
                  : 'hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <button className="flex items-center space-x-3 px-3 py-2 w-full text-sm font-medium hover:text-white transition-colors">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-console-border flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search resources, docs, and more..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-studio-500 text-gray-700"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
        </button>
        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
            JD
        </div>
      </div>
    </header>
  );
};