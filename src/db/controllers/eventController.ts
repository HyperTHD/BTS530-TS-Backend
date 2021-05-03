import { IEvent, Event } from '../models/Events';

const eventController = {
	EventsGetAll: async (): Promise<IEvent[] | null> => {
		try {
			const events = await Event.find().sort({ firstName: 'asc' }).exec();
			if (events) {
				return events;
			} else {
				return null;
			}
		} catch (error) {
			return error.message;
		}
	},

	getEventsByID: async (id: string): Promise<IEvent | null> => {
		try {
			const event = Event.findById(id);
			if (event) {
				return event;
			} else {
				return null;
			}
		} catch (error) {
			return error.message;
		}
	},

	EventAdd: async (newItem: IEvent): Promise<IEvent | null> => {
		try {
			const newEvent = await Event.create(newItem);
			if (newEvent) {
				return newEvent;
			} else {
				return null;
			}
		} catch (error) {
			return error.message;
		}
	},

	EventEdit: async (newItem: IEvent): Promise<IEvent | null> => {
		try {
			const updatedEvent = await Event.findByIdAndUpdate(newItem._id, newItem, { new: true });
			if (updatedEvent) {
				return updatedEvent;
			} else {
				return null;
			}
		} catch (error) {
			return error.message;
		}
	},

	EventDelete: async (id: string): Promise<IEvent | null> => {
		try {
			const deletedEvent = await Event.findByIdAndRemove(id);
			if (deletedEvent) {
				return deletedEvent;
			} else {
				return null;
			}
		} catch (error) {
			return error.message;
		}
	}
};

export default eventController;
