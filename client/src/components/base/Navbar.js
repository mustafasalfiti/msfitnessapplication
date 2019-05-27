import React from "react";
import Store from "../../context/store";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../actions";

export default function Navbar() {
  const { user, dispatch } = React.useContext(Store);

  function renderNanlinks() {
    if (user) {
      if (user.type === "admin") {
        return (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact us</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>

            <li className="hoverli">
              <NavLink to="/">Admin</NavLink>
              <ul>
                <li>
                  <NavLink to="/admin/members">Control Members</NavLink>
                </li>

                <li>
                  <NavLink to="/admin/products">Control Products</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/sales">Control Sales</NavLink>
                </li>
                <li>
                  <NavLink to={`/${user.username}`}>Edit information</NavLink>
                </li>

                <li>
                  <NavLink to="/notifications">Notifications</NavLink>
                </li>

                <li>
                  <NavLink to="/" onClick={() => logoutUser(dispatch)}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        );
      } else {
        return (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact us</NavLink>
            </li>
            <li className="hoverli">
              <NavLink to="/">My Profile</NavLink>
              <ul>
                <li>
                  <NavLink to={`/${user.username}`}>Edit information</NavLink>
                </li>

                <li>
                  <NavLink to="/myproducts">Ordered List</NavLink>
                </li>

                <li>
                  <NavLink to="/notifications">Notifications</NavLink>
                </li>

                <li>
                  <NavLink to="/" onClick={() => logoutUser(dispatch)}>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
          </ul>
        );
      }
    } else {
      return (
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contactus">Contact us</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav>
      <div className="row">
        <div className="nav-logo">
          <NavLink to="/" className="btn">
            MS Fitness
          </NavLink>
        </div>
        <div className="nav-links">{renderNanlinks()}</div>
      </div>
    </nav>
  );
}
