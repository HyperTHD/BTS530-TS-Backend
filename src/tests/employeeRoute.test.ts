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

	test('GET route should return a single employee using its ID', async done => {
		// TODO: Update this test to add employee documents prior to running since relying on the POST test means I'll get a different _id every time the test is ran
		const res = await request(app).get('/employees');
		const getResWithId = await request(app).get(`/employees/${res.body[0]._id}`);

		expect(getResWithId.status).toEqual(200);
		expect(getResWithId.get('content-type')).toContain('application/json');
		expect(getResWithId.body._id).toBe(res.body[0]._id);
		expect(getResWithId.body.username).toBe('Name1Username');
		done();
	});

	test('POST login route should return a token', async done => {
		// TODO: Update this test similar to :id tests since the token can be different every time a new user is uploaded
		// ? Should add more tests for this test later on to check the token and validate it, will put in a util file later on
		const res = await request(app).post('/employees/login').send({
			username: 'Name1Username',
			password: 'Name1Pass'
		});

		expect(res.status).toEqual(200);
		expect(res.get('content-type')).toContain('application/json');
		done();
	});

	test('PUT route should update an existing employee', async done => {
		// TODO: Update this test to add employee documents prior to running since relying on the POST test means I'll get a different _id every time the test is ran
		const res = await request(app).get('/employees');
		const updatedEmployee = await request(app).put(`/employees/${res.body[0]._id}`).send({
			...res.body[0],
			username: 'Name2Username'
		});
		expect(updatedEmployee.status).toEqual(200);
		expect(updatedEmployee.get('content-type')).toContain('application/json');
		expect(updatedEmployee.body.username).toBe('Name2Username');
		done();
	});

	test('DELETE route should remove an existing employee', async done => {
		// TODO: Update this test to add employee documents prior to running since relying on the POST test means I'll get a different _id every time the test is ran
		const res = await request(app).get('/employees');
		const deleteEmployee = await request(app).delete(`/employees/${res.body[0]._id}`);

		expect(deleteEmployee.status).toEqual(204);
		done();
	});
});
