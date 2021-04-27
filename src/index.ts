import express from 'express';
import cors from 'cors';
import { employeeRouter, eventRouter, blogsRouter } from './routes';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/employees', employeeRouter);
app.use('/events', eventRouter);
app.use('/blogposts', blogsRouter);

export default app;
