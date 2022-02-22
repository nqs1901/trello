const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const registerSchema = Joi.object({
    email: Joi.string().required().email(),
    fullname: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    loginSchema,
    registerSchema,
}
