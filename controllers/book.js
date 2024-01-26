const Book = require('../models/book');
const Genre = require('../models/genre');
const Author = require('../models/author');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author genre');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  const { title, authorId, genreId } = req.body;

  try {
    // Check if author and genre exist
    const author = await Author.findById(authorId);
    const genre = await Genre.findById(genreId);

    if (!author || !genre) {
      return res.status(400).json({ message: 'Author or genre not found' });
    }

    const newBook = new Book({ title, author: authorId, genre: genreId });
    await newBook.save();

    // Update author's books array
    author.books.push(newBook._id);
    await author.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId).populate('author genre');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const bookId = req.params.bookId;
  const { title, authorId, genreId } = req.body;

  try {
    // Check if author and genre exist
    const author = await Author.findById(authorId);
    const genre = await Genre.findById(genreId);

    if (!author || !genre) {
      return res.status(400).json({ message: 'Author or genre not found' });
    }

      const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { title, author: authorId, genre: genreId },
          { new: true }
          ).populate('author genre');

    if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
    }

      res.json(updatedBook);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Remove book from author's books array
        await Author.updateOne({ books: bookId }, { $pull: { books: bookId } });

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBooksByGenre = async (req, res) => {
    const genreId = req.params.genreId;

    try {
        const books = await Book.find({ genre: genreId }).populate('author genre');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
    getBooksByGenre,
};
