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
                                <select onChange={handleInput} class="form-control" name="user" id="">
                                  <option>Select User</option>
                                  {
                                    user.map((item)=>(
                                      <option value={item.id}>{item.user_ID}</option>
                                    ))
                                  }
                                </select>
                            </td>
                            <td>
                            <select multiple onChange={handleInput} class="form-control" name="book" id="">
                              <option>Select Book</option>
                              {book.map((item) => (
                                <option value={item.id}>{item.book_name}</option>
                              ))}
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