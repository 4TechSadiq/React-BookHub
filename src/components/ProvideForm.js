import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { library, text } from "@fortawesome/fontawesome-svg-core"

library.add(faMagnifyingGlass)

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
      console.log(response.status)
      if (response.status === 201){
        toast.success("data added",
          {
            position: 'top-center',
            theme: 'colored'
          }
        )
      }
      else{
        toast.error("data not added",
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
  },[])

  const [user, setUser] = useState([])
  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/list-student/")
    .then((response)=>{
      setUser(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])

  // const Datenow = () => {
  //   const date = new Date();
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
    
  //   // This arrangement can be altered based on how we want the date's format to appear.
  //   let currentDate = `${day}-${month}-${year}`;
  //   return currentDate
  // }

  // let a = Datenow();
  // console.log(a)

  return (
    <>
    <div className='col-10 p-4 ms-3 shadow rounded mt-5 mb-5'>
        <h2 className='text-center mb-3'>Provide Form</h2>
        <div className='container'>
            <form class="d-flex" onSubmit={HandleSubmit}>
                <div class="col-8 mb-2">
                  <label class="form-label" for="">Enter Student ID</label>
                  <div class="col-12 d-flex">
                    <div class="container">
                      <input type="text" class="form-control"></input>
                    </div>
                    <button className='mb-4 btn shadow d-flex align-items-center gap-2'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    Search
                </button> 
                </div>
                </div>

            </form>
        </div>
    </div>

    <div class="col-10 ms-3 shadow rounded">
      <div className="container p-4">
      <h2 >Student Details</h2>
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
            <td>Name</td>
            <td>Name</td>
            <td>Name</td>
          </tbody>
        </table>
      </div>
    </div>

    <div className="col-10 ms-3 shadow rounded mt-4">
      <div className="container p-3">
      <h2>Enter Book</h2>
      </div>
      <div className="container p-3">
        <form>
          <div className="mb-2">
            <label className="form-label">Enter Book Name</label>
            <div className="d-flex gap-2">
              <input className="form-control"></input>
              <button className="btn btn-warning">Add</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="col-10 ms-3 mt-4 shadow rounded">
      <div className="container p-4">
      <h2 >Book History</h2>
      </div>
      <div className="container p-4">
        <table className="table table-strip">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>isbnumber</th>
              <th>Approved Date</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <td>Name</td>
            <td>Name</td>
            <td>Name</td>
            <td>Name</td>
            <td className="d-flex gap-2">
              <button className="btn btn-primary">Close</button>
              <button className="btn btn-warning">Remove</button>
            </td>
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default ProvideForm