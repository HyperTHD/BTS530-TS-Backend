import request from 'supertest';
import connect, { disconnect } from '../db';
import app from '../';

describe('Employee routes', () => {
	beforeEach(done => {
		connect().then(() => done()).catch(err => done(err));
	});

	afterEach(done => {
		disconnect().then(() => done()).catch(err => done(err));
	});

	test('GET route should return array of employees', async done => {
		const res = await request(app).get('/employees');

		expect(res.status).toBe(200);
		done();
	});
});
