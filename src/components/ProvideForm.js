import React from 'react'

function ProvideForm() {
  return (
    <>
    <div className='container p-4 ms-5 shadow rounded-5 mt-5 mb-5'>
        <h2 className='text-center mb-3'>Provide Form</h2>
        <div className='container'>
            <form>
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
                                <input className='form-control'></input>
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