const express = require('express')
const {userController} = require("../controllers")
const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')

const router = express.Router()

router
    .route('/:id')
    .get(validate(userValidation.getUserSchema,'params'),auth,userController.getUserById)
    .patch(validate(userValidation.getUserSchema,'params'),validate(userValidation.updateUserSchema,'body'),auth,userController.updateUser)
    


module.exports = router
