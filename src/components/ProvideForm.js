import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { toast } from "react-toastify"


function ProvideForm() {
    const [formdata, setFormData] = useState({})

  const handleInput = (e) => {
    const{name,value} = e.target;
    setFormData({
      ...formdata,
      [name]:value,
    })
  }
  console.log(formdata)

  const HandleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:8000/provide-book/",formdata,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      if (response.status === 201){
        toast.success("data added",
          {
            position: 'top-center',
            theme: 'colored'
          }
        )
      }
    }
    catch(error){
      console.log(error.response.data)
    }

  }
  
  const [book, setBook] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/list-book/")
    .then((response)=>{
      setBook(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[book])

  const [user, setUser] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/list-student/")
    .then((response)=>{
      setUser(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[user])

  return (
    <>
    <div className='container p-4 ms-3 shadow rounded-5 mt-5 mb-5'>
        <h2 className='text-center mb-3'>Provide Form</h2>
        <div className='container'>
            <form onSubmit={HandleSubmit}>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>UserID</th>
                            <th>Book Name</th>
                            <th>Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <select class="form-control" name="" id="">
                                  {
                                    user.map((item)=>(
                                      <option value={item.user_ID}>{item.user_ID}</option>
                                    ))
                                  }
                                </select>
                            </td>
                            <td>
                              <select class="form-control" name="" id="">
                                {
                                  book.map((item)=>(
                                    <option value={item.book_name}>{item.book_name}</option>
                                  ))
                                }
                              </select>
                            </td>
                            <td>
                                <input type="date" class="form-control" name="return_date" onChange={handleInput}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='mb-3 d-flex justify-content-center'>
                <button className='mb-4 btn btn-dark '>Submit</button>
                </div>
            </form>
                

        </div>

    </div>
    </>
  )
}

export default ProvideForm