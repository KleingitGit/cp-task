import { ENV } from './config/env';
import dotenv from "dotenv";
import express, { Express } from "express";
import cors from 'cors';
import { corsConfig } from "./config/cors";
import { usersRouter } from './routes/usersRoute';

dotenv.config();

const app: Express = express();
const port = ENV.port || 3000;

app.use(express.json());
app.use(cors(corsConfig));
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});