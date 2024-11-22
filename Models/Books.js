const  mongoose =require('mongoose');
const {Schema}=require('mongoose')
const BooksSchema=new Schema({
    title:{type:String,required:true,unique:true},
    author:String,
    genre:String,
    Publication_Year:Number,
    Pages:Number,
    Read:Boolean
})

const Books=mongoose.model('Books',BooksSchema);
module.exports=Books;