const express=require('express')
const mongoose=require('mongoose')
const app=express()

const booksRouter=require('./Router/Books')
const usersRouter=require('./Router/Users')

mongoose.connect('mongodb://localhost:27017/mvc')

.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err))
app.use(express.json());
app.use("/book",booksRouter);
app.use("/users",usersRouter);

app.listen(8000,()=>
{
    console.log('server listening on port 3000');
})

