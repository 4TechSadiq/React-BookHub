import React from 'react';
import UserManagement from './components/UserManagement';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import Users from './components/Users';
import ProvideForm from './components/ProvideForm';

function App() {
  return (
    <>
    <NavBar/>

    <div className='container-fluid d-flex'>
      <div className='col-2'>
        <SideBar/>
      </div>
      <div className='col-9'>
        <UserManagement/>
        <Users/>
        <ProvideForm/>
      </div>

    </div>

    {/* <SideBar/>
    <UserManagement /> */}
    </>

  );
}

export default App;
