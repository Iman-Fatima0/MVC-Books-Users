const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    Password: { type: String, unique: true },
    Age: Number,
    gender: String,
    Address: String,
    is_Reader: Boolean,
    createAt:{
        type:Date,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        default:Date.now(),
    }
});

const User = mongoose.model('User', UsersSchema); 
module.exports = User;
