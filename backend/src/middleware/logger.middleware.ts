import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || randomUUID();
  const startTime = Date.now();

  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logEntry = {
      requestId,
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTimeMs: duration,
    };

    console.log(
      `[HTTP] ${logEntry.timestamp} | ${logEntry.method} ${logEntry.route} | Status: ${logEntry.statusCode} | ${logEntry.responseTimeMs}ms | ReqId: ${logEntry.requestId}`
    );
  });

  next();
};
