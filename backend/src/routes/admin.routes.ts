import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/refresh-token").post(adminController.refreshToken);
router.route("/logout").post(adminController.logout);
router
    .route("/admin-profile")
    .get(verifyAccessToken, adminController.getProfile);

export default router;
