export interface ChessProfile {
  username: string;
  displayName: string;
  profileUrl: string;
  avatar?: string;
  country?: string;
}

export interface ChessStat {
  id: string;
  label: string;
  rating: number | null;
  best: number | null;
  record: { win: number; loss: number; draw: number } | null;
}

export type ChessResult = 'win' | 'loss' | 'draw';

export interface ChessGame {
  id: string;
  opponent: string;
  opponentRating: number | null;
  result: ChessResult;
  timeClass: string;
  playedAt: string;
  url: string;
}

export interface RatingPoint {
  date: string;
  rating: number;
}

export interface ChessSnapshot {
  profile: ChessProfile;
  stats: ChessStat[];
  games: ChessGame[];
  ratingHistory: RatingPoint[];
}

export interface RawStat {
  last?: { rating?: number | null };
  best?: { rating?: number | null };
  record?: { win?: number; loss?: number; draw?: number };
}

export interface RawGame {
  white?: { username?: string; rating?: number; result?: string };
  black?: { username?: string; rating?: number; result?: string };
  uuid?: string;
  time_class?: string;
  end_time?: number;
  url?: string;
}
