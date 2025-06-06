class ApiErrorHandler extends Error {
    statusCode;
    data;
    errors;
    success;
    stack;
    constructor(statusCode, message = "Unsuccessful api request", errors = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { ApiErrorHandler };
//# sourceMappingURL=ApiErrorHandler.js.map