import express from "express";
import { getUploadAuthParams } from "../controllers/upload.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = express.Router();

// GET /upload-image-video
router.get("/upload-image-video", verifyAccessToken, getUploadAuthParams);

export default router;
