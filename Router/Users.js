const express = require('express');
const router = express.Router(); 
const controller = require('../Controller/Users');

router.post('/addUser', controller.addUser);
router.get('/allUser', controller.getUsers);
router.get('/Users/:id', controller.searchUsers);  
router.patch('/updateUsers/:id', controller.updateUser);  
router.delete('/deleteUsers/:id', controller.DeleteUser); 


module.exports = router;
