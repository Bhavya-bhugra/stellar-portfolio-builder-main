import { Request, Response, NextFunction } from 'express';
import { chessService } from '../services/chess.service.js';
import { sendSuccess } from '../utils/response.utils.js';

export class ChessController {
  public getProfile = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profile = await chessService.getProfile();
      sendSuccess(res, 'Chess profile retrieved successfully', profile);
    } catch (error) {
      next(error);
    }
  };

  public getStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stats = await chessService.getStats();
      sendSuccess(res, 'Chess stats retrieved successfully', stats);
    } catch (error) {
      next(error);
    }
  };

  public getGames = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const games = await chessService.getRecentGames();
      sendSuccess(res, 'Recent chess games retrieved successfully', games);
    } catch (error) {
      next(error);
    }
  };

  public getRatingHistory = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const [stats, games] = await Promise.all([
        chessService.getStats(),
        chessService.getRecentGames(),
      ]);
      const history = await chessService.getRatingHistory(stats, games);
      sendSuccess(res, 'Chess rating history retrieved successfully', history);
    } catch (error) {
      next(error);
    }
  };

  public getSnapshot = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const snapshot = await chessService.getSnapshot();
      sendSuccess(res, 'Chess snapshot retrieved successfully', snapshot);
    } catch (error) {
      next(error);
    }
  };
}

export const chessController = new ChessController();
