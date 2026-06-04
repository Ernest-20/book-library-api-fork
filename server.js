require ('dotenv').config();

const express = require('express');

const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Library API');
});

// Read Books Function
const getBooks = () => {
    const dataPath = path.join(__dirname, 'data', 'books.json');
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
}
// get All Books
app.get('/books', (req, res) => {
    const books = getBooks();
    res.json(books);
});

// Get Single Book by ID
app.get('/books/:id', (req, res) => {
    const books = getBooks();
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});