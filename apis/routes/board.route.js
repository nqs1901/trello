const express = require('express')
const {boardController} = require("../controllers")
// const {userValidation} = require('../validations')
const validate = require('../../middlewares/validate')
const auth = require('../../middlewares/auth')
const checkMember = require('../../middlewares/member')


const router = express.Router()

router
    .route('/:id')
    .get(auth,checkMember('admin','normal','observer'),boardController.getBoardById)
    .delete(auth, checkMember('admin'),boardController.deleteBoard)
    .patch(auth,checkMember('admin','normal'),boardController.updateBoard)

router.get('/', auth,boardController.getBoardsOfUser)
router.post('/', auth,boardController.createBoard)

router.patch('/:id/members/:idMember', auth,checkMember('admin'),boardController.addMember)
router.get('/:id/lists', auth,checkMember('admin','normal','observer'),boardController.getListsOfBoard)



module.exports = router
