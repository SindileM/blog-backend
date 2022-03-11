const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Blog',blogSchema)