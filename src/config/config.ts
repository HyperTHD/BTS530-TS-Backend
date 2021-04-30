import dotenv from 'dotenv';

dotenv.config(); // Load env values into this file

// * A database url and jwt secret key are necessary so check here to ensure both are always available
if (!process.env.DB_EMPLOYEE_URL || !process.env.JWT_SECRET_KEY) {
	console.error(
		'A JWT secret key and a database uri is required for this app to work. Set it up in your environment variables'
	);
	process.exit(1);
}

export default {
	database_Url: process.env.DB_EMPLOYEE_URL,
	jwtSecretKey: process.env.JWT_SECRET_KEY
};
