import { Request, Response } from "express";
import { imagekit } from "../config/imagekit.js";

export const getUploadAuthParams = (req: Request, res: Response): void => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.json(authParams);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        res.status(500).json({ error: "Failed to generate auth params" });
    }
};
