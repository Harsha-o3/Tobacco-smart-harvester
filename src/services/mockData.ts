import { LeafDetection, DroneTask, SensorData, SecurityAlert, User } from '../types';

// Mock users for demo
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    name: 'John Administrator',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'farmer@demo.com',
    name: 'Mary Farmer',
    role: 'farmer',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    email: 'operator@demo.com',
    name: 'Bob Operator',
    role: 'drone_operator',
    createdAt: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    email: 'security@demo.com',
    name: 'Alice Security',
    role: 'security_staff',
    createdAt: '2024-01-04T00:00:00Z',
  },
];

// Mock leaf detections
export const mockLeafDetections: LeafDetection[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg',
    leafCount: 34,
    confidence: 0.92,
    location: { lat: 36.1627, lng: -86.7816 },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'analyzed',
    boundingBoxes: [
      { x: 100, y: 150, width: 80, height: 60, confidence: 0.95, class: 'ripe_leaf' },
      { x: 200, y: 100, width: 70, height: 55, confidence: 0.89, class: 'ripe_leaf' },
    ],
  },
];

// Mock drone tasks
export const mockDroneTasks: DroneTask[] = [
  {
    id: '1',
    droneId: 'DH-001',
    taskType: 'harvest',
    status: 'in_progress',
    location: { lat: 36.1627, lng: -86.7816 },
    assignedTo: 'operator-1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    description: 'Harvest ripe leaves in Field A, Section 3',
    priority: 'high',
  },
];

// Mock sensor data
export const mockSensorData: SensorData[] = [
  {
    id: '1',
    sensorId: 'TEMP-001',
    type: 'temperature',
    value: 24.5,
    unit: '°C',
    timestamp: new Date().toISOString(),
    location: { lat: 36.1627, lng: -86.7816 },
  },
];

// Mock security alerts
export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: '1',
    cameraId: 'CAM-001',
    alertType: 'motion',
    confidence: 0.95,
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    location: { lat: 36.1627, lng: -86.7816 },
    status: 'active',
  },
];

// Database schemas for backend reference
export const databaseSchemas = {
  users: `
    CREATE TABLE users (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role ENUM('admin', 'farmer', 'drone_operator', 'security_staff') NOT NULL,
      avatar_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `,
  
  leaf_detections: `
    CREATE TABLE leaf_detections (
      id VARCHAR(36) PRIMARY KEY,
      image_url VARCHAR(500) NOT NULL,
      leaf_count INT NOT NULL,
      confidence DECIMAL(5,4) NOT NULL,
      latitude DECIMAL(10,8) NOT NULL,
      longitude DECIMAL(11,8) NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      status ENUM('pending', 'analyzed', 'processed') DEFAULT 'pending',
      bounding_boxes JSON,
      created_by VARCHAR(36),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (created_by) REFERENCES users(id)
    );
  `,
  
  drones: `
    CREATE TABLE drones (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      model VARCHAR(255),
      status ENUM('active', 'idle', 'charging', 'maintenance') DEFAULT 'idle',
      battery_level INT DEFAULT 100,
      signal_strength INT DEFAULT 0,
      latitude DECIMAL(10,8),
      longitude DECIMAL(11,8),
      current_task_id VARCHAR(36),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `,
  
  drone_tasks: `
    CREATE TABLE drone_tasks (
      id VARCHAR(36) PRIMARY KEY,
      drone_id VARCHAR(36) NOT NULL,
      task_type ENUM('harvest', 'survey', 'maintenance') NOT NULL,
      status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
      latitude DECIMAL(10,8) NOT NULL,
      longitude DECIMAL(11,8) NOT NULL,
      assigned_to VARCHAR(36),
      description TEXT,
      priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed_at TIMESTAMP NULL,
      FOREIGN KEY (drone_id) REFERENCES drones(id),
      FOREIGN KEY (assigned_to) REFERENCES users(id)
    );
  `,
  
  sensors: `
    CREATE TABLE sensors (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type ENUM('temperature', 'humidity', 'soil_moisture', 'ph', 'light') NOT NULL,
      latitude DECIMAL(10,8) NOT NULL,
      longitude DECIMAL(11,8) NOT NULL,
      status ENUM('online', 'offline', 'maintenance') DEFAULT 'online',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
  
  sensor_data: `
    CREATE TABLE sensor_data (
      id VARCHAR(36) PRIMARY KEY,
      sensor_id VARCHAR(36) NOT NULL,
      value DECIMAL(10,4) NOT NULL,
      unit VARCHAR(10) NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sensor_id) REFERENCES sensors(id),
      INDEX idx_sensor_timestamp (sensor_id, timestamp)
    );
  `,
  
  security_cameras: `
    CREATE TABLE security_cameras (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      latitude DECIMAL(10,8) NOT NULL,
      longitude DECIMAL(11,8) NOT NULL,
      status ENUM('online', 'offline', 'maintenance') DEFAULT 'online',
      stream_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
  
  security_alerts: `
    CREATE TABLE security_alerts (
      id VARCHAR(36) PRIMARY KEY,
      camera_id VARCHAR(36) NOT NULL,
      alert_type ENUM('intrusion', 'motion', 'animal', 'equipment_issue') NOT NULL,
      confidence DECIMAL(5,4) NOT NULL,
      image_url VARCHAR(500),
      timestamp TIMESTAMP NOT NULL,
      status ENUM('active', 'resolved', 'investigating') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (camera_id) REFERENCES security_cameras(id)
    );
  `,
};

// Backend API endpoints reference
export const apiEndpoints = {
  auth: {
    'POST /api/auth/login': 'Authenticate user',
    'POST /api/auth/register': 'Register new user',
    'POST /api/auth/logout': 'Logout user',
    'POST /api/auth/refresh': 'Refresh JWT token',
  },
  
  leafDetection: {
    'POST /api/leaf-detection/analyze': 'Upload and analyze image',
    'GET /api/leaf-detection': 'Get detection history',
    'GET /api/leaf-detection/:id': 'Get specific detection',
  },
  
  drones: {
    'GET /api/drones': 'Get all drones',
    'GET /api/drones/:id': 'Get specific drone',
    'POST /api/drones/tasks': 'Create new task',
    'GET /api/drones/tasks': 'Get all tasks',
    'PATCH /api/drones/tasks/:id': 'Update task status',
    'POST /api/drones/:id/command': 'Send command to drone',
  },
  
  sensors: {
    'GET /api/sensors/data': 'Get current sensor readings',
    'GET /api/sensors/:id': 'Get specific sensor',
    'GET /api/sensors/:id/history': 'Get sensor history',
    'PATCH /api/sensors/:id/thresholds': 'Update alert thresholds',
  },
  
  security: {
    'GET /api/security/cameras': 'Get all cameras',
    'GET /api/security/alerts': 'Get security alerts',
    'PATCH /api/security/alerts/:id': 'Update alert status',
    'GET /api/security/cameras/:id/feed': 'Get camera feed URL',
  },
  
  analytics: {
    'GET /api/analytics/harvest-trends': 'Get harvest trend data',
    'GET /api/analytics/field-productivity': 'Get field productivity metrics',
    'GET /api/analytics/yield-predictions': 'Get yield predictions',
    'GET /api/analytics/risk-analysis': 'Get risk analysis',
    'GET /api/analytics/recommendations': 'Get AI recommendations',
  },
};