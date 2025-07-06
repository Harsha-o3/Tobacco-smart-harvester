import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('harvest');

  // Mock historical data
  const harvestData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    leaves: Math.floor(Math.random() * 100) + 50,
    yield: Math.floor(Math.random() * 50) + 25,
  }));

  const fieldProductivity = [
    { field: 'Field A', productivity: 85, leaves: 1200 },
    { field: 'Field B', productivity: 78, leaves: 980 },
    { field: 'Field C', productivity: 92, leaves: 1450 },
    { field: 'Field D', productivity: 65, leaves: 780 },
  ];

  const harvestPrediction = [
    { week: 'This Week', predicted: 890, actual: 847 },
    { week: 'Next Week', predicted: 920, actual: null },
    { week: 'Week 3', predicted: 850, actual: null },
    { week: 'Week 4', predicted: 780, actual: null },
  ];

  const riskFactors = [
    { name: 'Weather Risk', value: 15, color: '#f59e0b' },
    { name: 'Disease Risk', value: 8, color: '#ef4444' },
    { name: 'Equipment Risk', value: 5, color: '#3b82f6' },
    { name: 'Other', value: 2, color: '#6b7280' },
  ];

  const metrics = [
    { id: 'harvest', label: 'Harvest Trends', icon: TrendingUp },
    { id: 'productivity', label: 'Field Productivity', icon: Target },
    { id: 'predictions', label: 'Yield Predictions', icon: Calendar },
    { id: 'risks', label: 'Risk Analysis', icon: AlertTriangle },
  ];

  const renderChart = () => {
    switch (selectedMetric) {
      case 'harvest':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={harvestData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="leaves" stroke="#16a34a" strokeWidth={2} name="Leaves Detected" />
              <Line type="monotone" dataKey="yield" stroke="#2563eb" strokeWidth={2} name="Harvest Yield (kg)" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'productivity':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={fieldProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="field" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="productivity" fill="#16a34a" name="Productivity %" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'predictions':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={harvestPrediction}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} name="Predicted Yield" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" stroke="#16a34a" strokeWidth={2} name="Actual Yield" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'risks':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={riskFactors}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {riskFactors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Predictive Analytics</h1>
        <p className="text-gray-600">
          AI-powered insights for optimal harvest timing and yield forecasting.
        </p>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Optimal Harvest Window</h3>
          <p className="text-3xl font-bold mb-1">5-7 Days</p>
          <p className="text-green-100">Based on current conditions</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Predicted Yield</h3>
          <p className="text-3xl font-bold mb-1">2,847 kg</p>
          <p className="text-blue-100">+12% vs last season</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
          <p className="text-3xl font-bold mb-1">Low (15%)</p>
          <p className="text-orange-100">Weather-related concerns</p>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Analytics Dashboard</h3>
          <div className="flex space-x-2">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <button
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedMetric === metric.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{metric.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {renderChart()}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-600 rounded-lg">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Harvest Timing</h4>
              <p className="text-sm text-gray-600">
                Based on current maturity rates, begin harvesting Field C in 3-4 days for optimal yield.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Resource Allocation</h4>
              <p className="text-sm text-gray-600">
                Deploy 2 additional drones to Field A to maximize efficiency during peak harvest window.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <div className="p-2 bg-yellow-600 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Weather Alert</h4>
              <p className="text-sm text-gray-600">
                Potential rain forecast in 48 hours. Consider accelerating harvest schedule for exposed fields.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;