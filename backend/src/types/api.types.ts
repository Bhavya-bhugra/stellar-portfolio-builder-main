export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface HealthResponse {
  success: boolean;
  message: string;
  uptimeSeconds: number;
  timestamp: string;
}
