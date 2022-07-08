import request from 'supertest';
import connect, { disconnect } from '../db';
import app from '../';

beforeAll(done => {
	connect().then(() => done()).catch(err => done(err));
});

afterAll(done => {
	disconnect().then(() => done()).catch(err => done(err));
});

describe('Blog Post routes', () => {
	test('POST request should create a new blog post', async done => {
		const res = await request(app).post('/blogposts').send({
			author: 'Abdulbasid Guled',
			title: 'Test blog post',
			description: 'A test blog post for the mock db to run unit tests for this route',
			post:
				'This blog post is a fake blog post meant to be used for a mock blog post. This fake post will be added to a fake mongodb database to be used in unit tests and possible e2e tests in the future.',
			date: '2021-05-07'
		});
		expect(res.status).toBe(201);
		expect(res.body instanceof Object).toBe(true);
		expect(res.get('content-type')).toContain('application/json');
		expect(res.body.author).toBe('Abdulbasid Guled');
		expect(res.body.title).toBe('Test blog post');
		done();
	});
	test('GET request should return an array of blog posts objects', async done => {
		const res = await request(app).get('/blogposts');
		expect(res.status).toBe(200);
		expect(res.body instanceof Array).toBe(true);
		expect(res.get('content-type')).toContain('application/json');
		expect(res.body.length).toEqual(1);
		expect(res.body[0].author).toBe('Abdulbasid Guled');
		expect(res.body[0].title).toBe('Test blog post');
		done();
	});
	test('PUT request should return an updated blog post', async done => {
		const res = await request(app).get('/blogposts');
		const updatedBlogPost = await request(app).put(`/blogposts/${res.body[0]._id}`).send({
			...res.body[0],
			title: 'Test blog post edited'
		});
		expect(updatedBlogPost.status).toBe(200);
		expect(updatedBlogPost.get('content-type')).toContain('application/json');
		expect(updatedBlogPost.body.title).toBe('Test blog post edited');
		expect(updatedBlogPost.body.author).toBe('Abdulbasid Guled');
		done();
	});
	test('DELETE request should return nothing but the status code indicating that it was deleted', async done => {
		const res = await request(app).get('/blogposts');
		const deletedPost = await request(app).delete(`/blogposts/${res.body[0]._id}`);
		expect(deletedPost.status).toBe(204);
		done();
	});
});
