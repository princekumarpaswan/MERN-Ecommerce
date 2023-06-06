const ErrorHandler = require('../util/errorhandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Server Error";


    // wrong MOngodb error
    if (err.name === "CastError") {
        const message = `Resources not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
    })
}

