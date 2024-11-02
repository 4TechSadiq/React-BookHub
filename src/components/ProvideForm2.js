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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/list-student/");
        setSearchUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const filterData = searchUser.filter((item) =>
    item.user_ID.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchItem(student.user_ID);
    setFormData({ ...formData, student_id: student.id });
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
                    placeholder="Search for Student Name"
                    type="text"
                  />
                  {/* Dropdown for suggestions */}
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
                <div className="col-4">
                  <label className="form-label">Enter Book Name</label>
                  <input
                    className="form-control"
                    name="book_name"
                    onChange={handleInput}
                    placeholder="Book Name"
                  />
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
                <button className="mb-4 btn shadow">Add Book</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProvideForm;
