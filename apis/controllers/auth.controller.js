const {User} = require("../models")
const ApiError = require("../../utils/api-error")
const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../configs/env");

const login = catchAsync(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password')
    }
    const payload = { 
         id: user._id 
    };
      const opts = {
        expiresIn: "1d",
      };
      const accessToken = jwt.sign(payload, SECRET_KEY, opts);
    res.status(httpStatus.OK).send({ msg: 'Login Success!', accessToken,user})
})

const register = catchAsync(async (req, res) => {
    if (await User.isEmailTaken(req.body.email)){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await User.create(req.body)
    res.status(httpStatus.CREATED).send({msg: 'Register Success!', user })
})


module.exports ={
    login,
    register,
}