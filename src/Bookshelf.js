import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {

  render() {
    const { books, shelfName, onChangeShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}><Book book={book} onChangeShelf={onChangeShelf} /></li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf