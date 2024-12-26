import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { API_VERSION } from './config';
import { router } from './routes';

export const app = express();

app.use(cors());

// Update limit to 50mb to allow for large data uploads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.get('/health-check', (req, res) => {
    res.send('OK');
});

app.use(`/${API_VERSION}`, router);
