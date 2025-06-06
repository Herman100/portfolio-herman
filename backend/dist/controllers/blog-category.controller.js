import BlogCategory from "../models/blog-category.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const blogCategoryController = {
    // Create a new blog category
    createCategory: asyncHandler(async (req, res) => {
        const { name, description } = req.body;
        // Check if category already exists
        const existingCategory = await BlogCategory.findOne({ name });
        if (existingCategory) {
            throw new ApiErrorHandler(400, "Category with this name already exists", ["Category Creation Error"]);
        }
        const category = await BlogCategory.create({ name, description });
        res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
    }),
    // Get all categories
    getAllCategories: asyncHandler(async (req, res) => {
        const categories = await BlogCategory.find().sort({
            createdAt: -1,
        });
        res.status(200).json(new ApiResponse(200, categories, "Categories retrieved successfully"));
    }),
    // Get single category by ID
    getCategoryById: asyncHandler(async (req, res) => {
        const category = await BlogCategory.findById(req.params.id);
        if (!category) {
            throw new ApiErrorHandler(404, "Category not found", [
                "Category Retrieval Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, category, "Category retrieved successfully"));
    }),
    // Update category
    updateCategory: asyncHandler(async (req, res) => {
        const { name, description } = req.body;
        // Check if new name already exists in another category
        const existingCategory = await BlogCategory.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingCategory) {
            throw new ApiErrorHandler(400, "Category with this name already exists", ["Category Update Error"]);
        }
        const category = await BlogCategory.findByIdAndUpdate(req.params.id, { name, description }, { new: true, runValidators: true });
        if (!category) {
            throw new ApiErrorHandler(404, "Category not found", [
                "Category Update Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
    }),
    // Delete category
    deleteCategory: asyncHandler(async (req, res) => {
        const category = await BlogCategory.findByIdAndDelete(req.params.id);
        if (!category) {
            throw new ApiErrorHandler(404, "Category not found", [
                "Category Deletion Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, null, "Category deleted successfully"));
    }),
};
export default blogCategoryController;
//# sourceMappingURL=blog-category.controller.js.map