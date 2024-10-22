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
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div className="card mt-5 shadow" style={{ width: '18rem' }}>
                    <img src="path_to_image" className="card-img-top" alt="Card image" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                <div className="card mt-5 shadow" style={{ width: '18rem' }}>
                    <img src="path_to_image" className="card-img-top" alt="Card image" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                
            </div>
            
        </div>
    </>
  )
}

export default Catelogs