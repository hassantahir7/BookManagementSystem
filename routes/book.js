const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');


router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:bookId', bookController.getBookById);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);
router.get('/genre/:genreId', bookController.getBooksByGenre);

module.exports = router;
