import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sendMessage } from '../api/chat';
import type { Message } from '../api/chat';

interface MagicPlantDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onPlantCreated: (plant: MagicPlant) => void;
}

interface MagicPlant {
    name: string;
    description: string;
    magicalProperties: string;
    legend: string;
}

const systemPrompt: Message = {
    role: 'system',
    content: `Ты - Китти, волшебная кошечка-садовница. Создай уникальное волшебное растение в стиле Hello Kitty.
    Растение должно быть милым, волшебным и подходить для виртуального сада.
    
    ВАЖНО: Ответ должен быть ТОЛЬКО в формате JSON, без дополнительного текста:
    {
        "name": "Название растения",
        "description": "Краткое описание внешнего вида",
        "magicalProperties": "Магические свойства и эффекты",
        "legend": "Короткая легенда о происхождении растения"
    }
    
    Используй милые эмодзи и стиль Hello Kitty. Растение должно быть уникальным и волшебным, но не слишком сложным.
    Не добавляй никакого текста до или после JSON.`
};

export function MagicPlantDialog({ isOpen, onClose, onPlantCreated }: MagicPlantDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePlant = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendMessage([systemPrompt, {
                role: 'user',
                content: 'Создай новое волшебное растение для моего сада! Ответ должен быть только в формате JSON.'
            }]);

            console.log('Получен ответ от LLM:', response);

            try {
                // Очищаем ответ от возможных лишних символов
                const cleanResponse = response.trim().replace(/^```json\n?|\n?```$/g, '');
                console.log('Очищенный ответ:', cleanResponse);
                
                const plant = JSON.parse(cleanResponse);
                
                // Проверяем наличие всех необходимых полей
                const requiredFields = ['name', 'description', 'magicalProperties', 'legend'];
                const missingFields = requiredFields.filter(field => !plant[field]);
                
                if (missingFields.length > 0) {
                    throw new Error(`Отсутствуют обязательные поля: ${missingFields.join(', ')}`);
                }

                console.log('Успешно создано растение:', plant);
                onPlantCreated(plant);
                onClose();
            } catch (e) {
                console.error('Ошибка при обработке ответа:', e);
                setError('Не удалось создать растение. Попробуй еще раз!');
            }
        } catch (error) {
            console.error('Ошибка при запросе к LLM:', error);
            setError('Произошла ошибка. Попробуй еще раз!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Вырастить волшебное растение</DialogTitle>
                </DialogHeader>
                <div className="py-6 text-center">
                    <p className="mb-4 text-muted-foreground">
                        Нажми на кнопку, чтобы Китти создала для тебя уникальное волшебное растение! 🌸✨
                    </p>
                    {error && (
                        <p className="text-red-500 mb-4">{error}</p>
                    )}
                    <Button 
                        onClick={generatePlant} 
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? 'Создаю растение...' : 'Вырастить волшебное растение 🌱'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 