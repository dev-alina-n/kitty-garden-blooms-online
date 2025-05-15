
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import https from 'https';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Настройка CORS для разрешения запросов с localhost:8080
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

const GIGACHAT_AUTH_URL = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
const GIGACHAT_API_URL = 'https://gigachat.devices.sberbank.ru/api/v1';

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

let currentToken = null;

async function getGigaChatToken() {
    if (currentToken && Date.now() < currentToken.expires_at) {
        return currentToken.access_token;
    }

    const authKey = process.env.GIGACHAT_AUTH_KEY;
    
    if (!authKey) {
        throw new Error('GigaChat auth key is not configured');
    }

    const rqUid = uuidv4();

    try {
        const response = await axios({
            method: 'post',
            url: GIGACHAT_AUTH_URL,
            headers: {
                'Authorization': `Basic ${authKey}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'RqUID': rqUid
            },
            data: new URLSearchParams({
                scope: 'GIGACHAT_API_PERS'
            }).toString(),
            httpsAgent,
            timeout: 30000
        });

        if (response.data && response.data.access_token) {
            currentToken = {
                access_token: response.data.access_token,
                expires_at: Date.now() + 30 * 60 * 1000
            };
            return currentToken.access_token;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('Error getting GigaChat token:', error);
        throw error;
    }
}

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;
        const token = await getGigaChatToken();

        const response = await axios.post(
            `${GIGACHAT_API_URL}/chat/completions`,
            {
                model: 'GigaChat-Max',
                messages,
                temperature: 0.7,
                max_tokens: 1024,
                repetition_penalty: 1,
                update_interval: 0
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                httpsAgent,
                timeout: 30000
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
