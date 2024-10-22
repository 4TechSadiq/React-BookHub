import React from 'react'

function AddUser() {
return (
    <>
        <div className='container mt-4 d-flex justify-content-center'>
            <div className='col-6 shadow rounded-5 p-5'>
                <h2 className='text-center'>New User</h2>
                <form>
                    <div className='mb-3'>
                        <label htmlFor='userID' className='form-label'>User ID</label>
                        <input type='text' className='form-control' id='userID'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='userName' className='form-label'>User Name</label>
                        <input type='text' className='form-control' id='userName'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='institution' className='form-label'>Institution</label>
                        <input type='text' className='form-control' id='institution'></input>
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    </>
)
}

export default AddUser