import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/admin-login/`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const verifyLogin = () => {
    let isAuthenticated = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].adminID === formData.userID && data[i].password === formData.password) {
        toast.success('Login Successful', { position: 'top-center', theme: 'colored' });
        isAuthenticated = true;
        navigate('/dashboard'); 
        break;
      }
    }
    if (!isAuthenticated) {
      toast.error('Login Failed', { position: 'top-center', theme: 'colored' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLogin();
  };

  return (
    <>
    <ToastContainer />
    <div className='container mt-5'>
      <div className='container d-flex justify-content-center mt-5'>
        <div className='col-lg-5 col-sm-10 col-md-10 mt-5 p-5 shadow rounded-5'>
          <h2 className='text-center mb-4'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label className='form-label'>UserID</label>
              <input
                type='text'
                name='userID'
                id='userID'
                onChange={handleInput}
                className='form-control'
              />
            </div>
            <div className='mb-2'>
              <label className='form-label'>Passcode</label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={handleInput}
                className='form-control'
              />
            </div>
            <div className='mb-2 d-flex justify-content-center mt-4'>
              <button type='submit' className='btn btn-dark'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
  
}

export default Login;
