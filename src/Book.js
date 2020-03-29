import React, { Component } from 'react'

class Book extends Component {

  render() {
    const { book, onChangeShelf } = this.props
    const imageURL = book.hasOwnProperty('imageLinks') ? book.imageLinks.smallThumbnail : 'http://placehold.it/128x193'

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageURL}")` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => {onChangeShelf(book, e)}}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors &&
          <div className="book-authors">{book.authors.map((author, i) => {
            return (i + 1) === book.authors.length ? author : `${author}, `
          })}</div>
        }
      </div>
    )
  }
}

export default Book