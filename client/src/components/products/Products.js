import React from "react";
import Navbar from "../base/Navbar";
import { NavLink } from "react-router-dom";
import Store from "../../context/store";
import { fetchProducts } from "../../actions";

export default function Products() {
  const { products, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  function renderProducts() {
    if (products !== null) {
      return Object.keys(products).map((id, i) => (
        <tr key={id}>
          <td>{i + 1}</td>
          <td>{products[id].name}</td>
          <td>{products[id].type}</td>
          <td>{products[id].price} </td>
          <td>{products[id].amount}</td>
          <td>
            <NavLink to={`/admin/products/${products[id]._id}`}>more info</NavLink>
          </td>
        </tr>
      ));
    } else return <tr><td>Loading</td></tr>;
  }
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="info">
        <div className="info-panel">
          <div className="info-panel-info">
            <p>Products: {products ? products.length : "Loading"}</p>
            <p>Types: {products ? products.length : "Loading"}</p>
          </div>
          <NavLink to="/admin/products/create">Add Product</NavLink>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}
