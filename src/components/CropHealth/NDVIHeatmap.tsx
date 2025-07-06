import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Calendar } from 'lucide-react';

interface NDVIData {
  id: string;
  coordinates: { lat: number; lng: number };
  ndviValue: number;
  healthStatus: 'healthy' | 'stressed' | 'critical';
  timestamp: string;
}

const NDVIHeatmap: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('current');
  
  // Mock NDVI data
  const ndviData: NDVIData[] = Array.from({ length: 100 }, (_, i) => ({
    id: `ndvi-${i}`,
    coordinates: {
      lat: 36.1627 + (Math.random() - 0.5) * 0.01,
      lng: -86.7816 + (Math.random() - 0.5) * 0.01,
    },
    ndviValue: 0.2 + Math.random() * 0.6,
    healthStatus: Math.random() > 0.7 ? 'stressed' : Math.random() > 0.9 ? 'critical' : 'healthy',
    timestamp: new Date().toISOString(),
  }));

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'stressed': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const healthStats = {
    healthy: ndviData.filter(d => d.healthStatus === 'healthy').length,
    stressed: ndviData.filter(d => d.healthStatus === 'stressed').length,
    critical: ndviData.filter(d => d.healthStatus === 'critical').length,
  };

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Healthy Areas</p>
              <p className="text-2xl font-bold text-green-600">{healthStats.healthy}</p>
              <p className="text-sm text-gray-500">{((healthStats.healthy / ndviData.length) * 100).toFixed(1)}% of field</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stressed Areas</p>
              <p className="text-2xl font-bold text-yellow-600">{healthStats.stressed}</p>
              <p className="text-sm text-gray-500">{((healthStats.stressed / ndviData.length) * 100).toFixed(1)}% of field</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Areas</p>
              <p className="text-2xl font-bold text-red-600">{healthStats.critical}</p>
              <p className="text-sm text-gray-500">{((healthStats.critical / ndviData.length) * 100).toFixed(1)}% of field</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* NDVI Heatmap */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">NDVI Health Heatmap</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="current">Current</option>
              <option value="1week">1 Week Ago</option>
              <option value="1month">1 Month Ago</option>
              <option value="3months">3 Months Ago</option>
            </select>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="relative bg-green-50 rounded-lg h-96 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-2">
            {ndviData.map((point, index) => (
              <div
                key={point.id}
                className={`rounded ${getHealthColor(point.healthStatus)} opacity-80 hover:opacity-100 cursor-pointer transition-opacity`}
                title={`NDVI: ${point.ndviValue.toFixed(3)} - ${point.healthStatus}`}
              />
            ))}
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3 shadow-sm">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Health Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600">Healthy (NDVI &gt; 0.6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-xs text-gray-600">Stressed (NDVI 0.3-0.6)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-xs text-gray-600">Critical (NDVI &lt; 0.3)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Comparison */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Health Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Current', '1 Week Ago', '1 Month Ago', '3 Months Ago'].map((period, index) => (
            <div key={period} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{period}</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg NDVI:</span>
                  <span className="text-sm font-medium">{(0.5 + Math.random() * 0.3).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Healthy:</span>
                  <span className="text-sm font-medium text-green-600">{Math.floor(60 + Math.random() * 30)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stressed:</span>
                  <span className="text-sm font-medium text-yellow-600">{Math.floor(10 + Math.random() * 20)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Critical:</span>
                  <span className="text-sm font-medium text-red-600">{Math.floor(Math.random() * 10)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NDVIHeatmap;