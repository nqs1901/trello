const {User, Board} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')


const getBoardById = catchAsync(async (req, res) => {
    const board = await Board.findById(req.params.id)
    if (!board) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Board not found')
    }
    res.status(httpStatus.OK).send(board);
})

const getBoardsOfUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    const boards = [];
    for (const board of user.boards) {
        boards.push(await Board.findById(board));
    }
    res.status(httpStatus.OK).send(boards);
})

const createBoard = catchAsync(async (req, res) => {
    const board = await Board.create(req.body)

    const user = await User.findById(req.user._id)
    user.boards.unshift(board._id)
    await user.save();

    board.members.push({ user: user._id, role: 'admin' });
    await board.save();

    res.status(httpStatus.CREATED).send({msg: 'Create Success!', board })
})

const addMember = catchAsync(async (req, res) => {
    const board = await Board.findById(req.params.id)
    if (!board) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Board not found')
    }
    const user = await User.findById(req.params.idMember)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (board.members.some((member) => member.user.equals(req.params.idMember))) {
        throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Already member of board')
    }

    board.members.some((member) => console.log(member.user))
    user.boards.unshift(board.id);
    await user.save();

    board.members.push({ user: user._id,  role: 'normal' });
    await board.save();

    res.status(httpStatus.OK).send({ msg: 'Add Success!',board})
})

module.exports ={
    getBoardById,
    getBoardsOfUser,
    createBoard,
    addMember
}