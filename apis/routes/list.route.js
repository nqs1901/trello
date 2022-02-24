const express = require('express')
const {listController} = require("../controllers")
// const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')
const checkMember = require('../../middlewares/member')

const router = express.Router()

router
    .route('/:id')
    .get(auth,listController.getListById)
    .delete(auth, checkMember('admin','normal'),listController.deleteList)
    .patch(auth,checkMember('admin','normal'),listController.updateList)


router.post('/', auth,checkMember('admin','normal'),listController.createList)
router.post('/:id/cards', auth,checkMember('admin','normal','observer'),listController.getCardsOfList)


module.exports = router
