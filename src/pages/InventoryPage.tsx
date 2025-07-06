import React from 'react';
import InventoryManager from '../components/Inventory/InventoryManager';

const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Inventory Management</h1>
        <p className="text-gray-600">
          Track equipment, parts, sensors, and consumables with automated low-stock alerts and maintenance scheduling.
        </p>
      </div>

      <InventoryManager />
    </div>
  );
};

export default InventoryPage;