const experess=require('express')
const router=experess.Router();
const controller=require('../Controller/Books')

router.post('/addBooks',controller.addBook)
router.get('/allbooks',controller.getBooks)
router.get('/books/:id',controller.searchBook)
router.patch('/updateBooks/:id',controller.updateBook)
router.delete('/deleteBooks/:id',controller.DeleteBook)

module.exports=router;