import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/BookService";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    getBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books", error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => fetchBooks()) 
      .catch((error) => console.error("Error deleting book", error));
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.publicationYear})
            <button onClick={() => handleDelete(book.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
