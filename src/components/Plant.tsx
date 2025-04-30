
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
  const colorClasses = {
    pink: "text-kitty-pink",
    red: "text-kitty-red",
    blue: "text-kitty-blue",
    yellow: "text-kitty-yellow",
    green: "text-kitty-green",
    purple: "text-kitty-purple",
  };

  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.pink;

  // Set growing to false after animation completes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsGrowing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
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
        zIndex: Math.floor(position.y),
      }}
      id={`plant-${id}`}
    >
      {type === "flower" ? (
        <Flower 
          className={cn("h-10 w-10 md:h-12 md:w-12", colorClass)} 
          size={size * 32}
        />
      ) : (
        <Sprout 
          className={cn("h-10 w-10 md:h-12 md:w-12", colorClass)} 
          size={size * 32}
        />
      )}
      <span className="mt-1 text-xs font-bold bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
        {name}
      </span>
    </div>
  );
};
