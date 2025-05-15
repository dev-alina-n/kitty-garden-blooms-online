import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Garden } from "@/components/Garden";
import { ChatDialog } from "@/components/ChatDialog";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gardenId = params.get("id");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6 p-6 bg-white/80 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-kitty-red mb-4">Китти-сады</h2>
          <p className="text-lg mb-3">
            Вырастите свой цветок в виртуальном саду!
          </p>
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

        <div className="relative">
          <Garden gardenId={gardenId || undefined} />
          
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 left-6 rounded-full w-12 h-12 p-0 shadow-lg"
            variant="default"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </main>
      
      <footer className="w-full py-4 text-center text-sm text-kitty-pink">
        <p>© 2025 Китти-сады | Все права защищены</p>
      </footer>

      <ChatDialog 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Index;
