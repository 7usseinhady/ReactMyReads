import React from 'react';
import { Link } from 'react-router-dom'
import Book from './Book';


const Search = (props) => {
  return (
    
      <div className="search-books">
            <div className="search-books-bar">

              <Link to="/" >
                <button className="close-search" >Close</button>
              </Link>

              <div className="search-books-input-wrapper">

                <input value={props.txtSearch} onChange={(e)=>{props.setTxtSearch(e.target.value)}} type="text" placeholder="Search by title or author"/>

              </div>
            </div>

            <div className="search-books-results">
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
export default Search;