import { useEffect } from 'react';
// imports for redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setSearchTerm } from '../store/PaginationSlice';
import { fetchBooks } from '../store/booksSlice';
// import Font Awesome icons
import { FaSearch } from 'react-icons/fa';
//import styles
import '../styles/FindBooks.css'
// import components
import Pagination from './Pagination';
import Book from './Book';
import LoadingIndicator from './LoadingIndicator';

export const FindBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, error } = useSelector((state: RootState) => state.books);
  const { currentPage, searchTerm } = useSelector((state: RootState) => state.pagination);

  useEffect(() => {
    dispatch(fetchBooks({ query: searchTerm, page: currentPage }));
  }, [dispatch, searchTerm, currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };


  return (
    <div className="find__books">
      <h1 className="find__books-title">FIND YOUR BOOKS</h1>
      <div className="find__books-input-container">
        <div className='find__book-input-with-icon'>
          <FaSearch className='fa-search' size={14}/>
          <input type="text" className='find__books-input' value={searchTerm}
            onChange={handleSearch}/>
        </div>
      </div>
          {loading && <LoadingIndicator/>}
          {error && <p>Error: {error}</p>}
          {searchTerm.length < 2 ? (
            <div className="find__books-placeholder">
              Please use the input field to search for books
            </div>
          ) : (
            !loading && !error && books.length > 0 ? (
              <div className='find__books-content'>
                {books.map((book) => (
                  <Book
                    book={book}
                  />
                ))}
  
              </div>
            ) : (
              <div className="find__books-placeholder">
                No match found
              </div>
            )

          )}
          {books.length>0 && (
            <Pagination />

          )}
    </div>
  )
};