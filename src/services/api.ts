import axios from 'axios';
import { LeafDetection, DroneTask, SensorData, SecurityAlert, User } from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.tobacco-harvest.com' 
  : 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string, name: string, role: string) => {
    const response = await api.post('/auth/register', { email, password, name, role });
    return response.data;
  },
  
  logout: async () => {
    await api.post('/auth/logout');
  },
  
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

// Leaf Detection API
export const leafDetectionAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/leaf-detection/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getDetections: async (limit = 50) => {
    const response = await api.get(`/leaf-detection?limit=${limit}`);
    return response.data;
  },
  
  getDetectionById: async (id: string) => {
    const response = await api.get(`/leaf-detection/${id}`);
    return response.data;
  },
};

// Drone Control API
export const droneAPI = {
  getDrones: async () => {
    const response = await api.get('/drones');
    return response.data;
  },
  
  getDroneById: async (id: string) => {
    const response = await api.get(`/drones/${id}`);
    return response.data;
  },
  
  createTask: async (task: Omit<DroneTask, 'id' | 'createdAt'>) => {
    const response = await api.post('/drones/tasks', task);
    return response.data;
  },
  
  getTasks: async () => {
    const response = await api.get('/drones/tasks');
    return response.data;
  },
  
  updateTaskStatus: async (taskId: string, status: string) => {
    const response = await api.patch(`/drones/tasks/${taskId}`, { status });
    return response.data;
  },
  
  sendCommand: async (droneId: string, command: string, params?: any) => {
    const response = await api.post(`/drones/${droneId}/command`, { command, params });
    return response.data;
  },
};

// Sensor Data API
export const sensorAPI = {
  getSensorData: async (timeRange = '24h') => {
    const response = await api.get(`/sensors/data?range=${timeRange}`);
    return response.data;
  },
  
  getSensorById: async (sensorId: string) => {
    const response = await api.get(`/sensors/${sensorId}`);
    return response.data;
  },
  
  getSensorHistory: async (sensorId: string, timeRange = '24h') => {
    const response = await api.get(`/sensors/${sensorId}/history?range=${timeRange}`);
    return response.data;
  },
  
  updateSensorThresholds: async (sensorId: string, thresholds: any) => {
    const response = await api.patch(`/sensors/${sensorId}/thresholds`, thresholds);
    return response.data;
  },
};

// Security API
export const securityAPI = {
  getCameras: async () => {
    const response = await api.get('/security/cameras');
    return response.data;
  },
  
  getAlerts: async (limit = 50) => {
    const response = await api.get(`/security/alerts?limit=${limit}`);
    return response.data;
  },
  
  updateAlertStatus: async (alertId: string, status: string) => {
    const response = await api.patch(`/security/alerts/${alertId}`, { status });
    return response.data;
  },
  
  getCameraFeed: async (cameraId: string) => {
    const response = await api.get(`/security/cameras/${cameraId}/feed`);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getHarvestTrends: async (timeRange = '30d') => {
    const response = await api.get(`/analytics/harvest-trends?range=${timeRange}`);
    return response.data;
  },
  
  getFieldProductivity: async () => {
    const response = await api.get('/analytics/field-productivity');
    return response.data;
  },
  
  getYieldPredictions: async () => {
    const response = await api.get('/analytics/yield-predictions');
    return response.data;
  },
  
  getRiskAnalysis: async () => {
    const response = await api.get('/analytics/risk-analysis');
    return response.data;
  },
  
  getRecommendations: async () => {
    const response = await api.get('/analytics/recommendations');
    return response.data;
  },
};

// User Management API (Admin only)
export const userAPI = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  
  createUser: async (userData: Omit<User, 'id' | 'createdAt'>) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  
  updateUser: async (userId: string, userData: Partial<User>) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId: string) => {
    await api.delete(`/users/${userId}`);
  },
};

export default api;