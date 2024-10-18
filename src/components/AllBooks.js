import React from 'react'

function AllBooks() {
  return (
    <>
    <div className='container ms-5 mt-4 rounded-5 shadow p-3'>
      <h2 className='text-center mb-4'>Books in the Library</h2>
      <div className='container mt-4 d-flex justify-content-center'>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">SI no</th>
            <th scope="col">Book Name</th>
            <th scope="col">Author</th>
            <th scope="col">ISB Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    </>
  )
}

export default AllBooks