
import React, { useState } from 'react';
import { addBook } from '../services/BookService';

function AddBook({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, publicationYear };
    addBook(book).then(response => {
      onAdd(); 
      setTitle('');
      setAuthor('');
      setPublicationYear('');
    }).catch(err => console.error("Error adding book:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
      <input placeholder="Year" type="number" value={publicationYear} onChange={e => setPublicationYear(e.target.value)} required />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBook;
