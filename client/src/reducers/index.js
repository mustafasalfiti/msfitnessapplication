import { LOGIN_USER, LOGOUT_USER, FETCH_USER, UPDATE_USER } from "../actions";
import {
  FETCH_MEMBERS,
  FETCH_MEMBER,
  CREATE_MEMBER,
  UPDATE_MEMBER,
  DELETE_MEMBER
} from "../actions";

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actions";

export default function reducer(state, action) {
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
      return { ...state , user:action.data};
    }

    /// Member
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

    /// Products
    case FETCH_PRODUCTS: {
      let products = {};
      action.data.forEach((product, i) => {
        products[product._id] = product;
      });
      return { ...state, products };
    }
    case FETCH_PRODUCT: {
      let products = { ...state.products, [action.data._id]: action.data };
      return { ...state, products };
    }
    case CREATE_PRODUCT: {
      let products = { ...state.products, [action.data._id]: action.data };
      return { ...state, products };
    }
    case UPDATE_PRODUCT: {
      let products = { ...state.products, [action.data._id]: action.data };
      return { ...state, products };
    }
    case DELETE_PRODUCT: {
      return { ...state };
    }
    default:
      return state;
  }
}
