const  mongoose =require('mongoose');
const {Schema}=require('mongoose')
const BooksSchema=new Schema({
    title:{type:String,required:true,unique:true},
    author:String,
    genre:String,
    Publication_Year:Number,
    Pages:Number,
    Read:Boolean,
    createAt:{
        type:Date,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        default:Date.now(),
    }
})

const Books=mongoose.model('Books',BooksSchema);
module.exports=Books;