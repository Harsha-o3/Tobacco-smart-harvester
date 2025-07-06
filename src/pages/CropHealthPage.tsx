import React from 'react';
import NDVIHeatmap from '../components/CropHealth/NDVIHeatmap';

const CropHealthPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Crop Health Analysis</h1>
        <p className="text-gray-600">
          Monitor plant health using NDVI analysis from drone imagery to identify stressed areas and optimize treatment.
        </p>
      </div>

      <NDVIHeatmap />
    </div>
  );
};

export default CropHealthPage;