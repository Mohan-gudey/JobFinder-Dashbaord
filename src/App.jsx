import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignInPage from './SignInPage'
import UserDashboard from './Dashboard/UserDashboard'

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/*" element={<UserDashboard />} />
        <Route path="/" element={isLoggedIn ? <Navigate to="/user" /> : <SignInPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
