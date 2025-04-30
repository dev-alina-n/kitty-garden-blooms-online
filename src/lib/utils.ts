
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomPosition(maxX: number, maxY: number) {
  return {
    x: 10 + Math.random() * maxX,
    y: 10 + Math.random() * maxY,
  };
}
