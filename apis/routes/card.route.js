const express = require('express')
const {cardController} = require("../controllers")
// const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')
const checkMember = require('../../middlewares/member')

const router = express.Router()

router
    .route('/:id')
    .get(auth,checkMember('admin','normal','observer'),cardController.getCardById)
    .delete(auth, checkMember('admin','normal'),cardController.deleteCard)
    .patch(auth,checkMember('admin','normal'),cardController.updateCard)


router.post('/', auth,checkMember('admin','normal'),cardController.createCard)
router.post('/:id/members/:idMember', auth,checkMember('admin','normal'),cardController.addMember)


module.exports = router
