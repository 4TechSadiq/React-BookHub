import React from 'react'

function AddBook() {
  return (
    <>
        <div className='container d-flex justify-content-center'>
            <div className='col-6 mt-4 p-5 shadow rounded-4'>
                <h3 className='text-center mb-3'>Add Book</h3>
                <hr></hr>
                <form>
                    <div className='mb-2'>
                        <label className='form-label'>Enter Book Name</label>
                        <input type='text' name='book_name' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Enter Author Name</label>
                        <input type='text' name='author' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Enter Price</label>
                        <input type='number' name='price' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Enter Publication</label>
                        <input type='text' name='publication' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Enter ISB Number</label>
                        <input type='number' name='isbnumber' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Upload Image</label>
                        <input type='file' name='image' className='form-control'></input>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Enter Description</label>
                        <textarea name='description' className='form-control'></textarea>
                    </div>
                    <div className='mb-2 d-flex gap-3 justify-content-end mt-4'>
                        <button type='reset' className='btn btn-warning'>Clear</button>
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddBook