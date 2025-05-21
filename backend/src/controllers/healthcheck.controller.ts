import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export const healthcheckController = {
    healthcheck: asyncHandler(async (req: Request, res: Response) => {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    message: "Server is running",
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                },
                "Healthcheck successful"
            )
        );
    }),

    admincheck: asyncHandler(async (req: Request, res: Response) => {
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    message: "Admin is running",
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                },
                "Admincheck successful"
            )
        );
    }),
};
