import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
  const [formdata, setFormData] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/create-book/',
        formdata,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        toast.success('Data added successfully!', {
          position: 'top-center',
          theme: 'colored',
        });
        
      } else {
        toast.error('Failed to add data.', {
          position: 'top-center',
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('Error occurred during submission.', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      console.log(error.response);
    }
  };

  return (
    <>
      {/* Ensure ToastContainer is placed at the top level to catch any toast */}
      <ToastContainer />
      <div className='container d-flex justify-content-center'>
        <div className='col-6 mt-4 p-5 shadow rounded-4'>
          <h3 className='text-center mb-3'>Add Book</h3>
          <hr />
          <form onSubmit={HandleSubmit}>
            <div className='mb-2'>
              <label className='form-label'>Enter Book Name</label>
              <input
                onChange={handleInput}
                type='text'
                name='book_name'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Enter Author Name</label>
              <input
                onChange={handleInput}
                type='text'
                name='author'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Enter Price</label>
              <input
                onChange={handleInput}
                type='number'
                name='price'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Enter Publication</label>
              <input
                onChange={handleInput}
                type='text'
                name='publication'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Enter ISB Number</label>
              <input
                onChange={handleInput}
                type='number'
                name='isbnumber'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Upload Image</label>
              <input
                onChange={handleInput}
                type='file'
                name='image'
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Enter Description</label>
              <textarea
                onChange={handleInput}
                name='description'
                className='form-control'
              />
            </div>
            <div className='mb-2 d-flex gap-3 justify-content-end mt-4'>
              <button type='reset' className='btn btn-warning'>
                Clear
              </button>
              <button type='submit' className='btn btn-success'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
