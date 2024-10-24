import { useState } from "react"
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
      const response = await axios.post("http://127.0.0.1:8000/create-book/",formdata,
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
            position: toast.POSITION.TOP_CENTER,
            theme: 'colored'
          }
        )
      }
    }
    catch(error){
      console.log(error.response.data)
    }

  }

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
                            <th>Author</th>
                            <th>ISB Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input name="" className='form-control'></input>
                            </td>
                            <td>
                                <input className='form-control'></input>
                            </td>
                            <td>
                                <input className='form-control'></input>
                            </td>
                            <td>
                                <input className='form-control'></input>
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