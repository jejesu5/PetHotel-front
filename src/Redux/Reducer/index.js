import { SIGN_IN, SIGN_UP, SEND_OTP_CODE, RECOVER_PASSWORD, VERIFY_EMAIL } from '../Actions/index'
const userLocal = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: userLocal || {},
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