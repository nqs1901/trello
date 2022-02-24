const {User, Board, List, Card} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')


const getCardById = catchAsync(async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    res.status(httpStatus.OK).send(card);
})

const createCard = catchAsync(async (req, res) => {
    const card = await Card.create(req.body)
    const list = await List.findById(req.body.idList)
    if (!list) {
        throw new ApiError(httpStatus.NOT_FOUND, 'List not found')
    }

    list.cards.unshift(card._id)
    await list.save();

    res.status(httpStatus.CREATED).send({msg: 'Create Success!', card })
})

const updateCard = catchAsync(async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }

    Object.assign(card, req.body);
    await card.save();

    res.status(httpStatus.OK).send({msg: 'Update Success!', list })
})

const deleteCard = catchAsync(async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    const listUpdate = await List.findByIdAndUpdate({_id: card.idList}, {$pull: {cards: card._id}}, {new: true})
    listUpdate.save()
 
    await card.remove();
    res.status(httpStatus.OK).send({ msg: 'Delete Success!'})
})

const addMember = catchAsync(async (req, res) => {
    const card = await Card.findById(req.params.id)
    if (!card) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Card not found')
    }
    const user = await User.findById(req.params.idMember)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    const list = await List.findById(card.idList);
    const board = await Board.findById(list.idBoard);

    if (!board.members.some((member) => member.user.equals(req.params.idMember))) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Dont have already member in board')
    }

    if (card.members.some((member) => member.user.equals(req.params.idMember))) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Already member of card')
    }

    card.members.push({ user: user._id });
    await card.save();

    res.status(httpStatus.OK).send({ msg: 'Add Success!',card})
})


module.exports ={
    getCardById,
    createCard,
    updateCard,
    deleteCard,
    addMember
}