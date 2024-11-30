const Books=require('../Models/Books')

const addBook=async(req,res)=>
{
    try{
    const data=req.body;
    const Book_Creation= await Books.create(data);
    res.json({"message":"Books created successfully",Book_Creation})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error creating books");
    }
}
const getBooks = async (req, res) => {
    try {
        const books = await Books.find();  
        res.json({ "message": "Books fetched successfully", books });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching books");
    }
};

const searchBook=async(req,res)=>
{
    try{
    const id=req.params.id;
    const findbook=await Books.findById(id)

    res.json({"message":"Book found Successfully:",findbook})
}
catch(error)

{
    console.log(error);
    res.status(500).send("Error finding books");
}

}

const updateBook=async(req,res)=>
{
    try{
        const id=req.params.id;
        const update=req.body;
        const updatedBook=await Books.findOneAndUpdate({id:_id},update)
        res.json({"message":"Book Updated Successfully:",updatedBook}); 
        
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error Updating Books");
    }
}
const DeleteBook=async(req,res)=>
{
    try{
        const id=req.params.id;
        const deletdbooks=await Books.remove(id);
        res.json({"message":"Books Deleted Successfully",deletdbooks});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Error Deleting Books");
    }
}
const borrowBook = async (req, res) => {
  const id = req.params.id; 
  const bookId = req.params.bookId;

  try {
 
    const user = await User.findById(id);

    const book = await Books.findById(bookId);
    if (user.bookId.length >= 3) {
      return res.status(400).json({
        message: 'Borrowing limit exceeded more than 3.',
      });
    }

    user.bookId.push(bookId);
    await user.save(); 

    res.status(200).json({
      message: 'Book borrowed successfully.',
      user: {
        id: user._id,
        name: user.name,
        borrowedBooks: user.bookId,
      },
    });
  }
   catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'An error occurred while borrowing the book.', error });
  }
};
const returnBook = async (req, res) => {
    const  id = req.params.id;
    const bookId=req.params.id;
  
    try {
      const user = await User.findById(id);
      const bookIndex = user.bookId.indexOf(bookId);
         user.bookId.splice(bookIndex, 1); 
      await user.save(); 
  
      res.status(200).json({
        message: 'Book returned successfully.',
        user: {
          id: user._id,
          name: user.name,
          borrowedBooks: user.bookId,
        },
      });
    } 
    catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ message: 'An error occurred while returning the book.', error });
    }
  };
  const viewBorrowedBooks = async (req, res) => {
    const  id  = req.params.id; 
  
    try {
      const user = await User.findById(id).populate('bookId');
        res.status(200).json({  borrowedBooks: user.bookId });
    } 
    catch (error) {
      console.error('Error fetching borrowed books:', error);
      res.status(500).json({ message: 'An error occurred while fetching borrowed books.', error });
    }
  };
  
  

module.exports={
    addBook,
    getBooks, 
    searchBook,
    updateBook,
    DeleteBook,
    borrowBook,
    returnBook ,
    viewBorrowedBooks

 
}