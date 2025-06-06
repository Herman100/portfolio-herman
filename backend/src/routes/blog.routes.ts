import { Router } from "express";
import blogCategoryController from "../controllers/blog-category.controller.js";
import tagController from "../controllers/tag.controller.js";
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
router.get("/categories/public", blogCategoryController.getAllCategories);
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

// Tag Routes
router.post("/tags", verifyAccessToken, tagController.createTag);
router.get("/tags", verifyAccessToken, tagController.getAllTags);
router.get("/tags/:id", verifyAccessToken, tagController.getTagById);
router.put("/tags/:id", verifyAccessToken, tagController.updateTag);
router.delete("/tags/:id", verifyAccessToken, tagController.deleteTag);

// Blog Routes (to be implemented)
// router.post("/", createBlog);
// router.get("/", getAllBlogs);
// router.get("/:id", getBlogById);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);

export default router;
