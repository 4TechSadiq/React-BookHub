import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearchTerm, setDisplaySearchTerm] = useState(''); // New state for immediate input display

  const fetchBooks = async (page, search = '') => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/list-book/', {
        params: { page: page, search: search }
      });

      console.log('API Response:', response.data);

      if (response.data.results) {
        setBooks(response.data.results);
        setTotalPages(Math.ceil(response.data.total_count / 5));
      } else {
        setBooks(response.data);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDisplaySearchChange = (e) => {
    setDisplaySearchTerm(e.target.value);
    setCurrentPage(1);
    debouncedSearch(e.target.value); // Trigger the debounced search
  };

  // Debounce function for optimized search
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce((term) => setSearchTerm(term), 300), []);

  return (
    <div className='container ms-3 mt-4 rounded-5 shadow p-3'>
      <h2 className='text-center mb-4'>Books in the Library</h2>
      <div className='mb-3'>
        <input
          type='text'
          placeholder='Search by book name or author...'
          className='form-control'
          value={displaySearchTerm} // Display the immediate input
          onChange={handleDisplaySearchChange} // Debounced input handler
        />
      </div>
      <div className='container mt-4 d-flex justify-content-center'>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">SI no</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">ISB Number</th>
              <th scope='col'>More info</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + (currentPage - 1) * 5}</th>
                  <td>{item.book_name}</td>
                  <td>{item.author}</td>
                  <td>${item.price}</td>
                  <td>{item.isbnumber}</td>
                  <td>
                    <button className='btn btn-dark'>More Info</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <nav>
          <ul className='pagination'>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className='page-link' onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className='page-link' onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className='page-link' onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllBooks;
