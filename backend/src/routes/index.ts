import { Router } from 'express';
import healthRoutes from './health.routes.js';
import chessRoutes from './chess.routes.js';
import contactRoutes from './contact.routes.js';
import chatRoutes from './chat.routes.js';

const router = Router();

router.use('/', healthRoutes);
router.use('/chess', chessRoutes);
router.use('/contact', contactRoutes);
router.use('/chat', chatRoutes);

export default router;
