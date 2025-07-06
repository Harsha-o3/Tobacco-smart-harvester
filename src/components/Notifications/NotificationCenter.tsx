import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'drone' | 'sensor' | 'security' | 'system' | 'harvest';
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Drone Stuck',
      message: 'Harvester Alpha appears to be stuck in Field A, Section 3. Manual intervention may be required.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false,
      priority: 'high',
      category: 'drone',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Soil Moisture Low',
      message: 'Soil moisture in Field B has dropped below 30%. Consider irrigation.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
      priority: 'medium',
      category: 'sensor',
    },
    {
      id: '3',
      type: 'alert',
      title: 'Motion Detected',
      message: 'Unauthorized motion detected in security zone B at 14:23.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: true,
      priority: 'high',
      category: 'security',
    },
    {
      id: '4',
      type: 'success',
      title: 'Harvest Complete',
      message: 'Field C harvest completed successfully. 450kg yield achieved.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: true,
      priority: 'low',
      category: 'harvest',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [isOpen, setIsOpen] = useState(false);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance every 10 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ['alert', 'warning', 'info', 'success'][Math.floor(Math.random() * 4)] as any,
          title: [
            'New Leaf Detection',
            'Temperature Alert',
            'Drone Battery Low',
            'Task Completed',
            'System Update'
          ][Math.floor(Math.random() * 5)],
          message: 'This is a real-time notification from the system.',
          timestamp: new Date().toISOString(),
          read: false,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          category: ['drone', 'sensor', 'security', 'system', 'harvest'][Math.floor(Math.random() * 5)] as any,
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        // Show toast for high priority notifications
        if (newNotification.priority === 'high') {
          toast.error(newNotification.title);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'success': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.read;
      case 'high': return notif.priority === 'high';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="high">High Priority</option>
              </select>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1 text-sm text-green-600 hover:text-green-700"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <X className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {notification.priority}
                              </span>
                              <span className="text-xs text-gray-500 capitalize">
                                {notification.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;