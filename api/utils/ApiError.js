class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong!",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.success = false;

        // checks if a custom stack is provided. If it is, it sets this.stack to that value. If not, it generates a stack trace for the error instance.
        if (stack.length > 0) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
