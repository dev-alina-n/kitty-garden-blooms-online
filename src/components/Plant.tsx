import React, { useState } from "react";
import { Flower, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export type PlantType = "flower" | "strawberry";

interface PlantProps {
  id: string;
  type: PlantType;
  name: string;
  position: { x: number; y: number };
  color?: string;
  size?: number;
  className?: string;
}

export const Plant: React.FC<PlantProps> = ({
  id,
  type,
  name,
  position,
  color = "pink",
  size = 1,
  className,
}) => {
  const [isGrowing, setIsGrowing] = useState(true);
  const [hasBlossomed, setHasBlossomed] = useState(false);
  const colorClasses = {
    pink: "text-kitty-pink",
    red: "text-kitty-red",
    blue: "text-kitty-blue",
    yellow: "text-kitty-yellow",
    green: "text-kitty-green",
    purple: "text-kitty-purple",
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.pink;

  // Управление анимацией роста и цветения
  React.useEffect(() => {
    const growTimer = setTimeout(() => {
      setIsGrowing(false);
      // Начинаем анимацию цветения после завершения роста
      setHasBlossomed(true);
    }, 2000);
    
    return () => clearTimeout(growTimer);
  }, []);

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110",
        isGrowing ? "animate-plant-grow" : "animate-bounce-light",
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: 30,
      }}
      id={`plant-${id}`}
    >
      <div className={cn(
        "transition-all duration-300",
        hasBlossomed && "animate-flower-bloom"
      )}>
        {type === "flower" ? (
          <Flower 
            className={cn(
              "h-10 w-10 md:h-12 md:w-12",
              colorClass,
              "transition-all duration-300"
            )} 
            size={size * 32}
          />
        ) : (
          <Sprout 
            className={cn(
              "h-10 w-10 md:h-12 md:w-12",
              colorClass,
              "transition-all duration-300"
            )} 
            size={size * 32}
          />
        )}
      </div>
      <span className={cn(
        "mt-1 text-xs font-bold bg-white/80 px-2 py-0.5 rounded-full shadow-sm",
        "transition-opacity duration-300",
        isGrowing ? "opacity-0" : "opacity-100"
      )}>
        {name}
      </span>
    </div>
  );
};
