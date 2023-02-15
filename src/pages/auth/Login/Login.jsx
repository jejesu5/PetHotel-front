import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../Redux/Actions/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import NavLogout from '../../../components/navbar/NavLogout'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
/* import Footer from '../../components/footer/footer' */
import '../Register/Register.css'


export default function Login () {
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  console.log(input)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signIn(input))

}

const handleInputChange = (e) => {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
}

  return (
        <>
        <ToastContainer/>
        <NavLogout />
        <div className='Principal'>
        <section className="container">
      <header>Iniciar Sesión</header>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="input-box">
          <label>Correo electronico</label>
          <input type="text" placeholder="Ingrese una dirección de correo" required value={input.email} name="email" onChange={handleInputChange}/>
        </div>
        <div className="input-box">
          <label>Contraseña</label>
          <div className='column'>
          <input type={showPassword ? 'text' : 'password'} placeholder="Ingrese una contraseña" required value={input.password} name="password" onChange={handleInputChange}/>
          {!showPassword
              ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'eye-password'}/>
              : <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'eye-password'}
                            />}
        </div>
        </div>
        <div>
          <Link to='/forgotpassword'>
          <p>¿Olvidaste tu contraseña?</p>
          </Link>
          </div>
        <input type="submit" value="Enviar" className='button-submit'/>
      </form>
    </section>
    </div>
        </>
  )
}
