const mongoose = require('mongoose')
const validator = require('validator')


const listSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },
        cards: [{
            type: mongoose.Types.ObjectId,
            ref: 'card',
        }],
        idBoard: {
            type: mongoose.Types.ObjectId,
            ref: 'board',
        }
       
    },
    {
        timestamps: true,
    }
)

const List = mongoose.model('list', listSchema)

module.exports = List
