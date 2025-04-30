
import React from "react";
import { Header } from "@/components/Header";
import { Garden } from "@/components/Garden";
import { useLocation } from "react-router-dom";

const Index = () => {
  // Check if there's a garden ID in the URL for sharing
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gardenId = params.get("id");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <Garden gardenId={gardenId || undefined} />
        
        <div className="mt-10 p-6 bg-white/80 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-kitty-red mb-4">О Китти-садах</h2>
          <p className="mb-3">
            Добро пожаловать в виртуальный сад, где вы можете выращивать свои любимые цветы и клубнику!
          </p>
          <p className="mb-3">
            Просто нажмите кнопку "+", чтобы посадить новое растение. Вы можете выбрать тип растения, 
            его цвет и дать ему имя.
          </p>
          <p>
            Не забудьте поделиться своим садом с друзьями, нажав кнопку "Поделиться"!
          </p>
        </div>
      </main>
      
      <footer className="w-full py-4 text-center text-sm text-kitty-pink">
        <p>© 2023 Китти-сады | Все права защищены</p>
      </footer>
    </div>
  );
};

export default Index;
