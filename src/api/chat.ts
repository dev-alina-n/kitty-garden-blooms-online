import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export async function sendMessage(messages: Message[]): Promise<string> {
    try {
        const response = await axios.post(`${API_URL}/chat`, { messages });
        return response.data.message;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
} 