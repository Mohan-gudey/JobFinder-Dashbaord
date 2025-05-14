import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../userpages/Home'

function UserDashboard() {
  return (

    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default UserDashboard