
import React, { useState, useEffect } from 'react';
import { updateBook, getBookById } from '../services/BookService';

function EditBook({ bookId, onUpdate, onCancel }) {
  const [book, setBook] = useState({ title: '', author: '', publicationYear: '' });

  useEffect(() => {
    getBookById(bookId).then(response => setBook(response.data));
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(bookId, book).then(() => onUpdate());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={book.title} onChange={handleChange} />
      <input name="author" value={book.author} onChange={handleChange} />
      <input name="publicationYear" type="number" value={book.publicationYear} onChange={handleChange} />
      <button type="submit">Save</button>
      <button onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EditBook;
