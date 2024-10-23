import React from 'react';
import UserManagement from './components/UserManagement';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import ProvideForm from './components/ProvideForm';
import AllBooks from './components/AllBooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';


function App() {
  return (
    <>
    <div className='container-fluid'>
        {/* <SideBar/> */}
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login/>}></Route>
            <Route path='/' element={<Dashboard/>}/>
              <Route path=':section' element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
      </div>

    </>

  );
}

export default App;
