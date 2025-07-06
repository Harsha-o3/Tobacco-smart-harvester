import React from 'react';
import { Clock, Leaf, Plane as Drone, Shield, Thermometer } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'leaf_detection',
      message: 'New leaf detection completed in Field A',
      time: '2 minutes ago',
      icon: Leaf,
      color: 'text-green-600 bg-green-50',
    },
    {
      id: 2,
      type: 'drone_task',
      message: 'Drone DH-001 completed harvest task',
      time: '15 minutes ago',
      icon: Drone,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 3,
      type: 'security_alert',
      message: 'Motion detected in security zone B',
      time: '1 hour ago',
      icon: Shield,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      id: 4,
      type: 'sensor_reading',
      message: 'Temperature threshold exceeded in greenhouse',
      time: '2 hours ago',
      icon: Thermometer,
      color: 'text-red-600 bg-red-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <div className="flex items-center mt-1">
                  <Clock className="w-3 h-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;