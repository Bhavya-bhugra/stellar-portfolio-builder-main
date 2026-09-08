import { HealthResponse } from '../types/api.types.js';

export class HealthService {
  public getHealthStatus(): HealthResponse {
    return {
      success: true,
      message: 'Backend is running',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}

export const healthService = new HealthService();
