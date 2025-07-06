import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Image, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  type: 'text' | 'image' | 'voice' | 'file';
  timestamp: string;
  attachments?: string[];
}

interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: Message;
}

const ChatModule: React.FC = () => {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string>('field-a-team');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: 'field-a-team',
      name: 'Field A Team',
      participants: ['farmer-1', 'operator-1', 'operator-2'],
    },
    {
      id: 'field-b-team',
      name: 'Field B Team',
      participants: ['farmer-1', 'operator-3'],
    },
    {
      id: 'maintenance-crew',
      name: 'Maintenance Crew',
      participants: ['admin-1', 'tech-1', 'tech-2'],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'operator-1',
      senderName: 'Bob Operator',
      content: 'Drone Alpha is ready for harvest in Section 3. Weather looks good.',
      type: 'text',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      senderId: 'farmer-1',
      senderName: 'Mary Farmer',
      content: 'Great! Please focus on the northern area first. I noticed higher leaf density there.',
      type: 'text',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      senderId: 'operator-2',
      senderName: 'Alice Operator',
      content: 'Beta drone is experiencing some GPS drift. Switching to manual mode.',
      type: 'text',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      senderId: 'farmer-1',
      senderName: 'Mary Farmer',
      content: 'Here\'s the current field condition',
      type: 'image',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      attachments: ['https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg'],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'You',
      content: message,
      type: 'text',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'You',
      content: `Shared ${file.name}`,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      timestamp: new Date().toISOString(),
      attachments: [URL.createObjectURL(file)],
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user?.id || 'current-user',
        senderName: user?.name || 'You',
        content: 'Voice message (0:15)',
        type: 'voice',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newMessage]);
    }, 3000);
  };

  const currentRoom = chatRooms.find(room => room.id === selectedRoom);
  const roomMessages = messages; // In real app, filter by room

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex">
      {/* Chat Rooms Sidebar */}
      <div className="w-1/3 border-r border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Chat Rooms</h3>
        <div className="space-y-2">
          {chatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedRoom === room.id
                  ? 'bg-green-50 border border-green-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="font-medium text-gray-900">{room.name}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {room.participants.length} participants
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">{currentRoom?.name}</h4>
          <p className="text-sm text-gray-500">
            {currentRoom?.participants.length} participants online
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {roomMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === user?.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.senderId !== user?.id && (
                  <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                )}
                
                {msg.type === 'image' && msg.attachments && (
                  <img
                    src={msg.attachments[0]}
                    alt="Shared image"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                
                {msg.type === 'voice' && (
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4" />
                    <div className="flex-1 h-2 bg-white bg-opacity-30 rounded">
                      <div className="h-full w-1/3 bg-white rounded"></div>
                    </div>
                  </div>
                )}
                
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.senderId === user?.id ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,audio/*,.pdf,.doc,.docx"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Image className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={startVoiceRecording}
              disabled={isRecording}
              className={`p-2 rounded-lg ${
                isRecording 
                  ? 'bg-red-100 text-red-600' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModule;