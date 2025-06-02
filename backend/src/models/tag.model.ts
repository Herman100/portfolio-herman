import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const tagSchema = new Schema<ITag>(
    {
        name: {
            type: String,
            required: [true, "Tag name is required"],
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Tag = mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
