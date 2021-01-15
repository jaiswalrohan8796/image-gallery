const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    desc: {
        type: String,
        required:false
    },
    time: {
        type: Date,
        default:Date.now(),
    },
    image: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Posts',postSchema)