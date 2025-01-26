const express = require('express');
const router = express.Router(); 
const controller = require('../Controller/Users');
const authenticationtoken=require('../middlewear/auth');
router.post('/addUser', controller.addUser);
router.get('/allUser',authenticationtoken,controller.getUsers);
router.get('/Users/:id', controller.searchUsers);  
router.patch('/updateUsers/:id', authenticationtoken, controller.updateUser);  
router.delete('/deleteUsers/:id', controller.DeleteUser); 
router.post('/:Userid/borrow/:bookid',controller.borrowBook);
router.post('/:Userid/return/:bookid', controller.returnbook);
router.get('/:userid/borrowedbooks,',controller.borrowed);
router.post('/login',controller.login);

module.exports = router;
