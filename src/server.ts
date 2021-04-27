import app from './';
import connect from './db';

const PORT = parseInt(process.env.PORT || '7000', 10);

connect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App is listening on port ${PORT}`);
		});
	})
	.catch((error: Error) => {
		console.error(error.message);
	});
