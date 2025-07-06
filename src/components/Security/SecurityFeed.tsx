import React, { useState } from 'react';
import { Camera, Play, Pause, Maximize, AlertTriangle } from 'lucide-react';
import { SecurityAlert } from '../../types';

const SecurityFeed: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState('CAM-001');
  const [isPlaying, setIsPlaying] = useState(true);

  const cameras = [
    { id: 'CAM-001', name: 'Main Entrance', status: 'online' },
    { id: 'CAM-002', name: 'Field A North', status: 'online' },
    { id: 'CAM-003', name: 'Field A South', status: 'offline' },
    { id: 'CAM-004', name: 'Storage Building', status: 'online' },
    { id: 'CAM-005', name: 'Equipment Shed', status: 'online' },
  ];

  const recentAlerts: SecurityAlert[] = [
    {
      id: '1',
      cameraId: 'CAM-002',
      alertType: 'motion',
      confidence: 0.95,
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      location: { lat: 36.1627, lng: -86.7816 },
      status: 'active',
    },
    {
      id: '2',
      cameraId: 'CAM-001',
      alertType: 'intrusion',
      confidence: 0.87,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: { lat: 36.1647, lng: -86.7796 },
      status: 'resolved',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-50';
      case 'offline':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getAlertColor = (alertType: string) => {
    switch (alertType) {
      case 'intrusion':
        return 'text-red-600 bg-red-50';
      case 'motion':
        return 'text-yellow-600 bg-yellow-50';
      case 'animal':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Camera Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Camera Feed</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-white">
                  {cameras.find(c => c.id === selectedCamera)?.name || 'Camera Feed'}
                </p>
                <p className="text-gray-400 text-sm">Live Stream</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Cameras</h4>
            {cameras.map((camera) => (
              <button
                key={camera.id}
                onClick={() => setSelectedCamera(camera.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCamera === camera.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{camera.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(camera.status)}`}>
                    {camera.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getAlertColor(alert.alertType)}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">
                    {alert.alertType} detected
                  </h4>
                  <p className="text-sm text-gray-600">
                    {cameras.find(c => c.id === alert.cameraId)?.name} - {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {(alert.confidence * 100).toFixed(0)}% confidence
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.status === 'active' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityFeed;