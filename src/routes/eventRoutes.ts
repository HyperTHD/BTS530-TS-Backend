import { Router, Request, Response } from 'express';
import { eventRouter } from '.';
import eventController from '../db/controllers/eventController';

const eventsRouter: Router = Router();

eventsRouter.get('/', async (req: Request, res: Response) => {
	try {
		const eventList = await eventController.EventsGetAll();
		res.status(200).json(eventList);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

eventsRouter.get('/:id', async (req: Request, res: Response) => {
	try {
		const event = await eventController.getEventsByID(req.params.id);
		if (event) {
			res.status(200).json(event);
		} else {
			res.status(404).json({ message: 'Event could not be found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

eventsRouter.post('/', async (req: Request, res: Response) => {
	try {
		const newEvent = await eventController.EventAdd(req.body);
		if (newEvent) {
			res.status(201).json(newEvent);
		} else {
			res.status(400).json({ message: "Bad data was given, couldn't create employee" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

eventsRouter.put('/:id', async (req: Request, res: Response) => {
	try {
		const updatedEvent = await eventController.EventEdit(req.body);
		if (updatedEvent) {
			res.status(200).json(updatedEvent);
		} else {
			res.status(400).json({ message: "Bad data was given, couldn't update event'" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

eventsRouter.delete('/:id', async (req: Request, res: Response) => {
	try {
		await eventController.EventDelete(req.params.id);
		return res.status(204).end();
	} catch (error) {
		res.status(503).json({ message: error.message });
	}
});

export default eventsRouter;
