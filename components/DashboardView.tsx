import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Users, Database, Globe, Activity } from 'lucide-react';

const data = [
  { name: '00:00', value: 4000, uv: 2400 },
  { name: '04:00', value: 3000, uv: 1398 },
  { name: '08:00', value: 2000, uv: 9800 },
  { name: '12:00', value: 2780, uv: 3908 },
  { name: '16:00', value: 1890, uv: 4800 },
  { name: '20:00', value: 2390, uv: 3800 },
  { name: '23:59', value: 3490, uv: 4300 },
];

const StatCard: React.FC<{ title: string; value: string; trend: string; trendUp: boolean; icon: React.ElementType }> = ({ title, value, trend, trendUp, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-console-border shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      {trendUp ? <ArrowUpRight size={16} className="text-green-500 mr-1" /> : <ArrowDownRight size={16} className="text-red-500 mr-1" />}
      <span className={trendUp ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{trend}</span>
      <span className="text-gray-400 ml-2">vs last month</span>
    </div>
  </div>
);

export const DashboardView: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Project Overview</h1>
        <div className="flex space-x-3">
             <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">System Healthy</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value="2.4M" trend="+12.5%" trendUp={true} icon={Globe} />
        <StatCard title="Active Users" value="45.2k" trend="+5.2%" trendUp={true} icon={Users} />
        <StatCard title="Database Storage" value="124 GB" trend="+24%" trendUp={false} icon={Database} />
        <StatCard title="Error Rate" value="0.12%" trend="-0.04%" trendUp={true} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-console-border shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Traffic & Bandwidth</h3>
            <p className="text-sm text-gray-500">Real-time usage metrics for the last 24 hours</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-console-border shadow-sm">
           <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Regional Usage</h3>
            <p className="text-sm text-gray-500">Traffic distribution by region</p>
          </div>
          <div className="h-72">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                  { name: 'US-East', val: 65 },
                  { name: 'EU-West', val: 45 },
                  { name: 'Asia-S', val: 30 },
                  { name: 'US-West', val: 25 },
              ]} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f3f4f6" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={60} tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false}/>
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="val" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};