import * as Actions from './constants';
const isEmpty = require("is-empty");
const initialState = {
  isLogin: false,
  pending: false,
  token: '',
}


export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case Actions.SIGN_IN_WITH_EMAIL:
        return {
          ...state,
          pending: true,
      }
      case Actions.SET_CURRENT_USER:
        return {
          ...state,
          pending: false,
          isLogin: !isEmpty(action.payload),
          token: action.payload.token
      }
      case Actions.SIGN_OUT:
      default:
        return state;
    }
  }