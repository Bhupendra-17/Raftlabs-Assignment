import React, { useState } from 'react';
import { Plus, Sparkles, Trash2, Filter, MoreVertical, Loader2, Database } from 'lucide-react';
import { User } from '../types';
import { generateMockUsers } from '../services/geminiService';

export const DatabaseView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 'usr_001', name: 'Alice Chen', email: 'alice@example.com', role: 'admin', status: 'active', lastLogin: '2023-10-24T10:00:00Z' },
    { id: 'usr_002', name: 'Bob Smith', email: 'bob@example.com', role: 'viewer', status: 'inactive', lastLogin: '2023-09-15T08:30:00Z' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateData = async () => {
    setIsLoading(true);
    const newUsers = await generateMockUsers(5);
    setUsers([...users, ...newUsers]);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
      return status === 'active' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-gray-100 text-gray-700';
  }

  const getRoleBadge = (role: string) => {
      switch(role) {
          case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
          case 'editor': return 'bg-blue-100 text-blue-700 border-blue-200';
          default: return 'bg-gray-100 text-gray-600 border-gray-200';
      }
  }

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Firestore Database</h1>
           <p className="text-gray-500 mt-1">Collection: <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">users</span></p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleGenerateData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
            <span>Auto-Generate Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md shadow-sm transition-all">
            <Plus size={16} />
            <span>Add Document</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-console-border rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium">
                    <Filter size={14} className="mr-2" />
                    Filter
                </button>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="text-xs text-gray-500 font-mono">{users.length} documents found</span>
            </div>
            <div className="text-xs text-gray-400">Read/Write Rules: Public</div>
        </div>
        
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 font-medium text-gray-500">Document ID</th>
                <th className="px-6 py-3 font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 font-medium text-gray-500">Role</th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500">Last Login</th>
                <th className="px-6 py-3 font-medium text-gray-500 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{user.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs border ${getRoleBadge(user.role)}`}>
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-mono">{user.lastLogin.split('T')[0]}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Database size={48} className="mb-4 opacity-20" />
                <p>No documents found in this collection.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};