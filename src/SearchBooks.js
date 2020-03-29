import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  render() {
    const { searchResults, onChangeShelf, onSearch } = this.props
    const searchResultsMessage = searchResults ? 'No search results' : 'Type a query above to begin searching'

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link 
            className='close-search'
            to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => { onSearch(e.target.value) }} />
          </div>
        </div>
        <div className="search-books-results">
          {searchResults.length > 0 ? 
            <ol className="books-grid">
              {searchResults.map((book) => (
                <li key={book.id}><Book book={book} onChangeShelf={onChangeShelf} /></li>
              ))}
            </ol>
          :
            <div>{searchResultsMessage}</div>
          }
        </div>
      </div>
    )
  }
}

export default SearchBooks