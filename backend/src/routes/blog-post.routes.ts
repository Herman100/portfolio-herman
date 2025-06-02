import express from "express";
import blogPostController from "../controllers/blog-post.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = express.Router();

// Create a new blog post
router.post("/", blogPostController.createBlogPost, verifyAccessToken);

// Get all blog posts
router.get("/", blogPostController.getAllBlogPosts, verifyAccessToken);

// Get a specific blog post by ID
router.get("/:id", blogPostController.getBlogPostById, verifyAccessToken);

// Update a blog post
router.put("/:id", blogPostController.updateBlogPost, verifyAccessToken);

// Delete a blog post
router.delete("/:id", blogPostController.deleteBlogPost, verifyAccessToken);

//public routes
router.get("/public/blogs", blogPostController.getAllBlogPosts);

export default router;
