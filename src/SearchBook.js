import React, { Component } from 'react';
import { Link} from 'react-router-dom';


class SearchBook extends Component{

  render(){
    const { searchBooks, grabSearch, searchTerm} = this.props

    return(
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {/* BACK HOME*/}
          <Link
              to="/"
              className="home"
            > <span>BACK TO MY BOOKS</span>
          </Link>
          <ol className="books-grid">

            {searchBooks.filter(book => book.shelf !== "currentlyReading"
            && book.shelf !== "read" && book.shelf !== "wantToRead")
              .map((book) =>(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>

                      <div className="book-shelf-changer">

                        <select id={book.id}
                          onChange={(event) => grabSearch(event.target.value, event.target.id)}
                          >

                          <option value="none" defaultValue>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))
            }


          </ol>
        </div>
      </div>
    </div>
    )
  }
}

export default SearchBook
