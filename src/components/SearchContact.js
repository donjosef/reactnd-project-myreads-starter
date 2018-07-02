import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

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
                 this.setState({wrongSearchTerm: true})
             } else {
               this.setState({
                    books,
                    wrongSearchTerm: false
                })  
             }//if there is a query and the right search term, send me books 
            })
     } else {
        this.setState({ books: [] }) 
     } //if there is no query, no request is made
     
 })
}



    render() {
     const {changePage} = this.props;
     const {books, wrongSearchTerm}  = this.state;
        
        
        
     return(
         
        <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={changePage}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} onChange={this.handleChangeText} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
            {wrongSearchTerm && (
                <p style={{color: 'red'}}><strong>Unfound search term. Try again</strong></p>
            )}
            {!wrongSearchTerm && (
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
                                <select>
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