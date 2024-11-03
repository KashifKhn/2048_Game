export type TileType = {
  value: number;
  id: number;
};

type Cell = TileType;
export type Grid = Cell[][];

export type DirectionType = "up" | "down" | "left" | "right";

export interface GameState {
  grid: Grid;
  score: number;
  bestScore: number;
  gridSize: number;
  hasWon: boolean;
  isDraw: boolean;
}

export interface GameContextType extends GameState {
  setGridSize: (size: number) => void;
  initializeGame: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  moveUp: () => void;
  moveDown: () => void;
}

export type LeaderboardEntryType = {
  name: string;
  score: number;
  boardSize: number;
  date: string;
};

export type BoardSizeValue = 3 | 4 | 5 | 6 | 8;
export type BoardSizeType = BoardSizeValue[];
