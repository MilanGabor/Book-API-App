import React from 'react';
// imports for redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setCurrentPage } from '../store/PaginationSlice';
// import Font Awesome Icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import styles
import '../styles/Pagination.css';

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.pagination);
  const { total } = useSelector((state: RootState) => state.books);

  const booksPerPage = 10;
  const totalPages = Math.ceil(total / booksPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="pagination">
      <FaArrowLeft size={15} onClick={() => currentPage === 1 ? null : handlePrevious()}/>
      <span className='pagination__pages'>
        {currentPage}<div className='dash'>/</div>{totalPages}
      </span>
      <FaArrowRight size={15} onClick={() => currentPage === totalPages ? null : handleNext()}/>
    </div>
  );
};

export default Pagination;
