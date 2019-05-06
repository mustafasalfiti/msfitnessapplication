import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actions";

export default function productReducer(state, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return action.data;
    }
    case CREATE_PRODUCT: {
      return { ...state, ...action.data };
    }
    case UPDATE_PRODUCT: {
      return { ...state, ...action.data };
    }
    case DELETE_PRODUCT: {
      return { ...state };
    }
    default:
      return state;
  }
}
