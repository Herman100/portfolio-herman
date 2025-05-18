import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const router = Router();

router.route("/register").post(adminController.register);
router.route("/login").post(adminController.login);
router.route("/refresh-token").post(adminController.refreshToken);

export default router;
