const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.get('/', authorController.getAllAuthors);
router.post('/', authorController.createAuthor);
router.get('/:authorId', authorController.getAuthorById);
router.put('/:authorId', authorController.updateAuthor);
router.delete('/:authorId', authorController.deleteAuthor);
router.get('/:authorId/books', authorController.getBooksByAuthor);

module.exports = router;
