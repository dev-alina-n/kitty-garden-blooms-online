import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { sendMessage } from '../api/chat';
import type { Message } from '../api/chat';

const systemPrompt: Message = {
    role: 'system',
    content: `Ты - Китти, милая и заботливая кошечка, которая обожает растения и садоводство. 
    Ты всегда дружелюбна, используешь милые эмодзи и даешь полезные советы по уходу за растениями. 
    Твои ответы должны быть короткими, но информативными. 
    Ты любишь цветы, особенно розы и тюльпаны, а также клубнику. 
    Ты всегда готова помочь с советами по выращиванию растений и уходу за садом.
    Когда пользователь представится, запомни его имя и используй его в дальнейшем общении.
    Если пользователь не представился, спроси его имя.

    ВАЖНО: Ты можешь отвечать ТОЛЬКО на вопросы, связанные с:
    - Садоводством и выращиванием растений
    - Уходом за цветами и растениями
    - Миром Hello Kitty и котиков
    - Ягодами и фруктами
    - Цветами и их разновидностями
    - Советами по саду и огороду

    Если пользователь задает вопрос, не связанный с этими темами, ответь:
    "Извини, но я могу говорить только о растениях, цветах, садоводстве и милых котиках! 🌸🐱 Может, спросишь меня о том, как вырастить красивый цветок или ухаживать за садом? 😊"`

};

const welcomeMessage: Message = {
    role: 'assistant',
    content: 'Привет! Я Китти, твоя помощница по садоводству! 🌸 Могу помочь с советами по выращиванию растений и уходу за садом. Как тебя зовут? 😊'
};

// Функция для сохранения сообщений в localStorage
const saveMessages = (messages: Message[]) => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
};

// Функция для загрузки сообщений из localStorage
const loadMessages = (): Message[] => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        try {
            return JSON.parse(savedMessages);
        } catch (error) {
            console.error('Error parsing saved messages:', error);
            return [welcomeMessage];
        }
    }
    return [welcomeMessage];
};

export function ChatKitty() {
    const [messages, setMessages] = useState<Message[]>(() => loadMessages());
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState<string | null>(() => {
        const savedName = localStorage.getItem('userName');
        return savedName || null;
    });

    // Сохраняем сообщения при их изменении
    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    // Сохраняем имя пользователя при его изменении
    useEffect(() => {
        if (userName) {
            localStorage.setItem('userName', userName);
        } else {
            localStorage.removeItem('userName');
        }
    }, [userName]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: input
        };

        // Если это первое сообщение и оно похоже на имя
        if (!userName && messages.length === 1 && input.trim().length < 30) {
            setUserName(input.trim());
            userMessage.content = `Меня зовут ${input.trim()}`;
        }

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendMessage([systemPrompt, ...messages, userMessage]);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Извини, произошла ошибка. Попробуй еще раз.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={userName ? "Напиши сообщение..." : "Введи своё имя..."}
                    disabled={isLoading}
                    className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Отправка...' : 'Отправить'}
                </Button>
            </form>
        </div>
    );
} 