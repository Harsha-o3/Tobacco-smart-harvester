import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import LeafDetectionPage from './pages/LeafDetectionPage';
import CropHealthPage from './pages/CropHealthPage';
import DroneControlPage from './pages/DroneControlPage';
import FieldMappingPage from './pages/FieldMappingPage';
import SensorsPage from './pages/SensorsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import SecurityPage from './pages/SecurityPage';
import ReportsPage from './pages/ReportsPage';
import InventoryPage from './pages/InventoryPage';
import CommunicationPage from './pages/CommunicationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const { isAuthenticated } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Toaster position="top-right" />
        {isRegister ? (
          <RegisterForm onSwitchToLogin={() => setIsRegister(false)} />
        ) : (
          <LoginForm onSwitchToRegister={() => setIsRegister(true)} />
        )}
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'leaf-detection':
        return <LeafDetectionPage />;
      case 'crop-health':
        return <CropHealthPage />;
      case 'drone-control':
        return <DroneControlPage />;
      case 'field-mapping':
        return <FieldMappingPage />;
      case 'sensors':
        return <SensorsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'admin-analytics':
        return <AdminAnalyticsPage />;
      case 'security':
        return <SecurityPage />;
      case 'reports':
        return <ReportsPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'communication':
        return <CommunicationPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;