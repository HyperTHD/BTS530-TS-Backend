import express from 'express';
import cors from 'cors';
import passport from 'passport';
import strategy from './config/passportStrategy';
import { employeeRouter, eventRouter, blogsRouter } from './routes';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

passport.use(strategy);
app.use(passport.initialize());

app.use('/employees', employeeRouter);
app.use('/events', eventRouter);
app.use('/blogposts', blogsRouter);

export default app;
