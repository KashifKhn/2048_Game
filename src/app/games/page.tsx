"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GameBoard from "@/components/GameBoard";
import GameControle from "@/components/GameControl";
import GameOverDialog from "@/components/GameOverDialog";
import { useGame } from "@/hooks/useGame";

const Game: React.FC = () => {
  const {
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    initializeGame,
    score,
    bestScore,
    gridSize,
    hasWon,
    isDraw,
  } = useGame();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveLeft, moveRight, moveUp, moveDown]);

  useEffect(() => {
    if (hasWon || isDraw) {
      setIsDialogOpen(true);
    }
  }, [hasWon, isDraw]);

  const handleNewGame = () => {
    initializeGame();
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-800">
        2048
      </h1>
      <div className="flex justify-between mb-4">
        <div className="bg-blue-100 rounded-lg p-2 text-blue-800 w-1/2 mr-2">
          <div className="text-sm">SCORE</div>
          <div className="text-2xl font-bold">{score}</div>
        </div>
        <div className="bg-blue-100 rounded-lg p-2 text-blue-800 w-1/2 ml-2">
          <div className="text-sm">BEST</div>
          <div className="text-2xl font-bold">{bestScore}</div>
        </div>
      </div>
      <GameBoard />
      <GameControle />
      <div className="mt-4 flex justify-between">
        <Button onClick={handleNewGame} variant="outline">
          New Game
        </Button>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <div className="mt-4 text-center text-gray-600">
        Current Grid Size: {gridSize}x{gridSize}
      </div>
      <GameOverDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onNewGame={handleNewGame}
        hasWon={hasWon}
        isDraw={isDraw}
        score={score}
      />
    </div>
  );
};

export default Game;
