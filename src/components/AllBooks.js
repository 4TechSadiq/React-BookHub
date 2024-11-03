import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

function AllBooks() {
  const [allBooks, setAllBooks] = useState([]); // Store all books initially
  const [books, setBooks] = useState([]);       // Books to display on the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearchTerm, setDisplaySearchTerm] = useState('');

  const recordsPerPage = 5; // Set the number of records per page

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/list-book/');

      console.log('API Response:', response.data);
      setAllBooks(response.data); // Store all books
      setCurrentPage(1); // Reset to the first page on load
    } catch (error) {
      console.error('Error fetching books:', error);
      setAllBooks([]); // Clear all books on error
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Update the displayed books based on search term and pagination
  const updateDisplayedBooks = useCallback(() => {
    // Filter books based on the search term
    const filteredBooks = allBooks.filter(
      (book) =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages based on filtered results
    const total = Math.ceil(filteredBooks.length / recordsPerPage);
    setTotalPages(total);

    // Get books for the current page
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + recordsPerPage);
    setBooks(paginatedBooks);
  }, [allBooks, searchTerm, currentPage]);

  useEffect(() => {
    updateDisplayedBooks();
  }, [updateDisplayedBooks]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDisplaySearchChange = (e) => {
    setDisplaySearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  // Debounce function for optimized search
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setCurrentPage(1); // Reset to the first page on new search
    }, 300),
    []
  );

  return (
    <div className='container ms-3 mt-4 rounded-5 shadow p-3'>
      <h2 className='text-center mb-4'>Books in the Library</h2>
      <div className='col-8 ms-3 mb-3'>
        <input
          type='text'
          placeholder='Search by book name or author...'
          className='form-control'
          value={displaySearchTerm}
          onChange={handleDisplaySearchChange}
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
                  <th scope="row">{index + 1 + (currentPage - 1) * recordsPerPage}</th>
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
