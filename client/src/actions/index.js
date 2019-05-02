import axios from 'axios';

// AUTH
export const LOGIN_USER = "LOGIN_USER"
export const REGISTER_USER = "REGISTER_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const FETCH_USER = "FETCH_USER" 

// MEMBER

export const FETCH_MEMBERS = "FETCH_MEMBERS"
export const CREATE_MEMBER = "CREATE_MEMBER"
export const UPDATE_MEMBER = "UPDATE_MEMBER"
export const DELETE_MEMBER = "DELETE_MEMBER"

// PRODUCT
export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"

///User

  export async function fetchUser(dispatch) {
    const response = await axios.get("/auth/me");
    dispatch({ type: FETCH_USER, data: response.data });
  }

  export async function loginUser(dispatch , data) {
    const response = await axios.post("/auth/login", data);
    dispatch({ type: LOGIN_USER, data: response.data });
  }


  export  async function logoutUser(dispatch) {
    const response = await axios.get("/auth/logout");
    dispatch({ type: LOGOUT_USER});
  }


  //Members #FF0000#FF0000#FF0000#FF0000#FF0000

  export  async function fetchMembers(dispatch) {
    const response = await axios.get("/auth/members");
    dispatch({ type: FETCH_MEMBERS  , data:response.data});
  }

  export  async function createMember(dispatch , values , {push}) {
    const response = await axios.post("/auth/members" , values);
    dispatch({ type: CREATE_MEMBER , data:response.data});
    if(response.status === 200) {
      push('/admin/members');
    }
  }


  export  async function updateMember(dispatch) {
    const response = await axios.get("/auth/members");
    dispatch({ type: UPDATE_MEMBER , data:response.data});
  }


  export  async function removeMember(dispatch) {
    const response = await axios.get("/auth/members");
    dispatch({ type: DELETE_MEMBER , data:response.data});
  }


  //Products #FF0000#FF0000#FF0000#FF0000#FF0000

export  async function fetchProducts(dispatch) {
  const response = await axios.get("/products");
  dispatch({ type: FETCH_PRODUCTS , data:response.data});
}

export  async function createProduct(dispatch , values , {push}) {
  const response = await axios.post("/products" , values);
  dispatch({ type: CREATE_PRODUCT , data:response.data});
  if(response.status === 200) {
    push('/admin/products');
  }
}


export  async function updateProduct(dispatch , values) {
  const response = await axios.put(`/products/${values._id}` , values);
  dispatch({ type: UPDATE_PRODUCT , data:response.data});
}


export  async function removeProduct(dispatch , id) {
  const response = await axios.delete(`/products/${id}`);
  dispatch({ type: DELETE_PRODUCT , data:response.data});
}
