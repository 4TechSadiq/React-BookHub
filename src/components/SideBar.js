import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";





function SideBar() {
  return (
    <>
            <div class="shadow">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-5 pt-2 text-white min-vh-100">
                {/* <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Menu</span>
                </a> */}
                
                
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li  className='nav-item d-flex'>
                        <Link to='/' class="nav-link btn text-secondary align-middle px-0">
                            <span class=" d-none d-sm-inline">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/adduser' class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Add User</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                    
                        <Link to='/addbook' class="nav-link btn text-secondary align-middle px-0">
                            <span class=" d-none d-sm-inline">Add Book</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        {/* <a href="#" class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span>
                        </a> */}
                        <Link to='/provideform' class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Provide Form</span>
                        </Link>
                    </li>
                    <li>
                        
                        <Link to='/allbooks' class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">All Books</span>
                        </Link>
                        
                        
                    </li>
                    <li>
                    <Link to='/usersmanagement' class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">List Users</span>
                    </Link>
                    </li>
{/*                     
                    <li>
                        <Link to='/catelog' class="nav-link btn text-secondary align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Catelog</span>
                        </Link>
                    </li> */}
                    
                </ul>
                <hr></hr>
                <div class="dropdown pb-4">
                    <a href="#" class="d-flex btn text-secondary align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="#" alt="hugenerd" width="30" height="30" class="rounded-circle"></img>
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider"></hr>
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        


    </>
  )
}

export default SideBar