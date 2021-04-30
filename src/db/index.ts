import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../config/config';

let mongo: MongoMemoryServer; // * In-memory server to be used for tests if our environment is in test mode

/**
 * 	Connect function will either connect to the in-memory server for the tests, or the real database.
 * 	@param Nothing
 *  @return Promise<void>
 */

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
		await mongoose.connect(config.database_Url, {
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
				mongoose.connect(config.database_Url, {
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

/*
	Disconnect function disconnects from the fake database as well as the real database. It terminates the connection
	@param nothing
	@return Promise<void>
*/
export const disconnect = async () => {
	await mongo.stop();
	return mongoose.connection.close();
};

export default connect;
