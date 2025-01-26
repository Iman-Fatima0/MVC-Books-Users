const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({

    books:[{
type:mongoose.Schema.Types.ObjectId,
ref:'Books',
required:false
    }],
    name: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    Password: { type: String, unique: true },
    Age: Number,
    gender: String,
    Address: String,
    is_Reader: Boolean,
    role:{
        type:String,
        enum:['user', 'admin'],
        required:true 
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        default:Date.now(),
    },
    OTP:{type:String, required:false}
});

const User = mongoose.model('User', UsersSchema); 
module.exports = User;
