
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

// Набор слов для генерации имен цветов
const flowerAdjectives = [
  "Нежная", "Яркая", "Солнечная", "Мечтательная", "Весенняя", 
  "Розовая", "Сказочная", "Волшебная", "Милая", "Сладкая",
  "Звёздная", "Лунная", "Радужная", "Блестящая", "Хрустальная"
];

const flowerNouns = [
  "Роза", "Лилия", "Ромашка", "Фиалка", "Орхидея",
  "Тюльпан", "Незабудка", "Лаванда", "Сакура", "Магнолия",
  "Китти", "Принцесса", "Феечка", "Звёздочка", "Бабочка"
];

const strawberryAdjectives = [
  "Сладкая", "Сочная", "Спелая", "Ароматная", "Красная",
  "Летняя", "Медовая", "Сахарная", "Зефирная", "Маленькая",
  "Клубничная", "Рубиновая", "Нежная", "Хрустящая", "Свежая"
];

const strawberryNouns = [
  "Ягодка", "Принцесса", "Китти", "Конфетка", "Малышка",
  "Звёздочка", "Капелька", "Радость", "Сладость", "Мечта",
  "Искорка", "Ягодка", "Росинка", "Улыбка", "Кнопочка"
];

/**
 * Генерирует случайное имя для растения в зависимости от его типа
 * @param type - тип растения ("flower" или "strawberry")
 * @returns сгенерированное имя
 */
export function generatePlantName(type: "flower" | "strawberry"): string {
  const adjectives = type === "flower" ? flowerAdjectives : strawberryAdjectives;
  const nouns = type === "flower" ? flowerNouns : strawberryNouns;
  
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${randomAdj} ${randomNoun}`;
}
