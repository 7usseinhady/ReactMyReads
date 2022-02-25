import React from 'react';
import Book from './Book';

const Shelf = (props) => {
  return (
    <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.shelf}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        props.shelfBooks.map((shelfBook)=>(
                        <li key={shelfBook.id}>
                            <Book shelfBook = {shelfBook} updateBookShelf={props.updateBookShelf}/>
                        </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
  );
};

export default Shelf;