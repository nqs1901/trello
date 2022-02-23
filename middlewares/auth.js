const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../configs/env')
const {User} = require("../apis/models")

module.exports= async function(req, res, next) {
  if(req.headers.authorization){
    const accessToken = req.headers.authorization.split(' ').pop();
    if(accessToken){
        try {
            const decoded= jwt.verify(accessToken, SECRET_KEY );
            const user = await User.findOne({ _id: decoded.id }).select("-password")
            req.user = user
            next();
          } catch(err) {
            return  res.status(401).json({Message: "Invalid access token !!"});
          }
    }   
  }
  else {
    return  res.status(401).json({Message: "Can't not find access token !!"});
  }
}