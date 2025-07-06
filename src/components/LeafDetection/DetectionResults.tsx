import React from 'react';
import { CheckCircle, Clock, AlertCircle, MapPin } from 'lucide-react';
import { LeafDetection } from '../../types';

interface DetectionResultsProps {
  detection: LeafDetection | null;
  isProcessing: boolean;
}

const DetectionResults: React.FC<DetectionResultsProps> = ({ detection, isProcessing }) => {
  if (isProcessing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Processing image...</span>
        </div>
      </div>
    );
  }

  if (!detection) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Upload an image to see detection results</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'analyzed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'analyzed':
        return CheckCircle;
      case 'processing':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(detection.status);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Results</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Status</span>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(detection.status)}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">{detection.status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Ripe Leaves Detected</span>
          <span className="text-2xl font-bold text-green-600">{detection.leafCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Confidence</span>
          <span className="text-sm font-medium text-gray-900">{(detection.confidence * 100).toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Location</span>
          <div className="flex items-center space-x-1 text-sm text-gray-900">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{detection.location.lat.toFixed(6)}, {detection.location.lng.toFixed(6)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Timestamp</span>
          <span className="text-sm text-gray-900">
            {new Date(detection.timestamp).toLocaleString()}
          </span>
        </div>

        {detection.boundingBoxes.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Detected Objects</h4>
            <div className="space-y-2">
              {detection.boundingBoxes.map((box, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Leaf {index + 1}</span>
                  <span className="text-sm font-medium text-green-600">
                    {(box.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionResults;