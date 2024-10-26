import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';

function AddUser() {
    const [formdata, setData] = useState({})

    const handleInput = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setData({
            ...formdata,
            [name]:value
        })

    }
    console.log(formdata)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://127.0.0.1:8000/create-student/", formdata,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response.status)
            if (response.status === 201){
                toast.success("User Created Successfully",
                    {
                        position: 'top-center',
                        theme:'colored'
                    }
                )
            }else{
                toast.error("Failed to create user",
                    {
                        position: 'top-center',
                        theme:'colored'
                    }
                )
            }
        }
        catch(error){
            toast.error("Error occurred during submission",
                {
                    position: 'top-center',
                    theme:'colored'
                }
            )
            console.log(error.response)
    }
}
return (
    <>
    <ToastContainer/>
        <div className='container mt-4 d-flex justify-content-center'>
            <div className='col-6 shadow rounded-5 p-5'>
                <h2 className='text-center'>New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='userID' className='form-label'>User ID</label>
                        <input onChange={handleInput} type='text' className='form-control' name='user_ID' id='userID'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='userName' className='form-label'>User Name</label>
                        <input onChange={handleInput} type='text' className='form-control' name='student_name' id='userName'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='institution' className='form-label'>Institution</label>
                        <input onChange={handleInput} type='text' className='form-control' name='institution' id='institution'></input>
                    </div>
                    <button type='reset' className='btn btn-warning '>Clear</button>
                    <button type='submit' className='btn btn-success ms-2'>Submit</button>
                </form>
            </div>
        </div>
    </>
)
}

export default AddUser