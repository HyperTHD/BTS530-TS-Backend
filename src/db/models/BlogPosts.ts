import { Document, Schema, Model, model } from 'mongoose';

export interface IBlogPost extends Document {
	author: string;
	title: string;
	description: string;
	post: string;
	date: Date;
}

export const blogPostSchema = new Schema({
	author: { type: String, required: true },
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	post: { type: String, required: true },
	date: { type: Date, required: true, default: new Date().toLocaleDateString() }
});

export const BlogPost: Model<IBlogPost> = model<IBlogPost>('blogpost', blogPostSchema, 'BlogPost');
