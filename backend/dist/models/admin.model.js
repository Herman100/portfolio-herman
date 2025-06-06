import mongoose from "mongoose";
import joi from "joi";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
const Admin = mongoose.model("Admin", adminSchema);
const adminValidationSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("admin", "superadmin").default("admin"),
});
const adminUpdateValidationSchema = joi
    .object({
    name: joi.string(),
    email: joi.string().email(),
    password: joi.string().min(6),
    role: joi.string().valid("admin", "superadmin"),
})
    .or("name", "email", "password", "role");
const validateAdmin = (admin) => {
    const { error } = adminValidationSchema.validate(admin);
    if (error) {
        throw new ApiErrorHandler(400, error.details[0].message, ["Validation Error"], `${error.details}`);
    }
};
const validateAdminUpdate = (admin) => {
    const { error } = adminUpdateValidationSchema.validate(admin);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
export { Admin, validateAdmin, validateAdminUpdate };
export default adminSchema;
//# sourceMappingURL=admin.model.js.map