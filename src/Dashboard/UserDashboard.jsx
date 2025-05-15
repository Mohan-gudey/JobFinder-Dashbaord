import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../userpages/Home'
import URLsPage from '../userpages/URLsPage'


function UserDashboard() {
  return (

    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/urls" element={<URLsPage />} />
      </Route>
    </Routes>
  )
}

export default UserDashboard