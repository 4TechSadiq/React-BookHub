import { useEffect, useState } from "react"
import React from 'react'
import axios from "axios"
import { toast } from "react-toastify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { library, text } from "@fortawesome/fontawesome-svg-core"

library.add(faMagnifyingGlass)

function ProvideForm() {
  const [data,setData] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await axios.get("http://127.0.0.1:8000/list-student/");
        setData(response.data);
      }
      catch(error){
        console.log("error", error)
      }
    }
  })

  const [searchItem, setSearchItem] = useState('')
  const filterData = data.filter((item)=>
    item.emp_name.toLowerCase().includes(searchItem.toLocaleLowerCase())
  )
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
        <form className="d-flex gap-3">
          <div className="col-4">
            <label className="form-label">Enter Book Name</label>
            <input className="form-control"></input>
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