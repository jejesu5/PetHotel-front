import axios from 'axios'
import { toast } from 'react-toastify'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD'
export const SEND_OTP_CODE = 'SEND_OTP_CODE'
export const VERIFY_EMAIL = 'VERIFY_EMAIL'
export const GET_USER_RESERVATIONS = 'GET_USER_RESERVATIONS'

export function signUp (obj) {
  return (dispatch) => {
    toast.promise(axios.post('/api/user/signup', obj), {
      pending: 'Cargando...',
      success: 'Usuario registrado con éxito'
    }).then((response) => {
      dispatch({ type: SIGN_UP, payload: response.data })
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    })// error.response.data.errors is an array of errors from the backend need to return a toast for each error
      .catch((error) => {
        console.log(error.response.data.msg)
        if(error.response.data.msg.includes('Email')) {
          return toast.error(error.response.data.msg, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
          return toast.error(error.response.data.msg, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
      })
  }
}
export function signIn (obj) {
  return function (dispatch) {
    toast.promise(
      axios.post('/api/user/signin', obj), {
        pending: 'Iniciando sesión...',
        success: 'Sesión iniciada con éxito',
      })
      .then((res) => {
        dispatch({
          type: SIGN_IN,
          payload: res.data
        })
        localStorage.setItem('user', JSON.stringify(res.data.user))
       if(res.data.user.role === 'admin') {
         window.location.href = '/admin'
       } else {
         window.location.href = '/home'
       }
      })
      .catch((err) => {
        console.log(err)
        return toast.error(err.response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
}

export function signOut (navigate = null) {
  return function (dispatch) {
    dispatch({
      type: SIGN_OUT,
    })
    localStorage.removeItem('user')
    if(navigate){
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } else {
      return 
    }
  }
}

export function sendOTPcode (obj, navigate = null) {
  return function (dispatch) {
    toast.promise(
      axios.post('/api/user/sendOTP', obj), {
        pending: 'Enviando código...',
        success: 'Código enviado con éxito',
      })
      .then((res) => {
        dispatch({
          type: SEND_OTP_CODE,
        })
        if(navigate){
          setTimeout(() => {
            navigate('/changepassword?email=' + obj.email)
          }, 2000)
        } else {
          return 
        }
       
      })
      .catch((err) => {
        return toast.error(err.response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
}

export function recoverPassword (obj, navigate = null) {
  return function (dispatch) {
    toast.promise(
      axios.post('/api/user/recovery', obj), {
        pending: 'Enviando código...',
        success: 'Contraseña cambiada con éxito',
      })
      .then((res) => {
        dispatch({
          type: RECOVER_PASSWORD,
        })
        if(navigate){
          setTimeout(() => {
            navigate('/')
          }, 2000)
        } else {
          return 
        }
       
      })
      .catch((err) => {
        return toast.error(err.response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
}

export function getUserReservations (id) {
  return function (dispatch) {
    axios.get('/api/reservation/client/' + id)
      .then((res) => {
        console.log(res.data.data)
        dispatch({
          type: GET_USER_RESERVATIONS,
          payload: res.data.data
        })
      })
      .catch((err) => {
        return toast.error(err.response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      })
  }
}