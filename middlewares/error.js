const httpStatus = require('http-status')
const mongoose = require('mongoose')

const ApiError = require('../utils/api-error')

const errorConverter = (err, req, res, next) => {
    let error = err

    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err

    const response = {
        code: statusCode,
        message,
    }

    return res.status(statusCode).json(response)
}

module.exports = {
    errorConverter,
    errorHandler,
}
