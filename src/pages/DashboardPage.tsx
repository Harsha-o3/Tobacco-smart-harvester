import React from 'react';
import { Leaf, Plane as Drone, Thermometer, Shield, TrendingUp, Users, Clock, CheckCircle, Activity, MapPin } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const statsData = [
    {
      title: 'Ripe Leaves Detected',
      value: '2,847',
      icon: Leaf,
      trend: { value: 12, isPositive: true },
      color: 'green' as const,
    },
    {
      title: 'Active Drones',
      value: '7/12',
      icon: Drone,
      trend: { value: 5, isPositive: true },
      color: 'blue' as const,
    },
    {
      title: 'Avg Temperature',
      value: '24°C',
      icon: Thermometer,
      trend: { value: 2, isPositive: false },
      color: 'orange' as const,
    },
    {
      title: 'Security Alerts',
      value: '3',
      icon: Shield,
      trend: { value: 15, isPositive: false },
      color: 'red' as const,
    },
  ];

  const todaysTasks = [
    { id: 1, task: 'Field A Inspection', status: 'completed', time: '09:00 AM' },
    { id: 2, task: 'Drone Maintenance', status: 'in_progress', time: '11:30 AM' },
    { id: 3, task: 'Harvest Section B', status: 'pending', time: '02:00 PM' },
    { id: 4, task: 'Sensor Calibration', status: 'pending', time: '04:00 PM' },
  ];

  const quickActions = [
    { id: 'leaf-detection', label: 'Detect Leaves', icon: Leaf, color: 'green' },
    { id: 'drone-control', label: 'Deploy Drone', icon: Drone, color: 'blue' },
    { id: 'analytics', label: 'View Analytics', icon: TrendingUp, color: 'orange' },
    { id: 'crop-health', label: 'Crop Health', icon: Activity, color: 'purple' },
    { id: 'field-mapping', label: 'Field Mapping', icon: MapPin, color: 'indigo' },
    { id: 'communication', label: 'Team Chat', icon: Users, color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-green-100">
          {user?.role === 'admin' 
            ? 'Your tobacco farm is performing well. Here\'s your system overview.'
            : user?.role === 'farmer'
            ? 'Your farm operations are running smoothly. Monitor your fields and manage your harvest efficiently.'
            : 'Here\'s your personalized dashboard for today\'s operations.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'completed' ? 'bg-green-500' :
                    task.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : task.status === 'in_progress' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorClasses = {
              green: 'bg-green-50 hover:bg-green-100 text-green-600',
              blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
              orange: 'bg-orange-50 hover:bg-orange-100 text-orange-600',
              purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
              indigo: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
              pink: 'bg-pink-50 hover:bg-pink-100 text-pink-600',
            };
            
            return (
              <button 
                key={action.id}
                className={`flex flex-col items-center p-4 rounded-lg transition-colors ${colorClasses[action.color as keyof typeof colorClasses]}`}
              >
                <Icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Farm Overview for Farmers */}
      {user?.role === 'farmer' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Total Fields</h4>
              <p className="text-2xl font-bold text-green-600">4</p>
              <p className="text-sm text-gray-500">125 hectares</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">This Season</h4>
              <p className="text-2xl font-bold text-blue-600">2,847 kg</p>
              <p className="text-sm text-gray-500">harvested</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900">Health Score</h4>
              <p className="text-2xl font-bold text-orange-600">92%</p>
              <p className="text-sm text-gray-500">excellent</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;