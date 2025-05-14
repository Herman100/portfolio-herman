import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

const healthcheckController = asyncHandler(
    async (req: Request, res: Response) => {
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
    }
);

export { healthcheckController };
