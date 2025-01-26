const Books = require("../Models/Books");

const addBook = async (req, res) => {
  try {
    const data = req.body;
    const Book_Creation = await Books.create(data);
    res.json({ message: "Books created successfully", Book_Creation });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating books");
  }
};
const getBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.json({ message: "Books fetched successfully", books });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching books");
  }
};

const searchBook = async (req, res) => {
  try {
    const id = req.params.id;
    const findbook = await Books.findById(id);

    res.json({ message: "Book found Successfully:", findbook });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error finding books");
  }
};

const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedBook = await Books.findOneAndUpdate({ id: _id }, update);
    res.json({ message: "Book Updated Successfully:", updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Updating Books");
  }
};
const DeleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const deletdbooks = await Books.findByIdAndDelete(id);
    res.json({ message: "Books Deleted Successfully", deletdbooks });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Deleting Books");
  }
};

module.exports = {
  addBook,
  getBooks,
  searchBook,
  updateBook,
  DeleteBook,
};
