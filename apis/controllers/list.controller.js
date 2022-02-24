const {Board, List, Card} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')


const getListById = catchAsync(async (req, res) => {
    const list = await List.findById(req.params.id)
    if (!list) {
        throw new ApiError(httpStatus.NOT_FOUND, 'List not found')
    }
    res.status(httpStatus.OK).send(list);
})

const createList = catchAsync(async (req, res) => {
    const list = await List.create(req.body)
    
    const board = await Board.findById(req.body.idBoard)
    console.log(board)
    if (!board) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Board not found')
    }

    board.lists.unshift(list._id)
    await board.save();

    res.status(httpStatus.CREATED).send({msg: 'Create Success!', list })
})

const updateList = catchAsync(async (req, res) => {
    const list = await List.findById(req.params.id)
    if (!list) {
        throw new ApiError(httpStatus.NOT_FOUND, 'List not found')
    }

    Object.assign(list, req.body);
    await list.save();

    res.status(httpStatus.OK).send({msg: 'Update Success!', list })
})

const deleteList = catchAsync(async (req, res) => {
    const list = await List.findById(req.params.id)
    if (!list) {
        throw new ApiError(httpStatus.NOT_FOUND, 'List not found')
    }
    const boardUpdate = await Board.findByIdAndUpdate({_id: list.idBoard}, {$pull: {lists: list._id}}, {new: true})
    boardUpdate.save()
 
    await list.remove();
    res.status(httpStatus.OK).send({ msg: 'Delete Success!'})
})

const getCardsOfList = catchAsync(async (req, res) => {
    const list = await List.findById(req.params.id)
    if (!list) {
        throw new ApiError(httpStatus.NOT_FOUND, 'List not found')
    }
    const cards = [];
    for (const card of list.cards) {
        cards.push(await Card.findById(card));
    }
    res.status(httpStatus.OK).send(cards);
})


module.exports ={
    getListById,
    createList,
    updateList,
    deleteList,
    getCardsOfList
}