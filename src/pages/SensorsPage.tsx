import React, { useState } from 'react';
import SensorChart from '../components/Sensors/SensorChart';
import SensorStatus from '../components/Sensors/SensorStatus';

const SensorsPage: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Mock sensor data
  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 20 + Math.sin(i * 0.5) * 5 + Math.random() * 2,
  }));

  const humidityData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 60 + Math.cos(i * 0.4) * 15 + Math.random() * 5,
  }));

  const soilMoistureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: 45 + Math.sin(i * 0.3) * 10 + Math.random() * 3,
  }));

  const sensors = [
    {
      id: 'TEMP-001',
      name: 'Field Temperature',
      type: 'temperature',
      value: 24.5,
      unit: '°C',
      status: 'normal' as const,
      lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'HUM-001',
      name: 'Air Humidity',
      type: 'humidity',
      value: 68,
      unit: '%',
      status: 'normal' as const,
      lastUpdate: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    },
    {
      id: 'SOIL-001',
      name: 'Soil Moisture A',
      type: 'soil_moisture',
      value: 42,
      unit: '%',
      status: 'warning' as const,
      lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: 'SOIL-002',
      name: 'Soil Moisture B',
      type: 'soil_moisture',
      value: 28,
      unit: '%',
      status: 'critical' as const,
      lastUpdate: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    },
  ];

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Environmental Monitoring</h1>
            <p className="text-gray-600">
              Real-time IoT sensor data for optimal growing conditions.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Time Range:</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <SensorStatus sensors={sensors} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <SensorChart
          title="Temperature"
          data={temperatureData}
          color="#16a34a"
          unit="°C"
        />
        <SensorChart
          title="Humidity"
          data={humidityData}
          color="#2563eb"
          unit="%"
        />
        <SensorChart
          title="Soil Moisture"
          data={soilMoistureData}
          color="#f59e0b"
          unit="%"
        />
      </div>

      {/* Alerts and Thresholds */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Temperature</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Optimal:</span>
                <span className="text-sm font-medium">20-28°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Warning:</span>
                <span className="text-sm font-medium text-yellow-600">&lt;15°C or &gt;32°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Critical:</span>
                <span className="text-sm font-medium text-red-600">&lt;10°C or &gt;35°C</span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Humidity</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Optimal:</span>
                <span className="text-sm font-medium">60-80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Warning:</span>
                <span className="text-sm font-medium text-yellow-600">&lt;50% or &gt;85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Critical:</span>
                <span className="text-sm font-medium text-red-600">&lt;40% or &gt;90%</span>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Soil Moisture</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Optimal:</span>
                <span className="text-sm font-medium">40-70%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Warning:</span>
                <span className="text-sm font-medium text-yellow-600">&lt;35% or &gt;75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Critical:</span>
                <span className="text-sm font-medium text-red-600">&lt;30% or &gt;80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorsPage;