import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/blog-category.controller.js";

const router = Router();

// Blog Category Routes
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Blog Routes (to be implemented)
// router.post("/", createBlog);
// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);

export default router;
