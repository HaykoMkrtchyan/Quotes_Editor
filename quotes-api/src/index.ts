import express, { json } from 'express';
import { quotesRouter } from './routes/quotes';
import { config } from 'dotenv';
import cors from 'cors';
import './database';

config();

const PORT = process.env.PORT || '8081';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
app.use(json());

app.use(cors({
    origin: CLIENT_URL
}));

app.use('/quotes', quotesRouter);

app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));
