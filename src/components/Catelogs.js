import React from 'react'

function Catelogs() {
return (
    <>
            <div className='container mt-4'>
                    <h2 className='text-center'>Catelogs</h2>
                    <div className='container mt-4 d-flex justify-content-evenly flex-wrap'>
                            <div className="card mt-5 shadow" style={{ width: '18rem' }}>
                                    <img src="path_to_image" className="card-img-top" alt="Card image" />
                                    <div className="card-body">
                                            <h5 className="card-title">Thrillers</h5>
                                            <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of the card's content.
                                            </p>
                                            <a href="#" className="btn btn-primary">Know More</a>
                                    </div>
                            </div>
                            <div className="card mt-5 shadow" style={{ width: '18rem' }}>
                                    <img src="path_to_image" className="card-img-top" alt="Card image" />
                                    <div className="card-body">
                                            <h5 className="card-title">Novels</h5>
                                            <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of the card's content.
                                            </p>
                                            <a href="#" className="btn btn-primary">Know More</a>
                                    </div>
                            </div>
                            <div className="card mt-5 shadow" style={{ width: '18rem' }}>
                                    <img src="path_to_image" className="card-img-top" alt="Card image" />
                                    <div className="card-body">
                                            <h5 className="card-title">Self Motives</h5>
                                            <p className="card-text">
                                            Some quick example text to build on the card title and make up the bulk of the card's content.
                                            </p>
                                            <a href="#" className="btn btn-primary">Know More</a>
                                    </div>
                            </div>
                            
                    </div>
                    
            </div>

            <div className='col-10 p-5 ms-4 mt-5'>
                    <h2 className='text-center mt-5'>Add New Catelog</h2>
                    <div className='d-flex justify-content-center'>
                            <div className='col-lg-6 p-5'>
                                    <form>
                                            <div className='mb-3'>
                                                    <label htmlFor='catelogName' className='form-label'>Catelog Name</label>
                                                    <input type='text' className='form-control' id='catelogName'></input>
                                            </div>
                                            <div className='mb-3'>
                                                    <label htmlFor='catelogDescription' className='form-label'>Catelog Description</label>
                                                    <textarea className='form-control' id='catelogDescription'></textarea>
                                            </div>
                                            <div className='mb-3'>
                                                    <label htmlFor='catelogBooks' className='form-label'>Books in catelog</label>
                                                    <input type='text' className='form-control' id='catelogBooks'></input>
                                            </div>
                                            <div className='mb-3'>
                                                    <label htmlFor='catelogImage' className='form-label'>Catelog Image</label>
                                                    <input type='file' className='form-control' id='catelogImage'></input>
                                            </div>
                                            <div className='mb-3 d-flex justify-content-center'>
                                                    <button className='btn btn-dark'>Submit</button>
                                            </div>
                                    </form>
                            </div>
                    </div>
            </div>
    </>
)
}

export default Catelogs