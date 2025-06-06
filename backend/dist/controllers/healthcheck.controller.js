import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const healthcheckController = {
    healthcheck: asyncHandler(async (req, res) => {
        return res.status(200).json(new ApiResponse(200, {
            message: "Server is running",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        }, "Healthcheck successful"));
    }),
    admincheck: asyncHandler(async (req, res) => {
        return res.status(200).json(new ApiResponse(200, {
            message: "Admin is running",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        }, "Admincheck successful"));
    }),
};
//# sourceMappingURL=healthcheck.controller.js.map