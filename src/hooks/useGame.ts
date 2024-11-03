import { useGameContext } from "@/contexts/GameContext";

export const useGame = () => {
  const context = useGameContext();
  return context;
};
