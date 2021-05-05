import { IBlogPost, BlogPost } from '../models/BlogPosts';

const blogPostController = {
	getAllBlogPosts: async (): Promise<IBlogPost[]> => {
		try {
			const posts = await BlogPost.find().exec();
			return posts;
		} catch (error) {
			return error.message;
		}
	},
	getBlogPostById: async (id: string): Promise<IBlogPost | null> => {
		try {
			const post = await BlogPost.findById(id);
			if (post) {
				return post;
			}
			return null;
		} catch (error) {
			return error.message;
		}
	},
	blogPostAdd: async (newItem: IBlogPost): Promise<IBlogPost | null> => {
		try {
			const newPost = await BlogPost.create(newItem);
			if (newPost) {
				return newPost;
			}
			return null;
		} catch (error) {
			return error.message;
		}
	},
	blogPostEdit: async (newItem: IBlogPost): Promise<IBlogPost | null> => {
		try {
			const updatedPost = await BlogPost.findByIdAndUpdate(newItem._id, newItem, { new: true });
			if (updatedPost) {
				return updatedPost;
			}
			return null;
		} catch (error) {
			return error.message;
		}
	},
	blogPostDelete: async (id: string) => {
		try {
			return await BlogPost.findByIdAndRemove(id);
		} catch (error) {
			return error.message;
		}
	}
};

export default blogPostController;
