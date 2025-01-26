const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

const booksRouter = require("./Router/Books");
const usersRouter = require("./Router/Users");

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());
app.use("/book", booksRouter);
app.use("/users", usersRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
