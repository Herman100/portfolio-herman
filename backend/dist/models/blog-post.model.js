import mongoose, { Schema } from "mongoose";
const BlogPostSchema = new Schema({
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
}, {
    timestamps: true,
});
export default mongoose.model("BlogPost", BlogPostSchema);
//# sourceMappingURL=blog-post.model.js.map