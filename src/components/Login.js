import React, { useState } from 'react'

function Login() {
  const [formdata, setFormData] = useState({})

  const handleInput = (e) => {
    e.preventDefault();
    const{name,value} = e.target;
    setFormData({
      ...formdata,
      [name]:value,
    })
  }
  console.log(formdata)


  return (
    <>
        <div className='container  mt-5'>
            
            <div className='container d-flex justify-content-center mt-5'>
              
            <div className='col-lg-5 col-sm-10 col-md-10 mt-5 p-5 shadow rounded-5'>
            <h2 className='text-center mb-4'>Login</h2>
                <form>
                  <div className='mb-2'>
                    <label className='form-label'>UserID</label>
                    <input type='text' name='userID' id='userID' onChange={handleInput} className='form-control'></input>
                  </div>
                  <div className='mb-2'>
                    <label className='form-label'>Passcode</label>
                    <input type='password' name='password' id='password' onChange={handleInput} className='form-control'></input>
                  </div>
                  <div className='mb-2 d-flex justify-content-center mt-4'>
                    <button className='btn btn-dark'>Login</button>
                  </div>
                </form>
            </div>
            </div>
        </div>
    </>
  )
}

export default Login