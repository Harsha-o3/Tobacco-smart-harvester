import React from 'react';
import DroneMap from '../components/Drones/DroneMap';
import TaskManager from '../components/Drones/TaskManager';

const DroneControlPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Drone Control Center</h1>
        <p className="text-gray-600">
          Monitor and control your autonomous drone fleet for precision tobacco harvesting.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DroneMap />
        <TaskManager />
      </div>

      {/* Fleet Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Active Drones</h4>
          <p className="text-3xl font-bold text-green-600">7</p>
          <p className="text-sm text-gray-500">of 12 total</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Tasks Completed</h4>
          <p className="text-3xl font-bold text-blue-600">23</p>
          <p className="text-sm text-gray-500">Today</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Avg Flight Time</h4>
          <p className="text-3xl font-bold text-orange-600">2.4h</p>
          <p className="text-sm text-gray-500">Per mission</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Success Rate</h4>
          <p className="text-3xl font-bold text-purple-600">96.8%</p>
          <p className="text-sm text-gray-500">Mission completion</p>
        </div>
      </div>
    </div>
  );
};

export default DroneControlPage;