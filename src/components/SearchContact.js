import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class SearchContact extends Component {
    
    state = {
        query: '',
        matchingBooks: []
    }

handleChangeText = (e) => {
    
 this.setState({query: e.target.value}, () => {
     //after setting the state, make a request to the API with that query
     if(this.state.query) {
         BooksAPI.search(this.state.query)
             .then(books => {
                this.setState({matchingBooks: books})
             })
     } else {
        this.setState({ matchingBooks: [] }) 
     } //if there is no query, no request is made
     
 })
}



    render() {
     const {changePage} = this.props;
        
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
              <ol className="books-grid"></ol>
            </div>
          </div>
        
        
        
        );
   }
}

export default SearchContact;