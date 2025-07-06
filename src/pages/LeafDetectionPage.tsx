import React, { useState } from 'react';
import ImageUpload from '../components/LeafDetection/ImageUpload';
import DetectionResults from '../components/LeafDetection/DetectionResults';
import { LeafDetection } from '../types';

const LeafDetectionPage: React.FC = () => {
  const [currentDetection, setCurrentDetection] = useState<LeafDetection | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate YOLOv7 processing
    setTimeout(() => {
      const mockDetection: LeafDetection = {
        id: Date.now().toString(),
        imageUrl: URL.createObjectURL(file),
        leafCount: Math.floor(Math.random() * 50) + 10,
        confidence: 0.85 + Math.random() * 0.14,
        location: {
          lat: 36.1627 + (Math.random() - 0.5) * 0.01,
          lng: -86.7816 + (Math.random() - 0.5) * 0.01,
        },
        timestamp: new Date().toISOString(),
        status: 'analyzed',
        boundingBoxes: Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
          x: Math.random() * 500,
          y: Math.random() * 500,
          width: 50 + Math.random() * 100,
          height: 50 + Math.random() * 100,
          confidence: 0.7 + Math.random() * 0.29,
          class: 'ripe_leaf',
        })),
      };
      
      setCurrentDetection(mockDetection);
      setIsProcessing(false);
    }, 3000);
  };

  const recentDetections = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      leafCount: 34,
      confidence: 0.92,
      location: 'Field A-3',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      leafCount: 28,
      confidence: 0.88,
      location: 'Field B-1',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      leafCount: 42,
      confidence: 0.94,
      location: 'Field A-7',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaf Detection System</h1>
        <p className="text-gray-600">
          Upload images from drones or CCTV cameras to detect ripe tobacco leaves using YOLOv7 AI model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ImageUpload onImageUpload={handleImageUpload} />
          
          {/* Recent Detections */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Detections</h3>
            <div className="space-y-3">
              {recentDetections.map((detection) => (
                <div key={detection.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{detection.leafCount} leaves detected</p>
                    <p className="text-sm text-gray-600">
                      {detection.location} • {new Date(detection.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      {(detection.confidence * 100).toFixed(1)}%
                    </p>
                    <p className="text-xs text-gray-500">confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DetectionResults detection={currentDetection} isProcessing={isProcessing} />
      </div>

      {/* Detection Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Today's Detections</h4>
          <p className="text-3xl font-bold text-green-600">47</p>
          <p className="text-sm text-gray-500">+12% from yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Average Confidence</h4>
          <p className="text-3xl font-bold text-blue-600">91.3%</p>
          <p className="text-sm text-gray-500">Excellent accuracy</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-medium text-gray-900 mb-2">Total Ripe Leaves</h4>
          <p className="text-3xl font-bold text-orange-600">1,284</p>
          <p className="text-sm text-gray-500">Ready for harvest</p>
        </div>
      </div>
    </div>
  );
};

export default LeafDetectionPage;