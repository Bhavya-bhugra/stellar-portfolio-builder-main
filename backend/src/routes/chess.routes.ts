import { Router } from 'express';
import { chessController } from '../controllers/chess.controller.js';

const router = Router();

router.get('/profile', chessController.getProfile);
router.get('/stats', chessController.getStats);
router.get('/games', chessController.getGames);
router.get('/rating-history', chessController.getRatingHistory);
router.get('/snapshot', chessController.getSnapshot);

export default router;
