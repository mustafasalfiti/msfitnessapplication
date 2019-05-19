import {
  FETCH_MEMBERS,
  FETCH_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from "../actions";

export default function memberReducer(state, action) {
  switch (action.type) {
    case FETCH_MEMBERS: {
      let members = {};
      action.data.forEach((member, i) => {
        members[member.username] = member;
      });
      return { ...state, members };
    }
    case FETCH_MEMBER: {
      let members = { ...state.members, [action.data.username]: action.data };
      return { ...state, members };
    }
    case CREATE_MEMBER: {
      let members = { ...state.members, [action.data.username]: action.data };
      return { ...state, members };
    }
    case UPDATE_MEMBER: {
      let members = { ...state.members, [action.data.username]: action.data };
      return { ...state, members };
    }
    case DELETE_MEMBER: {
      return { ...state };
    }
    default:
      return state;
  }
}
