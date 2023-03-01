import { SIGN_IN, SIGN_UP, SEND_OTP_CODE, RECOVER_PASSWORD, VERIFY_EMAIL, GET_USER_RESERVATIONS, SIGN_OUT } from '../Actions/index'
const userLocal = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: userLocal || {},
  reservationsByuser: [],
  allReservations: []
}
export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload.user
      }
    case SIGN_UP:{
      return {
        ...state,
        user: action.payload.user
      }
    }
    case SIGN_OUT:{
      return {
        ...state,
        user: {},
        reservationsByuser: [],
      }
    }
    case GET_USER_RESERVATIONS:{
      return {
        ...state,
        reservationsByuser: action.payload
      }
    }
    case SEND_OTP_CODE:{
      return {
        ...state
      }
    }
    case RECOVER_PASSWORD:{
      return {
        ...state
      }
    }
    case VERIFY_EMAIL:{
      return {
        ...state
      }
    }
    default:
      return {
        ...state
      }
  }
}