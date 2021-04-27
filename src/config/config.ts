import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_EMPLOYEE_URL || !process.env.JWT_SECRET_KEY) {
	console.error(
		'A JWT secret key and a database uri is required for this app to work. Set it up in your environment variables'
	);
	process.exit(1);
}

export default {
	employeeCollection: process.env.DB_EMPLOYEE_URL,
	eventsCollection: process.env.DB_EVENTS_URL,
	blogPostCollection: process.env.DB_BLOG_URL,
	jwtSecretKey: process.env.JWT_SECRET_KEY
};
