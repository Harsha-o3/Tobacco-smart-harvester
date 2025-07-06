interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: string;
}

interface WebSocketSubscription {
  type: string;
  callback: (data: any) => void;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private subscriptions: Map<string, WebSocketSubscription[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private isConnected = false;

  connect() {
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://api.tobacco-harvest.com/ws' 
      : 'ws://localhost:3001/ws';

    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        
        // Send authentication token
        const token = localStorage.getItem('token');
        if (token) {
          this.send('auth', { token });
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleMessage(message: WebSocketMessage) {
    const subscribers = this.subscriptions.get(message.type) || [];
    subscribers.forEach(subscription => {
      subscription.callback(message.data);
    });
  }

  subscribe(type: string, callback: (data: any) => void): () => void {
    if (!this.subscriptions.has(type)) {
      this.subscriptions.set(type, []);
    }
    
    const subscription: WebSocketSubscription = { type, callback };
    this.subscriptions.get(type)!.push(subscription);

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscriptions.get(type);
      if (subscribers) {
        const index = subscribers.indexOf(subscription);
        if (index > -1) {
          subscribers.splice(index, 1);
        }
      }
    };
  }

  send(type: string, data: any) {
    if (this.ws && this.isConnected) {
      const message: WebSocketMessage = {
        type,
        data,
        timestamp: new Date().toISOString(),
      };
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message not sent:', { type, data });
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscriptions.clear();
    this.isConnected = false;
  }

  isConnectionOpen(): boolean {
    return this.isConnected;
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

// Auto-connect when module is imported
if (typeof window !== 'undefined') {
  webSocketService.connect();
}

export default webSocketService;

// Specific subscription helpers
export const subscribeToSensorUpdates = (callback: (data: any) => void) => {
  return webSocketService.subscribe('sensor_update', callback);
};

export const subscribeToDroneUpdates = (callback: (data: any) => void) => {
  return webSocketService.subscribe('drone_update', callback);
};

export const subscribeToSecurityAlerts = (callback: (data: any) => void) => {
  return webSocketService.subscribe('security_alert', callback);
};

export const subscribeToLeafDetections = (callback: (data: any) => void) => {
  return webSocketService.subscribe('leaf_detection', callback);
};

export const subscribeToSystemAlerts = (callback: (data: any) => void) => {
  return webSocketService.subscribe('system_alert', callback);
};