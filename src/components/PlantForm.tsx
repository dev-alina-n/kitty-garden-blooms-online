import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [color, setColor] = useState("bg-kitty-pink");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddPlant({
      type,
      name: name.trim(),
      color,
    });
    setName("");
    setType("flower");
    setColor("bg-kitty-pink");
  };

  const handleGenerateName = () => {
    const generatedName = generatePlantName(type);
    setName(generatedName);
  };

  // Define color display names for better clarity
  const colorNames: Record<string, string> = {
    pink: "Розовый",
    red: "Красный",
    blue: "Синий",
    yellow: "Жёлтый",
    green: "Зелёный",
    purple: "Фиолетовый"
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
        <Select value={type} onValueChange={(value: PlantType) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите тип" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flower">Цветок</SelectItem>
            <SelectItem value="strawberry">Клубника</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {type === "flower" && (
        <div className="space-y-2">
          <Label className="text-lg font-bold">Выберите цвет:</Label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите цвет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bg-kitty-red">Красный</SelectItem>
              <SelectItem value="bg-kitty-pink">Розовый</SelectItem>
              <SelectItem value="bg-kitty-blue">Синий</SelectItem>
              <SelectItem value="bg-kitty-yellow">Желтый</SelectItem>
              <SelectItem value="bg-kitty-green">Зеленый</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-kitty-pink hover:bg-kitty-red text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105"
      >
        Посадить!
      </Button>
    </form>
  );
};
