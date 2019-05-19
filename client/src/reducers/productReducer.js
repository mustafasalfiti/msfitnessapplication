import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from "../actions";

export default function productReducer(state, action) {
  switch (action.type) {
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
