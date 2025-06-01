import { Request, Response } from "express";
import BlogCategory, { IBlogCategory } from "../models/blog-category.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";

// Create a new blog category
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await BlogCategory.findOne({ name });
    if (existingCategory) {
        throw new ApiErrorHandler(
            400,
            "Category with this name already exists"
        );
    }

    const category = await BlogCategory.create({ name });
    res.status(201).json({
        success: true,
        data: category,
    });
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await BlogCategory.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: categories.length,
        data: categories,
    });
};

// Get single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    const category = await BlogCategory.findById(req.params.id);

    if (!category) {
        throw new ApiErrorHandler(404, "Category not found");
    }

    res.status(200).json({
        success: true,
        data: category,
    });
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    // Check if new name already exists in another category
    const existingCategory = await BlogCategory.findOne({
        name,
        _id: { $ne: req.params.id },
    });

    if (existingCategory) {
        throw new ApiErrorHandler(
            400,
            "Category with this name already exists"
        );
    }

    const category = await BlogCategory.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true, runValidators: true }
    );

    if (!category) {
        throw new ApiErrorHandler(404, "Category not found");
    }

    res.status(200).json({
        success: true,
        data: category,
    });
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
    const category = await BlogCategory.findByIdAndDelete(req.params.id);

    if (!category) {
        throw new ApiErrorHandler(404, "Category not found");
    }

    res.status(200).json({
        success: true,
        message: "Category deleted successfully",
    });
};
