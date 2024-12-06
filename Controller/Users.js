const User = require('../Models/Users'); 
const jwt=require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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
        const users = await User.find();  
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
const login=async (req, res) => {

    try{
    const user=await User.findOne({email:req.body.email});

    if(user)
       {
        const data=req.body;
           const validate=await bcrypt.compare(data.password,User.password);
           const token=jwt.sign(
            {
                id:User._id, emial:User.email},process.env.JWT_SECRET,{algorithm:'HS256'}
           )
           if(validate)
           {
            console.log("Successfully logged in")
            res.status(200).send({message: "Successfully logged in"});
           }
           else{
            console.log("Incorrect password")
            res.status(401).send({message:"Invalid password"})
           }
       }

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send("Error logging in");
    
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