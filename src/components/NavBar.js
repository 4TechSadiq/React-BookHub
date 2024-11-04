import React from 'react'

function NavBar() {
  return (
    <>
        <nav className="navbar navbarPos shadow navbar-expand-lg rounded-3 mt-1 bg-danger">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#"><h2 className='text-shadow'>Book Hub</h2></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#"></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#"></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#"></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true"></a>
                    </li>
                </ul>
                <div className='d-flex ms-auto'>
                    <button className='btn shadow btn-dark'>Logout</button>
                </div>
                </div>
            </div>
        </nav>
        
    </>
  )
}

export default NavBar