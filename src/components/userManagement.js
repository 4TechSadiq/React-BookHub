import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserManagement() {
  
  const [user, setUser] = useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/list-student/")
    .then((Response)=>{
      setUser(Response.data)
    })
  })
  return (
    <>
    <div className='container ms-2 mt-4 rounded-5 shadow p-3'>
      <h2 className='text-center'>BookHub Users</h2>
      <div className='container mt-4 d-flex justify-content-center'>
      <table class="table table-striped table-hover">
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
          {
            user.map((item, index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.user_ID}</td>
                <td><img src={item.profile} alt="user" width="50px" height="50px"/></td>
                <td>{item.student_name}</td>
                <td>{item.institution}</td>
                <td>
                  <button className='btn btn-primary'>Edit</button>
                  <button className='btn btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default UserManagement