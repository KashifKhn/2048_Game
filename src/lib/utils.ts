import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCellColor = (value: number) => {
  return `tile-${value}` || "bg-gray-800 text-white";
};
