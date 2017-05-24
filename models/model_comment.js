const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const CommentSchema = new Schema({
    username: {
        type: String,
        require: true // 不可为空约束
    },
    file_id:{
        type: String,
        require: true // 不可为空约束
    },
    text:{
        type: String,
    },
    datetime: {
        type: String,
        require: true
    },
    Recovery: {
        type: Array
    }
});


module.exports = mongoose.model('Comment', CommentSchema);