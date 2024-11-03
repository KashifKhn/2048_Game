"use client";

import React from "react";
import { motion } from "framer-motion";
import { getCellColor } from "@/lib/utils";
import { useGame } from "@/hooks/useGame";

const GameBoard: React.FC = () => {
  const { grid } = useGame();

  return (
    <div
      className="grid gap-2 bg-gray-300 p-2 rounded-lg shadow-lg"
      style={{
        gridTemplateColumns: `repeat(${grid.length}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row) =>
        row.map((cell) => (
          <motion.div
            key={cell.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
            className={`aspect-square flex items-center justify-center text-lg sm:text-2xl font-bold rounded-md shadow ${getCellColor(cell.value)}`}
          >
            {cell.value !== 0 ? cell.value : ""}
          </motion.div>
        )),
      )}
    </div>
  );
};

export default GameBoard;
