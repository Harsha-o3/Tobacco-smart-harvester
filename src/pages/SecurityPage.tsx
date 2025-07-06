import React from 'react';
import SecurityFeed from '../components/Security/SecurityFeed';

const SecurityPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Security Monitoring</h1>
        <p className="text-gray-600">
          AI-powered CCTV monitoring with real-time intrusion detection and alerts.
        </p>
      </div>

      <SecurityFeed />

      {/* Security Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Active Cameras</h4>
          <p className="text-3xl font-bold text-green-600">8</p>
          <p className="text-sm text-gray-500">of 10 total</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Alerts Today</h4>
          <p className="text-3xl font-bold text-yellow-600">3</p>
          <p className="text-sm text-gray-500">2 resolved</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Detection Accuracy</h4>
          <p className="text-3xl font-bold text-blue-600">94.2%</p>
          <p className="text-sm text-gray-500">AI model performance</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">System Uptime</h4>
          <p className="text-3xl font-bold text-purple-600">99.8%</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;