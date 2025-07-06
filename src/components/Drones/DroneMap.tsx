import React from 'react';
import { MapPin, Navigation, Battery, Signal } from 'lucide-react';

interface Drone {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'charging' | 'maintenance';
  battery: number;
  signal: number;
  location: { lat: number; lng: number };
  currentTask?: string;
}

const DroneMap: React.FC = () => {
  const drones: Drone[] = [
    {
      id: 'DH-001',
      name: 'Harvester Alpha',
      status: 'active',
      battery: 85,
      signal: 95,
      location: { lat: 36.1627, lng: -86.7816 },
      currentTask: 'Harvesting Field A',
    },
    {
      id: 'DH-002',
      name: 'Harvester Beta',
      status: 'idle',
      battery: 92,
      signal: 88,
      location: { lat: 36.1647, lng: -86.7796 },
    },
    {
      id: 'DH-003',
      name: 'Harvester Gamma',
      status: 'charging',
      battery: 45,
      signal: 0,
      location: { lat: 36.1607, lng: -86.7836 },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'idle':
        return 'bg-blue-600';
      case 'charging':
        return 'bg-yellow-600';
      case 'maintenance':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Drone Fleet Overview</h3>
      
      {/* Mock Map Area */}
      <div className="relative bg-green-50 rounded-lg h-64 mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-8 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-green-300"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Drone Markers */}
        {drones.map((drone, index) => (
          <div
            key={drone.id}
            className={`absolute w-4 h-4 rounded-full ${getStatusColor(drone.status)} transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 20}%`,
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
              {drone.name}
            </div>
          </div>
        ))}
      </div>

      {/* Drone List */}
      <div className="space-y-4">
        {drones.map((drone) => (
          <div key={drone.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(drone.status)}`}></div>
              <div>
                <h4 className="font-medium text-gray-900">{drone.name}</h4>
                <p className="text-sm text-gray-600">{drone.id}</p>
                {drone.currentTask && (
                  <p className="text-sm text-green-600">{drone.currentTask}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Battery className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{drone.battery}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Signal className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">{drone.signal}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {drone.location.lat.toFixed(4)}, {drone.location.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DroneMap;