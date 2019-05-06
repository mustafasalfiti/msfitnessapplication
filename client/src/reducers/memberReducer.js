import {
  FETCH_MEMBERS,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from "../actions";

export default function memberReducer(state, action) {
  switch (action.type) {
    case FETCH_MEMBERS: {
      return action.data;
    }
    case CREATE_MEMBER: {
      return { ...state, ...action.data };
    }
    case UPDATE_MEMBER: {
      return { ...state, ...action.data };
    }
    case DELETE_MEMBER: {
      return { ...state };
    }
    default:
      return state;
  }
}
