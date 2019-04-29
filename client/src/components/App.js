import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Home from "./Home";
import Login from "./Login";
import Members from "./Members";
import AddMember from "./AddMember";
import ShowMember from "./ShowMember";

import Products from "./Products";
import AddProduct from "./AddProduct";
import ShowProduct from "./ShowProduct";

import Cart from "./Cart";

export default function App() {
  // To Render Page!!
  const [isDone , setIsDone] = React.useState(false);

  setTimeout(()=> {
    setIsDone(true);
  } , 150)

  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN_USER": {
        return action.data;
      }
      case "REGISTER_USER": {
        return action.data;
      }
      case "FETCH_USER": {
        return action.data;
      }
      default:
        return state;
    }
  }

  const [user, dispatch] = React.useReducer(userReducer, null);

  async function fetchUser() {
    const response = await axios.get("/auth/me");
    dispatch({ type: "FETCH_USER", data: response.data });
  }

  async function loginUser(data) {
    const response = await axios.post("/auth/login", data);
    dispatch({ type: "LOGIN_USER", data: response.data });
  }

  React.useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);

  function renderRoutes() {
    if (user) {
      if (user.type === "admin") {
        return (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/members" component={Members} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/:username" component={Home} />

            <Route exact path="/members/create" component={AddMember} />
            <Route exact path="/products/create" component={AddProduct} />
            <Route exact path="/products/:id" component={ShowProduct} />
          </Switch>
        );
      } else {
        return <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path={`/${user.username}`} component={ShowMember} />
            <Route exact path="/:else" component={Home} />

            <Route exact path="/products/:id" component={ShowProduct} />

        </Switch>
      }
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:else" component={Home} />
        </Switch>
      );
    }
  }

  return (
    <div>
      <UserContext.Provider value={{ loginUser , user }}>
        <BrowserRouter>
            {isDone ? renderRoutes() : ''}
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
