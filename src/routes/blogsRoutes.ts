import express from 'express';

const blogsRouter: express.Router = express.Router();

blogsRouter.get('/', (req: express.Request, res: express.Response) => {
	res.send('Blog Post GET route');
});

export default blogsRouter;
