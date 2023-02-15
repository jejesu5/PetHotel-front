import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import NavLogout from '../../../components/navbar/NavLogout'
import { sendOTPcode } from '../../../Redux/Actions/index'
import OtpInput from 'react-otp-input'

export default function RecoveryPassword () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })
   

    

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(sendOTPcode(input, navigate))
        
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
      <header>Recuperar contraseña</header>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="input-box">
          <label>Correo electronico</label>
          <input type="text" placeholder="Ingrese una dirección de correo" required value={input.email} name="email" onChange={handleInputChange}/>
        </div>
        <input type="submit" value="Enviar" className='button-submit'/>
      </form>
    </section>
    </div>
        </>
    )
}