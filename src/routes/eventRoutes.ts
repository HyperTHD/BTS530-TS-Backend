import express from 'express';

const eventsRouter: express.Router = express.Router();

eventsRouter.get('/', (req: express.Request, res: express.Response) => {
	res.send('Events GET route');
});

export default eventsRouter;
