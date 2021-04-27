import { Document, Schema, Model, model, Error } from 'mongoose';

export interface IEmployee extends Document {
	firstName: String;
	employeeNum: Number;
	isAdmin: Boolean;
	isManager: Boolean;
	phoneNumber: String;
	email: String;
	address: String;
	hireDate: Date;
	DOB: Date;
	username: String;
	password: String;
	blogPosts: Schema.Types.ObjectId;
	events: Schema.Types.ObjectId;
}

export const employeeSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	employeeNum: { type: Number, default: 110 + 1, unique: true },
	isAdmin: { type: Boolean, default: false },
	isManager: { type: Boolean, default: false },
	phoneNumber: { type: String, unique: true },
	email: { type: String, required: true, unique: true },
	address: { type: String, required: true, unique: true },
	hireDate: Date,
	DOB: Date,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true }
	//blogPosts: [ { type: Schema.Types.ObjectId, ref: 'blogpost' } ],
	//events: [ { type: Schema.Types.ObjectId, ref: 'event' } ]
});

export const Employee: Model<IEmployee> = model<IEmployee>('employee', employeeSchema, 'Employee');
