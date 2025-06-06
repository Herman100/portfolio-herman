import mongoose, { Schema } from "mongoose";
const BlogCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        unique: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("BlogCategory", BlogCategorySchema);
//# sourceMappingURL=blog-category.model.js.map