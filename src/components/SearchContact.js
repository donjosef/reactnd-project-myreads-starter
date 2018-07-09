import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class SearchContact extends Component {
    
    state = {
        query: '',
        books: [],
        wrongSearchTerm: false
    }

handleChangeText = (e) => {
    
 this.setState({query: e.target.value}, () => {
     //after setting the state, make a request to the API with that query
     if(this.state.query) {
         BooksAPI.search(this.state.query)
             .then(books => {
             //if a wrong search term is typed
             if(books.error) {
                 this.setState({
                     books: books.items,
                     wrongSearchTerm: true
                 })
             } else {                
                this.setState({
                    books,
                    wrongSearchTerm: false
                 })  
              }
            })//if there is a query and the right search term, send me book
     }
 })
}



    render() {
     
     const {newBook, booksOnShelves} = this.props;
     const {query, books, wrongSearchTerm}  = this.state;  
       
    /*Check if books returned from search, are already on some shelf*/
     for(let book of books) {
         for(let bookOnShelf of booksOnShelves) {
             if(book.title === bookOnShelf.title)  { //the book is  on a shelf
                book.shelf = bookOnShelf.shelf;
            } else {
                if(book.shelf === undefined) {
                   book.shelf = 'none' 
                 } //only if undefined, avoiding overwrite the 'none' of last iteration
              } //the book is not on a shelf
            }
    }
        
        
     return(
         
        <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={this.state.query} onChange={this.handleChangeText} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
            {wrongSearchTerm && (
                <p style={{color: 'red'}}><strong>Unfound search term. Try again</strong></p>
            )}
            {!wrongSearchTerm && query && (
                <ol className="books-grid">
                {books.map(book => (
                     <li key={book.id}>
                          <div className='book'>
                            <div className='book-top'>
                              <div style={{
                                    backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
                                    width: 128,
                                    height: 193
                              }} className='book-cover' />
                              <div className='book-shelf-changer'>
                                <select defaultValue={book.shelf} onChange={(e) => newBook(book.id, e.target.value)}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors ? book.authors[0] : 'Unknown Author'}</div>
                          </div>
                        </li>
                ))}
                </ol>    
     
             )}
              
            </div>
          </div>
        
        
        
        );
   }
}

export default SearchContact;