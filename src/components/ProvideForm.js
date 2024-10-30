import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ProvideForm() {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [userFound, setUserFound] = useState(false);

  // Fetch students data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-student/");
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  // Function to handle input change for searching user ID
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchItem(searchValue);
    
    // Filter student list based on user ID
    const filtered = data.filter((student) =>
      student.user_ID.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  // Function to handle selection of a student
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchItem(student.user_ID);
    setFilteredStudents([]); // Hide suggestion list after selection
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      setUserFound(true);
    } else {
      setUserFound(false); // Reset if no valid student is selected
      alert("No user selected. Please select a valid user.");
    }
  };

  return (
    <>
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

      {/* Student details and other sections become visible only if user is found */}
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
              <form className="d-flex gap-3">
                <div className="col-4">
                  <label className="form-label">Enter Book Name</label>
                  <input className="form-control" placeholder="Book Name"></input>
                </div>
                <div className="col-4">
                  <label className="form-label">Enter Return Date</label>
                  <input type="date" className="form-control"></input>
                </div>
                <div className="col-4 d-flex align-items-end">
                  <button className="btn btn-warning">Add</button>
                </div>
              </form>
            </div>
          </div>

          {/* Book History */}
          <div className="col-10 ms-3 mt-4 shadow rounded">
            <div className="container p-4">
              <h2>Book History</h2>
            </div>
            <div className="container p-4">
              <table className="table table-strip">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>ISBN Number</th>
                    <th>Approved Date</th>
                    <th>Return Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Book 1</td>
                    <td>12345</td>
                    <td>2024-10-01</td>
                    <td>2024-10-10</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-primary">Close</button>
                      <button className="btn btn-warning">Remove</button>
                    </td>
                  </tr>
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
