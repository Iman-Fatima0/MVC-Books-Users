const User = require('../Models/Users'); 
const addUser = async (req, res) => {
    try {
        const data = req.body;
        res.json({ "message": "User created successfully", data });
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
        const findUsers = await User.findById(id);
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

module.exports = {
    addUser,
    getUsers,
    searchUsers,
    updateUser,
    DeleteUser
};
