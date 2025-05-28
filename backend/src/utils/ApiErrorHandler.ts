class ApiErrorHandler extends Error {
    statusCode: number;
    data: null;
    errors: any[];
    success: boolean;
    stack?: string;

    constructor(
        statusCode: number,
        message: string = "Unsuccessful api request",
        errors: any[] = [],
        stack?: string
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
