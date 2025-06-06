import mongoose, { Schema } from "mongoose";
const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, "Tag name is required"],
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});
const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
//# sourceMappingURL=tag.model.js.map