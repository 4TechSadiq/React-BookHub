import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';

function AllBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySearchTerm, setDisplaySearchTerm] = useState('');
  const [update, setUpdate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls modal open/close state
  const recordsPerPage = 5;

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/list-book/');
      setAllBooks(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching books:', error);
      setAllBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Load book details into modal for updating
  const updateBook = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/detail-book/${id}/`);
      setUpdate(response.data);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Update the input fields in the modal
  const handleUpdateChange = (e, fieldName) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setUpdate((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // Submit updated book data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      id: update.id,
      book_name: update.book_name,
      author: update.author,
      price: update.price,
      publication: update.publication,
      isbnumber: update.isbnumber,
      description: update.description,
      image: update.image,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:8000/update-book/${update.id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Data updated successfully!', {
          position: 'top-center',
          theme: 'colored',
        });
        fetchBooks();
        setIsModalOpen(false); // Close the modal on success
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast.error('Failed to update data.', {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  // Pagination and Search Logic
  const updateDisplayedBooks = useCallback(() => {
    const filteredBooks = allBooks.filter(
      (book) =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const total = Math.ceil(filteredBooks.length / recordsPerPage);
    setTotalPages(total);
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
      setCurrentPage(1);
    }, 300),
    []
  );
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-book/${id}/`);
      toast.success('Book deleted successfully!', {
        position: 'top-center',
        theme: 'colored',
      });
      
      // Update the allBooks state by removing the deleted book
      setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      
      // Reset the current page if it goes out of range after deletion
      if (books.length === 1 && currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (error) {
      toast.error('Failed to delete the book.', {
        position: 'top-center',
        theme: 'colored',
      });
    }
  };
  
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
              <th scope="col">Image</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">ISB Number</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 ? (
              books.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1 + (currentPage - 1) * recordsPerPage}</th>
                  <td>{item.book_name}</td>
                  <td>
                    <img 
                    src={item.image} 
                    width={75}
                    height={75}
                    style={{ objectFit: 'cover', borderRadius: '5%' }}
                    />
                  </td>
                  <td>{item.author}</td>
                  <td>${item.price}</td>
                  <td>{item.isbnumber}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-warning" 
                      onClick={() => updateBook(item.id)}
                    >
                      Update
                    </button>
                    <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(item.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {/* Update Modal */}
{isModalOpen && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Book</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-2">
              <label className="form-label">Book Name</label>
              <input
                value={update.book_name || ""}
                onChange={(e) => handleUpdateChange(e, "book_name")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Author</label>
              <input
                value={update.author || ""}
                onChange={(e) => handleUpdateChange(e, "author")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Price</label>
              <input
                value={update.price || ""}
                onChange={(e) => handleUpdateChange(e, "price")}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Publication</label>
              <input
                value={update.publication || ""}
                onChange={(e) => handleUpdateChange(e, "publication")}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">ISBN Number</label>
              <input
                value={update.isbnumber || ""}
                onChange={(e) => handleUpdateChange(e, "isbnumber")}
                type="number"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Image</label>
              <input
                onChange={(e) => handleUpdateChange(e, "image")}
                type="file"
                className="form-control"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                value={update.description || ""}
                onChange={(e) => handleUpdateChange(e, "description")}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Pagination */}
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
