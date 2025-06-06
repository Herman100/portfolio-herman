import Tag from "../models/tag.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const tagController = {
    // Create a new tag
    createTag: asyncHandler(async (req, res) => {
        const { name } = req.body;
        // Check if tag already exists
        const existingTag = await Tag.findOne({ name });
        if (existingTag) {
            throw new ApiErrorHandler(400, "Tag with this name already exists", ["Tag Creation Error"]);
        }
        const tag = await Tag.create({ name });
        res.status(201).json(new ApiResponse(201, tag, "Tag created successfully"));
    }),
    // Get all tags
    getAllTags: asyncHandler(async (req, res) => {
        const tags = await Tag.find().sort({
            createdAt: -1,
        });
        res.status(200).json(new ApiResponse(200, tags, "Tags retrieved successfully"));
    }),
    // Get single tag by ID
    getTagById: asyncHandler(async (req, res) => {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            throw new ApiErrorHandler(404, "Tag not found", [
                "Tag Retrieval Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, tag, "Tag retrieved successfully"));
    }),
    // Update tag
    updateTag: asyncHandler(async (req, res) => {
        const { name } = req.body;
        // Check if new name already exists in another tag
        const existingTag = await Tag.findOne({
            name,
            _id: { $ne: req.params.id },
        });
        if (existingTag) {
            throw new ApiErrorHandler(400, "Tag with this name already exists", ["Tag Update Error"]);
        }
        const tag = await Tag.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true });
        if (!tag) {
            throw new ApiErrorHandler(404, "Tag not found", [
                "Tag Update Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, tag, "Tag updated successfully"));
    }),
    // Delete tag
    deleteTag: asyncHandler(async (req, res) => {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            throw new ApiErrorHandler(404, "Tag not found", [
                "Tag Deletion Error",
            ]);
        }
        res.status(200).json(new ApiResponse(200, null, "Tag deleted successfully"));
    }),
};
export default tagController;
//# sourceMappingURL=tag.controller.js.map