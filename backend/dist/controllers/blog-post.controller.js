import BlogPost from "../models/blog-post.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const blogPostController = {
    // Create a new blog post
    createBlogPost: asyncHandler(async (req, res) => {
        const { title, content, category, tags, coverImage, author } = req.body;
        const blogPost = await BlogPost.create({
            title,
            content,
            category,
            tags,
            coverImage,
            author,
        });
        res.status(201).json(new ApiResponse(201, blogPost, "Blog post created successfully"));
    }),
    // Get all blog posts
    getAllBlogPosts: asyncHandler(async (req, res) => {
        const page = Number(req.query.page) || 0;
        const limit = Number(req.query.limit) || 10;
        const category = req.query.category;
        const query = category ? { category } : {};
        const total = await BlogPost.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        const blogPosts = await BlogPost.find(query)
            .skip(page * limit)
            .limit(limit)
            .sort({ createdAt: -1 });
        res.status(200).json(new ApiResponse(200, {
            blogs: blogPosts,
            total,
            page,
            limit,
            totalPages,
        }, "Blog posts retrieved successfully"));
    }),
    // Get single blog post by ID
    getBlogPostById: asyncHandler(async (req, res) => {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            throw new ApiErrorHandler(404, "Blog post not found", [
                "Blog Post Retrieval Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, blogPost, "Blog post retrieved successfully"));
    }),
    // Update blog post
    updateBlogPost: asyncHandler(async (req, res) => {
        const updateData = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            tags: req.body.tags,
            coverImage: req.body.coverImage,
            author: req.body.author,
        };
        const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!blogPost) {
            throw new ApiErrorHandler(404, "Blog post not found", [
                "Blog Post Update Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, blogPost, "Blog post updated successfully"));
    }),
    // Delete blog post
    deleteBlogPost: asyncHandler(async (req, res) => {
        const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
        if (!blogPost) {
            throw new ApiErrorHandler(404, "Blog post not found", [
                "Blog Post Deletion Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, null, "Blog post deleted successfully"));
    }),
};
export default blogPostController;
//# sourceMappingURL=blog-post.controller.js.map