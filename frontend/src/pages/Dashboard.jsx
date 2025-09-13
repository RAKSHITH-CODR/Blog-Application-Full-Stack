import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
