import React, { useState } from 'react';
import { Package, AlertTriangle, Calendar, Plus, Wrench, Battery } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: 'equipment' | 'parts' | 'sensors' | 'consumables';
  quantity: number;
  minThreshold: number;
  unit: string;
  location: string;
  lastUpdated: string;
  nextMaintenance?: string;
  status: 'available' | 'in_use' | 'maintenance' | 'low_stock';
}

const InventoryManager: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Drone Harvester Alpha',
      category: 'equipment',
      quantity: 1,
      minThreshold: 1,
      unit: 'unit',
      location: 'Hangar A',
      lastUpdated: new Date().toISOString(),
      nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'available',
    },
    {
      id: '2',
      name: 'Rotavator Blades',
      category: 'parts',
      quantity: 8,
      minThreshold: 5,
      unit: 'pieces',
      location: 'Storage Room B',
      lastUpdated: new Date().toISOString(),
      status: 'available',
    },
    {
      id: '3',
      name: 'Temperature Sensors',
      category: 'sensors',
      quantity: 3,
      minThreshold: 5,
      unit: 'units',
      location: 'Electronics Storage',
      lastUpdated: new Date().toISOString(),
      status: 'low_stock',
    },
    {
      id: '4',
      name: 'Drone Batteries',
      category: 'parts',
      quantity: 12,
      minThreshold: 8,
      unit: 'units',
      location: 'Battery Storage',
      lastUpdated: new Date().toISOString(),
      status: 'available',
    },
    {
      id: '5',
      name: 'Fertilizer',
      category: 'consumables',
      quantity: 150,
      minThreshold: 100,
      unit: 'kg',
      location: 'Chemical Storage',
      lastUpdated: new Date().toISOString(),
      status: 'available',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    { value: 'all', label: 'All Items', icon: Package },
    { value: 'equipment', label: 'Equipment', icon: Wrench },
    { value: 'parts', label: 'Parts', icon: Package },
    { value: 'sensors', label: 'Sensors', icon: Battery },
    { value: 'consumables', label: 'Consumables', icon: Package },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'in_use': return 'text-blue-600 bg-blue-50';
      case 'maintenance': return 'text-orange-600 bg-orange-50';
      case 'low_stock': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low_stock': return AlertTriangle;
      case 'maintenance': return Wrench;
      default: return Package;
    }
  };

  const filteredInventory = inventory.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const lowStockItems = inventory.filter(item => item.quantity <= item.minThreshold);
  const maintenanceDue = inventory.filter(item => 
    item.nextMaintenance && new Date(item.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="space-y-6">
      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance Due</p>
              <p className="text-2xl font-bold text-orange-600">{maintenanceDue.length}</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Wrench className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Use</p>
              <p className="text-2xl font-bold text-blue-600">
                {inventory.filter(item => item.status === 'in_use').length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Battery className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Inventory List */}
        <div className="space-y-4">
          {filteredInventory.map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(item.status)}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">
                        {item.category} • {item.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {item.quantity} {item.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        Min: {item.minThreshold} {item.unit}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </span>
                      {item.nextMaintenance && (
                        <p className="text-xs text-gray-500 mt-1">
                          Maintenance: {new Date(item.nextMaintenance).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {item.quantity <= item.minThreshold && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-700">
                        Low stock alert: Only {item.quantity} {item.unit} remaining
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Maintenance</h3>
        <div className="space-y-3">
          {maintenanceDue.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Due: {item.nextMaintenance ? new Date(item.nextMaintenance).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                Schedule
              </button>
            </div>
          ))}
          
          {maintenanceDue.length === 0 && (
            <p className="text-gray-500 text-center py-4">No maintenance due in the next 7 days</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;