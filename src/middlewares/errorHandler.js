const { errorResponse } = require('../utils/response');

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let statusCode = 500;
    let message = 'Terjadi kesalahan pada server';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;
    }

    // Send error response
    return errorResponse(res, message, statusCode, {
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorHandler;