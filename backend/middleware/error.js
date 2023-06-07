const ErrorHandler = require('../util/errorhandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Server Error";


    // wrong MOngodb error
    if (err.name === "CastError") {
        const message = `Resources not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if (err.code === 1100) {
        const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error

    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // JWT Expire ERROR

    if (err.name === "JsonWebExpiredError") {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
    })
}

