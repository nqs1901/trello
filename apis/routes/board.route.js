const express = require('express')
const {boardController} = require("../controllers")
// const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')

const router = express.Router()

router
    .route('/:id')
    
router.post('/', auth,boardController.createBoard)
router.patch('/:id/members/:idMember', auth,boardController.addMember)



module.exports = router
