import express from 'express';
import blogPostController from '../db/controllers/blogPostController';

const blogsRouter: express.Router = express.Router();

blogsRouter.get('/', async (req: express.Request, res: express.Response) => {
	try {
		const posts = await blogPostController.getAllBlogPosts();
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

blogsRouter.get('/:id', async (req: express.Request, res: express.Response) => {
	try {
		const post = await blogPostController.getBlogPostById(req.params.id);
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({ message: 'Blog post could not be found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

blogsRouter.post('/', async (req: express.Request, res: express.Response) => {
	try {
		const newPost = await blogPostController.blogPostAdd(req.body);
		if (newPost) {
			res.status(201).json(newPost);
		} else {
			res.status(400).json({ message: 'Bad data, could not create new blog post' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

blogsRouter.put('/:id', async (req: express.Request, res: express.Response) => {
	try {
		const updatedPost = await blogPostController.blogPostEdit(req.body);
		if (updatedPost) {
			res.status(200).json(updatedPost);
		} else {
			res.status(400).json({ message: 'Bad data, could not update blog post' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

blogsRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
	try {
		await blogPostController.blogPostDelete(req.params.id);
		return res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default blogsRouter;
