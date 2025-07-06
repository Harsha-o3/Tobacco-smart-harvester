import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Plane as Drone, Leaf, Calendar, Filter } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedFarm, setSelectedFarm] = useState('all');

  // Mock data for different farms
  const farms = [
    { id: 'all', name: 'All Farms' },
    { id: 'farm-1', name: 'Green Valley Farm' },
    { id: 'farm-2', name: 'Sunrise Tobacco Co.' },
    { id: 'farm-3', name: 'Heritage Fields' },
  ];

  // KPI Data
  const kpiData = {
    totalHarvested: 15847, // hectares
    totalYield: 8924, // kg
    activeDrones: 47,
    leafDetectionAccuracy: 94.2,
    farms: 3,
    operators: 12,
  };

  // Harvest trends data
  const harvestTrends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    hectares: Math.floor(Math.random() * 200) + 300,
    yield: Math.floor(Math.random() * 150) + 200,
  }));

  // Farm performance data
  const farmPerformance = [
    { farm: 'Green Valley', hectares: 5200, yield: 3400, efficiency: 92 },
    { farm: 'Sunrise Tobacco', hectares: 4800, yield: 3100, efficiency: 88 },
    { farm: 'Heritage Fields', hectares: 5847, yield: 2424, efficiency: 85 },
  ];

  // Drone utilization data
  const droneUtilization = [
    { name: 'Active', value: 47, color: '#16a34a' },
    { name: 'Idle', value: 23, color: '#eab308' },
    { name: 'Maintenance', value: 8, color: '#f97316' },
    { name: 'Offline', value: 5, color: '#ef4444' },
  ];

  // Model performance data
  const modelPerformance = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en', { month: 'short' }),
    accuracy: 85 + Math.random() * 10,
    detections: Math.floor(Math.random() * 1000) + 2000,
  }));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedFarm}
                onChange={(e) => setSelectedFarm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Harvested Area</p>
              <p className="text-2xl font-bold text-green-600">{kpiData.totalHarvested.toLocaleString()}</p>
              <p className="text-sm text-gray-500">hectares</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Yield</p>
              <p className="text-2xl font-bold text-blue-600">{kpiData.totalYield.toLocaleString()}</p>
              <p className="text-sm text-gray-500">kg</p>
            </div>
            <Leaf className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Drones</p>
              <p className="text-2xl font-bold text-orange-600">{kpiData.activeDrones}</p>
              <p className="text-sm text-gray-500">fleet</p>
            </div>
            <Drone className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-2xl font-bold text-purple-600">{kpiData.leafDetectionAccuracy}%</p>
              <p className="text-sm text-gray-500">detection</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Farms</p>
              <p className="text-2xl font-bold text-indigo-600">{kpiData.farms}</p>
              <p className="text-sm text-gray-500">locations</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Operators</p>
              <p className="text-2xl font-bold text-pink-600">{kpiData.operators}</p>
              <p className="text-sm text-gray-500">active</p>
            </div>
            <Users className="w-8 h-8 text-pink-600" />
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Harvest Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Harvest Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={harvestTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="hectares" stroke="#16a34a" strokeWidth={2} name="Hectares" />
              <Line type="monotone" dataKey="yield" stroke="#2563eb" strokeWidth={2} name="Yield (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Drone Utilization */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Drone Fleet Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={droneUtilization}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {droneUtilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farm Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={farmPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="farm" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="hectares" fill="#16a34a" name="Hectares" />
              <Bar dataKey="yield" fill="#2563eb" name="Yield (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Model Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Model Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} name="Accuracy %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Farm Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Hectares</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Yield (kg)</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Active Drones</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {farmPerformance.map((farm, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{farm.farm}</td>
                  <td className="py-3 px-4 text-gray-600">{farm.hectares.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{farm.yield.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      farm.efficiency >= 90 ? 'bg-green-100 text-green-700' :
                      farm.efficiency >= 85 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {farm.efficiency}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{Math.floor(Math.random() * 10) + 5}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;