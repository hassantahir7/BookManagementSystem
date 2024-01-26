const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre');

router.get('/', genreController.getAllGenres);
router.post('/', genreController.createGenre);
router.get('/:genreId', genreController.getGenreById);
router.put('/:genreId', genreController.updateGenre);
router.delete('/:genreId', genreController.deleteGenre);
router.get('/:genreId/books', genreController.getBooksByGenre);

module.exports = router;
