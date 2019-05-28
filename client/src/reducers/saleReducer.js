import { FETCH_SALES, FETCH_SALE , UPDATE_SALE } from "../actions";

export default function saleReducer(state, action) {
  switch (action.type) {
    case FETCH_SALES: {
      let sales = {};
      action.data.forEach((sale, i) => {
        sales[sale._id] = sale;
      });
      return { ...state, sales };
    }
    case FETCH_SALE: {
      let sales = { ...state.sales, [action.data._id]: action.data };
      return { ...state, sales };
    }

    case UPDATE_SALE: {
      let sales = { ...state.sales, [action.data._id]: action.data };
      return { ...state, sales };
    }

    default:
      return state;
  }
}
