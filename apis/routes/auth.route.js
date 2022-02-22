const express = require('express')
const {authController} = require("../controllers")
const {authValidation} = require('../validations')
const validate = require('../../middlewares/validate')

const router = express.Router()

router.post('/login',validate(authValidation.loginSchema,'body'),authController.login)
router.post('/register',validate(authValidation.registerSchema,'body'), authController.register)


module.exports = router
