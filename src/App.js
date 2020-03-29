import React from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: false
  }

  componentDidMount() {
    this.getBooks()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.setState(() => ({
      searchResults: false
    }))
  }

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  getBooksForBookshelf = (bookshelf) => {
    return this.state.books.filter((book) => book.shelf === bookshelf)
  }

  changeShelf = (book, e) => {
    const newShelf = e.target.value

    BooksAPI.update(book, newShelf)
      .then(() => {
        this.getBooks()
      })
    
    if (this.state.searchResults) {
      this.setState((prevState) => ({
        searchResults: prevState.searchResults.map((b) => {
          if (b.id === book.id) {
            b.shelf = newShelf
          }
          return b
        })
      }))
    }
  }

  searchBooks = (query) => {
    if (query.length > 0) {
      BooksAPI.search(query)
      .then((response) => {
        if (response.error) {
          this.setState(() => ({
            searchResults: []
          }))
        }
        else {
          response.forEach((book) => {
            const matchingBook = this.state.books.filter(b => b.id === book.id)
            book.shelf = matchingBook.length > 0 ? matchingBook[0].shelf : 'none'
          })
          this.setState(() => ({
            searchResults: response
          }))
        }
      })
    }
    else {
      this.setState(() => ({
        searchResults: false
      }))
    }
    
  }

  render() {
    const currentlyReadingBooks = this.getBooksForBookshelf('currentlyReading'),
          wantToReadBooks = this.getBooksForBookshelf('wantToRead'),
          readBooks = this.getBooksForBookshelf('read')

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks searchResults={this.state.searchResults} onSearch={this.searchBooks} onChangeShelf={this.changeShelf} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelfName="Currently Reading" books={currentlyReadingBooks} onChangeShelf={this.changeShelf} />
                <Bookshelf shelfName="Want to Read" books={wantToReadBooks} onChangeShelf={this.changeShelf} />
                <Bookshelf shelfName="Read" books={readBooks} onChangeShelf={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link 
                to='/search'
              ><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default withRouter(BooksApp)
