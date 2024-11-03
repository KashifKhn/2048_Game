"use client";

import {
  GameState,
  Grid,
  DirectionType,
  TileType,
  GameContextType,
} from "@/types/Game";
import { useState, useEffect, useCallback, ReactNode } from "react";
import { GameContext } from "./GameContext";

const generateId = (() => {
  let id = 0;
  return () => id++;
})();

const createEmptyGrid = (size: number): Grid =>
  Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ value: 0, id: generateId() })),
  );

const addRandomTile = (grid: Grid): Grid => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  const emptyCells: { i: number; j: number }[] = [];
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (newGrid[i][j].value === 0) {
        emptyCells.push({ i, j });
      }
    }
  }
  if (emptyCells.length > 0) {
    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newGrid[i][j] = {
      value: Math.random() < 0.9 ? 2 : 4,
      id: generateId(),
    };
  }
  return newGrid;
};

const checkForWin = (grid: Grid): boolean =>
  grid.some((row) => row.some((cell) => cell.value >= 2048));

const checkForDraw = (grid: Grid): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].value === 0) return false;
      if (j < grid[i].length - 1 && grid[i][j].value === grid[i][j + 1].value)
        return false;
      if (i < grid.length - 1 && grid[i][j].value === grid[i + 1][j].value)
        return false;
    }
  }
  return true;
};

const mergeTiles = (
  row: TileType[],
  updateScore: (score: number) => void,
): TileType[] => {
  const newRow = row.filter((cell) => cell.value !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i].value === newRow[i + 1].value) {
      newRow[i] = { value: newRow[i].value * 2, id: generateId() };
      updateScore(newRow[i].value);
      newRow.splice(i + 1, 1);
    }
  }
  while (newRow.length < row.length) {
    newRow.push({ value: 0, id: generateId() });
  }
  return newRow;
};

const defaultState: GameState = {
  grid: createEmptyGrid(4),
  gridSize: 4,
  hasWon: false,
  isDraw: false,
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(defaultState);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(
    parseInt(localStorage.getItem("bestScore") || "0"),
  );

  useEffect(() => {
    const savedBestScore = localStorage.getItem("bestScore");

    initializeGame(gameState.gridSize);

    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bestScore", bestScore.toString());
  }, [bestScore]);

  const updateScore = (points: number) => {
    setScore((prevScore) => {
      const newScore = prevScore + points;
      setBestScore((prevBestScore) => Math.max(prevBestScore, newScore));
      return newScore;
    });
  };

  const setGridSize = useCallback((size: number) => {
    setGameState((prevState) => ({ ...prevState, gridSize: size }));
    initializeGame(size);
  }, []);

  const initializeGame = useCallback((size: number = gameState.gridSize) => {
    const newGrid = createEmptyGrid(size);
    const gridWithRandomTiles = addRandomTile(addRandomTile(newGrid));
    setGameState({
      ...defaultState,
      grid: gridWithRandomTiles,
      gridSize: size,
    });
  }, []);

  const move = useCallback(
    (direction: DirectionType) => {
      if (gameState.hasWon || gameState.isDraw) return;

      let newGrid = gameState.grid.map((row) =>
        row.map((cell) => ({ ...cell })),
      );
      let moved = false;

      if (["left", "right"].includes(direction)) {
        newGrid = newGrid.map((row) => {
          const mergedRow =
            direction === "left"
              ? mergeTiles(row, updateScore)
              : mergeTiles(row.reverse(), updateScore).reverse();
          moved ||= JSON.stringify(mergedRow) !== JSON.stringify(row);
          return mergedRow;
        });
      } else {
        for (let col = 0; col < newGrid.length; col++) {
          let column = newGrid.map((row) => row[col]);
          column =
            direction === "up"
              ? mergeTiles(column, updateScore)
              : mergeTiles(column.reverse(), updateScore).reverse();
          for (let row = 0; row < newGrid.length; row++) {
            if (newGrid[row][col].value !== column[row].value) moved = true;
            newGrid[row][col] = column[row];
          }
        }
      }

      if (moved) {
        newGrid = addRandomTile(newGrid);
        setGameState({
          ...gameState,
          grid: newGrid,
          hasWon: checkForWin(newGrid),
          isDraw: !checkForWin(newGrid) && checkForDraw(newGrid),
        });
      }
    },
    [gameState],
  );

  const value: GameContextType = {
    ...gameState,
    score,
    bestScore,
    setGridSize,
    initializeGame: useCallback(
      () => initializeGame(gameState.gridSize),
      [initializeGame, gameState.gridSize],
    ),
    moveLeft: () => move("left"),
    moveRight: () => move("right"),
    moveUp: () => move("up"),
    moveDown: () => move("down"),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
