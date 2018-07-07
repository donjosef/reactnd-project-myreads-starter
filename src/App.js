import React from 'react'
 import * as BooksAPI from './BooksAPI'
import Header from './components/Header'
import Shelf from './components/Shelf'
import SearchContact from './components/SearchContact'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
 }

componentWillMount() {
    BooksAPI.getAll()
        .then(books => {
         this.setState({ books })
    }) 
}

updateShelf = (clickedBook, selectValue) => {
    if(selectValue === 'none') {
      BooksAPI.update(clickedBook, selectValue).then(res => {
        this.setState(prevState => ({
           books: prevState.books.filter(book => book.id !== clickedBook.id) 
        }))
      })
    } //When the value is none the book get removed from the server. Remove the item from the array books to change the view too
   
    BooksAPI.update(clickedBook, selectValue).then(res => {
        this.setState(prevState => ({
               books: prevState.books.map(book => {
                   if(book.id === clickedBook.id) {
                       book.shelf = selectValue;
                   }
                   return book;
               }) //change the shelf of the clicked book
        }))
    })
  
}


getNewBook = (id, shelf) => {
    
      BooksAPI.get(id).then(book => {
         book.shelf = shelf;
         this.setState(prevState => ({
            books: prevState.books.concat(book)
         }))
     }) 
}
        
  render() {
      /*variables to pass inside the components in order to use them as props*/
      const currentBooks = this.state.books.filter(book => book.shelf.includes('currently'));
      const wantToReadBooks = this.state.books.filter(book => book.shelf.includes('want'));
      const readBooks = this.state.books.filter(book => book.shelf.includes('read') );
      
    return (
      <div className="app">
        <Route path='/search' render={() => <SearchContact booksOnShelves={this.state.books} newBook={this.getNewBook} /> 
        }/>
        <Route exact path='/' render={() => (
           <div className="list-books">
            <Header />
            <div className="list-books-content">
                <Shelf updateShelf={this.updateShelf} books={currentBooks}/>
                <Shelf updateShelf={this.updateShelf} books={wantToReadBooks} />
                <Shelf updateShelf={this.updateShelf} books={readBooks}/>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>                
        )} />
      </div> 
    )
  }
}

export default BooksApp
