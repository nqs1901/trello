const {Card} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')


const createCheckList = catchAsync(async (req, res) => {
    const card = await Card.findById(req.body.idCard)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    card.checklist.push({ name: req.body.name, complete: false });

    await card.save();

    res.status(httpStatus.CREATED).send({msg: 'Create Success!', card })
})

const updateCheckList = catchAsync(async (req, res) => {
    const card = await Card.findById(req.body.idCard)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    card.checklist.find(item => item.id = req.params.id) = req.body
    
    await card.save();

    res.status(httpStatus.OK).send({msg: 'Update Success!', card })
})

const deleteCheckList = catchAsync(async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    const cardUpdate = Card.findByIdAndUpdate({_id: card._id}, {$pull: {checklist: req.params._id}}, {new: true})
    await cardUpdate.save()
 
    res.status(httpStatus.OK).send({ msg: 'Delete Success!'})
})


module.exports ={
    createCheckList,
    updateCheckList,
    deleteCheckList,
}