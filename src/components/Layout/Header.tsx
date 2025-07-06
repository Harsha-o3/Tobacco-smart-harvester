import React from 'react';
import { Search, Menu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import NotificationCenter from '../Notifications/NotificationCenter';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationCenter />
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;