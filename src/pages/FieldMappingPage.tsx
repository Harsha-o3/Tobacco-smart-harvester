import React from 'react';
import GPSTracker from '../components/FieldMapping/GPSTracker';

const FieldMappingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Field Mapping & GPS Tracking</h1>
        <p className="text-gray-600">
          Real-time GPS tracking of drones and equipment with field boundary management and geo-tagged data collection.
        </p>
      </div>

      <GPSTracker />
    </div>
  );
};

export default FieldMappingPage;