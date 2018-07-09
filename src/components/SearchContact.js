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
                 const results = books.map((book) => {
                    const existingBook = this.props.booksOnShelves.find((b) => b.id === book.id) //for every book of searched books, find me the object(inside booksOnShelves) whose id is equal to id of book. It means find me the book that is already on one shelf. ExistingBooks will be undefined if no book is found, or the actual book.
                    book.shelf = !!existingBook ? existingBook.shelf : 'none' //set the shelf property. Double negation (!!) with undefined means false. With true means true. So, if undefined set it to none. If one object is found, set it to existing.shelf,
                    return book
                 });
                 this.setState({ 
                     books: results,
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