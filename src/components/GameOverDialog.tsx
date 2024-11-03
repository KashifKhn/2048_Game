import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type GameOverDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewGame: () => void;
  hasWon: boolean;
  isDraw: boolean;
  score: number;
};

const GameOverDialog: React.FC<GameOverDialogProps> = ({
  isOpen,
  onClose,
  onNewGame,
  hasWon,
  isDraw,
  score,
}) => {
  const { width, height } = useWindowSize();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {hasWon ? "Congratulations!" : isDraw ? "Game Over" : "Game Over"}
          </DialogTitle>
          <DialogDescription>
            {hasWon && "You have won the game!"}
            {isDraw && "No more moves available."}
            {!hasWon && !isDraw && "Better luck next time!"}
            <br />
            Your score: {score}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onNewGame}>New Game</Button>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
      {hasWon && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
    </Dialog>
  );
};

export default GameOverDialog;
