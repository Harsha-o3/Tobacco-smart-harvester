import React from 'react';
import ReportGenerator from '../components/Reports/ReportGenerator';

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Export</h1>
        <p className="text-gray-600">
          Generate comprehensive reports in PDF or Excel format and automatically email them to stakeholders.
        </p>
      </div>

      <ReportGenerator />
    </div>
  );
};

export default ReportsPage;