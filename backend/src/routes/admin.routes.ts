import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import { verifyAccessToken } from "../middleware/admin.middleware.js";

const router = Router();

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/refresh").post(adminController.refreshToken);
router.route("/logout").post(adminController.logout);
router.route("/profile").get(verifyAccessToken, adminController.getProfile);

export default router;
