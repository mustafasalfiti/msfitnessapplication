import axios from "axios";

// AUTH
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const FETCH_USER = "FETCH_USER";
export const UPDATE_USER = "UPDATE_USER";
export const PAYMENT_USER = "PAYMENT_USER";

// MEMBER
export const FETCH_MEMBERS = "FETCH_MEMBERS";
export const FETCH_MEMBER = "FETCH_MEMBER";
export const CREATE_MEMBER = "CREATE_MEMBER";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const DELETE_MEMBER = "DELETE_MEMBER";

// PRODUCT
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// SALES

export const FETCH_SALES = "FETCH_SALES";
export const FETCH_SALE = "FETCH_SALE";
export const UPDATE_SALE = "UPDATE_SALE";


///User

export async function fetchUser(dispatch) {
  const response = await axios.get("/auth/me");
  dispatch({ type: FETCH_USER, data: response.data });
}

export async function loginUser(dispatch, data) {
  try {
    const response = await axios.post("/auth/login", data);
    dispatch({ type: LOGIN_USER, data: response.data });
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function logoutUser(dispatch) {
  await axios.get("/auth/logout");
  dispatch({ type: LOGOUT_USER });
}

export async function updateUser(dispatch, values) {
  try {
    const response = await axios.put(`/auth/edit`, values);
    if (response.status === 200) {
      dispatch({ type: UPDATE_USER, data: response.data });
      return 200;
    }
  } catch (err) {
    return err.response.data;
  }
}

//payments #FF0000#FF0000#FF0000#FF0000#FF0000

export async function handlePayment(dispatch, data) {
  const response = await axios.post("/api/products/charge", data);
  dispatch({ type: PAYMENT_USER, data: response.data });
}

//Members #0000FF#0000FF#0000FF#0000FF#0000FF#0000FF#0000FF#0000FF

export async function fetchMembers(dispatch) {
  const response = await axios.get("/api/members");
  dispatch({ type: FETCH_MEMBERS, data: response.data });
}

export async function fetchMember(dispatch, username) {
  const response = await axios.get(`/api/members/${username}`);
  dispatch({ type: FETCH_MEMBER, data: response.data });
}

export async function createMember(dispatch, values, { push }) {
  const response = await axios.post("/api/members", values);
  dispatch({ type: CREATE_MEMBER, data: response.data });
  if (response.status === 200) {
    push("/admin/members");
  }
}

export async function updateMember(dispatch, values, username) {
  const response = await axios.put(`/api/members/${username}`, values);
  dispatch({ type: UPDATE_MEMBER, data: response.data });
}

export async function deleteMember(dispatch, username, { push }) {
  const response = await axios.delete(`/api/members/${username}`);
  dispatch({ type: DELETE_MEMBER, data: response.data });
  if (response.status === 200) {
    push("/admin/members");
  }
}

//Products #FF0000#FF0000#FF0000#FF0000#FF0000

export async function fetchProducts(dispatch) {
  const response = await axios.get("/api/products");
  dispatch({ type: FETCH_PRODUCTS, data: response.data });
}

export async function fetchProduct(dispatch, id) {
  const response = await axios.get(`/api/products/${id}`);
  dispatch({ type: FETCH_PRODUCT, data: response.data });
}

export async function createProduct(dispatch, values, { push }) {
  const response = await axios.post("/api/products", values);
  dispatch({ type: CREATE_PRODUCT, data: response.data });
  if (response.status === 200) {
    push("/admin/products");
  }
}

export async function updateProduct(dispatch, values, id, { push }) {
  const response = await axios.put(`/api/products/${id}`, values);
  dispatch({ type: UPDATE_PRODUCT, data: response.data });
}

export async function deleteProduct(dispatch, id, { push }) {
  const response = await axios.delete(`/api/products/${id}`);
  dispatch({ type: DELETE_PRODUCT, data: response.data });
  if (response.status === 200) {
    push(`/admin/products`);
  }
}
;

//Sales #00FF00#00FF00#00FF00#00FF00#00FF00#00FF00#00FF00

export async function fetchSales(dispatch) {
  const response = await axios.get("/api/sales");
  dispatch({ type: FETCH_SALES, data: response.data });
}

export async function fetchSale(dispatch, id) {
  const response = await axios.get(`/api/sales/${id}`);
  dispatch({ type: FETCH_SALE, data: response.data });
}

export async function updateSale(dispatch, data , id) {
  const response = await axios.put(`/api/sales/${id}` , data);
  dispatch({ type: UPDATE_SALE, data: response.data });
}
