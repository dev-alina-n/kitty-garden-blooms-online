import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlantDialog } from './PlantDialog';
import { MagicPlantDialog } from './MagicPlantDialog';
import { PlantForm } from './PlantForm';

interface PlantData {
  id: string;
  type: 'flower' | 'strawberry';
  name: string;
  position: { x: number; y: number };
  color: string;
}

interface MagicPlant {
  id: string;
  name: string;
  description: string;
  magicalProperties: string;
  legend: string;
  position: { x: number; y: number };
}

interface GardenProps {
  gardenId?: string;
}

export const Garden: React.FC<GardenProps> = ({ gardenId }) => {
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [magicPlants, setMagicPlants] = useState<MagicPlant[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPlantDialogOpen, setIsPlantDialogOpen] = useState(false);
  const [isMagicPlantDialogOpen, setIsMagicPlantDialogOpen] = useState(false);
  const { toast } = useToast();
  const currentGardenId = gardenId || 'my-garden';

  // Load garden data from localStorage on component mount
  useEffect(() => {
    const savedGarden = localStorage.getItem(`kitty-garden-${currentGardenId}`);
    if (savedGarden) {
      try {
        setPlants(JSON.parse(savedGarden));
      } catch (e) {
        console.error('Failed to load garden:', e);
      }
    }

    // Загрузка волшебных растений из localStorage
    const savedMagicPlants = localStorage.getItem('gardenMagicPlants');
    if (savedMagicPlants) {
      setMagicPlants(JSON.parse(savedMagicPlants));
    }
  }, [currentGardenId]);

  // Save garden data to localStorage whenever plants change
  useEffect(() => {
    if (plants.length > 0) {
      localStorage.setItem(`kitty-garden-${currentGardenId}`, JSON.stringify(plants));
    }
  }, [plants, currentGardenId]);

  useEffect(() => {
    // Сохранение волшебных растений в localStorage
    localStorage.setItem('gardenMagicPlants', JSON.stringify(magicPlants));
  }, [magicPlants]);

  const handleAddPlant = (plantData: { type: 'flower' | 'strawberry'; name: string; color: string }) => {
    const newPlant = {
      id: `plant-${Date.now()}`,
      ...plantData,
      position: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }
    };

    setPlants([...plants, newPlant]);
    setIsFormOpen(false);
    
    toast({
      title: "Растение посажено!",
      description: `${plantData.name} теперь растет в вашем саду.`,
      duration: 3000,
    });
  };

  const handleMagicPlantCreated = (plant: Omit<MagicPlant, 'id' | 'position'>) => {
    const newMagicPlant: MagicPlant = {
      ...plant,
      id: crypto.randomUUID(),
      position: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      }
    };
    setMagicPlants(prev => [...prev, newMagicPlant]);
    
    toast({
      title: "Волшебное растение создано!",
      description: `${plant.name} теперь растет в вашем саду.`,
      duration: 3000,
    });
  };

  const handleShareGarden = () => {
    const gardenData = {
      plants,
      magicPlants
    };
    const gardenId = btoa(JSON.stringify(gardenData));
    const shareUrl = `${window.location.origin}?id=${gardenId}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Ссылка скопирована!",
      description: "Поделитесь своим садом с друзьями!",
      duration: 3000,
    });
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button 
          onClick={() => setIsFormOpen(!isFormOpen)} 
          className="rounded-full w-14 h-14 bg-kitty-red hover:bg-kitty-pink text-white shadow-lg"
        >
          {isFormOpen ? "×" : "+"}
        </Button>
        <Button 
          onClick={() => setIsMagicPlantDialogOpen(true)}
          className="rounded-full w-14 h-14 bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
        >
          ✨
        </Button>
        <Button 
          onClick={handleShareGarden} 
          className="rounded-full bg-kitty-blue hover:bg-kitty-pink text-white shadow-lg"
        >
          Поделиться
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed bottom-32 right-4 z-40 w-72 md:w-80">
          <PlantForm onAddPlant={handleAddPlant} />
        </div>
      )}

      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-b from-kitty-light-pink/30 to-white/80 rounded-lg border-4 border-kitty-pink overflow-hidden">
        <div className="absolute inset-0 bg-garden-pattern opacity-10"></div>
        
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 plant-grow"
            style={{
              left: `${plant.position.x}%`,
              top: `${plant.position.y}%`
            }}
          >
            {plant.type === 'flower' ? (
              <div className="w-10 h-10 relative">
                <div className="w-2 h-8 bg-green-600 mx-auto plant-stem">
                  <div className="plant-leaf left" />
                  <div className="plant-leaf right" />
                </div>
                <div className={`w-10 h-10 rounded-full ${plant.color} transform rotate-45 plant-flower`} />
              </div>
            ) : (
              <div className="w-10 h-10 relative">
                <div className="w-2 h-8 bg-green-600 mx-auto plant-stem">
                  <div className="plant-leaf left" />
                  <div className="plant-leaf right" />
                </div>
                <div className="w-10 h-10 rounded-full bg-red-500 plant-flower" />
              </div>
            )}
            <div className="text-xs text-center mt-1 bg-white/80 px-2 py-1 rounded-full plant-name">
              {plant.name}
            </div>
          </div>
        ))}

        {magicPlants.map((plant) => (
          <div
            key={plant.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 plant-grow"
            style={{
              left: `${plant.position.x}%`,
              top: `${plant.position.y}%`
            }}
          >
            <div className="w-12 h-12 relative plant-magic">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse plant-magic-glow" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                ✨
              </div>
              <div className="w-2 h-6 bg-green-600 mx-auto plant-stem" />
            </div>
            <div className="text-xs text-center mt-1 bg-white/80 px-1 rounded plant-name">
              {plant.name}
            </div>
          </div>
        ))}

        {plants.length === 0 && magicPlants.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white/70 rounded-xl shadow-md">
              <h2 className="text-xl mb-2">Ваш сад пуст!</h2>
              <p className="mb-4">Нажмите кнопку "+" чтобы посадить первый цветочек или "✨" для волшебного растения</p>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => setIsFormOpen(true)} 
                  className="bg-kitty-pink hover:bg-kitty-red text-white"
                >
                  Посадить цветочек
                </Button>
                <Button 
                  onClick={() => setIsMagicPlantDialogOpen(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Вырастить волшебное растение
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PlantDialog
        isOpen={isPlantDialogOpen}
        onClose={() => setIsPlantDialogOpen(false)}
        onPlantCreated={handleAddPlant}
      />

      <MagicPlantDialog
        isOpen={isMagicPlantDialogOpen}
        onClose={() => setIsMagicPlantDialogOpen(false)}
        onPlantCreated={handleMagicPlantCreated}
      />
    </div>
  );
};
