import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [update, setUpdate] = useState({})

  const updateDetails = (id) =>{
    console.log(id)
    fetch(`http://127.0.0.1:8000/detail-student/${id}/`) // passing id with api
    .then(response=>response.json())
    .then(res=>setUpdate(res))
 }

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
      console.log("Attempting to delete user with ID:", id);

      const response = await axios.delete(
        `http://127.0.0.1:8000/delete-student/${id}/`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Delete response:", response);

      if (response.status === 204 || response.status === 200) {
        console.log("Delete successful for ID:", id);
        toast.success("User Deleted Successfully", { position: 'top-center', theme: 'colored' });

        // Update local state immediately without refetching
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  
  // Filtered users based on search term
  const filteredUsers = users.filter(user => 
    user.user_ID.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

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
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Update
                  </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="mb-3">
                                <label className='form-label'>Username</label>
                                <input type="text" className="form-control" id="username"/>
                              </div>
                              <div class="mb-3">
                                <label className='form-label'>Institution</label>
                                <input type="text" className="form-control" id="institution"/>
                              </div>
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        console.log("Delete button clicked for ID:", item.id);
                        handleDelete(item.id);
                      }} 
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
