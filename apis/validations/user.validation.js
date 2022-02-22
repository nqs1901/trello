const Joi = require('joi')

const getUserSchema = Joi.object({
    id: Joi.string().required(),
})

const updateUserSchema = Joi.object({
    username: Joi.string(),
    fullname: Joi.string()
}).min(1)





module.exports = {
    getUserSchema,
    updateUserSchema,
}
