import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [update, setUpdate] = useState({});

  const fetchUsers = () => {
    axios.get("http://127.0.0.1:8000/list-student/")
      .then((response) => {
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete-student/${id}/`);
      if (response.status === 204 || response.status === 200) {
        toast.success("User Deleted Successfully", { position: 'top-center', theme: 'colored' });
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const updateDetails = (id) => {
    fetch(`http://127.0.0.1:8000/detail-student/${id}/`)
      .then(response => response.json())
      .then(res => setUpdate(res));
  };

  const handleUpdateSubmit = async () => {
    try {
      const updatedData = {
        student_name: update.student_name || "",
        institution: update.institution || "",
        user_ID: update.user_ID || "",  // If required by your API
        profile: update.profile || ""  // If required by your API
      };

      console.log("Update data:", updatedData);

      const response = await axios.put(
        `http://127.0.0.1:8000/update-student/${update.id}/`,
        updatedData
      );

      if (response.status === 200) {
        toast.success("User Updated Successfully", { position: 'top-center', theme: 'colored' });
        fetchUsers();  // Refresh the user list
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter(user => 
    user.user_ID.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <>
      <div className='col-11 ms-5 mt-4 rounded-5 shadow p-3'>
        <h2 className='text-center'>BookHub Users</h2>
        <div className='col-6 ms-3 mt-4'>
          <input 
            type="text" 
            className="form-control shadow" 
            placeholder="Search by User ID or Name" 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </div>
        <div className='container mt-4 d-flex justify-content-center'>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">SI no</th>
                <th scope="col">UserID</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Institution</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((item, index) => (
                <tr key={item.id || index}>
                  <th scope="row">{indexOfFirstUser + index + 1}</th>
                  <td>{item.user_ID}</td>
                  <td>
                    <img 
                      src={item.profile} 
                      alt="user" 
                      width="50" 
                      height="50"
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{item.student_name}</td>
                  <td>{item.institution}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-primary" 
                      data-bs-toggle="modal" 
                      data-bs-target="#exampleModal" 
                      onClick={() => updateDetails(item.id)}
                    >
                      Update
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label className='form-label'>Username</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  value={update.student_name || ""} 
                                  onChange={(e) => setUpdate({...update, student_name: e.target.value})}
                                />
                              </div>
                              <div className="mb-3">
                                <label className='form-label'>Institution</label>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  value={update.institution || ""} 
                                  onChange={(e) => setUpdate({...update, institution: e.target.value})}
                                />
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit} data-bs-dismiss="modal">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className='btn ms-2 btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination d-flex justify-content-center mt-3">
          <button 
            onClick={handlePrevious} 
            className="btn btn-light me-2"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index + 1} 
              onClick={() => handlePageChange(index + 1)} 
              className={`btn me-2 ${currentPage === index + 1 ? 'btn-primary' : 'btn-light'}`}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={handleNext} 
            className="btn btn-light ms-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserManagement;
