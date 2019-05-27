import memberReducer from './memberReducer';
import productReducer from './productReducer';
import authReucer from './authReducer';
import saleReducer from './saleReducer';


export default function(state , action) {
  if(action.type.search('MEMBER') !== -1) {
   return memberReducer(state , action);
  } else if(action.type.search('PRODUCT') !== -1) {
    return productReducer(state , action);
  }  else if(action.type.search('USER') !== -1) {
    return authReucer(state , action)
  } else if(action.type.search('SALE') !== -1) {
    return saleReducer(state , action)
  } else {
    return state;
  }
}