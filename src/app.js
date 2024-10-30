import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
import { routerAuth, routerUser } from './routes/index.js';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(
    routerAuth,
    routerUser);

//Error Handler
app.use(errorHandler);

export default app;