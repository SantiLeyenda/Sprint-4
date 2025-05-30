import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/books";

const BookManager = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ id: null, title: "", author: "", publicationYear: "" });
  const [editing, setEditing] = useState(false);

  
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get(API_URL);
    setBooks(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ id: null, title: "", author: "", publicationYear: "" });
    setEditing(false);
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBooks();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📚 Book Manager</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publicationYear"
          placeholder="Year"
          value={form.publicationYear}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Update Book" : "Add Book"}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Year</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td><td>{book.title}</td><td>{book.author}</td><td>{book.publicationYear}</td>
              <td>
                <button onClick={() => handleEdit(book)}> Edit</button>
                <button onClick={() => handleDelete(book.id)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookManager;
