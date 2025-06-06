import express from "express";
import blogPostController from "../controllers/blog-post.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public routes
router.get("/public", blogPostController.getAllBlogPosts);
router.get("/public/:id", blogPostController.getBlogPostById);

// Protected routes
router.post("/", verifyAccessToken, blogPostController.createBlogPost);
router.get("/", verifyAccessToken, blogPostController.getAllBlogPosts);
router.get("/:id", verifyAccessToken, blogPostController.getBlogPostById);
router.put("/:id", verifyAccessToken, blogPostController.updateBlogPost);
router.delete("/:id", verifyAccessToken, blogPostController.deleteBlogPost);

export default router;
