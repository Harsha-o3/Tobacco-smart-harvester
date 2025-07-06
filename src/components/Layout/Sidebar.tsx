import React from 'react';
import { 
  Home, 
  Camera, 
  Plane as Drone, 
  Thermometer, 
  TrendingUp, 
  Shield, 
  User, 
  LogOut,
  Leaf,
  Settings,
  MapPin,
  FileText,
  Package,
  MessageCircle,
  BarChart3,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'farmer', 'drone_operator', 'security_staff'] },
    { id: 'leaf-detection', label: 'Leaf Detection', icon: Leaf, roles: ['admin', 'farmer', 'drone_operator'] },
    { id: 'crop-health', label: 'Crop Health', icon: Activity, roles: ['admin', 'farmer'] },
    { id: 'drone-control', label: 'Drone Control', icon: Drone, roles: ['admin', 'drone_operator', 'farmer'] },
    { id: 'field-mapping', label: 'Field Mapping', icon: MapPin, roles: ['admin', 'farmer', 'drone_operator'] },
    { id: 'sensors', label: 'Sensors', icon: Thermometer, roles: ['admin', 'farmer'] },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, roles: ['admin', 'farmer'] },
    { id: 'admin-analytics', label: 'Admin Analytics', icon: BarChart3, roles: ['admin'] },
    { id: 'security', label: 'Security', icon: Shield, roles: ['admin', 'security_staff', 'farmer'] },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['admin', 'farmer'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['admin', 'farmer'] },
    { id: 'communication', label: 'Communication', icon: MessageCircle, roles: ['admin', 'farmer', 'drone_operator'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'farmer'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">TobaccoHarvest</h2>
            <p className="text-gray-400 text-sm">Smart Farming</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;