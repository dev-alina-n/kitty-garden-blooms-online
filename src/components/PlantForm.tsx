
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlantType } from "./Plant";
import { generatePlantName } from "@/lib/utils";

interface PlantFormProps {
  onAddPlant: (plantData: {
    type: PlantType;
    name: string;
    color: string;
  }) => void;
}

export const PlantForm: React.FC<PlantFormProps> = ({ onAddPlant }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<PlantType>("flower");
  const [color, setColor] = useState("pink");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddPlant({
        type,
        name: name.trim(),
        color,
      });
      setName("");
    }
  };

  const handleGenerateName = () => {
    const generatedName = generatePlantName(type);
    setName(generatedName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white/90 rounded-2xl shadow-md border-2 border-kitty-pink">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="plant-name" className="text-lg font-bold">
            Имя цветочка:
          </Label>
          <Button 
            type="button" 
            variant="outline"
            size="sm"
            className="text-xs border-kitty-pink text-kitty-pink hover:bg-kitty-pink hover:text-white"
            onClick={handleGenerateName}
          >
            Придумать имя
          </Button>
        </div>
        <Input
          id="plant-name"
          placeholder="Введите имя..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-kitty-pink focus:border-kitty-red focus:ring-kitty-red"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-bold">Тип растения:</Label>
        <RadioGroup 
          defaultValue={type}
          className="flex space-x-4"
          onValueChange={(value) => setType(value as PlantType)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flower" id="flower" />
            <Label htmlFor="flower">Цветок</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="strawberry" id="strawberry" />
            <Label htmlFor="strawberry">Клубничка</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-lg font-bold">Цвет:</Label>
        <div className="flex flex-wrap gap-2">
          {["pink", "red", "blue", "yellow", "green", "purple"].map((c) => (
            <div
              key={c}
              className={`w-8 h-8 rounded-full cursor-pointer transform transition-transform ${
                color === c ? "ring-4 ring-black/20 scale-110" : ""
              }`}
              style={{ backgroundColor: `var(--kitty-${c})` }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-kitty-pink hover:bg-kitty-red text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105"
      >
        Посадить!
      </Button>
    </form>
  );
};
