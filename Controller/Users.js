const User = require('../Models/Users'); 
const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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



const getUsers = async (req, res) => {
    try {
        
        // console.log("request from postman", req.headers.authorization);
        // const token=req.headers.authorization.split(' ')[1];
        // const validatedtoken= await jwt.verify(token, process.env.JWT_SECRET);
        // console.log("token",token);
        // console.log("token",validatedtoken);
       
        res.json({ "message": "Users fetched successfully", users });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching Users");
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
        try {
            const { email, Password } = req.body;
    
       
            if (!email || !Password) {
                return res.status(400).send({ message: "Email and password are required" });
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
                const isPasswordValid = await bcrypt.compare(Password, user.Password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: "Invalid password" });
            }
    
            const token = jwt.sign(
                { id: user._id, email: user.email },  process.env.JWT_SECRET,  { algorithm: 'HS256', expiresIn: '1h' }
            );
    
            res.status(200).send({   message: "Successfully logged in", token });
        } 
        catch (error) {
            console.error("Error logging in:", error);
              res.status(500).send("Error logging in");
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
                const { userid, bookid } = req.params;
                const returned = await User.findByIdAndUpdate(
                    userid,
                    { $pull: { bookId: bookid } },
                    { new: true }
                );
                // const returned=await User.bookid.splice(bookid,1);
                res.status(200).json({
                    message: "Book Returned Successfully",
                    returned
                });
        }
        catch(error)
        {
          console.error(error);
          res.status(500).send("Error returning book");
        }
    }

    const borrowed=async(req,res)=>
    {
         try{
            const data=req.params.userid;
             const borrowed=await User.findById(data).populate('bookId');
             res.status(200).json({message: "Borrowed books", borrowed});
         }
         catch(error)
         {
             console.error(error);
             res.status(500).send("Error fetching borrowed books");
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
    borrowed
};
//using $push to add and $pull to remove also new is used to update
//session is a created through token in which we validate if user can acess 
//cookie is a process through which we can access the data from frontend to backend 
//make a table for session ,send id - old method
//how to send token from postman ? go in authorization select bearertoken from authorization and paste the token recive from login and send request
//how to get token in request server ?
//iat- key tell at what date the token is initiated at 
//math.floor and math.ceiling and math.random used to generate the random numbers for the OTP
//matj.ceiling will round of the number while math.floor will not round of the number
//nodemailer library for fasilitating sending emails