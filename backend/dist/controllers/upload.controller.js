import { imagekit } from "../config/imagekit.js";
export const getUploadAuthParams = (req, res) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.json(authParams);
    }
    catch (error) {
        console.error("ImageKit Auth Error:", error);
        res.status(500).json({ error: "Failed to generate auth params" });
    }
};
//# sourceMappingURL=upload.controller.js.map