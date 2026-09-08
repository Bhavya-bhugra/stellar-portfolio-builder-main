import { Request, Response } from 'express';
import { healthService } from '../services/health.service.js';

export class HealthController {
  public getHealth = (_req: Request, res: Response): void => {
    const healthStatus = healthService.getHealthStatus();
    res.status(200).json(healthStatus);
  };
}

export const healthController = new HealthController();
