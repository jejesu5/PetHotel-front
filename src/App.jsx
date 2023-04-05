import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import RegisterNew from './pages/auth/Register/register'
import Login from './pages/auth/Login/Login'
import RecoveryPassword from './pages/auth/Login/RecoveryPassword'
import ChangePassword from './pages/auth/Login/ChangePassword'
import Home from './pages/Home/Home'
import AllReservas from './pages/Reservas/AllReservas'
import CrearReserva from './pages/Reservas/crearReserva'
import AdminDashboardReservas from './pages/admin/AdminDashboardReservas.jsx'
import AdminDashboardUsuarios from "./pages/admin/AdminDashboardUsuarios.jsx";

function App () {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/register' element={<RegisterNew />} />
      <Route path='/all' element={<AllReservas />} />
      <Route path='/create' element={<CrearReserva />} />
      <Route path='/forgotpassword' element={<RecoveryPassword />} />
      <Route path='/changepassword' element={<ChangePassword />} />
      <Route path='/admin/dashboard/reservas' element={<AdminDashboardReservas />} />
      <Route path='/admin/dashboard/usuarios' element={<AdminDashboardUsuarios />} />
    </Routes>
  )
}

export default App
