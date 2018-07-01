import React  from 'react'

function Shelf(props) {
    const {books, updateShelf} = props; //array
    
    return(
        <div className="bookshelf">
                  <h2 className="bookshelf-title">{books.length > 0 ? books[0].shelf : 'Empty Shelf'}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map(book => (
                        <li key={book.id}>
                          <div className='book'>
                            <div className='book-top'>
                              <div style={{
                                    backgroundImage: `url(${book.imageLinks.thumbnail})`,
                                    width: 128,
                                    height: 193
                              }} className='book-cover' />
                              <div className='book-shelf-changer'>
                                <select defaultValue={book.shelf} onChange={(e) => updateShelf(book.id, e.target.value)}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors[0]}</div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
            </div>
                      
    );
}

export default Shelf;