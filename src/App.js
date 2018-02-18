import React from 'react';
import BookList from './BookList.js';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
  allBooks: [],
  targetShelf: {},  //prob dont need this
  targetId: {},   //prob dont need this
  search:[]
}

  componentDidMount(){
    BooksAPI.getAll().then((allBooks) => {
      this.setState({ allBooks })
      console.log(allBooks)
   })
   BooksAPI.search("design").then((search) => {
     this.setState({ search })
     console.log(search)
   })
  }

  //We run this Onchange of Select
  updateTarget = (targetShelf,targetId) => {
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

  render() {
    return (
    <div>
      <BookList
        allBooks={this.state.allBooks}
        updateTarget={this.updateTarget}
      />
    </div>
    )
  }
}

export default BooksApp
