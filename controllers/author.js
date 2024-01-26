const Author = require('../models/author');
const Book = require('../models/book');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAuthor = async (req, res) => {
  const { name } = req.body;

  try {
    const newAuthor = new Author({ name });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAuthorById = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAuthor = async (req, res) => {
  const authorId = req.params.authorId;
  const { name } = req.body;

  try {
    const author = await Author.findByIdAndUpdate(authorId, { name }, { new: true });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const author = await Author.findByIdAndDelete(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Remove author from associated books
    await Book.updateMany({ author: authorId }, { $unset: { author: 1 } });

    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooksByAuthor = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const books = await Book.find({ author: authorId }).populate('genre');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor,
};
