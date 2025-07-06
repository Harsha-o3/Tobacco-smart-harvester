import React, { useState } from 'react';
import { Plus, Play, Pause, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { DroneTask } from '../../types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<DroneTask[]>([
    {
      id: '1',
      droneId: 'DH-001',
      taskType: 'harvest',
      status: 'in_progress',
      location: { lat: 36.1627, lng: -86.7816 },
      assignedTo: 'operator-1',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      description: 'Harvest ripe leaves in Field A, Section 3',
      priority: 'high',
    },
    {
      id: '2',
      droneId: 'DH-002',
      taskType: 'survey',
      status: 'pending',
      location: { lat: 36.1647, lng: -86.7796 },
      assignedTo: 'operator-2',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      description: 'Survey Field B for leaf maturity assessment',
      priority: 'medium',
    },
    {
      id: '3',
      droneId: 'DH-001',
      taskType: 'harvest',
      status: 'completed',
      location: { lat: 36.1607, lng: -86.7836 },
      assignedTo: 'operator-1',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      description: 'Completed harvest in Field A, Section 1',
      priority: 'high',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in_progress':
        return Play;
      case 'pending':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-red-600 bg-red-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status);
          return (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(task.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 capitalize">
                      {task.taskType} - {task.droneId}
                    </h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
                  {task.completedAt && (
                    <span>Completed: {new Date(task.completedAt).toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span>{task.location.lat.toFixed(4)}, {task.location.lng.toFixed(4)}</span>
                </div>
              </div>
              
              {task.status === 'pending' && (
                <div className="mt-3 flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    <Play className="w-3 h-3" />
                    <span>Start</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    <Pause className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;