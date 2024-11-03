import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([]);

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

  return (
    <>
      <div className='container ms-2 mt-4 rounded-5 shadow p-3'>
        <h2 className='text-center'>BookHub Users</h2>
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
              {users.map((item, index) => (
                <tr key={item.id || index}>
                  <th scope="row">{index + 1}</th>
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
                    <button className='btn btn-primary me-2'>Edit</button>
                    <button 
                      onClick={() => {
                        console.log("Delete button clicked for ID:", item.id);
                        handleDelete(item.id);
                      }} 
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserManagement;
