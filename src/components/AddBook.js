import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddBook.css'; // Import a custom CSS file for styling

function AddBook() {
  const [formdata, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formdata,
      [name]: files ? files[0] : value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formdata) {
      data.append(key, formdata[key]);
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/create-book/',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
        position: 'top-center',
        theme: 'colored',
      });
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status"></div>
            <p>Submitting data, please wait...</p>
          </div>
        </div>
      )}
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
              <label className='form-label'>Enter ISBN Number</label>
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
              <button type='submit' className='btn btn-success' disabled={loading}>
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
