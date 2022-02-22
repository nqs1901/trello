const {User} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const service = require('../../services/paginate')

const getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    res.status(httpStatus.OK).send(user);
})

const updateUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (!user._id.equals(req.user._id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'No right');
    }
    if (req.body.email && (await User.isEmailTaken(req.body.email, req.params.id))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, req.body);
    await user.save();
    res.status(httpStatus.OK).send({ msg: 'Update Success!',user})
})

module.exports ={
    getUserById,
    updateUser,
}