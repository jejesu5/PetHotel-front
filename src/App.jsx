import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import RegisterNew from './pages/auth/Register/register'
import Login from './pages/auth/Login/Login'
import RecoveryPassword from './pages/auth/Login/RecoveryPassword'
import ChangePassword from './pages/auth/Login/ChangePassword'
import Home from './pages/Home/Home'


function App () {
  return (
    <Routes>
       <Route path='/' element={<Login />} /> 
       <Route path='/home' element={<Home />} />
      <Route path='/register' element={<RegisterNew />} />
      <Route path='/forgotpassword' element={<RecoveryPassword />} />
      <Route path='/changepassword' element={<ChangePassword />} />
    </Routes>
  )
}

export default App

