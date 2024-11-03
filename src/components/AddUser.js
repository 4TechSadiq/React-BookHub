import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function AddUser() {
    const [formdata, setData] = useState({ user_ID: '', student_name: '', institution: '', profile: null });
    const [isLoading, setIsLoading] = useState(false);

    // Generate a UUID-based user ID with a "BH-" prefix
    const generateUUIDUserID = () => `BH-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Set user_ID when the component mounts
    React.useEffect(() => {
        const newUserID = generateUUIDUserID();
        setData(prevData => ({ ...prevData, user_ID: newUserID }));
    }, []);

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile') {
            setData(prevData => ({ ...prevData, [name]: files[0] }));
        } else {
            setData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading to true

        const data = new FormData();
        for (const key in formdata) {
            data.append(key, formdata[key]);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/create-student/", data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                toast.success("User Created Successfully", { position: 'top-center', theme: 'colored' });
                // Optionally reset the form and generate a new ID
                setData({ user_ID: generateUUIDUserID(), student_name: '', institution: '', profile: null });
            } else {
                toast.error("Failed to create user", { position: 'top-center', theme: 'colored' });
            }
        } catch (error) {
            toast.error("Error occurred during submission", { position: 'top-center', theme: 'colored' });
            console.log(error.response);
        } finally {
            setIsLoading(false); // Reset loading state after submission
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='container mt-4 d-flex justify-content-center'>
                <div className='col-6 shadow rounded-5 p-5'>
                    <h2 className='text-center'>New User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='userID' className='form-label'>User ID</label>
                            <input
                                type='text'
                                className='form-control'
                                name='user_ID'
                                id='userID'
                                value={formdata.user_ID}
                                readOnly
                            />
                            <p className='text-danger'>USERID IS GENERATED AUTOMATICALLY!!!</p>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='userName' className='form-label'>User Name</label>
                            <input
                                onChange={handleInput}
                                type='text'
                                className='form-control'
                                name='student_name'
                                id='userName'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='institution' className='form-label'>Institution</label>
                            <input
                                onChange={handleInput}
                                type='text'
                                className='form-control'
                                name='institution'
                                id='institution'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='image' className='form-label'>Profile Photo</label>
                            <input
                                onChange={handleInput}
                                type='file'
                                className='form-control'
                                name='profile'
                                id='image'
                            />
                        </div>
                        <button type='reset' className='btn btn-warning'>Clear</button>
                        <button 
                            type='submit' 
                            className='btn btn-success ms-2' 
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddUser;
