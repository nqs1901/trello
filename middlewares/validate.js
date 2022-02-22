const Joi = require('joi')
const httpStatus = require('http-status')

const ApiError = require('../utils/api-error')

module.exports = (schema,property) => (req, res, next) => {
    const { error } = schema.validate(req[property])
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ')
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
    }
    return next()
}
