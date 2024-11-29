const experess=require('express')
const router=experess.Router();
const controller=require('../Controller/Books')

router.post('/addBooks',controller.addBook)
router.get('/allbooks',controller.getBooks)
router.get('/books/:id',controller.searchBook)
router.patch('/updateBooks/:id',controller.updateBook)
router.delete('/deleteBooks/:id',controller.DeleteBook)
router.post('/users/return/:id', controller.returnBook);
router.get('/users/getborrowedBooks/:id', controller.viewBorrowedBooks);
router.post('/users/borrowBooks/:id',controller.borrowBook);
module.exports=router;