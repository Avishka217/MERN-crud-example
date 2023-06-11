const express = require("express");
const Book = require("../models/bookModel");

const router = express.Router();

// Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch one book based on ID from the database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new book
router.post("/", async (req, res) => {
  try {
    const { title, author, category, price } = req.body;

    const newBook = new Book({
      title,
      author,
      category,
      price,
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await Book.deleteOne({ _id: id });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update book

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, category, price } = req.body;

  try {
    // Find the book by ID
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Update the book fields
    book.title = title;
    book.author = author;
    book.category = category;
    book.price = price;

    // Save the updated book
    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;
