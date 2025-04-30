
import React, { useState, useEffect } from "react";
import { Plant, PlantType } from "./Plant";
import { PlantForm } from "./PlantForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomPosition } from "@/lib/utils";

interface PlantData {
  id: string;
  type: PlantType;
  name: string;
  position: { x: number; y: number };
  color: string;
}

interface GardenProps {
  gardenId?: string;
}

export const Garden: React.FC<GardenProps> = ({ gardenId }) => {
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
  }, [currentGardenId]);

  // Save garden data to localStorage whenever plants change
  useEffect(() => {
    if (plants.length > 0) {
      localStorage.setItem(`kitty-garden-${currentGardenId}`, JSON.stringify(plants));
    }
  }, [plants, currentGardenId]);

  const handleAddPlant = (plantData: { type: PlantType; name: string; color: string }) => {
    const newPlant = {
      id: `plant-${Date.now()}`,
      ...plantData,
      position: generateRandomPosition(80, 80),
    };

    setPlants([...plants, newPlant]);
    setIsFormOpen(false);
    
    toast({
      title: "Растение посажено!",
      description: `${plantData.name} теперь растет в вашем саду.`,
      duration: 3000,
    });
  };

  const handleShareGarden = () => {
    // In a real app, we might use a database and generate a proper shareable link
    // For now, we'll just copy the current URL
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    
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
          onClick={handleShareGarden} 
          className="rounded-full bg-kitty-blue hover:bg-kitty-pink text-white shadow-lg"
        >
          Поделиться
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-72 md:w-80">
          <PlantForm onAddPlant={handleAddPlant} />
        </div>
      )}

      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-b from-kitty-light-pink/30 to-white/80 rounded-lg border-4 border-kitty-pink overflow-hidden">
        <div className="absolute inset-0 bg-garden-pattern opacity-10"></div>
        
        {plants.map((plant) => (
          <Plant
            key={plant.id}
            id={plant.id}
            type={plant.type}
            name={plant.name}
            position={plant.position}
            color={plant.color}
          />
        ))}

        {plants.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-white/70 rounded-xl shadow-md">
              <h2 className="text-xl mb-2">Ваш сад пуст!</h2>
              <p className="mb-4">Нажмите кнопку "+" чтобы посадить первый цветочек</p>
              <Button 
                onClick={() => setIsFormOpen(true)} 
                className="bg-kitty-pink hover:bg-kitty-red text-white"
              >
                Посадить цветочек
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
