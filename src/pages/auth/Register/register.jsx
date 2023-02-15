import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../../Redux/Actions/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavLogout from '../../../components/navbar/NavLogout'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
/* import Footer from '../../components/footer/footer' */
import './Register.css'

function validate (input) {
  const errors = {}
  if (!input.name) {
    errors.name = 'First Name is required'
  } else if (input.name.trim() === '') {
    errors.name = 'Name may not be empty'
  }
  if (!input.lastName) {
    errors.lastName = 'Last Name is required'
  } else if (input.lastName.trim() === '') {
    errors.firstName = 'Name may not be empty'
  }
  if (!input.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'Email is invalid'
  }
  if (!input.idNumber) {
    errors.idNumber = 'El numero de documento es requerido'
  } else if (input.idNumber.length < 3) {
    errors.idNumber = 'El numero de documento es invalido'
  }
  if (!input.phoneNumber) {
    errors.phoneNumber = 'El numero de telefono es requerido'
  } else if (/^\d{5,}$/.test(input.phoneNumber) === false) {
    errors.phoneNumber = 'El número de teléfono es invalido'
  }
  if (!input.password) {
    errors.password = 'Password is required'
  } else if (input.password.length < 5) {
    errors.password = 'La contraseña debe tener al menos 5 caracteres'
  } else if (!/\d/.test(input.password)){
    errors.password = 'La contraseña debe tener al menos un número'
  } else if (!/[a-zA-Z]/.test(input.password)){
    errors.password = 'La contraseña debe tener al menos una letra'
  }
  if (!input.repeatPassword) {
    errors.repeatPassword = 'Debe confirmar la contraseña'
  } else if (input.password !== input.repeatPassword) {
    errors.repeatPassword = 'Las contraseñas no coinciden'
  }
  return errors
}
export default function RegisterNew () {
  const dispatch = useDispatch()
  const [handleID, setHandleID] = useState({
    idType: '',
    number: '',
  })
 console.log(handleID)
  const [handleAddress, setHandleAddress] = useState({
    address: '',
    address_2: '',
    city: '',
    localidad: '',
  })
  console.log(handleAddress)
  const [input, setInput] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    idNumber: '',
    phoneNumber: '',
    address: '',
  })

  const [error, setError] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  console.log(input)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(error)
    if (Object.keys(error).length > 0) {
      return toast.error(Object.values(error).join(', '), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    dispatch(signUp(input))
  /*   axios.post('http://localhost:3001/api/user/signup', input)
    .then(res => {
      console.log(res)
    }
    )
    .catch(err => {
      console.log(err.message)
    }) */
  }

  const handleInputChange = (e) => {
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const handleAddressChange = (e) => {
    setHandleAddress({
      ...handleAddress,
      [e.target.name]: e.target.value
  })
}

const SaveAddress = () => {
  if(handleAddress.address_2 === ''){
    setInput({
      ...input,
      address: `${handleAddress?.address}, ${handleAddress?.localidad}, ${handleAddress?.city}`
    })
  } else {
    setInput({
      ...input,
      address: `${handleAddress?.address}, ${handleAddress?.address_2}, ${handleAddress?.localidad}, ${handleAddress?.city}`
    })
  }
}

const handleIDChange = (e) => {
  setHandleID({
    ...handleID,
    [e.target.name]: e.target.value
  })
  setInput({
    ...input,
    idNumber: `${handleID.idType}${handleID.number}`
  })
}

  return (
        <>
        <ToastContainer/>
        <NavLogout />
        <div className='Principal'>
        <section className="container">
      <header>Registrate</header>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="column">
        <div className="input-box">
          <label>Nombre</label>
          <input type="text" placeholder="Ingrese un nombre" required value={input.name} name="name" onChange={handleInputChange}/>
        </div>
        <div className="input-box">
          <label>Apellido</label>
          <input type="text" placeholder="Ingrese un Apellido" required value={input.lastName} name='lastName' onChange={handleInputChange}/>
        </div>
        </div>

        <div className="input-box">
          <label>Correo electronico</label>
          <input type="text" placeholder="Ingrese una dirección de correo" required value={input.email} name="email" onChange={handleInputChange}/>
        </div>
        <div className="input-box">
          <label>Número de documento</label>
       <div className='column'>
        <div className="select-box-small">
              <select onChange={handleIDChange} name="idType">
                <option hidden>Tipo</option>
                <option value="CC">CC</option>
                <option value="CE">CE</option>
                <option value="NIT">NIT</option>
              </select>
            </div>
          <input type="text" placeholder="Ingrese su número de documento" required name="number" value={handleID.number} onChange={handleIDChange}/>
          </div> 
        </div>
        <div className="input-box">
            <label>Número de telefono</label>
            <input type="number" placeholder="Ingrese su numero de telefono" required name="phoneNumber" value={input.phoneNumber} onChange={handleInputChange}/>
          </div>
        <div className="input-box address">
          <label>Dirección</label>
          <input type="text" placeholder="Ingresa tu dirección" required name="address" value={handleAddress.address} onChange={handleAddressChange}/>
          <input type="text" placeholder="Información adicional" name='address_2' value={handleAddress.address_2} onChange={handleAddressChange}/>
          <div className="column">
            <div className = 'input-box'>
            <label>Ciudad</label>
          <div className="select-box">
              <select name="city" onChange={handleAddressChange}>
                <option hidden>Selecciona</option>
                <option value="Bogota">Bogotá</option>
              </select>
            </div>
            </div>
            <div className = 'input-box'>
            <label>Localidad</label>
          <div className="select-box">
              <select name="localidad" onChange={handleAddressChange}>
                <option hidden>Selecciona</option>
                <option value="Usaquen">Usaquén</option>
                <option value="Chapinero">Chapinero</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="San Cristobal">San Cristóbal</option>
                <option value="Usme">Usme</option>
                <option value="Tunjuelito">Tunjuelito</option>
                <option value="Bosa">Bosa</option>
                <option value="Kennedy">Kennedy</option>
                <option value="Fontibon">Fontibón</option>
                <option value="Engativa">Engativá</option>
                <option value="Suba">Suba</option>
                <option value="Barrios Unidos">Barrios Unidos</option>
                <option value="Teusaquillo">Teusaquillo</option>
                <option value="Los Martires">Los Mártires</option>
                <option value="Antonio Nariño">Antonio Nariño</option>
                <option value="Puente Aranda">Puente Aranda</option>
                <option value="La Candelaria">La Candelaria</option>
                <option value="Rafael Uribe Uribe">Rafael Uribe Uribe</option>
                <option value="Ciudad Bolivar">Ciudad Bolívar</option>
                <option value="Sumapaz">Sumapaz</option>
              </select>
            </div>
            </div>
          </div>
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
        <div className="input-box">
          <label>Confirma la Contraseña</label>
          <div className='column'>
          <input type={showPassword ? 'text' : 'password'} placeholder="Confirme la contraseña" required value={input.repeatPassword} name="repeatPassword" onChange={handleInputChange}/>
          {!showPassword
              ? <EyeIcon onClick={() => setShowPassword(!showPassword)}
                                      className={'eye-password'}/>
              : <EyeSlashIcon onClick={() => setShowPassword(!showPassword)}
                            className={'eye-password'}
                            />}
          </div>
        </div>
        <input type="submit" value="Enviar" className='button-submit' onClick={SaveAddress}/>
      </form>
    </section>
    </div>
        </>
  )
}
