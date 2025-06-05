import { Request, Response } from "express";
import BlogPost, { IBlogPost } from "../models/blog-post.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const blogPostController = {
    // Create a new blog post
    createBlogPost: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { title, content, category, tags, coverImage } = req.body;

            const blogPost = await BlogPost.create({
                title,
                content,
                category,
                tags,
                coverImage,
            });

            res.status(201).json(
                new ApiResponse(201, blogPost, "Blog post created successfully")
            );
        }
    ),

    // Get all blog posts
    getAllBlogPosts: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { page = 0, limit = 10 } = req.params;

            const total = await BlogPost.countDocuments();
            const totalPages = Math.ceil(total / Number(limit));
            const blogPosts = await BlogPost.find()
                .skip(Number(page) * Number(limit))
                .limit(Number(limit))
                .sort({ createdAt: -1 });

            res.status(200).json(
                new ApiResponse(
                    200,
                    {
                        blogs: blogPosts,
                        total,
                        page: Number(page) + 1,
                        limit: Number(limit),
                        totalPages: totalPages,
                    },
                    "Blog posts retrieved successfully"
                )
            );
        }
    ),

    // Get single blog post by ID
    getBlogPostById: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const blogPost = await BlogPost.findById(req.params.id);

            if (!blogPost) {
                throw new ApiErrorHandler(404, "Blog post not found", [
                    "Blog Post Retrieval Error",
                ]);
            }

            res.status(200).json(
                new ApiResponse(
                    200,
                    blogPost,
                    "Blog post retrieved successfully"
                )
            );
        }
    ),

    // Update blog post
    updateBlogPost: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { title, content, category, tags, coverImage } = req.body;

            const blogPost = await BlogPost.findByIdAndUpdate(
                req.params.id,
                { title, content, category, tags, coverImage },
                { new: true, runValidators: true }
            );

            if (!blogPost) {
                throw new ApiErrorHandler(404, "Blog post not found", [
                    "Blog Post Update Error",
                ]);
            }

            res.status(200).json(
                new ApiResponse(200, blogPost, "Blog post updated successfully")
            );
        }
    ),

    // Delete blog post
    deleteBlogPost: asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const blogPost = await BlogPost.findByIdAndDelete(req.params.id);

            if (!blogPost) {
                throw new ApiErrorHandler(404, "Blog post not found", [
                    "Blog Post Deletion Error",
                ]);
            }

            res.status(200).json(
                new ApiResponse(200, null, "Blog post deleted successfully")
            );
        }
    ),
};

export default blogPostController;
