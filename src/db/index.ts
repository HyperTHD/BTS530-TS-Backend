import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../config/config';

let mongo: MongoMemoryServer;

const connect = async () => {
	if (process.env.NODE_ENV === 'test') {
		mongo = new MongoMemoryServer();
		const mongoUri = await mongo.getUri();

		await mongoose.connect(mongoUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	} else {
		await mongoose.connect(config.employeeCollection, {
			connectTimeoutMS: 5000,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		const connection = mongoose.connection;

		connection.on('connected', () => console.log('Connected to DB'));
		connection.on('disconnected', () => {
			console.log('Trying to reconnect back to DB');
			setTimeout(() => {
				mongoose.connect(config.employeeCollection, {
					autoReconnect: true,
					keepAlive: true,
					socketTimeoutMS: 3000,
					connectTimeoutMS: 3000
				});
			}, 3000);
		});
		connection.on('close', () => {
			console.log('Mongo Connection Closed');
		});
		connection.on('error', (error: Error) => {
			console.log('Mongo Connection ERROR: ' + error);
		});
	}
};

export const disconnect = async () => {
	await mongo.stop();
	return mongoose.connection.close();
};

export default connect;
