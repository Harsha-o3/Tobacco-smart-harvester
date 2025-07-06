import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Target, Layers } from 'lucide-react';

interface GPSPosition {
  id: string;
  name: string;
  type: 'drone' | 'machine' | 'sensor';
  coordinates: { lat: number; lng: number };
  status: 'active' | 'idle' | 'offline';
  lastUpdate: string;
  battery?: number;
}

const GPSTracker: React.FC = () => {
  const [positions, setPositions] = useState<GPSPosition[]>([
    {
      id: 'drone-1',
      name: 'Harvester Alpha',
      type: 'drone',
      coordinates: { lat: 36.1627, lng: -86.7816 },
      status: 'active',
      lastUpdate: new Date().toISOString(),
      battery: 85,
    },
    {
      id: 'drone-2',
      name: 'Harvester Beta',
      type: 'drone',
      coordinates: { lat: 36.1647, lng: -86.7796 },
      status: 'idle',
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      battery: 92,
    },
    {
      id: 'machine-1',
      name: 'Tractor Unit 1',
      type: 'machine',
      coordinates: { lat: 36.1607, lng: -86.7836 },
      status: 'active',
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
  ]);

  const [fieldBoundaries, setFieldBoundaries] = useState([
    { lat: 36.1620, lng: -86.7820 },
    { lat: 36.1650, lng: -86.7820 },
    { lat: 36.1650, lng: -86.7790 },
    { lat: 36.1620, lng: -86.7790 },
  ]);

  // Simulate real-time position updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev => prev.map(pos => ({
        ...pos,
        coordinates: {
          lat: pos.coordinates.lat + (Math.random() - 0.5) * 0.0001,
          lng: pos.coordinates.lng + (Math.random() - 0.5) * 0.0001,
        },
        lastUpdate: new Date().toISOString(),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drone': return '🚁';
      case 'machine': return '🚜';
      case 'sensor': return '📡';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Field Map */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Field GPS Tracking</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Layers className="w-4 h-4" />
              <span>Edit Boundaries</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Target className="w-4 h-4" />
              <span>Center View</span>
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative bg-green-50 rounded-lg h-96 overflow-hidden">
          {/* Field Boundary */}
          <svg className="absolute inset-0 w-full h-full">
            <polygon
              points={fieldBoundaries.map((point, index) => 
                `${50 + index * 100},${50 + index * 50}`
              ).join(' ')}
              fill="rgba(34, 197, 94, 0.1)"
              stroke="rgb(34, 197, 94)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* GPS Positions */}
          {positions.map((position, index) => (
            <div
              key={position.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 20}%`,
              }}
            >
              <div className={`w-4 h-4 rounded-full ${getStatusColor(position.status)} animate-pulse`}>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs font-medium whitespace-nowrap">
                  {getTypeIcon(position.type)} {position.name}
                </div>
              </div>
            </div>
          ))}

          {/* Coordinates Display */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Field Center</h4>
            <p className="text-xs text-gray-600">
              Lat: {fieldBoundaries[0].lat.toFixed(6)}
            </p>
            <p className="text-xs text-gray-600">
              Lng: {fieldBoundaries[0].lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      {/* Position List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Position Tracking</h3>
        <div className="space-y-4">
          {positions.map((position) => (
            <div key={position.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(position.status)}`}></div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {getTypeIcon(position.type)} {position.name}
                  </h4>
                  <p className="text-sm text-gray-600 capitalize">{position.type} • {position.status}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {position.coordinates.lat.toFixed(6)}, {position.coordinates.lng.toFixed(6)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Updated: {new Date(position.lastUpdate).toLocaleTimeString()}
                  </p>
                </div>
                {position.battery && (
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-3 border border-gray-300 rounded-sm">
                      <div 
                        className={`h-full rounded-sm ${
                          position.battery > 50 ? 'bg-green-500' : 
                          position.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${position.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{position.battery}%</span>
                  </div>
                )}
                <button className="p-2 hover:bg-gray-200 rounded">
                  <Navigation className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geo-tagged Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Geo-tagged Detections</h4>
          <p className="text-3xl font-bold text-green-600">247</p>
          <p className="text-sm text-gray-500">This week</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Sensor Readings</h4>
          <p className="text-3xl font-bold text-blue-600">1,284</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Harvest Points</h4>
          <p className="text-3xl font-bold text-orange-600">89</p>
          <p className="text-sm text-gray-500">Today</p>
        </div>
      </div>
    </div>
  );
};

export default GPSTracker;