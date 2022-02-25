import React from 'react';

const Book = (props) => {

  //const update = props
  
  return (
    <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.shelfBook.imageLinks?.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={!props.shelfBook.shelf? "none" : props.shelfBook.shelf} onChange={(e)=>{
                                props.updateBookShelf(props.shelfBook, e.target.value);
                              }}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{props.shelfBook.title}</div>
                          <div className="book-authors">{props.shelfBook.authors?.toString()}</div>
                        </div>
  );
};

export default Book;