import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, FETCH_USER } from "../actions";

export default function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_USER: {
      return action.data;
    }
    case REGISTER_USER: {
      return action.data;
    }
    case LOGOUT_USER: {
      return null;
    }
    case FETCH_USER: {
      return action.data;
    }
    default:
      return state;
  }
}

