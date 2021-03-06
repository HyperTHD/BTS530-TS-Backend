import request from 'supertest';
import connect, { disconnect } from '../db';
import app from '../';

beforeAll(done => {
	connect().then(() => done()).catch(err => done(err));
});

afterAll(done => {
	disconnect().then(() => done()).catch(err => done(err));
});

describe('Event Routes', () => {
	test('POST route should create a new event', async done => {
		const res = await request(app).post('/events').send({
			EventName: 'Summer co-op internship interview',
			EventDate: '2021-05-03',
			EventDescription: 'Summer work term',
			EventLocation: 'Home',
			EventParticipants: 1,
			EventAttendees: [],
			EventInvited: [],
			EventStartTime: '10:00 AM',
			EventEndTime: '6:00 PM',
			Manager: 'Abdulbasid Guled'
		});

		expect(res.status).toEqual(201);
		expect(res.get('content-type')).toContain('application/json');
		expect(res.body instanceof Object).toBe(true);
		expect(res.body.Manager).toBe('Abdulbasid Guled');
		done();
	});
	test('GET route should get all events', async done => {
		const res = await request(app).get('/events');

		expect(res.status).toEqual(200);
		expect(res.get('content-type')).toContain('application/json');
		expect(res.body instanceof Array).toBe(true);
		expect(res.body.length).toEqual(1);
		expect(res.body.length).toBeGreaterThan(0);
		expect(res.body[0].Manager).toBe('Abdulbasid Guled');
		done();
	});
	test('GET route should return an event by its id', async done => {
		const res = await request(app).get('/events');
		const response = await request(app).get(`/events/${res.body[0]._id}`);

		expect(response.status).toEqual(200);
		expect(response.body instanceof Object).toBe(true);
		expect(response.get('content-type')).toContain('application/json');
		expect(response.body.Manager).toBe('Abdulbasid Guled');
		expect(response.body.EventLocation).toBe('Home');
		expect(response.body.EventName).toBe('Summer co-op internship interview');
		done();
	});
	test('PUT route should update an event', async done => {
		const res = await request(app).get('/events');
		const response = await request(app).put(`/events/${res.body[0]._id}`).send({
			...res.body[0],
			Manager: 'Adnan Guled'
		});

		expect(response.status).toEqual(200);
		expect(response.get('content-type')).toContain('application/json');
		expect(response.body instanceof Object).toBe(true);
		expect(response.body.Manager).toBe('Adnan Guled');
		done();
	});
	test('DELETE route should delete an event', async done => {
		const res = await request(app).get('/events');
		const response = await request(app).delete(`/events/${res.body[0]._id}`);

		expect(response.status).toEqual(204);
		done();
	});
});
