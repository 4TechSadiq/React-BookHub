import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AllBooks() {

  const [book, setBook] = useState([])

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/list-book/`)
    .then((response)=>{
      setBook(response.data)
    })
  },[])

  return (
    <>
    <div className='container ms-3 mt-4 rounded-5 shadow p-3'>
      <h2 className='text-center mb-4'>Books in the Library</h2>
      <div className='container mt-4 d-flex justify-content-center'>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">SI no</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">Price</th>
            <th scope="col">ISB Number</th>
            <th scope='col'>More info</th>
          </tr>
        </thead>
        <tbody>
          {book.map((item, index)=>{
            return(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{item.book_name}</td>
                <td>{item.author}</td>
                <td>${item.price}</td>
                <td>{item.isbnumber}</td>
                <td>
                  <button className='btn btn-dark'>More Info</button>
                </td>
              </tr>
            )
          }
          )}
          
          
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default AllBooks