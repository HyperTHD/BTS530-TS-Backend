import request from 'supertest';
import connect, { disconnect } from '../db';
import app from '../';

beforeAll(done => {
	connect().then(() => done()).catch(err => done(err));
});

afterAll(done => {
	disconnect().then(() => done()).catch(err => done(err));
});

describe('Employee routes', () => {
	test('POST route should create a new employee', async done => {
		const res = await request(app)
			.post('/employees')
			.send({
				employeeNum: 201,
				isAdmin: true,
				isManager: true,
				blogPosts: [],
				events: [],
				firstName: 'Name 1',
				lastName: 'Name 1 Last',
				email: 'Name1@gmail.com',
				phoneNumber: '6478014698',
				address: '102 John Garland Blvd',
				username: 'Name1Username',
				password: 'Name1Pass',
				DOB: '2005-03-21',
				hireDate: '2011-07-25'
			})
			.set('content-type', 'application/json');

		expect(res.status).toBe(201);
		expect(res.body.username).toBe('Name1Username');
		done();
	});

	test('GET route should return array of employees', async done => {
		const res = await request(app).get('/employees');
		expect(res.status).toBe(200);
		expect(res.get('content-type')).toContain('application/json');
		expect(res.body instanceof Array).toBe(true);
		expect(res.body.length).toEqual(1);
		done();
	});
});
