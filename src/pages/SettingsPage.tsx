import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Wifi, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      alerts: true,
    },
    system: {
      autoHarvest: false,
      dataRetention: '90',
      backupFrequency: 'daily',
      maintenanceMode: false,
    },
    thresholds: {
      temperature: { min: 15, max: 32 },
      humidity: { min: 50, max: 85 },
      soilMoisture: { min: 35, max: 75 },
    },
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      farmName: 'Green Valley Farm',
      location: 'Tennessee, USA',
    },
  });

  const handleSave = () => {
    // Simulate saving settings
    toast.success('Settings saved successfully!');
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const updateSystemSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [key]: value,
      },
    }));
  };

  const updateThreshold = (category: string, type: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [category]: {
          ...prev.thresholds[category as keyof typeof prev.thresholds],
          [type]: value,
        },
      },
    }));
  };

  const updateProfile = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Configure your account preferences, system settings, and operational parameters.
        </p>
      </div>

      {/* User Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <UserIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={settings.profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={settings.profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  value={settings.profile.farmName}
                  onChange={(e) => updateProfile('farmName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600 capitalize font-medium">
                Role: {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <span className="text-gray-700 capitalize font-medium">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <p className="text-sm text-gray-500">
                    {key === 'email' && 'Receive notifications via email'}
                    {key === 'push' && 'Browser push notifications'}
                    {key === 'sms' && 'SMS text message alerts'}
                    {key === 'alerts' && 'System alert notifications'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateNotificationSetting(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Settings - Show for admin and farmer */}
      {(user?.role === 'admin' || user?.role === 'farmer') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Auto-Harvest Mode</h4>
                <p className="text-sm text-gray-600">Automatically trigger harvest when conditions are optimal</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.system.autoHarvest}
                  onChange={(e) => updateSystemSetting('autoHarvest', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention Period (days)
              </label>
              <select
                value={settings.system.dataRetention}
                onChange={(e) => updateSystemSetting('dataRetention', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Frequency
              </label>
              <select
                value={settings.system.backupFrequency}
                onChange={(e) => updateSystemSetting('backupFrequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Alert Thresholds */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Alert Thresholds</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(settings.thresholds).map(([category, values]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3 capitalize">
                {category.replace(/([A-Z])/g, ' $1')}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <input
                    type="number"
                    value={values.min}
                    onChange={(e) => updateThreshold(category, 'min', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <input
                    type="number"
                    value={values.max}
                    onChange={(e) => updateThreshold(category, 'max', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;