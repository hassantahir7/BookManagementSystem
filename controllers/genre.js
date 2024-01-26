const Genre = require('../models/genre');
const Book = require('../models/book');

const getAllGenres = async (req, res) => {
  try {
      const genres = await Genre.find();
      res.json(genres);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const createGenre = async (req, res) => {
    const { name } = req.body;

    try {
        const newGenre = new Genre({ name });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getGenreById = async (req, res) => {
    const genreId = req.params.genreId;

    try {
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGenre = async (req, res) => {
    const genreId = req.params.genreId;
    const { name } = req.body;

    try {
        const genre = await Genre.findByIdAndUpdate(genreId, { name }, { new: true });
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteGenre = async (req, res) => {
    const genreId = req.params.genreId;

    try {
        const genre = await Genre.findByIdAndDelete(genreId);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json({ message: 'Genre deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBooksByGenre = async (req, res) => {
    const genreId = req.params.genreId;

    try {
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        const books = await Book.find({ genre: genreId }).populate('author genre');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllGenres,
    createGenre,
    getGenreById,
    updateGenre,
    deleteGenre,
    getBooksByGenre
};
