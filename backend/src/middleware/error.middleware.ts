import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle custom ApiErrorHandler
    if (err instanceof ApiErrorHandler) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            data: null,
        });
        return;
    }

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        const validationErrors = Object.values((err as any).errors).map(
            (error: any) => error.message
        );

        res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: validationErrors,
            data: null,
        });
        return;
    }

    // Handle duplicate key errors (MongoDB)
    if ((err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue)[0];
        res.status(400).json({
            success: false,
            message: `${field} already exists`,
            errors: [`Duplicate ${field}`],
            data: null,
        });
        return;
    }

    // Generic error (don't expose internal details)
    console.error("Unhandled Error:", err); // Log for debugging

    res.status(500).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Internal Server Error"
                : err.message,
        errors: [],
        data: null,
    });
};

export default errorHandler;
