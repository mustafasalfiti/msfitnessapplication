import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../base/Home";
import Login from "../members/Login";
import AdminShowMembers from "../members/AdminShowMembers";
import AdminAddMember from "../members/AdminAddMember";
import AdminShowMember from "../members/AdminShowMember";
import ShowMember from "../members/ShowMember";
import ForgetPassword from "../members/ForgetPassword";
import AdminAddProduct from "../products/AdminAddProduct";
import AdminShowProducts from "../products/AdminShowProducts";
import AdminShowProduct from "../products/AdminShowProduct";
import ShowProducts from "../products/ShowProducts";
import OrderedProducts from "../products/OrderedProducts";
import AdminShowSales from "../sales/AdminShowSales";
import Notifications from "../base/Notifications";
import Cart from "../products/Cart";
import Store from "../../context/store";
import AdminShowSale from "../sales/AdminShowSale";

export default function RenderRoutes() {
  const { user } = React.useContext(Store);
  if (user) {
    if (user.type === "admin") {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/myproducts" component={OrderedProducts} />

            <Route exact path="/products" component={ShowProducts} />
            <Route exact path={`/${user.username}`} component={ShowMember} />
            <Route exact path="/:username" component={Home} />

            <Route exact path="/admin/members" component={AdminShowMembers} />
            <Route exact path="/admin/sales" component={AdminShowSales} />
            <Route exact path="/admin/products" component={AdminShowProducts} />
            <Route exact path="/products/:id" component={Home} />
            <Route
              exact
              path="/admin/members/create"
              component={AdminAddMember}
            />
            <Route
              exact
              path="/admin/members/:id"
              component={AdminShowMember}
            />
            <Route
              exact
              path="/admin/products/create"
              component={AdminAddProduct}
            />
            <Route
              exact
              path="/admin/products/:id"
              component={AdminShowProduct}
            />
            <Route exact path="/admin/sales/:id" component={AdminShowSale} />
          </Switch>
        </BrowserRouter>
      );
    } else if (user.type === "member") {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={ShowProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/notifications" component={Notifications} />
            <Route exact path="/myproducts" component={OrderedProducts} />
            <Route exact path={`/${user.username}`} component={ShowMember} />
            <Route exact path="/:else" component={Home} />
          </Switch>
        </BrowserRouter>
      );
    }
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgetpassword" component={ForgetPassword} />
          <Route exact path="/:else" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
