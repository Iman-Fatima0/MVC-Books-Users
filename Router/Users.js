const express = require('express');
const router = express.Router(); 
const controller = require('../Controller/Users');
const {authenticationtoken,authorization}=require("../middlewear/auth");

router.post('/addUser', controller.addUser);
router.get('/adminUser',authorization("admin"),controller.getUsers);
router.get('/Users/:id',authorization("admin"), controller.searchUsers);  
router.patch('/updateUsers/:id', authenticationtoken, controller.updateUser);  
router.delete('/deleteUsers/:id', controller.DeleteUser); 
router.post('/:Userid/borrow/:bookid',controller.borrowBook);
router.post('/:Userid/return/:bookid', controller.returnbook);
router.get('/:userid/borrowedbooks,',controller.borrowed);
router.post('/login',controller.login);
router.get('/allUser/:id', authenticationtoken,authorization("admin"),controller.getUsers);
router.post('/updatepassword',controller.updatepassword);
router.post('/resetpassword',controller.passwordreset);

module.exports = router;
