import { Document, Schema, Model, model } from 'mongoose';

export interface IEvent extends Document {
	EventName: string;
	EventDate: Date;
	EventDescription: string;
	EventLocation: string;
	EventParticipants: Number;
	EventAttendees: Array<Schema.Types.ObjectId>;
	EventInvited: Array<Schema.Types.ObjectId>;
	EventStartTime: string;
	EventEndTime: string;
	Manager: string;
}

export const eventSchema = new Schema({
	EventName: { type: String, required: true, unique: true },
	EventDate: { type: Date, required: true, unique: true },
	EventDescription: { type: String, required: true },
	EventLocation: { type: String, required: true },
	EventParticipants: { type: Number, required: true },
	EventAttendees: [ { type: Schema.Types.ObjectId, ref: 'employee' } ],
	EventInvited: [ { type: Schema.Types.ObjectId, ref: 'employee' } ],
	EventStartTime: { type: String, required: true },
	EventEndTime: { type: String, required: true },
	Manager: { type: String, required: true }
});

export const Event: Model<IEvent> = model<IEvent>('event', eventSchema, 'Event');
