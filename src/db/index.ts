import mongoose from 'mongoose';
import { MockMongoose } from 'mock-mongoose';
import config from '../config/config';

const connect = async () => {
	if (process.env.NODE_ENV === 'test') {
		let mockMongoose: MockMongoose = new MockMongoose(mongoose);

		mockMongoose.prepareStorage().then(async () => {
			await mongoose.connect(config.employeeCollection, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			});
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

export const disconnect = () => {
	return mongoose.connection.close();
};

export default connect;
