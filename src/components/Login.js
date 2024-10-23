import React from 'react'

function Login() {
  return (
    <>
        <div className='container  mt-5'>
            
            <div className='container d-flex justify-content-center mt-5'>
              
            <div className='col-5 mt-5 p-5 shadow rounded-5'>
            <h2 className='text-center mb-4'>Login</h2>
                <form>
                  <div className='mb-2'>
                    <label className='form-label'>UserID</label>
                    <input type='text' className='form-control'></input>
                  </div>
                  <div className='mb-2'>
                    <label className='form-label'>Passcode</label>
                    <input type='password' className='form-control'></input>
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