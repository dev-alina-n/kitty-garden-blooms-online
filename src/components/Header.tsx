import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full px-4 py-6 flex justify-center", className)}>
      <div className="text-center flex flex-col items-center">
        <div className="w-20 h-20 mb-4">
          <img
            src="/images/hello-kitty.svg"
            alt="Hello Kitty"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-kitty-red">
          Китти-сады
        </h1>
        <p className="text-lg md:text-xl mt-2 text-kitty-pink">
          Вырастите свой цветок в виртуальном саду!
        </p>
      </div>
    </header>
  );
};
