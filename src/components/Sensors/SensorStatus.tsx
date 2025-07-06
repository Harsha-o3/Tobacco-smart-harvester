import React from 'react';
import { Thermometer, Droplets, Gauge, AlertTriangle } from 'lucide-react';

interface SensorStatusProps {
  sensors: Array<{
    id: string;
    name: string;
    type: string;
    value: number;
    unit: string;
    status: 'normal' | 'warning' | 'critical';
    lastUpdate: string;
  }>;
}

const SensorStatus: React.FC<SensorStatusProps> = ({ sensors }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return Thermometer;
      case 'humidity':
        return Droplets;
      case 'soil_moisture':
        return Gauge;
      default:
        return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sensor Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensors.map((sensor) => {
          const Icon = getIcon(sensor.type);
          return (
            <div key={sensor.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{sensor.name}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                  {sensor.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {sensor.value}{sensor.unit}
                  </span>
                  <p className="text-sm text-gray-500">
                    Updated: {new Date(sensor.lastUpdate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensorStatus;