const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const FileSchema = new Schema({
    name: {
        type: String,
        unique: true, // 不可重复约束
        require: true // 不可为空约束
    },
    grade:{
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    author: {
        type: String
    },
    datetime: {
        type: String
    },
    down_num:{
        type: Number
    },
    description:{
        type: String
    },
    size:{
        type:Number
    },
    file_name:{
        type:String
    },
    image_url:{
        type:String
    }
});


module.exports = mongoose.model('File', FileSchema);