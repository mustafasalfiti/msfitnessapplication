import React from "react";
import Navbar from "../base/Navbar";
import Store from "../../context/store";
import { fetchProducts } from "../../actions";
import { NavLink } from "react-router-dom";
import { updateUser } from "../../actions";
export default function ShowProduct() {
  const { user, products, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    fetchProducts(dispatch);
  }, [dispatch]);

  function handleAddToCart(event) {
    let data = {
      request: "cart",
      productId: event.target.name
    };
    updateUser(dispatch, data, user.username);
    alert("Added To Cart Successfully");
  }

  function renderComponents() {
    if (products) {
      return Object.keys(products).map(id => {
        if (products[id].amount > 0) {
          return (
            <div key={products[id]._id} className="sp-box">
              <img
                alt={products[id].name}
                src={`/uploads/products/${products[id].image}/${
                  products[id].image
                }`}
              />
              <span className="sp-price">{products[id].price + "€"}</span>
              <p>{products[id].name}</p>
              <NavLink to="#">more info</NavLink>
              <button name={products[id]._id} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          );
        }
      });
    }
  }
  return (
    <div className="sp">
      <header>
        <Navbar />
      </header>
      <div className="sp-container">
        <div className="title">
          <h2>Our Products for the best Prices!</h2>
        </div>
        <div className="sp-products">{renderComponents()}</div>
      </div>
    </div>
  );
}
