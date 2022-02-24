const mongoose = require('mongoose')
const validator = require('validator')


const boardSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        lists: [{
            type: mongoose.Types.ObjectId,
            ref: 'list',
        }],
        members: [{
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'user',
            },
            role: {
                type: String,
                default: 'normal',
            },
        }]
       
    },
    {
        timestamps: true,
    }
)

const Board = mongoose.model('board', boardSchema)

module.exports = Board
