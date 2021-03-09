const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        "id": 1,
        "title": "5 languages of love",
        "author": "Gary Chapman"
    },
    {
        "id": 2,
        "title": "A Commentary and Digest on The Air, Act 1981",
        "author": "Apoorva Kumar Singh"
    },
    {
        "id": 3,
        "title": "Obama: The Call of History",
        "author": "Peter Baker"
    },
    {
        "id": 4,
        "title": "Bridgital Nation",
        "author": "Shri N Chandrasekaran"
    },
    {
        "id": 5,
        "title": "We are Displaced",
        "author": "Malala Yousafzai"
    }

];

let nextBookId = 6;

app.get("/books", (req, res) => {
    res.send({ books : books});
});

app.get("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    const foundBook = books.find(book => book.id === bookId);
    res.send({ foundBook : bookId });
});

app.post("/books", (req, res) => {
    const newBook = req.body;
    newBook.id = nextBookId++;
    books.push(newBook);
    res.send({ newBookPosted : newBook })
});

app.patch("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    books = books.map(book => {
        if (book.id === bookId) {
            return { ...book, ...req.body, id: bookId}
        }
        return book;
    });
    res.send({ updatedBookList : books })
});

app.delete("/books/:id", (req, res) => {
    const bookId = Number(req.params.id);
    const deletedBook = books.filter(book => book.id !== bookId);
    return res.send({ deletedBook : deletedBook })
});



app.listen(8080, error => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port:", 8080);
});