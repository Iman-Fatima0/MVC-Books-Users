const User = require('../Models/Users'); 
const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const nodemailer=require("nodemailer");

require('dotenv').config();

const addUser = async (req, res) => {
    try {
        const data = req.body;
        const user_Creation= await User.create(data);
        const salt=10;
        const hashedPassword=await bcrypt.hash(data.Password, salt);
        user_Creation.Password=hashedPassword;
        user_Creation.save();
        res.json({ "message": "User created successfully", user_Creation });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating Users");
    }
};



const getUsers = async (req, res) =>{
    try{
        console.log(req.user);
        const userss=await User.findById(req.user.id);
        if(userss.role!=="admin"){
            return res.status(403).send({ error: "You are not authorized to access this resource" });
        }
        const users = await User.find();  
        res.json({ "message": "users fetched successfully", users });
    }
    catch(error){
        console.error(error);
        
}
};

const searchUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const findUsers = await User.findById(id).populate('bookId');
        res.json({ "message": "User found successfully", findUsers }); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error finding User");
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const updatedUser = await User.findOneAndUpdate({ _id: id }, update, { new: true });
        res.json({ "message": "User Updated Successfully", updatedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Updating User");
    }
};

const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json({ "message": "User Deleted Successfully", deletedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting Users");
    }
};


    const login = async (req, res) => {
      
    try{
        const data=await User.findOne({email:req.body.email});
        console.log(data);
        if(!data){
            return res.status(404).send({ error: "user not found" });
        }
        else{
            console.log(req.body.Password,'user found',data.Password);
            const validate=await bcrypt.compare(req.body.Password,data.Password);
            if(validate)
            {
                const token=jwt.sign({id:data.id,role:data.role},'secret_key',{expiresIn:'2h'})
                console.log('Login Successful');
                res.status(200).send({message:"Login successful",token});
            }
            else{
                console.log('Invalid credentials');
                res.status(401).send("Invalid credentials");
            
            }
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({ error: "Failed to login" });
    }
    };
    const  sendEmail = async  (email,OTP)=>{
const transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
    
})
const info=await transporter.sendMail({
    from:process.env.EMAIL,
    to:email,
    subject:"OTP for password reset",
    text:`Your OTP is ${OTP}`,
    html:`<h><b>Your OTP is ${OTP}</b></h>`
})
console.log("Message sent: %s",info);
    }

    const passwordreset=    async (req, res) => {
        const {email}=req.body;
        const user=await User.findOne({email:email});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
        const OTP= Math.floor(100000 + Math.random() * 900000).toString();
        user.OTP=OTP;
        user.OTPExpiry=Date.now()+3600000;
        await user.save();

        await sendEmail(email,OTP);
        console.log("OTP sent sucessfully",OTP);
        res.status(200).json({message:"OTP sent successfully"});
    }
    const updatepassword=async (req, res) => {
        try{
            const {email,otp,newPasswrod}=req.body;
            const user=await User.findOne({email:email});
            if(user.otp=otp)
            {
                const salt=10;
                const hashedPassword=await bcrypt.hash(newPasswrod, salt);
                user.Password=hashedPassword;
                user.OTP=null;
                user.OTPExpiry=null;
                await user.save();
                return res.status(200).json({message:"Password updated successfully"});
            }
            else{
                return res.status(400).json({message:"Invalid OTP"});
            }
        }
        catch(error){
            console.error(error);
            res.status(500).send("Error updating password");
        }
    }
    
    const borrowBook = async (req, res) => {
        try {
            const { userid, bookid } = req.params;
    
    
            const user = await User.findById(userid);
    
            // if (user.bookId.length >= 3) {
            //     return res.status(400).json({ message: "Can't borrow any more books" });
            // }
            const bookBorrowed = await User.findByIdAndUpdate(
                userid,
                { $push: { bookId: bookid } },
                { new: true }
            );
    
            res.status(200).json({
                message: "Book Borrowed Successfully",
                bookBorrowed
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error borrowing book");
        }
    };
    const returnbook = async (req, res) => {
        try{
            const { userId,bookId } = req.params;
            const userss = await user.findById(req.user.id);
            if(userss.role != 'user')
            {
                return res.status(403).send({ error: "You are not authorized to access this resource" });
            }
            const user = await user.findById(userId);
            if(!user)
            {
                res.status(404).send("user not Found")
            }
            const bookIndex=user.books.indexOf(bookId);
            if(bookIndex === -1)
            {
                res.status(404).send("Book not found in the user's list");
                return;
            }
            user.books.splice(bookIndex,1);
            await user.save();
            console.log("Book returned successfully",user);
            res.status(200).json({message: "Book returned successfully", user});
            }
        
        catch (error)
        {
            console.error(error);
        }
    }

    const borrowed=async(req,res)=>
    {
        const {userId,bookId}=req.params;
    const user=await user.findById(userId);
    if(userss.role != 'user')
        {
            return res.status(403).send({ error: "You are not authorized to access this resource" });
        }
    try{
    if(user){

        if(user.books.length>=3)
        {
            return res.status(400).send('user can borrow only 3 books');
        }
        else{
            if (user.books.includes(bookId)) {
                return res.status(400).send("<h1>Book already borrowed</h1>");
            }
                user.books.push(bookId);
                await user.save()
                return res.status(200).json({ message: "Book borrowed successfully.",user })
        }
    }
    else{
        return res.status(400).send('user not found');
    }}
    catch(error){
        console.error(error);
        res.status(500).send(error );
    }
    }
    
module.exports = {
    addUser,
    getUsers,
    searchUsers,
    updateUser,
    DeleteUser,
    borrowBook,
    login,
    returnbook,
    borrowed,
    passwordreset,
    updatepassword,
    sendEmail
};
//using $push to add and $pull to remove also new is used to update
//session is a created through token in which we validate if user can acess 
//cookie is a process through which we can access the data from frontend to backend 
//make a table for session ,send id - old method
//how to send token from postman ? go in authorization select bearertoken from authorization and paste the token recive from login and send request
//how to get token in request server ?
//iat- key tell at what date the token is initiated at 
//math.floor and math.ceiling and math.random used to generate the random numbers for the OTP
//math.ceiling will round of the number while math.floor will not round of the number
//nodemailer library for fasilitating sending emails