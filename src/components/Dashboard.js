import React, { useState } from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import ProvideForm from './ProvideForm'
import { useParams } from 'react-router-dom'
import AllBooks from './AllBooks'
import UserManagement from './UserManagement'
import Catelogs from './Catelogs'
import AddUser from './AddUser'
import AddBook from './AddBook'


function Dashboard() {
  const {section} = useParams();

  const sectionMap = {
    "dashboard":<ProvideForm/>,
    "addbook":<AddBook/>,
    "provideform": <ProvideForm/>,
    "allbooks": <AllBooks/>,
    "usersmanagement": <UserManagement/>,
    "catelog": <Catelogs/>,
    "adduser": <AddUser/>
  }
  let selectedSection = sectionMap[section]
  if(section == undefined){
    // window.location.href = '/dashboard'
    selectedSection = <ProvideForm/>
  }
  return (
    <>
      <NavBar/>
      <div className='container-fluid d-flex'>
        <div className='col-lg-2'>
          <SideBar/>
        </div>
        <div className='col-lg-10'>
          {selectedSection}
        </div>
      </div>
    </>
  )
}

export default Dashboard