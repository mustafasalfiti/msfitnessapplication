import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "../context/store";
import Home from "./base/Home";
import Login from "./members/Login";
import AdminShowMembers from "./members/AdminShowMembers";
import AdminAddMember from "./members/AdminAddMember";
import AdminShowMember from './members/AdminShowMember';
import ShowMember from "./members/ShowMember";


import AdminAddProduct from "./products/AdminAddProduct";
import AdminShowProducts from "./products/AdminShowProducts";
import AdminShowProduct from './products/AdminShowProduct';

import reducer from "../reducers";

import { fetchUser, loginUser, logoutUser , } from "../actions";

import Cart from "./products/Cart";

export default function App() {
  // To Render Page!!
  const [isDone, setIsDone] = React.useState(false);

  setTimeout(() => {
    setIsDone(true);
  }, 100);

  const [store, dispatch] = React.useReducer(reducer, {
    user: null,
    products: null,
    members: null
  });
  const {members , products , user} = store;
  
  React.useEffect(() => {
    fetchUser(dispatch);
  }, []);

  function renderRoutes() {
    if (user) {
      if (user.type === "admin") {
        return (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/:username" component={Home} />

            <Route exact path="/admin/members" component={AdminShowMembers} />
            <Route exact path="/admin/products" component={AdminShowProducts} />
            <Route exact path="/products/:id" component={Home} />
            <Route exact path="/admin/members/create" component={AdminAddMember} />
            <Route exact path="/admin/members/:id" component={AdminShowMember} />
            <Route exact path="/admin/products/create" component={AdminAddProduct} />
            <Route exact path="/admin/products/:id" component={AdminShowProduct} />
          </Switch>
        );
      } else if (user.type === "member") {
        return (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route
              exact
              path={`/${user.username}`}
              component={ShowMember}
            />
            <Route exact path="/:else" component={Home} />
            <Route exact path="/products/:id" component={Home} />
          </Switch>
        );
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
      <Store.Provider
        value={{ products:products , members:members ,loginUser, user: user, logoutUser, dispatch }}
      >
        <BrowserRouter>{isDone ? renderRoutes() : ""}</BrowserRouter>
      </Store.Provider>
    </div>
  );
}
