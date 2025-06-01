import mongoose, { Schema, Document } from "mongoose";

export interface IBlogCategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogCategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IBlogCategory>(
    "BlogCategory",
    BlogCategorySchema
);
