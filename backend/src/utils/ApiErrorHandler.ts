import { NextFunction, Request, Response } from "express";

class ApiErrorHandler extends Error {
    stack?: any;
    statusCode: any;
    data: null;
    errors: any;
    success: boolean;

    constructor(
        statusCode: any,
        stack: any = "",
        message: string = "Unsuccessful api request",
        errors: any = []
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiErrorHandler };
