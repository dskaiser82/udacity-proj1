import React from 'react';
import BookList from './BookList.js';
import SearchBook from './SearchBook.js'
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css'

class BooksApp extends React.Component {
  state = {
  allBooks: [],
  searchBooks:[],
  query: ""
}

  componentDidMount(){
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks })
      console.log(this.state)
   })
  }

  //We run this Onchange of Select
  grabTarget = (targetShelf,targetId) => {
    //Update the Book
    this.setState((previousState) => {
    const bookie = previousState.allBooks.filter(book => book.id === targetId);
    bookie[0].shelf = targetShelf;
    });

    //Send Updated Book to API
    const bookSend = this.state.allBooks.filter(book => book.id === targetId);
    const bookZero = bookSend[0]
    BooksAPI.update(bookZero.id, targetShelf)
  }

//** Search View **//
  //Grab Values from options
  grabSearch = (targetShelf,targetId) => {
    //Update the Book
    this.setState((previousState) => {
    //Find which Book this is, then give it the shelf string
    const bookie = previousState.searchBooks.filter(book => book.id === targetId);
    bookie[0].shelf = targetShelf;

    //Last Push this book to allBooks array, then send up to the Back end API
    previousState.allBooks.push(bookie[0])
    BooksAPI.update(bookie[0].id, targetShelf)
    });
  }

  //Change query.state based on user search
  updateQuery = (query) => {
    if (this.state.query) //check if there is a query
    BooksAPI.search(this.state.query).then((searchBooks) => {
      //check if searcBooks gets results in the array
      //Because the array wont even fill if the correct search term doesn't
      //hit that ${api}/search`
      if(searchBooks.length)
      this.setState({ searchBooks })
    })

    this.setState({ query: query })
  }

  render() {

    return (
    <div>
      <Route exact path="/" render={() => (
        <div className="app">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        <BookList
          allBooks={this.state.allBooks}
          grabTarget={this.grabTarget}
          shelfString="Currently Reading"
          shelfVar="currentlyReading"
        />
        <BookList
          allBooks={this.state.allBooks}
          grabTarget={this.grabTarget}
          shelfString="Want to Read"
          shelfVar="wantToRead"
        />
        <BookList
          allBooks={this.state.allBooks}
          grabTarget={this.grabTarget}
          shelfString="Read"
          shelfVar="read"
        />
      </div>
        )}/>
        <Route path="/search" render={({ history }) => (
            <SearchBook
              searchBooks={this.state.searchBooks}
              query={this.state.query}
              grabSearch={
                (targetShelf, targetId) => {
                  this.grabSearch(targetShelf, targetId)
                  history.push('/')
                }
              }
              updateQuery={this.updateQuery}
            />
          )}/>
          {/* Open Search */}
          <Link
              to="/search"
              className="open-search"
            >+
          </Link>
      </div>
    )
  }
}

export default BooksApp
