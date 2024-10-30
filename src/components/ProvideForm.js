import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

function ProvideForm() {
  const [data, setData] = useState([]);
  const [book, setBook] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [userFound, setUserFound] = useState(false);

  const [searchBook, setSearchBook] = useState('');
  const [filterBook, setFilterBook] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState('');
  const [history, setHistory] = useState([]);  // State for storing book history

  // Book search functions
  const bookSearchChange = (e) => {
    const searchBookValue = e.target.value;
    setSearchBook(searchBookValue);

    const bookFiltered = book.filter((Book) =>
      Book.book_name.toLowerCase().includes(searchBookValue.toLowerCase())
    );
    setFilterBook(bookFiltered);
  };

  const handleSelectBook = (Book) => {
    setSelectedBook(Book);
    setSearchBook(Book.book_name);
    setFilterBook([]); // Hide suggestion list
  };

  // Fetch students and books data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-student/");
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-book/");
        setBook(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchStudents();
    fetchBooks();
  }, []);

  // Handle student search
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchItem(searchValue);
    
    const filtered = data.filter((student) =>
      student.user_ID.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchItem(student.user_ID);
    setFilteredStudents([]);
    fetchHistory(student.id);  // Fetch history when a student is selected
  };

  // Fetch the history of provided books for the selected student
  const fetchHistory = async (studentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/provide-book/?student=${studentId}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      setUserFound(true);
      toast.success("User Found", {
        position: 'top-center',
        theme: 'colored'
      });
    } else {
      setUserFound(false);
      toast.error("User not Found, Enter Valid User", {
        position: 'top-center',
        theme: 'colored'
      });
    }
  };

  // Handle adding a book with a return date
  const handleAddBook = async (e) => {
    e.preventDefault();

    if (selectedStudent && selectedBook && returnDate) {
      try {
        // Submit the book for the selected student
        const response = await axios.post("http://127.0.0.1:8000/provide/", {
          student: selectedStudent.id,   // Add the student ID to the API call
          book: selectedBook.id,
          return_date: returnDate,
        });

        toast.success("Book added successfully!", {
          position: 'top-center',
          theme: 'colored'
        });

        fetchHistory(selectedStudent.id);  // Fetch updated history after adding book
      } catch (error) {
        console.error("Error adding book", error);
        toast.error("Failed to add book", {
          position: 'top-center',
          theme: 'colored'
        });
      }
    } else {
      toast.error("Please select a student, book, and return date", {
        position: 'top-center',
        theme: 'colored'
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Provide Form */}
      <div className="col-10 p-4 ms-3 shadow rounded mt-5 mb-5">
        <h2 className="text-center mb-3">Provide Form</h2>
        <div className="container">
          <form className="d-flex" onSubmit={handleSubmit}>
            <div className="col-8 mb-2">
              <label className="form-label">Enter Student ID</label>
              <div className="col-12 d-flex">
                <div className="container position-relative">
                  <input
                    className="form-control"
                    placeholder="Search for Student ID"
                    type="text"
                    value={searchItem}
                    onChange={handleSearchChange}
                  />
                  {/* Dropdown for suggestions */}
                  {filteredStudents.length > 0 && (
                    <ul className="list-group position-absolute mt-1">
                      {filteredStudents.map((student) => (
                        <li
                          key={student.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelectStudent(student)}
                          style={{ cursor: "pointer" }}
                        >
                          {student.user_ID} - {student.student_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button className="mb-4 btn shadow d-flex align-items-center gap-2" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Show student details and book form if a user is found */}
      {userFound && (
        <>
          {/* Student Details */}
          <div className="col-10 ms-3 shadow rounded">
            <div className="container p-4">
              <h2>Student Details</h2>
            </div>
            <div className="container p-4">
              <table className="table table-strip">
                <thead>
                  <tr>
                    <th>UserID</th>
                    <th>Name</th>
                    <th>Institution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedStudent?.user_ID}</td>
                    <td>{selectedStudent?.student_name}</td>
                    <td>{selectedStudent?.institution}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Enter Book Section */}
          <div className="col-10 ms-3 shadow rounded mt-4">
            <div className="container p-3">
              <h2>Enter Book</h2>
            </div>
            <div className="container p-3">
              <form className="d-flex gap-3" onSubmit={handleAddBook}>
                <div className="col-4">
                  <label className="form-label">Enter Book Name</label>
                  <input
                    className="form-control"
                    placeholder="Book Name"
                    value={searchBook}
                    onChange={bookSearchChange}
                  />
                  {/* Dropdown for book suggestions */}
                  {filterBook.length > 0 && (
                    <ul className="list-group position-absolute mt-1">
                      {filterBook.map((book) => (
                        <li
                          key={book.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => handleSelectBook(book)}
                          style={{ cursor: "pointer" }}
                        >
                          {book.book_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="col-4">
                  <label className="form-label">Enter Return Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
                <div className="col-4 d-flex align-items-end">
                  <button className="btn btn-warning" type="submit">Add Book</button>
                </div>
              </form>
            </div>
          </div>

          {/* Book History Section */}
          <div className="col-10 ms-3 shadow rounded mt-4">
            <div className="container p-3">
              <h2>Previously Provided Books</h2>
            </div>
            <div className="container p-3">
              {history.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Approved Date</th>
                      <th>Return Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((record) => (
                      <tr key={record.id}>
                        <td>{record.book_name}</td>
                        <td>{new Date(record.approved_date).toLocaleDateString()}</td>
                        <td>{new Date(record.return_date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No previous records found.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProvideForm;
