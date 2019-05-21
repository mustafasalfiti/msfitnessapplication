import {
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER,
  UPDATE_USER,
  PAYMENT_USER
} from "../actions";

export default function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, user: action.data };
    }
    case LOGOUT_USER: {
      return { ...state, user: action.data };
    }
    case FETCH_USER: {
      return { ...state, user: action.data };
    }
    case UPDATE_USER: {
      return { ...state, user: action.data };
    }
    case PAYMENT_USER: {
      return { ...state, user: action.data };
    }
    default:
      return state;
  }
}
