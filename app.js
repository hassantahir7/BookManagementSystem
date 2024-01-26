const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://root1:1234@simpleapp.u9lwvxg.mongodb.net/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
      console.error('Error connecting to MongoDB Atlas:', err);
  });

// Middleware
app.use(bodyParser.json());

// Routes
const authorRoutes = require('./routes/author');
const genreRoutes = require('./routes/genre');
const bookRoutes = require('./routes/book');

app.use('/authors', authorRoutes);
app.use('/genres', genreRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
