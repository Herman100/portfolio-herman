import { Router } from "express";
import { healthcheckController } from "../controllers/healthcheck.controller.js";
const router = Router();
router.route("/").get(healthcheckController.healthcheck);
router.route("/admin").get(healthcheckController.admincheck);
export default router;
//# sourceMappingURL=healthcheck.routes.js.map