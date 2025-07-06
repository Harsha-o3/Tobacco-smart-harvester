export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'farmer' | 'drone_operator' | 'security_staff';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LeafDetection {
  id: string;
  imageUrl: string;
  leafCount: number;
  confidence: number;
  location: {
    lat: number;
    lng: number;
  };
  timestamp: string;
  status: 'pending' | 'analyzed' | 'processed';
  boundingBoxes: BoundingBox[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
}

export interface DroneTask {
  id: string;
  droneId: string;
  taskType: 'harvest' | 'survey' | 'maintenance';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  location: {
    lat: number;
    lng: number;
  };
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SensorData {
  id: string;
  sensorId: string;
  type: 'temperature' | 'humidity' | 'soil_moisture' | 'ph' | 'light';
  value: number;
  unit: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface SecurityAlert {
  id: string;
  cameraId: string;
  alertType: 'intrusion' | 'motion' | 'animal' | 'equipment_issue';
  confidence: number;
  timestamp: string;
  imageUrl?: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'active' | 'resolved' | 'investigating';
}

export interface PredictionData {
  id: string;
  predictionType: 'harvest_window' | 'disease_risk' | 'yield_forecast';
  confidence: number;
  data: Record<string, any>;
  createdAt: string;
  validUntil: string;
}