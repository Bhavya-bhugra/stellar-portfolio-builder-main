import app from './app.js';
import { env } from './config/env.js';

const server = app.listen(env.PORT, () => {
  console.log(`[Backend] Server listening on http://localhost:${env.PORT}`);
  console.log(`[Backend] Allowed CORS origin: ${env.FRONTEND_URL}`);
});

const gracefulShutdown = (signal: string) => {
  console.log(`[Backend] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[Backend] Server closed.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('[Backend] Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('[Backend] Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Backend] Uncaught Exception:', error);
  process.exit(1);
});
