import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useGame } from "@/hooks/useGame";

const GameControle = () => {
  const { moveLeft, moveRight, moveUp, moveDown } = useGame();
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 place-items-center">
      <div></div>
      <Button
        onClick={moveUp}
        variant="outline"
        size="icon"
        className="p-2 aspect-square"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
      <div></div>
      <Button
        onClick={moveLeft}
        variant="outline"
        size="icon"
        className="p-2 aspect-square"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <Button
        onClick={moveDown}
        variant="outline"
        size="icon"
        className="p-2 aspect-square"
      >
        <ArrowDown className="h-6 w-6" />
      </Button>
      <Button
        onClick={moveRight}
        variant="outline"
        size="icon"
        className="p-2 aspect-square"
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default GameControle;
