const express = require('express')
const {checkListController} = require("../controllers")
// const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')
const checkMember = require('../../middlewares/member')

const router = express.Router()

router
    .route('/:id')
    .delete(auth, checkMember('admin','normal'),checkListController.deleteCheckList)
    .patch(auth,checkMember('admin','normal'),checkListController.updateCheckList)


router.post('/', auth,checkMember('admin','normal'),checkListController.createCheckList)

module.exports = router
