import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/blog-category.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = Router();

// Blog Category Routes
router.post("/categories", createCategory, verifyAccessToken);
router.get("/categories", getAllCategories, verifyAccessToken);
router.get("/categories/:id", getCategoryById, verifyAccessToken);
router.put("/categories/:id", updateCategory, verifyAccessToken);
router.delete("/categories/:id", deleteCategory, verifyAccessToken);

// Blog Routes (to be implemented)
// router.post("/", createBlog);
// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);

export default router;
