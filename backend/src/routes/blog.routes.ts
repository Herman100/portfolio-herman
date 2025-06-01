import { Router } from "express";
import blogCategoryController from "../controllers/blog-category.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = Router();

// Blog Category Routes
router.post(
    "/categories",
    verifyAccessToken,
    blogCategoryController.createCategory
);
router.get(
    "/categories",
    verifyAccessToken,
    blogCategoryController.getAllCategories
);
router.get(
    "/categories/:id",
    verifyAccessToken,
    blogCategoryController.getCategoryById
);
router.put(
    "/categories/:id",
    verifyAccessToken,
    blogCategoryController.updateCategory
);
router.delete(
    "/categories/:id",
    verifyAccessToken,
    blogCategoryController.deleteCategory
);

// Blog Routes (to be implemented)
// router.post("/", createBlog);
// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);

export default router;
