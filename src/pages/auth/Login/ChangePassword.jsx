import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import NavLogout from '../../../components/navbar/NavLogout'
import { recoverPassword, sendOTPcode } from '../../../Redux/Actions/index'
import OtpInput from 'react-otp-input'

export default function ChangePassword () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const [input, setInput] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [otp, setOtp] = useState('')
    console.log(input)

    useEffect(() => {
        if(searchParams.get('email')) {
            setInput({
                ...input,
                email: searchParams.get('email')
            })
        }}, [searchParams])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(recoverPassword({...input, code: otp}, navigate))
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleOTPchange = (otp) => {
        return setOtp(otp)
    }

    const handlesendOTP = () => {
        dispatch(sendOTPcode(input))
    }
    
    return (
        <>
        <ToastContainer/>
        <NavLogout />
    <div className='Principal'>
    <section className="container">
      <header>Ingresa nueva contraseña</header>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="input-box">
        <label>Codigo OTP</label>
        <OtpInput
              value={otp}
              onChange={handleOTPchange}
              numInputs={4}
              isInputNum={true}
              inputStyle={{ backgroundColor: '#F7F8FA', width: '50px', height: '50px', borderRadius: '10px', border: 'none', fontSize: '20px', textAlign: 'center', color: 'black', marginRight: '10px' }}
            />
            </div>
        <div className="input-box">
          <label>Nueva contraseña</label>
          <input type="text" placeholder="Ingrese una dirección de correo" required value={input.password} name="password" onChange={handleInputChange}/>
        </div>
        <div className="input-box">
          <label>Confirmar contraseña</label>
          <input type="text" placeholder="Ingrese una dirección de correo" required value={input.repeatPassword} name="repeatPassword" onChange={handleInputChange}/>
        </div>
        <div>
            <p>No recibiste el codigo? <span style={{color: 'blue', fontSize: 'bold', cursor: 'pointer'}} onClick={() => handlesendOTP()}>Reenviar Código</span></p>
        </div>
        <input type="submit" value="Enviar" className='button-submit'/>
      </form>
    </section>
        </div>
        </>
    )
}