"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { BoardSize } from "@/constants/Game";
import { BoardSizeValue } from "@/types/Game";
import { useGame } from "@/hooks/useGame";

const HomeScreen: React.FC = () => {
  const { bestScore, gridSize, setGridSize } = useGame();

  const handleSelectGridSize = (value: string) => {
    setGridSize(parseInt(value) as BoardSizeValue);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4">
      <h1 className="text-6xl font-bold mb-8 text-center">2048</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Join the numbers and get to the 2048 tile! Are you ready for the
        challenge?
      </p>
      <div className="bg-white text-blue-800 rounded-lg p-4 mb-8 text-center flex justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Best Score: </h2>
        <p className="text-4xl font-bold">{bestScore}</p>
      </div>
      <div className="mb-8">
        <h3 className="text-xl mb-2">Select Grid Size:</h3>
        <Select
          value={gridSize.toString()}
          onValueChange={(value) => handleSelectGridSize(value)}
        >
          <SelectTrigger className="w-[180px] bg-white text-blue-800">
            <SelectValue placeholder="Select grid size" />
          </SelectTrigger>
          <SelectContent>
            {BoardSize.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}x{size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Link href="/games">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-2 px-4 rounded-full text-xl transition-all duration-200 transform hover:scale-105">
          Start Game
        </Button>
      </Link>
    </div>
  );
};

export default HomeScreen;
