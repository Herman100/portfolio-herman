import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
    title: string;
    coverImage?: string;
    category: string;
    tags: string[];
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        coverImage: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        content: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
