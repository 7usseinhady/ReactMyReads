import React, { useEffect, useState } from 'react'
import { Link, Route, Switch  } from 'react-router-dom'
import './App.css'
import * as BooksAPI from "./BooksAPI"
import Header from './Components/Header'
import Search from './Components/Search'
import Shelf from './Components/Shelf'

const BooksApp = () => {

  const shelfs = ["currentlyReading", "wantToRead", "read"];
  const [books, setBooks] = useState([]);

  const [txtSearch, setTxtSearch] = useState('');
  const [searchOut, setSearchOut] = useState([]);
  const [searchIn, setSearchIn] = useState([]);
  const [totalSearch, setTotalSearch] = useState([]);


  
  const updateBookShelf = (selectedBook, selectedShelf) => {
    BooksAPI.update(selectedBook, selectedShelf).then((data) => {});
  }
  const refreshPage = ()=>{
    window.location.reload(false);
  }

  useEffect( () => {
    BooksAPI.getAll().then((data) => {setBooks(data)
    })
  }, [books, totalSearch]);

  useEffect( () => {
    if(txtSearch === '')
    {
      setSearchOut([]);
      setSearchIn([]);
      setTotalSearch([]);
      
    }
    else
    {
      
      let result = books.filter(x => (
        x.title.toLowerCase().includes(txtSearch.toLowerCase()) ||
        x.authors.toString().toLowerCase().includes(txtSearch.toLowerCase())));
        if(result.length > 0)
        setSearchIn(result);
        else
        setSearchIn([]);

        BooksAPI.search(txtSearch).then((data) => {
          if (data.length > 0)
          {
            let booksIds = books.map(x=>x.id);
            var result = data.filter(x=> !booksIds?.includes(x.id))
            setSearchOut(result);
          }
          else
          setSearchOut([])
        })
    }
    let final = [...searchIn, ...searchOut]
   setTotalSearch(final);
  }, [txtSearch]);

  
    return (
      <div className="app">
        <Switch>
        <Route exact path="/" render={()=>(
          <div>
        <div className="list-books">
            
            <Header/>
            
            <div className="list-books-content">
              <div>
              {
              shelfs.map((shelf, index) => (
              <Shelf key={index} shelf={shelf} shelfBooks={books.filter(book => book.shelf === shelf)} updateBookShelf={updateBookShelf} />
              ))
              }
              </div>
            </div>
            </div>
            <div className="open-search">
              <Link to="/search" >
                <button >Add a book</button>
              </Link>
            </div>
            </div>
            )} />
          <Route path="/search" render={()=>(
          <Search txtSearch={txtSearch} setTxtSearch={setTxtSearch} shelfBooks={totalSearch} updateBookShelf={updateBookShelf}/>
          )}/>
          </Switch>
      </div>
    )

}

export default BooksApp
