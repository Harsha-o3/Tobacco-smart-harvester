import React from 'react';
import ChatModule from '../components/Communication/ChatModule';

const CommunicationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Communication</h1>
        <p className="text-gray-600">
          Coordinate with drone operators and field teams through real-time chat with file sharing and voice messages.
        </p>
      </div>

      <ChatModule />
    </div>
  );
};

export default CommunicationPage;