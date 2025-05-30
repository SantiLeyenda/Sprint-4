import logo from './logo.svg';
import './App.css';
// src/App.js
import React from 'react';
import BookList from './components/BookList';
import BookManager from './components/BookManager';

function App() {
  return (
    <div className="App">
      <BookManager />
    </div>
  );
}

export default App;
