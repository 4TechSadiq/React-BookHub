import React from 'react';
import UserManagement from './components/UserManagement';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import ProvideForm from './components/ProvideForm';
import AllBooks from './components/AllBooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
    <div className='container-fluid'>
        {/* <SideBar/> */}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            {/* <Route path="/home" element={<Dashboard />}> */}
              <Route path=':section' element={<Dashboard/>}/>
            {/* </Route> */}
            {/* <Route path='/usersManagement' element={<UserManagement/>}/>
            <Route path='/provide' element={<ProvideForm/>}/>
            <Route path='/books' element={<AllBooks/>}/> */}
          </Routes>
        </BrowserRouter>
      </div>

    </>

  );
}

export default App;
