import React, { Component } from 'react';
import { Link} from 'react-router-dom';


class SearchBook extends Component{

  render(){
    const { searchBooks, grabSearch, updateQuery} = this.props

    return(
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => updateQuery(event.target.value)}
            />
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

            {searchBooks.map((book) =>(

                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(
                        ${book.imageLinks ? book.imageLinks.thumbnail :
                          'http://via.placeholder.com/160x220?text=No%20Cover'
                         })` }}></div>

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
                    <div className="book-title">{book.title ? book.title : "No Title Found :("}</div>
                    <div className="book-authors">{book.authors ? book.authors : "No Author Found :("}</div>
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
