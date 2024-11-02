import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

function ProvideForm() {
  const [formData, setFormData] = useState({});
  const [searchUser, setSearchUser] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchBook, setSearchBook] = useState([]);
  const [searchBookItem, setSearchBookItem] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]); // Transaction history state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-student/");
        setSearchUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-book/");
        setSearchBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchBooks();
  }, []);

  // Filter students by ID
  const filterData = searchUser.filter((item) =>
    item.user_ID.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Filter books by name
  const filterBookData = searchBook.filter((item) =>
    item.book_name.toLowerCase().includes(searchBookItem.toLowerCase())
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchItem(student.user_ID);
    setFormData({ ...formData, student: student.id });
    fetchTransactionHistory(student.id); // Fetch transaction history for selected student
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSearchBookItem(book.book_name);
    setFormData({
      ...formData,
      book: book.id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/provide-book/", formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        toast.success("Book Provided Successfully", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.error("Failed to provide book", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchTransactionHistory = async (studentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/list-provide/?student=${studentId}`);
      setTransactionHistory(response.data);
    } catch (error) {
      console.log("Error fetching transaction history:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {/* Provide Form */}
      <div className="col-10 p-4 ms-3 shadow rounded mt-5 mb-5">
        <h2 className="text-center mb-3">Provide Form</h2>
        <div className="container">
          <form className="d-flex">
            <div className="col-8 mb-2">
              <label className="form-label">Enter Student ID</label>
              <div className="col-12 d-flex">
                <div className="container position-relative">
                  <input
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    className="form-control"
                    placeholder="Search for Student ID"
                    type="text"
                  />
                  {/* Dropdown for student suggestions */}
                  {searchItem && (
                    <ul className="list-group position-absolute mt-1 w-100">
                      {filterData.map((student) => (
                        <li
                          key={student.id}
                          onClick={() => handleSelectStudent(student)}
                          className="list-group-item list-group-item-action"
                        >
                          {student.user_ID}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="mb-4 btn shadow d-flex align-items-center gap-2"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Show student details and book form if a user is found */}
      {selectedStudent && (
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
                    <td>{selectedStudent.user_ID}</td>
                    <td>{selectedStudent.student_name}</td>
                    <td>{selectedStudent.institution}</td>
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
              <form className="d-flex gap-3" onSubmit={handleSubmit}>
                <div className="col-4 position-relative">
                  <label className="form-label">Enter Book Name</label>
                  <input
                    className="form-control"
                    name="book_name"
                    value={searchBookItem}
                    onChange={(e) => setSearchBookItem(e.target.value)}
                    placeholder="Book Name"
                  />
                  {/* Dropdown for book suggestions */}
                  {searchBookItem && (
                    <ul className="list-group position-absolute mt-1 w-100">
                      {filterBookData.map((book) => (
                        <li
                          key={book.id}
                          onClick={() => handleSelectBook(book)}
                          className="list-group-item list-group-item-action"
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
                    name="return_date"
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>
                <div className="container mt-4">
                  <button className="mb-4 mt-2 btn shadow">Add Book</button>
                  <button type="reset" className="mb-4 mt-2 btn shadow">Clear</button>
                </div>
              </form>
            </div>
          </div>

          {/* Book Transaction History */}
          <div className="col-10 ms-3 shadow rounded-2 p-2 mb-4 mt-5">
            <div className="container">
              <h2>Ongoing Book Records</h2>
            </div>
            <div className="container p-3">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.book_name}</td>
                      <td>{transaction.approved_date}</td>
                      <td>{transaction.return_date}</td>
                      <td>
                        <button className="btn btn-danger">Return</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProvideForm;
